# Vineeth Vijayan — Portfolio

Next.js (App Router) portfolio with a dot-matrix / tractor-feed visual system, Framer Motion page transitions, MDX case studies, and a server-gated vault for confidential work.

## Stack

- Next.js 16 (App Router, TypeScript)
- Tailwind CSS 4
- Framer Motion
- shadcn/ui (Dialog, Button, Input, Label)
- `next-mdx-remote` for MDX case studies
- `jose` for signed vault session cookies

> Contentlayer was skipped — upstream packages do not track current Next.js; `next-mdx-remote` is used instead.

## Getting started

```bash
cp .env.example .env.local
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Vault env vars

| Variable | Purpose |
| --- | --- |
| `VAULT_PASSCODE` | Shared passcode checked only on the server |
| `VAULT_JWT_SECRET` | Secret used to sign the httpOnly vault cookie |
| `NEXT_PUBLIC_SITE_URL` | Absolute origin for `sitemap.xml` / `robots.txt` |

Default local passcode (from `.env.local`): `folio-vault`

## Routes

| Path | Notes |
| --- | --- |
| `/` | Homepage — Identity / Ascent / Signal / Connect |
| `/work/[slug]` | Public case studies (SSG, in sitemap) |
| `/vault` | Passcode entry (dot-matrix styled) |
| `/vault/[slug]` | Gated case studies (`noindex`, excluded from sitemap) |
| `/api/vault-auth` | Sets signed httpOnly cookie on valid passcode |

Middleware (`middleware.ts`) protects `/vault/*` except the landing page.

## Content

MDX lives in:

- `content/work/` — public
- `content/vault/` — gated (`isGated: true`)

Frontmatter: `title`, `slug`, `summary`, `isGated`, `coverImage`, `publishDate`, `tags`, optional `template` (`standard` | `chart-countdown`).

## Animation system

`TransitionProvider` (in root layout) owns:

1. Percentage preloader with top/bottom curtains
2. Simultaneous navband + hero reveal on completion
3. Curtain-door transitions via `navigate(href)`
4. Navband pin as compact sticky header afterward

## Deploy (Vercel)

1. Push repo and import into Vercel
2. Set `VAULT_PASSCODE` and `VAULT_JWT_SECRET` in project env
3. Set `NEXT_PUBLIC_SITE_URL` to the production URL
