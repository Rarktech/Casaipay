# CASAIPAY

Marketing site and interactive prototype for CASAIPAY — biometric identity and
payment infrastructure for Nigeria's informal economy.

**Send online. Claim offline. Powered by identity.**

## What's here

| Route | What it is |
|---|---|
| `/` | The marketing site — Next.js App Router, server-rendered |
| `/app` | The interactive prototype — customer app and merchant app |
| `/app/#/m/home` | Straight into the merchant app |
| `/demo`, `/merchant` | Redirects into the prototype |

The hero phone on the landing page embeds the real prototype: "Tap to try it
live" swaps the static mockup for an iframe of `/app`, camera permission
included.

## Stack

- Next.js 15 (App Router) + React 19 + TypeScript
- No CSS framework — one hand-written stylesheet, `app/globals.css`
- No external image host: team photos are local WebP, and the illustrated
  portrait avatars are generated as SVG data URIs at render time (`lib/portrait.ts`)
- Fonts: General Sans (Fontshare), Inter and JetBrains Mono (Google Fonts)

## Running it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm start       # serve the production build
```

## Layout

```
app/
  layout.tsx       metadata, Open Graph, fonts
  page.tsx         composes the sections
  globals.css      the whole design system
components/        one component per section of the page
  Nav.tsx          sticky nav + mobile menu   (client)
  Hero.tsx         hero + live demo swap      (client)
  Effects.tsx      scroll reveals, counters   (client)
  …                the rest are server components
lib/portrait.ts    illustrated avatar generator
public/
  app/             the prototype — plain HTML/CSS/JS, no build step
  img/team/        team photos (WebP, 520px)
```

## The prototype

`public/app` is a self-contained vanilla-JS app: 90 screens across a customer
app and a merchant app, sharing one `localStorage` store, so a payment taken on
the merchant screen really does move money in the customer app. It has no build
step — edit the files in `public/app/js` and reload.

It moves no real money. OTP accepts any 6 digits, the passcode is `1234`, and
any card or 10-digit account number works. The black **DEMO** button switches
apps and users, tops up a balance, and can force face verification to fail so
the fallback paths can be shown on demand.

Face capture uses the real camera via `getUserMedia` (hence HTTPS), and falls
back to a silhouette if permission is denied, so a demo never dead-ends.

## Deploying

Vercel builds it as a standard Next.js project — no configuration needed.
Pushes to `main` deploy to production; every other branch gets a preview URL.
