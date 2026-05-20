# PITC Proxy Server

This Express server proxies PITC bill fetches so the main Next.js app can retrieve bills even when PITC is blocked from the app runtime.

## Local Run

```bash
npm install
npm run proxy
```

The proxy listens on port 4001 by default.

## Endpoints

- GET /proxy/lesco?refno=123&type=U
- POST /proxy/lesco { "refno": "123", "type": "U" }

## Environment

- PORT (optional) — default 4001

## Deployment

Deploy server/proxy.js to any Node host (Render, Railway, Fly, VPS). After deployment, set:

PITC_PROXY_URL=https://your-proxy-domain/proxy/lesco

in the main app's environment (Vercel).