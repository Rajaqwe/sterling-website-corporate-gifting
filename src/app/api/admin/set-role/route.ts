import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma/client'
import { createClient as createServerClient } from '@/lib/supabase/server'
import { rateLimit } from '@/lib/security/rate-limit'

import { getSupabaseAdmin } from '@/lib/supabase/admin'

// Allowed roles for promotion
const ALLOWED_ROLES = ['ADMIN', 'SUPER_ADMIN', 'CUSTOMER'] as const
type AllowedRole = typeof ALLOWED_ROLES[number]

export async function POST(request: Request) {
  try {
    // --- Rate limit by IP ---
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      'unknown'
    const limitCheck = await rateLimit(`set-role-${ip}`, 5, 60000)
    if (!limitCheck.success) {
      return NextResponse.json(
        { error: 'Too many requests. Try again later.' },
        { status: 429 }
      )
    }

    // --- Gate: require a valid SUPER_ADMIN session ---
    const supabase = await createServerClient()
    const {
      data: { user: callerSupabaseUser },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !callerSupabaseUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const callerRole = callerSupabaseUser.app_metadata?.role
    if (callerRole !== 'SUPER_ADMIN') {
      return NextResponse.json(
        { error: 'Forbidden: only SUPER_ADMINs may change roles' },
        { status: 403 }
      )
    }

    // --- Parse & validate body ---
    const { userId, role } = await request.json()

    if (!userId || !role) {
      return NextResponse.json(
        { error: 'Missing userId or role' },
        { status: 400 }
      )
    }

    if (!ALLOWED_ROLES.includes(role as AllowedRole)) {
      return NextResponse.json(
        { error: `Invalid role. Must be one of: ${ALLOWED_ROLES.join(', ')}` },
        { status: 400 }
      )
    }

    // Prevent self-demotion
    if (userId === callerSupabaseUser.id && role !== 'SUPER_ADMIN') {
      return NextResponse.json(
        { error: 'You cannot change your own role.' },
        { status: 400 }
      )
    }

    // --- Verify target user exists in DB ---
    const dbUser = await prisma.user.findUnique({ where: { id: userId } })
    if (!dbUser) {
      return NextResponse.json(
        { error: 'User not found in database' },
        { status: 404 }
      )
    }

    const previousRole = dbUser.role

    // --- Atomic update: DB first, then Supabase; rollback DB if Supabase fails ---
    await prisma.user.update({
      where: { id: userId },
      data: { role: role as AllowedRole },
    })

    const supabaseAdmin = getSupabaseAdmin()
    const { data, error: supabaseError } =
      await supabaseAdmin.auth.admin.updateUserById(userId, {
        app_metadata: { role },
      })

    if (supabaseError) {
      // Roll back the DB update
      await prisma.user.update({
        where: { id: userId },
        data: { role: previousRole },
      })
      return NextResponse.json(
        { error: `Supabase update failed: ${supabaseError.message}` },
        { status: 500 }
      )
    }

    // --- Audit log ---
    await prisma.auditLog.create({
      data: {
        actorId: callerSupabaseUser.id,
        action: 'SET_USER_ROLE',
        resource: 'User',
        resourceId: userId,
        metadata: { previousRole, newRole: role },
        ipAddress: ip,
      },
    })

    return NextResponse.json({ success: true, user: data.user })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
