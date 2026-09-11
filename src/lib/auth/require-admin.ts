import { requireAuthenticatedUser } from './permissions';
import { prisma } from '@/lib/prisma/client';
import { redirect } from 'next/navigation';

export async function requireAdmin() {
  const user = await requireAuthenticatedUser();

  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    select: { role: true, permissions: true }
  });

  const role = dbUser?.role;
  const hasAccess = role === 'ADMIN' || role === 'SUPER_ADMIN' || dbUser?.permissions.includes('admin.access');

  if (!hasAccess) {
    redirect('/dashboard?message=Unauthorized. Administrator access required.&type=error');
  }

  return user;
}
