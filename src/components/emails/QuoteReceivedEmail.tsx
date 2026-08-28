import { Html, Body, Head, Heading, Container, Preview, Text, Section } from '@react-email/components';

export function QuoteReceivedEmail({ 
  quoteNumber, 
  customerName, 
  companyName 
}: { 
  quoteNumber: string;
  customerName: string;
  companyName: string;
}) {
  return (
    <Html>
      <Head />
      <Preview>We received your quote request ({quoteNumber})</Preview>
      <Body style={{ fontFamily: 'system-ui, sans-serif', backgroundColor: '#f9fafb', padding: '40px 0' }}>
        <Container style={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '40px', maxWidth: '600px' }}>
          <Heading style={{ color: '#0f172a', fontSize: '24px', fontWeight: 'bold', margin: '0 0 20px' }}>
            Quote Request Received
          </Heading>
          <Text style={{ color: '#475569', fontSize: '16px', lineHeight: '24px' }}>
            Hi {customerName},
          </Text>
          <Text style={{ color: '#475569', fontSize: '16px', lineHeight: '24px' }}>
            Thank you for requesting a corporate gifting quote from Sterling. Our team is currently reviewing your requirements for {companyName}.
          </Text>
          <Section style={{ backgroundColor: '#f1f5f9', padding: '16px', borderRadius: '4px', margin: '24px 0' }}>
            <Text style={{ margin: 0, color: '#334155', fontWeight: '600' }}>
              Reference Number: {quoteNumber}
            </Text>
          </Section>
          <Text style={{ color: '#475569', fontSize: '16px', lineHeight: '24px' }}>
            A dedicated account executive will be in touch within 24 hours with a personalized proposal.
          </Text>
          <Text style={{ color: '#94a3b8', fontSize: '14px', marginTop: '40px' }}>
            &copy; {new Date().getFullYear()} Sterling Corporate Gifting. All rights reserved.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
