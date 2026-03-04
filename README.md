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

1. Push this repo to GitHub: `https://github.com/43industries/myhost`
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub.
3. Click **Add New** → **Project** and import `43industries/myhost`.
4. Deploy. Vercel will build and host the site.

To redeploy, push to the connected branch (e.g. `main`).

## Project structure

- `src/app/page.tsx` — main landing page
- `src/app/layout.tsx` — root layout and metadata
- `src/app/globals.css` — global styles and CSS variables
