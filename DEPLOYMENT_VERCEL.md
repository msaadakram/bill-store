# Deploying to Vercel

This Next.js app is ready for deployment to Vercel. Follow these steps:

1. Create a Vercel project
   - In the Vercel dashboard, import the repository `msaadakram/bill-store`.
   - Select the `main` branch (or `develop` if you prefer).

2. Configure Environment Variables
    - In Vercel > Project > Settings > Environment Variables, add the following keys:
       - NEXT_PUBLIC_ADMIN_API_URL — the public URL for your backend API

3. Build & Deploy
   - Vercel will run `npm run build` automatically.
   - Confirm the build succeeds and the deployment is live.

4. Local testing
   - Copy `.env.example` to `.env.local` and fill values for local development.
   - Run locally:

```bash
npm install
npm run dev
```

Notes:
- This project uses the Next.js App Router (the `app/` directory).
- If you need to protect server-side secrets, set them as non-public environment variables in Vercel (without the NEXT_PUBLIC_ prefix) and read them only in server code.
