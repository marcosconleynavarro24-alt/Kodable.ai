# Kodable.ai — backend

Everything here is self-contained and dependency-free. With no configuration the
site already works: the contact form validates, blocks spam, stores leads, and
previews the emails it would send. Add a couple of env vars to turn on real email.

## 1. Turn on email (≈3 minutes)

Leads can reach your inbox, and customers get a friendly auto-reply, via
[Resend](https://resend.com) (free tier: 100 emails/day).

1. Create a Resend account and an **API key**.
2. **Verify a domain** (`kodable.ai`) in Resend so mail can be sent *from*
   `hola@kodable.ai`. For a quick test you can instead send from
   `onboarding@resend.dev`, which only delivers to the email you signed up with.
3. Copy `.env.example` → `.env.local` and fill in:

   ```
   RESEND_API_KEY=re_xxxxxxxx
   LEAD_NOTIFY_EMAIL=you@yourdomain.com     # where leads land
   LEAD_FROM_EMAIL=Kodable.ai <hola@kodable.ai>
   ```

That's it. Each lead now emails **you** (with a one-click reply-to the customer)
and sends the **customer** a bilingual "thanks, we'll reply in 24h" auto-reply.

### Before a key is set
The form still works. Every email that *would* be sent is written to
`data/outbox/*.txt` and logged, so you can preview the exact owner + customer
emails locally without sending anything.

## 2. See your leads

- Leads are appended to `data/leads.ndjson`.
- Set `ADMIN_TOKEN` (`openssl rand -hex 24`) in `.env.local`, then:
  - `GET /api/leads?token=YOUR_TOKEN` → JSON (leads + conversion summary)
  - `GET /api/leads?token=YOUR_TOKEN&format=csv` → spreadsheet download

The token check is constant-time. Without `ADMIN_TOKEN` the endpoint is disabled.

## 3. Conversion analytics (cookieless)

WhatsApp / call / email taps and form submits are counted in `data/events.ndjson`
— no cookies, no IPs, no third parties. The counts show up in the `/api/leads`
JSON under `conversions`, so you can see what actually turns visitors into leads.

## API endpoints

| Method & path | Purpose |
|---|---|
| `POST /api/lead` | Contact form: validate → anti-spam → store → email |
| `POST /api/event` | Record a conversion tap (fire-and-forget, via `sendBeacon`) |
| `GET /api/health` | Uptime/health JSON (point an uptime monitor here) |
| `GET /api/leads` | Owner-only lead export (JSON / CSV), `ADMIN_TOKEN` required |

## Anti-spam (three layers, no CAPTCHA)

1. **Honeypot** — a hidden field bots fill and humans never see.
2. **Time-trap** — submits faster than 2.5s after the form renders are rejected.
3. **Rate limit** — 5 submissions per IP per 10 minutes.

Caught spam gets a fake "success" so bots don't learn they were blocked.

## Security headers

Set in `next.config.ts` for every route: a strict-ish Content-Security-Policy
(no third-party origins), `nosniff`, `Referrer-Policy`, `X-Frame-Options: DENY`,
a locked-down `Permissions-Policy`, and HSTS.

## Note on serverless hosting (Vercel)

On serverless the `data/` files are per-instance and ephemeral, so treat
**email as the durable record** of a lead. The file store + `/api/leads` export
are ideal for local dev or a long-running Node host. For durable storage in
production, wire `saveLead`/`recordEvent` to a database (the seams are isolated
in `src/lib/leads.ts` and `src/lib/events.ts`).
