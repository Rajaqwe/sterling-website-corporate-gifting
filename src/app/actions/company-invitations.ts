'use server'

import { prisma } from '@/lib/prisma/client'
import { createClient } from '@/lib/supabase/server'
import crypto from 'crypto'
import { CompanyRole } from '@/generated/prisma'
import { sendCompanyInvitationEmail } from '@/lib/email/sender'

export async function inviteCompanyMember(companyId: string, email: string, role: CompanyRole) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) return { success: false, error: "Unauthorized" }

    // Verify user is an ADMIN of the company
    const membership = await prisma.companyMember.findUnique({
      where: { companyId_userId: { companyId, userId: user.id } },
      include: { company: true }
    })

    if (!membership || membership.role !== 'COMPANY_ADMIN') {
      return { success: false, error: "Forbidden: Only company admins can invite members." }
    }

    // Check if user is already a member
    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      const existingMember = await prisma.companyMember.findUnique({
        where: { companyId_userId: { companyId, userId: existingUser.id } }
      })
      if (existingMember) {
        return { success: false, error: "User is already a member of this company." }
      }
    }

    // Create invitation token
    const rawToken = crypto.randomBytes(32).toString('hex')
    const hashedToken = crypto.createHash('sha256').update(rawToken).digest('hex')
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days

    const invitation = await prisma.companyInvitation.create({
      data: {
        companyId,
        email,
        role,
        token: hashedToken,
        expiresAt,
        invitedBy: user.id
      }
    })

    // Send the email with the raw token
    await sendCompanyInvitationEmail(email, {
      companyName: membership.company.name,
      role,
      token: rawToken
    })

    return { success: true, message: "Invitation sent successfully." }
  } catch (error: any) {
    if (error?.code === 'P2002') {
      return { success: false, error: "An invitation has already been sent to this email." }
    }
    console.error("Failed to send invitation:", error)
    return { success: false, error: "Failed to send invitation." }
  }
}

export async function acceptCompanyInvitation(token: string) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user || !user.email) return { success: false, error: "Unauthorized" }

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex')
    const invitation = await prisma.companyInvitation.findUnique({
      where: { token: hashedToken }
    })

    if (!invitation || invitation.status !== 'PENDING') {
      return { success: false, error: "Invalid or expired invitation." }
    }

    if (invitation.expiresAt < new Date()) {
      return { success: false, error: "Invitation has expired." }
    }

    if (invitation.email.toLowerCase() !== user.email.toLowerCase()) {
      return { success: false, error: "This invitation was sent to a different email address." }
    }

    await prisma.$transaction(async (tx: any) => {
      // Add member
      await tx.companyMember.create({
        data: {
          companyId: invitation.companyId,
          userId: user.id,
          role: invitation.role
        }
      })

      // Mark invitation as accepted
      await tx.companyInvitation.update({
        where: { id: invitation.id },
        data: { status: 'ACCEPTED' }
      })
    })

    return { success: true, message: "Joined company successfully." }
  } catch (error: any) {
    console.error("Failed to accept invitation:", error)
    return { success: false, error: "Failed to accept invitation." }
  }
}
