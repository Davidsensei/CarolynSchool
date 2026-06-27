# Deploy Guide — Putting This Site Online

This is a plain static site (HTML/CSS/JS), so hosting is simple and free.

## Current state

Already live via **GitHub Pages**:

- Served from the **`gh-pages`** branch (root folder).
- URL: https://rainmog.github.io/CarolynScool/

To publish changes:

```bash
git push origin HEAD:gh-pages
```

GitHub rebuilds in ~1 minute.

## Using your own domain (e.g. `enjoyenglish-maebashi.com`)

You can point a custom domain at GitHub Pages for free. Two layers are involved:
**who you bought the domain from (Wix)** and **where it points (DNS)**.

### Step 1 — Tell GitHub the domain

1. Repo → **Settings → Pages → Custom domain**.
2. Enter the domain (e.g. `enjoyenglish-maebashi.com`), Save.
   - This adds a `CNAME` file to the repo — keep it.
3. After DNS (Step 2) propagates, tick **Enforce HTTPS**.

### Step 2 — Point DNS at GitHub

Set these records in your domain's DNS panel:

| Type  | Host / Name | Value |
|-------|-------------|-------|
| A     | `@` (root)  | `185.199.108.153` |
| A     | `@` (root)  | `185.199.109.153` |
| A     | `@` (root)  | `185.199.110.153` |
| A     | `@` (root)  | `185.199.111.153` |
| CNAME | `www`       | `rainmog.github.io` |

DNS can take from minutes up to 24h to propagate.

## Can you keep the Wix domain? — Yes

The domain itself was **purchased through Wix**; that does not lock you to Wix
hosting. Three options, easiest first:

1. **Keep domain at Wix, change its DNS (recommended).**
   In the Wix dashboard: *Domains → your domain → Advanced / DNS records (Manage DNS)*.
   Add the A + CNAME records from Step 2 above.
   - Caveat: if the domain is currently *connected to a Wix site*, Wix may block
     editing DNS records. Disconnect the domain from the Wix site first
     (Domains → disconnect / "point to external"), or contact Wix support to
     unlock DNS. Renewal still billed by Wix.

2. **Transfer the domain to another registrar** (Cloudflare, Namecheap, etc.),
   then manage DNS there. Often cheaper renewals + simpler DNS. Requires
   unlocking the domain at Wix and getting an auth/EPP code; transfers take a
   few days.

3. **Stay fully on Wix.** Only if you'd rather not move hosting — but then this
   repo isn't used.

### Important

The Wix site is currently **live on that domain**. Switching DNS to GitHub Pages
**replaces** the Wix site with this one. Keep the Wix site up until this site is
confirmed working on the domain, then switch DNS.

## Other free hosts (alternatives to GitHub Pages)

Same static files work as-is on:

- **Netlify** — drag-and-drop the folder, or connect the repo. Free custom domain + HTTPS.
- **Cloudflare Pages** — connect the repo. Free, fast, easy DNS if domain is on Cloudflare.

GitHub Pages (already set up) is fine; these are options if you prefer their dashboards.
