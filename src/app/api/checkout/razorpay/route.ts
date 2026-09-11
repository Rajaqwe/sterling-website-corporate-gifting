import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import { prisma } from "@/lib/prisma/client";
import { getAuthUser } from "@/lib/auth/server";

function getRazorpay() {
  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    throw new Error("Razorpay keys are missing in environment variables");
  }
  return new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
}

export async function POST(req: NextRequest) {
  try {
    const auth = await getAuthUser();
    if (!auth?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { orderId } = await req.json();

    if (!orderId) {
      return NextResponse.json({ error: "Order ID is required" }, { status: 400 });
    }

    // Fetch the DB order to get the correct amount
    const dbOrder = await prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!dbOrder) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    if (dbOrder.userId !== auth.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (dbOrder.status !== "PENDING") {
      return NextResponse.json({ error: "Order is no longer pending payment" }, { status: 400 });
    }

    // Razorpay amount is in smallest currency unit (paise for INR)
    const amountInPaise = Math.round(Number(dbOrder.total) * 100);

    const options = {
      amount: amountInPaise,
      currency: "INR",
      receipt: dbOrder.orderNumber,
      notes: {
        orderId: dbOrder.id,
      },
    };

    const razorpayInstance = getRazorpay();
    const razorpayOrder = await razorpayInstance.orders.create(options);

    return NextResponse.json({
      id: razorpayOrder.id,
      currency: razorpayOrder.currency,
      amount: razorpayOrder.amount,
      key_id: process.env.RAZORPAY_KEY_ID, // Send public key to client
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error("Razorpay error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to create Razorpay order" },
      { status: 500 }
    );
  }
}
