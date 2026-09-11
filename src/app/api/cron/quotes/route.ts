import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma/client';
import { sendQuoteReminderEmail } from '@/lib/email/sender';

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('Authorization');

    const expectedSecret = process.env.CRON_SECRET;
    
    if (!expectedSecret) {
      console.error("[CRON] CRON_SECRET is not configured");
      return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
    }

    if (authHeader !== `Bearer ${expectedSecret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 1. Mark all APPROVED quotes past their expiresAt date as CANCELLED
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

    // 2. Quote Reminders: Send reminder for PROPOSAL_SENT quotes after 48 hours
    const reminderThreshold = new Date(Date.now() - 48 * 60 * 60 * 1000);
    
    const quotesToRemind = await prisma.quoteRequest.findMany({
      where: {
        status: 'PROPOSAL_SENT',
        reminderCount: 0,
        updatedAt: {
          lt: reminderThreshold
        }
      }
    });

    let emailsSent = 0;
    for (const quote of quotesToRemind) {
      const emailResult = await sendQuoteReminderEmail(quote.workEmail, {
        quoteNumber: quote.quoteNumber,
        customerName: quote.fullName,
        companyName: quote.companyName
      });

      if (emailResult.success) {
        await prisma.quoteRequest.update({
          where: { id: quote.id },
          data: {
            reminderCount: { increment: 1 },
            lastReminderAt: new Date()
          }
        });

        await prisma.auditLog.create({
          data: {
            action: 'QUOTE_REMINDER_SENT',
            resource: 'QuoteRequest',
            resourceId: quote.id,
            metadata: { email: quote.workEmail, reminderCount: quote.reminderCount + 1 }
          }
        });

        emailsSent++;
      }
    }

    console.log(`[CRON] Cancelled ${result.count} quotes. Sent ${emailsSent} reminders.`);
    return NextResponse.json({ success: true, expiredCount: result.count, remindersSent: emailsSent });
  } catch (error) {
    console.error("[CRON Quotes] Failed:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
