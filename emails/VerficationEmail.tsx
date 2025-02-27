import {
    Html,
    Head,
    Font,
    Preview,
    Heading,
    Row,
    Section,
    Text,
    Button,
    Container,
  } from '@react-email/components';
  
  interface VerificationEmailProps {
    username: string;
    otp: string;
  }
  
  export default function VerificationEmail({ username, otp }: VerificationEmailProps) {
    return (
      <Html lang="en" dir="ltr">
        <Head>
          <title>Verification Code</title>
          <Font
            fontFamily="Roboto"
            fallbackFontFamily="Verdana"
            webFont={{
              url: 'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2',
              format: 'woff2',
            }}
            fontWeight={400}
            fontStyle="normal"
          />
        </Head>
  
        <Preview>Your verification code: {otp}</Preview>
  
        <Container style={styles.container}>
          <Section>
            <Row>
              <Heading as="h2" style={styles.heading}>
                Hello, {username} 👋
              </Heading>
            </Row>
  
            <Row>
              <Text style={styles.text}>
                Thank you for registering! Please use the verification code below to complete your sign-up.
              </Text>
            </Row>
  
            <Row>
              <Text style={styles.otp}>{otp}</Text>
            </Row>
  
            <Row>
              <Button
                href={`http://localhost:3000/verify/${username}`}
                style={styles.button}
              >
                Verify Account
              </Button>
            </Row>
  
            <Row>
              <Text style={styles.footerText}>
                If you did not request this code, please ignore this email.
              </Text>
            </Row>
          </Section>
        </Container>
      </Html>
    );
  }
  
  const styles = {
    container: {
      padding: '20px',
      backgroundColor: '#f4f4f4',
      borderRadius: '8px',
      textAlign: 'center' as const,
    },
    heading: {
      color: '#2E7D32', // Dark green
      fontSize: '24px',
      fontWeight: 'bold',
    },
    text: {
      fontSize: '16px',
      color: '#333',
      lineHeight: '1.5',
    },
    otp: {
      fontSize: '22px',
      fontWeight: 'bold',
      color: '#388E3C', // Green shade
      backgroundColor: '#E8F5E9', // Light green background
      padding: '10px 20px',
      borderRadius: '5px',
      display: 'inline-block',
    },
    button: {
      backgroundColor: '#4CAF50', // Primary green
      color: 'white',
      padding: '12px 24px',
      fontSize: '16px',
      fontWeight: 'bold',
      textDecoration: 'none',
      borderRadius: '5px',
      display: 'inline-block',
      marginTop: '10px',
    },
    footerText: {
      fontSize: '14px',
      color: '#666',
      marginTop: '20px',
    },
  };
  