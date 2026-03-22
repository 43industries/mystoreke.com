# MyHost

Find your perfect stay — discover unique places to stay in the countryside. Connecting countryside homeowners with travelers.

## Tech stack

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS**

## Getting started

```bash
# Install dependencies (if needed)
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

- `npm run dev` — start dev server
- `npm run build` — build for production
- `npm run start` — run production build locally
- `npm run lint` — run ESLint

## Deploy on Vercel

Use the correct repository name: **`43industries/mystoreke.com`** ([repo on GitHub](https://github.com/43industries/mystoreke.com)).

1. Push the `main` branch to GitHub (this repo).
2. Sign in at [vercel.com](https://vercel.com) with GitHub.
3. **Add New** → **Project** → **Import** `43industries/mystoreke.com` (not `myhost`).
4. **Root Directory** — leave empty (repository root). **Framework Preset** — Next.js (auto-detected).
5. **Environment Variables** — add the keys from [`.env.example`](./.env.example) for Production (and Preview if you use Supabase there). Values come from your [Supabase](https://supabase.com) project: **Settings → API**.
6. Deploy.

**Node:** this app targets **Node 20.9+** (see `engines` in `package.json`). Vercel will pick that up; you can also set **Settings → General → Node.js Version** to **20.x** if needed.

### If deployments don’t run or builds fail

| Symptom | What to check |
|--------|----------------|
| No deploy on `git push` | **Settings → Git** — confirm the repo is connected and the **Production Branch** is `main`. Reconnect GitHub if the Vercel GitHub App lost access (GitHub → **Settings → Applications** → Vercel). |
| **Import** shows wrong repo | Import **`mystoreke.com`**, not `myhost`. |
| Build fails with install errors | Use **npm** (this repo has `package-lock.json`). Clear build cache: **Deployments → … → Redeploy** → uncheck “Use existing Build Cache”. |
| Runtime errors for auth/API | Add all variables from `.env.example` in Vercel for the right environment (Production vs Preview). |

To redeploy after a successful setup, push to `main` or trigger **Redeploy** in the Vercel dashboard.

## Project structure

- `src/app/page.tsx` — main landing page
- `src/app/layout.tsx` — root layout and metadata
- `src/app/globals.css` — global styles and CSS variables
