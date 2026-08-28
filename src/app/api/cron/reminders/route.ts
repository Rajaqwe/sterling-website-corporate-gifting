import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/client";

export const maxDuration = 60; // 1 min timeout
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    // Check for authorization header if you want to secure it, Vercel sends a CRON_SECRET
    const authHeader = request.headers.get("authorization");
    if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

    const staleQuotes = await prisma.quoteRequest.findMany({
      where: {
        status: "NEW",
        createdAt: {
          lte: twoDaysAgo
        }
      },
    });

    if (staleQuotes.length > 0) {
      // In a real app, integrate with Resend / SendGrid here
      console.log(`Found ${staleQuotes.length} stale quotes. Sending reminders to admins.`);
      
      // We could also update a 'lastRemindedAt' field if it existed
    }

    return NextResponse.json({ success: true, count: staleQuotes.length });
  } catch (error) {
    console.error("Cron Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
