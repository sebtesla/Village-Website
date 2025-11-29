import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
  Row,
  Column,
} from '@react-email/components'

interface OrderConfirmationEmailProps {
  orderNumber: string
  customerName: string
  items: Array<{
    name: string
    price: number
    quantity: number
    size?: string
    color?: string
    image: string
  }>
  subtotal: number
  shipping: number
  total: number
}

export default function OrderConfirmationEmail({
  orderNumber,
  customerName,
  items,
  subtotal,
  shipping,
  total,
}: OrderConfirmationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Your Village Merch Order Confirmation - #{orderNumber}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Heading style={h1}>THE VILLAGE</Heading>
            <Text style={subtitle}>MERCH</Text>
          </Section>

          {/* Order Confirmation */}
          <Section style={section}>
            <Heading style={h2}>Order Confirmed!</Heading>
            <Text style={text}>
              Hey {customerName || 'there'},
            </Text>
            <Text style={text}>
              Thank you for your order! We're getting your items ready for shipment.
            </Text>
            <Text style={orderNumber}>
              Order #{orderNumber}
            </Text>
          </Section>

          <Hr style={hr} />

          {/* Order Items */}
          <Section style={section}>
            <Heading style={h3}>Order Summary</Heading>
            {items.map((item, index) => (
              <div key={index} style={itemContainer}>
                <Row>
                  <Column style={itemImageCol}>
                    <Img
                      src={item.image}
                      alt={item.name}
                      width="80"
                      height="80"
                      style={itemImage}
                    />
                  </Column>
                  <Column style={itemDetailsCol}>
                    <Text style={itemName}>{item.name}</Text>
                    {item.size && (
                      <Text style={itemMeta}>Size: {item.size}</Text>
                    )}
                    {item.color && (
                      <Text style={itemMeta}>Color: {item.color}</Text>
                    )}
                    <Text style={itemMeta}>Quantity: {item.quantity}</Text>
                  </Column>
                  <Column style={itemPriceCol}>
                    <Text style={itemPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
                  </Column>
                </Row>
              </div>
            ))}
          </Section>

          <Hr style={hr} />

          {/* Order Total */}
          <Section style={section}>
            <Row>
              <Column style={totalLabelCol}>
                <Text style={totalLabel}>Subtotal:</Text>
              </Column>
              <Column style={totalValueCol}>
                <Text style={totalValue}>${subtotal.toFixed(2)}</Text>
              </Column>
            </Row>
            <Row>
              <Column style={totalLabelCol}>
                <Text style={totalLabel}>Shipping:</Text>
              </Column>
              <Column style={totalValueCol}>
                <Text style={totalValue}>
                  {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                </Text>
              </Column>
            </Row>
            <Row>
              <Column style={totalLabelCol}>
                <Text style={totalLabelBold}>Total:</Text>
              </Column>
              <Column style={totalValueCol}>
                <Text style={totalValueBold}>${total.toFixed(2)}</Text>
              </Column>
            </Row>
          </Section>

          <Hr style={hr} />

          {/* What's Next */}
          <Section style={section}>
            <Heading style={h3}>What's Next?</Heading>
            <Text style={text}>
              Your order will be processed and shipped within 1-2 business days.
            </Text>
            <Text style={text}>
              You'll receive a shipping confirmation email with tracking information once your order ships.
            </Text>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              Questions? Join our Discord community or check your order status.
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

const hr = {
  borderColor: '#e6ebf1',
  margin: '20px 0',
}

const itemContainer = {
  marginBottom: '16px',
  paddingBottom: '16px',
  borderBottom: '1px solid #e6ebf1',
}

const itemImageCol = {
  width: '100px',
}

const itemImage = {
  borderRadius: '8px',
}

const itemDetailsCol = {
  paddingLeft: '16px',
}

const itemName = {
  color: '#0d4a4a',
  fontSize: '16px',
  fontWeight: 'bold',
  margin: '0 0 4px',
}

const itemMeta = {
  color: '#8898aa',
  fontSize: '14px',
  margin: '0 0 2px',
}

const itemPriceCol = {
  textAlign: 'right' as const,
  verticalAlign: 'top' as const,
}

const itemPrice = {
  color: '#d4a055',
  fontSize: '16px',
  fontWeight: 'bold',
  margin: '0',
}

const totalLabelCol = {
  width: '70%',
  textAlign: 'right' as const,
  paddingRight: '16px',
}

const totalValueCol = {
  width: '30%',
  textAlign: 'right' as const,
}

const totalLabel = {
  color: '#525f7f',
  fontSize: '16px',
  margin: '4px 0',
}

const totalValue = {
  color: '#525f7f',
  fontSize: '16px',
  margin: '4px 0',
}

const totalLabelBold = {
  ...totalLabel,
  fontWeight: 'bold',
  fontSize: '18px',
  color: '#0d4a4a',
}

const totalValueBold = {
  ...totalValue,
  fontWeight: 'bold',
  fontSize: '18px',
  color: '#d4a055',
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
