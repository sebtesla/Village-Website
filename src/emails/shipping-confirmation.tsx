import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components'

interface ShippingConfirmationEmailProps {
  orderNumber: string
  customerName: string
  trackingNumber: string
  trackingUrl?: string
  estimatedDelivery?: string
}

export default function ShippingConfirmationEmail({
  orderNumber,
  customerName,
  trackingNumber,
  trackingUrl,
  estimatedDelivery,
}: ShippingConfirmationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Your Village Merch Order Has Shipped - #{orderNumber}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Heading style={h1}>THE VILLAGE</Heading>
            <Text style={subtitle}>MERCH</Text>
          </Section>

          {/* Shipping Notification */}
          <Section style={section}>
            <Heading style={h2}>Your Order Has Shipped! 📦</Heading>
            <Text style={text}>
              Hey {customerName || 'there'},
            </Text>
            <Text style={text}>
              Great news! Your order is on its way to you.
            </Text>
            <Text style={orderNumber}>
              Order #{orderNumber}
            </Text>
          </Section>

          <Hr style={hr} />

          {/* Tracking Info */}
          <Section style={section}>
            <Heading style={h3}>Tracking Information</Heading>
            <Text style={text}>
              You can track your package using the tracking number below:
            </Text>
            <Text style={trackingNumber}>
              {trackingNumber}
            </Text>

            {trackingUrl && (
              <Button
                href={trackingUrl}
                style={button}
              >
                Track Your Package
              </Button>
            )}

            {estimatedDelivery && (
              <Text style={deliveryText}>
                Estimated Delivery: <strong>{estimatedDelivery}</strong>
              </Text>
            )}
          </Section>

          <Hr style={hr} />

          {/* Delivery Info */}
          <Section style={section}>
            <Heading style={h3}>What to Expect</Heading>
            <Text style={text}>
              • Your package will arrive in 3-5 business days
            </Text>
            <Text style={text}>
              • You'll receive delivery updates via email
            </Text>
            <Text style={text}>
              • Someone may need to be present to sign for delivery
            </Text>
          </Section>

          <Hr style={hr} />

          {/* Support */}
          <Section style={section}>
            <Heading style={h3}>Need Help?</Heading>
            <Text style={text}>
              If you have any questions about your shipment or order, feel free to reach out to our support team or join our Discord community.
            </Text>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              Thank you for shopping with The Village!
            </Text>
            <Text style={footerText}>
              © {new Date().getFullYear()} The Village, LLC. All rights reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

// Styles
const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
}

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
  maxWidth: '600px',
}

const header = {
  padding: '32px 24px',
  textAlign: 'center' as const,
  backgroundColor: '#0d4a4a',
}

const h1 = {
  color: '#ffffff',
  fontSize: '32px',
  fontWeight: 'bold',
  margin: '0',
  padding: '0',
  letterSpacing: '2px',
}

const subtitle = {
  color: '#d4a055',
  fontSize: '12px',
  fontWeight: 'bold',
  margin: '4px 0 0',
  padding: '0',
  letterSpacing: '4px',
}

const section = {
  padding: '24px',
}

const h2 = {
  color: '#0d4a4a',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '0 0 16px',
}

const h3 = {
  color: '#0d4a4a',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '0 0 12px',
}

const text = {
  color: '#525f7f',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '0 0 16px',
}

const orderNumber = {
  color: '#d4a055',
  fontSize: '20px',
  fontWeight: 'bold',
  margin: '16px 0',
  padding: '12px',
  backgroundColor: '#f8f8f8',
  borderRadius: '4px',
  textAlign: 'center' as const,
}

const trackingNumber = {
  color: '#0d4a4a',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '16px 0',
  padding: '16px',
  backgroundColor: '#f0f9f4',
  borderRadius: '8px',
  textAlign: 'center' as const,
  letterSpacing: '2px',
  fontFamily: 'monospace',
}

const button = {
  backgroundColor: '#d4a055',
  borderRadius: '8px',
  color: '#0d4a4a',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  width: '100%',
  padding: '12px 24px',
  margin: '16px 0',
}

const deliveryText = {
  color: '#0d4a4a',
  fontSize: '16px',
  margin: '16px 0',
  textAlign: 'center' as const,
}

const hr = {
  borderColor: '#e6ebf1',
  margin: '20px 0',
}

const footer = {
  padding: '24px',
  textAlign: 'center' as const,
  backgroundColor: '#f8f8f8',
}

const footerText = {
  color: '#8898aa',
  fontSize: '14px',
  lineHeight: '20px',
  margin: '8px 0',
}
