import { createClient } from '@/lib/supabase/server';
import { prisma } from '@/lib/prisma/client';
import { User } from '@prisma/client';
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
  const supabase = createClient();
  const { data: { user: supabaseUser }, error } = await supabase.auth.getUser();

  if (error || !supabaseUser) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { email: supabaseUser.email },
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
 * Requires the user to have an ADMIN or SUPER_ADMIN role.
 */
export async function requireAdmin(): Promise<AuthContext> {
  const context = await requireUser();
  
  if (context.user.role !== 'ADMIN' && context.user.role !== 'SUPER_ADMIN') {
    redirect('/dashboard?message=Unauthorized access&type=error');
  }
  
  return context;
}

/**
 * Requires the user to have a SUPER_ADMIN role.
 */
export async function requireSuperAdmin(): Promise<AuthContext> {
  const context = await requireUser();
  
  if (context.user.role !== 'SUPER_ADMIN') {
    redirect('/dashboard?message=Unauthorized access&type=error');
  }
  
  return context;
}
