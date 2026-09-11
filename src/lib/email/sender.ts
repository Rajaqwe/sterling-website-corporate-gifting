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

export async function sendQuoteReminderEmail(email: string, details: { quoteNumber: string, customerName: string, companyName: string }) {
  try {
    const resend = getResendClient();
    const loginLink = `${assertEnv('NEXT_PUBLIC_APP_URL')}/login`;
    
    const { data, error } = await resend.emails.send({
      from: 'Sterling Corporate <quotes@sterlinggifting.com>',
      to: [email],
      subject: `Reminder: Action Required on Quote ${details.quoteNumber}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px;">
          <h2>Action Required on Quote ${details.quoteNumber}</h2>
          <p>Hi ${details.customerName},</p>
          <p>This is a gentle reminder regarding the proposal sent for quote <strong>${details.quoteNumber}</strong> for ${details.companyName}.</p>
          <p>Please review the proposal at your earliest convenience.</p>
          <a href="${loginLink}" style="display: inline-block; padding: 10px 20px; background-color: #000; color: #fff; text-decoration: none; border-radius: 5px; margin-top: 20px;">
            Review Proposal
          </a>
        </div>
      `,
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
export async function sendCompanyInvitationEmail(email: string, details: { companyName: string, role: string, token: string }) {
  try {
    const resend = getResendClient();
    const joinLink = `${assertEnv('NEXT_PUBLIC_APP_URL')}/invite/accept?token=${details.token}`;
    
    const { data, error } = await resend.emails.send({
      from: 'Sterling Corporate <invites@sterlinggifting.com>',
      to: [email],
      subject: `You have been invited to join ${details.companyName} on Sterling Corporate`,
      html: `
        <div style="font-family: sans-serif; padding: 20px;">
          <h2>Join ${details.companyName} on Sterling Corporate</h2>
          <p>You have been invited to join the company team as a <strong>${details.role}</strong>.</p>
          <p>Please click the button below to accept your invitation:</p>
          <a href="${joinLink}" style="display: inline-block; padding: 10px 20px; background-color: #000; color: #fff; text-decoration: none; border-radius: 5px; margin-top: 20px;">
            Accept Invitation
          </a>
          <p style="margin-top: 20px; font-size: 12px; color: #666;">This invitation link will expire in 7 days.</p>
        </div>
      `,
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
