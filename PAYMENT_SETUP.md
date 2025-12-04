# Payment Integration Setup

This project uses Stripe for payment processing and email notifications for order confirmations.

## Required Environment Variables

### Backend (.NET)
Add these to your `appsettings.json` or use environment variables:

```json
{
  "Stripe": {
    "SecretKey": "your_stripe_secret_key",
    "PublishableKey": "your_stripe_publishable_key"
  },
  "SmtpSettings": {
    "Host": "your_smtp_host",
    "Port": "587",
    "Username": "your_smtp_username",
    "Password": "your_smtp_password",
    "FromEmail": "orders@007coffee.shop"
  }
}
```

### Frontend (Next.js)
Update `frontend/pages/checkout.js` line 13:

```javascript
const stripePromise = loadStripe("your_stripe_publishable_key");
```

## Getting API Keys

### Stripe
1. Sign up at [stripe.com](https://stripe.com)
2. Get your test keys from the [Dashboard](https://dashboard.stripe.com/test/apikeys)
3. Use test cards like `4242 4242 4242 4242` for testing

### SMTP (Email)
For development, use [Mailtrap](https://mailtrap.io):
1. Sign up for free
2. Get SMTP credentials from your inbox settings
3. All emails will be caught in Mailtrap (won't send to real addresses)

For production, use services like:
- SendGrid
- AWS SES
- Mailgun
- Postmark
