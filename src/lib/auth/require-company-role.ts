import { prisma } from '@/lib/prisma/client';
import { getAuthUser } from '@/lib/auth/server';

export type CompanyRole = 'COMPANY_ADMIN' | 'PROCUREMENT' | 'HR' | 'MARKETING' | 'MEMBER';

/**
 * Validates that the current user belongs to the specified company
 * and has one of the allowed roles.
 * 
 * @param companyId The ID of the company to check against
 * @param allowedRoles Array of acceptable roles. If empty, just checks membership.
 * @returns The CompanyMember record if authorized
 * @throws Error if unauthorized
 */
export async function requireCompanyRole(companyId: string, allowedRoles: CompanyRole[] = []) {
  const auth = await getAuthUser();
  if (!auth?.user) {
    throw new Error('Unauthorized');
  }

  // Super admins and system admins bypass company role checks
  if (auth.user.role === 'ADMIN' || auth.user.role === 'SUPER_ADMIN') {
    return null; // Admins don't have a CompanyMember record necessarily
  }

  const member = await prisma.companyMember.findUnique({
    where: {
      companyId_userId: {
        userId: auth.user.id,
        companyId: companyId,
      }
    }
  });

  if (!member) {
    throw new Error('Forbidden: You are not a member of this company');
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(member.role as CompanyRole)) {
    throw new Error(`Forbidden: Requires one of roles: ${allowedRoles.join(', ')}`);
  }

  return member;
}
