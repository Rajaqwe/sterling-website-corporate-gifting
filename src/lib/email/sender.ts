import { Resend } from 'resend';
import { QuoteReceivedEmail } from '@/components/emails/QuoteReceivedEmail';
import * as React from 'react';

const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_key');

export async function sendQuoteReceivedEmail(email: string, details: { quoteNumber: string, customerName: string, companyName: string }) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Sterling Corporate <quotes@sterlinggifting.com>',
      to: [email],
      subject: `Quote Request Received - ${details.quoteNumber}`,
      react: React.createElement(QuoteReceivedEmail, details),
    });

    if (error) {
      console.error("Resend API Error:", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch {
    return { success: false };
  }
}
