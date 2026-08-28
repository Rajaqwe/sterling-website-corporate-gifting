import { Resend } from 'resend';
import { QuoteReceivedEmail } from '@/components/emails/QuoteReceivedEmail';
import * as React from 'react';
import { assertEnv } from '@/lib/env';

// Fetch key lazily so Next.js build doesn't crash on missing environment variables
function getResendClient() {
  return new Resend(assertEnv('RESEND_API_KEY'));
}

export async function sendQuoteReceivedEmail(email: string, details: { quoteNumber: string, customerName: string, companyName: string }) {
  try {
    const resend = getResendClient();
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
