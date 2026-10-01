import { createClient } from '@/lib/supabase/server';
import { prisma } from '@/lib/prisma/client';
import { User } from '@/generated/prisma';
import { redirect } from 'next/navigation';

export type AuthContext = {
  supabaseUser: { id: string; email?: string };
  user: User;
};

type SupabaseUserLike = {
  id: string;
  email?: string;
  user_metadata?: {
    full_name?: string | null;
    avatar_url?: string | null;
  };
};

/**
 * Resolve the application user for a Supabase identity.
 *
 * The Supabase Auth user is the source of truth for authentication, while
 * Prisma stores the application's profile/role. Older records can exist with
 * the same email but a different Prisma id, so we deliberately match by id
 * first and email second instead of mutating primary keys during login.
 */
export async function getOrCreatePrismaUser(
  supabaseUser: SupabaseUserLike
) {
  const email = supabaseUser.email?.trim().toLowerCase();
  if (!email) {
    return null;
  }

  const include = {
    companyMembers: {
      where: { isActive: true },
      include: { company: true },
    },
  } as const;

  const byId = await prisma.user.findUnique({
    where: { id: supabaseUser.id },
    include,
  });

  if (byId) {
    return byId;
  }

  // Backward compatibility for users provisioned before the Supabase id was
  // used as the Prisma primary key. Keep the existing DB identity intact.
  const byEmail = await prisma.user.findUnique({
    where: { email },
    include,
  });

  if (byEmail) {
    return byEmail;
  }

  try {
    return await prisma.user.create({
      data: {
        id: supabaseUser.id,
        email,
        fullName: supabaseUser.user_metadata?.full_name || null,
        avatarUrl: supabaseUser.user_metadata?.avatar_url || null,
        role: 'CUSTOMER',
      },
      include,
    });
  } catch (error) {
    // Two requests can provision the same user at the same time. If another
    // request won the race, use the record it created rather than failing login.
    const existing = await prisma.user.findFirst({
      where: {
        OR: [
          { id: supabaseUser.id },
          { email },
        ],
      },
      include,
    });

    if (existing) {
      return existing;
    }

    throw error;
  }
}

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

  const user = await getOrCreatePrismaUser(supabaseUser);

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
