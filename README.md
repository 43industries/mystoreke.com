# Mystore (mystoreke.com)

Smart storage, parcel pickup and drop-off, and driver/rider logistics for Kenya — marketplace UI and APIs built with Next.js.

## Tech stack

- **Next.js 16** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS**
- **Supabase** (Auth, Postgres via `@supabase/supabase-js`)

## Getting started

```bash
npm install
npm run copy-logo   # optional: copies logo.png/logo.png → public/logo.png for branding
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

Copy [`.env.example`](./.env.example) to `.env.local` and add your Supabase project values (**Settings → API**).

## Database setup

Run the statements in [`supabase/schema.sql`](./supabase/schema.sql) in the Supabase SQL editor so you have:

- `public.profiles` (synced from the app on sign-up / log-in via `POST /api/profile`)
- RLS policies for client reads on `profiles`
- `vehicle_photo_url` and `logbook_photo_url` on `driver_applications` (if that table already exists)
- `public.mpesa_payments` for STK rows + `public.delivery_jobs` for draft parcel jobs

Adjust table definitions if your project already uses different column names.

## M-Pesa (Daraja STK)

1. Create an app on [Safaricom Daraja](https://developer.safaricom.co.ke/) (sandbox first).
2. Set **Callback URL** to `https://<your-domain>/api/payments/mpesa/callback` (for local dev, expose HTTPS with e.g. ngrok and paste that URL in Daraja + `MPESA_CALLBACK_URL`).
3. Copy `.env.example` keys: `MPESA_CONSUMER_KEY`, `MPESA_CONSUMER_SECRET`, `MPESA_SHORTCODE`, `MPESA_PASSKEY`, `MPESA_ENV`, `MPESA_CALLBACK_URL`.
4. Set `NEXT_PUBLIC_MPESA_ENABLED=true` so listing pages show **Pay with M-Pesa**.
5. Successful callback marks the payment **paid** and sets the booking to **confirmed** (prepaid flow).

## Admin & delivery (baseline)

- **Admin:** Set `MYSTORE_ADMIN_USER_IDS` to a comma-separated list of Supabase `auth.users` UUIDs. Those users can open `/admin` and call `GET /api/admin/overview` (with Bearer session).
- **Delivery:** Authenticated renters can `POST /api/delivery-jobs` with `pickupAddress`, `dropoffAddress`, optional `parcelDescription`, `preferredDate`, `notes` — creates a **draft** row for a future driver assignment flow.

## Scripts

- `npm run dev` — start dev server
- `npm run build` — build for production
- `npm run start` — run production build locally
- `npm run lint` — run ESLint

## Deploy on Vercel

Repository: **`43industries/mystoreke.com`** ([GitHub](https://github.com/43industries/mystoreke.com)).

1. Push the `main` branch to GitHub.
2. Sign in at [vercel.com](https://vercel.com) with GitHub.
3. **Add New** → **Project** → **Import** this repo.
4. **Root Directory** — repository root. **Framework Preset** — Next.js (auto-detected).
5. **Environment Variables** — add everything from [`.env.example`](./.env.example) for Production (and Preview if you use Supabase there).
6. Deploy.

**Node:** **20.9+** (see `engines` in `package.json`).

### If deployments don’t run or builds fail

| Symptom | What to check |
|--------|----------------|
| No deploy on `git push` | **Settings → Git** — repo connected; **Production Branch** is `main`. |
| Build fails with install errors | Use **npm** (`package-lock.json`). Redeploy without build cache if needed. |
| Runtime errors for auth/API | All variables from `.env.example` set in Vercel; run `supabase/schema.sql` where applicable. |

## Project structure

- `src/app/page.tsx` — landing page
- `src/app/layout.tsx` — root layout and metadata
- `src/app/globals.css` — global styles and CSS variables
- `src/app/api/*` — listings, bookings, drivers, profile, M-Pesa, admin overview, delivery jobs
- `public/logo.png` — raster logo (run `npm run copy-logo` from the repo layout, or commit your own file); `logo-mark.svg` remains available as an extra asset
