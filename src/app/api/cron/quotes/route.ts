import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma/client';
import { assertEnv } from '@/lib/env';

export async function GET(request: Request) {
  try {
    // Basic security: only run if the correct cron secret is provided
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get('secret');
    const authHeader = request.headers.get('Authorization');

    const expectedSecret = process.env.CRON_SECRET;
    
    if (!expectedSecret) {
      console.error("[CRON] CRON_SECRET is not configured");
      return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
    }

    if (secret !== expectedSecret && authHeader !== `Bearer ${expectedSecret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Mark all APPROVED quotes past their expiresAt date as CANCELLED
    const result = await prisma.quoteRequest.updateMany({
      where: {
        status: 'APPROVED',
        expiresAt: {
          lt: new Date()
        }
      },
      data: {
        status: 'CANCELLED'
      }
    });

    console.log(`[CRON] Cancelled ${result.count} quotes`);
    return NextResponse.json({ success: true, expiredCount: result.count });
  } catch (error) {
    console.error("[CRON Quotes] Failed:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
