import { createClient } from '@/lib/supabase/server';
import { prisma } from '@/lib/prisma/client';
import { redirect } from 'next/navigation';

export type Permission = 
  | 'admin.access'
  | 'products.manage'
  | 'products.read'
  | 'orders.manage'
  | 'orders.read'
  | 'quotes.manage'
  | 'quotes.read'
  | 'customers.manage'
  | 'customers.read'
  | 'companies.manage'
  | 'companies.read'
  | 'reviews.manage'
  | 'reviews.read'
  | 'settings.manage'
  | 'settings.read'
  | 'inventory.adjust'
  | 'inventory.read'
  | 'variants.manage'
  | 'categories.manage'
  | 'attributes.manage'
  | 'branding.manage'
  | 'payments.reconcile'
  | 'payments.read'
  | 'invoices.manage'
  | 'invoices.read'
  | 'content.publish'
  | 'content.write'
  | 'media.manage'
  | 'coupons.manage'
  | 'analytics.read'
  | 'notifications.manage'
  | 'admins.manage'
  | 'roles.manage'
  | 'audit.read'
  | 'system.health';

/**
 * Ensures the current user is authenticated.
 */
export async function requireAuthenticatedUser() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login?message=Please sign in to access this page&type=error');
  }

  return user;
}

/**
 * Validates if the user has a specific permission.
 * SUPER_ADMIN and ADMIN bypass permission checks (matching requireAdmin(),
 * which grants full access to both roles); granular permissions apply to
 * staff accounts that hold the `admin.access` permission instead of a role.
 */
export async function hasPermission(userId: string, requiredPermission: Permission): Promise<boolean> {
  const dbUser = await prisma.user.findUnique({
    where: { id: userId },
    select: { role: true, permissions: true }
  });

  if (!dbUser) return false;
  if (dbUser.role === 'SUPER_ADMIN' || dbUser.role === 'ADMIN') return true;

  return dbUser.permissions.includes(requiredPermission);
}

/**
 * Requires the current user to have a specific permission.
 * Throws a redirect or unauthorized error if they do not.
 */
export async function requirePermission(permission: Permission) {
  const user = await requireAuthenticatedUser();
  
  const hasAccess = await hasPermission(user.id, permission);
  if (!hasAccess) {
    redirect('/dashboard?message=Unauthorized. Administrator access required.&type=error');
  }

  return user;
}

/**
 * Requires the current user to be a SUPER_ADMIN.
 * Used for extremely sensitive operations like deleting the last admin,
 * modifying system-level settings, or escalating permissions.
 */
export async function requireSuperAdmin() {
  const user = await requireAuthenticatedUser();

  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    select: { role: true }
  });

  if (dbUser?.role !== 'SUPER_ADMIN') {
    redirect('/admin?message=Super Admin access required for this operation.&type=error');
  }

  return user;
}

/**
 * Utility for verifying company access to prevent IDOR.
 */
export async function requireCompanyAccess(userId: string, companyId: string) {
  // Check if they are a super admin first
  const dbUser = await prisma.user.findUnique({
    where: { id: userId },
    select: { role: true }
  });

  if (dbUser?.role === 'SUPER_ADMIN') return true;

  const membership = await prisma.companyMember.findUnique({
    where: {
      companyId_userId: {
        companyId,
        userId
      }
    }
  });

  if (!membership || !membership.isActive) {
    redirect('/dashboard?message=Unauthorized company access.&type=error');
  }

  return membership;
}
