SendGrid + Vercel setup

This project includes a serverless endpoint at `api/send-order.js` that sends confirmation emails to buyers and a copy to the merchant using SendGrid.

Quick status

- The repository includes `.env.example` with placeholders for:
  - `SENDGRID_API_KEY` (SendGrid API key with Mail Send permission)
  - `MERCHANT_EMAIL` (orders@yourdomain.com)

- For developer convenience, if `SENDGRID_API_KEY` is NOT set, the function will return a simulated `orderId` (HTTP 200) so you can test the client flow without sending real emails.

Local development

1. Copy the example file and add real values when ready (do NOT commit real keys):

```bash
cp .env.example .env.local
# Edit .env.local and paste your real SENDGRID_API_KEY and MERCHANT_EMAIL
```

2. Start local dev server for Vercel functions (recommended):

```bash
# install vercel CLI if you haven't already
npm i -g vercel
# run local dev which will serve /api routes
vercel dev
```

3. Alternatively, export env vars directly in your shell for a single session:

```bash
export SENDGRID_API_KEY="your_sendgrid_api_key"
export MERCHANT_EMAIL="orders@yourdomain.com"
vercel dev
```

Vercel / Production

- Add environment variables in the Vercel dashboard (Project → Settings → Environment Variables):
  - `SENDGRID_API_KEY` — your SendGrid API key (Mail Send scope only)
  - `MERCHANT_EMAIL` — the merchant sender address (must be verified in SendGrid)

- Deploy the project to Vercel. The function will send real emails only when `SENDGRID_API_KEY` is present.

Security notes

- Create a SendGrid API key with minimal permissions (Mail Send only).
- Verify your sending domain in SendGrid (SPF/DKIM) for better deliverability.
- Never commit real API keys. Use Vercel environment variables for production keys.

If you want, I can add (next steps):
- reCAPTCHA support to prevent automated abuse
- rate-limiting on the serverless endpoint
- server-side order persistence (simple DB) for audit logs

