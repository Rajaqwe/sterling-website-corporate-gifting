import { createClient } from '@/lib/supabase/server';
import { prisma } from '@/lib/prisma/client';
import { User } from '@/generated/prisma';
import { redirect } from 'next/navigation';

export type AuthContext = {
  supabaseUser: { id: string; email?: string };
  user: User;
};

/**
 * Retrieves the currently authenticated Supabase user and their corresponding Prisma User record.
 * If no user is authenticated, returns null.
 */
export async function getAuthUser(): Promise<AuthContext | null> {
  const supabase = await createClient();
  const { data: { user: supabaseUser }, error } = await supabase.auth.getUser();

  if (error || !supabaseUser) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { id: supabaseUser.id },
    include: {
      companyMembers: {
        where: { isActive: true },
        include: { company: true },
      },
    },
  });

  if (!user) {
    return null;
  }

  return { supabaseUser, user };
}

/**
 * Requires a valid authenticated user. If not found, throws an error or redirects.
 */
export async function requireUser(): Promise<AuthContext> {
  const context = await getAuthUser();
  if (!context) {
    redirect('/login?message=Please sign in to continue&type=error');
  }
  
  if (!context.user.isActive) {
    redirect('/login?message=Your account has been deactivated&type=error');
  }
  
  return context;
}

/**
 * [DEPRECATED — use requireAdmin() from @/lib/auth/require-admin instead]
 * Requires the user to have an ADMIN or SUPER_ADMIN role, checked against the DB.
 * NOTE: Keep this renamed to avoid silent import of the wrong guard.
 */
export async function requireAdminDB(): Promise<AuthContext> {
  const context = await requireUser();
  
  if (context.user.role !== 'ADMIN' && context.user.role !== 'SUPER_ADMIN') {
    redirect('/dashboard?message=Unauthorized access&type=error');
  }
  
  return context;
}

/**
 * [DEPRECATED — use a server-action check against DB directly]
 * Requires the user to have a SUPER_ADMIN role (checks DB role).
 * NOTE: Keep this renamed to avoid silent import of the wrong guard.
 */
export async function requireSuperAdminDB(): Promise<AuthContext> {
  const context = await requireUser();
  
  if (context.user.role !== 'SUPER_ADMIN') {
    redirect('/dashboard?message=Unauthorized access&type=error');
  }
  
  return context;
}
