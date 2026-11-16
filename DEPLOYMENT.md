# Laxmi Enterprises — Cloudflare Native GitHub Deployment Runbook

This document details the production architecture, CI/CD pipeline, and operational procedures for deploying **Laxmi Enterprises** using **Cloudflare Pages Native Git Integration** on Cloudflare's Free Tier.

---

## 1. Architectural Overview

```
                                      +------------------------------------+
                                      |          Local Workspace           |
                                      |   Ubuntu 24.04 / Antigravity / IDE |
                                      +-----------------+------------------+
                                                        |
                                                        | git push origin main
                                                        v
                                      +------------------------------------+
                                      |          GitHub Repository         |
                                      |       vishwabhishek/laxmi01        |
                                      +-----------------+------------------+
                                                        |
                                                        | Native Webhook / Push Trigger
                                                        v
+--------------------------------------------------------------------------------------------------------+
|                                    Cloudflare Pages CI/CD Pipeline                                     |
|                                                                                                        |
|  1. Build Container: Node.js 20+ (Vite 6.1.0)                                                          |
|  2. Build Command:   npm run build  --> Compiles 16 Canonical HTML routes + React into dist/           |
|  3. Edge Rules:      public/_redirects --> Edge 301 Redirects (legacy routes to commercial fit-outs)   |
|                      public/_headers   --> Security (nosniff, SAMEORIGIN) & Asset Cache-Control        |
+---------------------------------------------------+----------------------------------------------------+
                                                    |
                                                    | Automatic Global Deployment
                                                    v
+--------------------------------------------------------------------------------------------------------+
|                                    Cloudflare Global Edge Network                                      |
|                                                                                                        |
|  - Platform:       Cloudflare Pages                                                                    |
|  - Edge CDN:       Static assets, WebP images, SVG marks, modern CSS, client JavaScript                |
|  - Routing:        Clean URL Multi-Page Application (MPA) + 404 recovery page                          |
|  - Form Engine:    Client-side Web3Forms AJAX integration with localStorage failsafe backup            |
|  - Production URL: https://laxmi-enterprises.pages.dev                                                 |
|  - Custom Domain:  https://laxmienterprises.in / https://laxmienterprises.co.in                        |
+--------------------------------------------------------------------------------------------------------+
```

---

## 2. Project & Repository Configuration

- **GitHub Repository:** [`vishwabhishek/laxmi01`](https://github.com/vishwabhishek/laxmi01)
- **Visibility:** Public / Private (per user preference)
- **Production Branch:** `main`
- **Cloudflare Service:** **Cloudflare Pages** (Native Git Integration)
- **Cloudflare Project Name:** `laxmi-enterprises`
- **Framework Preset:** `Vite`
- **Root Directory:** `/`
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Live Production URL:** `https://laxmi-enterprises.pages.dev/`
- **Custom Domains:** `https://laxmienterprises.co.in` & `https://www.laxmienterprises.co.in`

---

## 3. Initial Dashboard Setup (One-Time)

To connect the repository directly to Cloudflare Pages:

1. Log in to the [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. In the left navigation, click **Workers & Pages**.
3. Click **Create application** (or **Create**) → select the **Pages** tab.
4. Click **Connect to Git**.
5. In the GitHub authorization screen:
   - Select the GitHub organization/account **`vishwabhishek`**.
   - Choose **Only select repositories** and pick **`laxmi01`**.
6. Set up the build configuration:
   - **Project name:** `laxmi-enterprises`
   - **Production branch:** `main`
   - **Framework preset:** `Vite`
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Root directory:** `/`
7. Click **Save and Deploy**. Cloudflare will pull the code, install dependencies, execute `vite build`, and publish the site to your `*.pages.dev` domain.

---

## 4. Environment Variables & External Services

| Name / Service | Purpose | Location |
| :--- | :--- | :--- |
| **Web3Forms Access Key** | Form submissions routing to `contact@laxmienterprises.co.in` | Built into client forms (`f4a576d3-6666-4d9b-bf37-5e0163849181`) |
| **Web3Forms Dashboard** | Lead management and submission logs | [Web3Forms Dashboard](https://app.web3forms.com/dashboard) |
| **Local Backup** | Browser localStorage failsafe (`laxmi_inquiries`) | Client browser |

> [!NOTE]
> Because this is a static frontend with client-side API delivery, no private server-side secrets or runtime database connections are required on Cloudflare Pages.

---

## 5. Ongoing Day-to-Day Workflow

After the one-time dashboard connection, deployments are 100% automated:

```bash
# 1. Edit code locally in Antigravity or VS Code
# 2. Verify tests and build locally
npm run test
npm run build

# 3. Commit and push to GitHub
git add .
git commit -m "feat: your change summary"
git push origin main
```
*Cloudflare automatically detects the new commit, runs `npm run build`, and updates production within ~30–45 seconds.*

---

## 6. Preview Deployments for Branches / Pull Requests

- Every non-`main` branch or pull request pushed to GitHub automatically generates a unique **Preview URL** (e.g. `https://feature-branch.laxmi-enterprises.pages.dev`).
- You can review and verify design changes live before merging to `main`.

---

## 7. Custom Domain & DNS Status (Active & Verified)

Both the apex domain and the `www` subdomain are successfully attached to Cloudflare Pages:

| Domain | Type | Status | SSL / TLS | Target |
| :--- | :--- | :--- | :--- | :--- |
| **`laxmienterprises.co.in`** | Apex Domain | **Active** | Universal SSL (Cloudflare Edge) | `laxmi-enterprises.pages.dev` |
| **`www.laxmienterprises.co.in`** | Subdomain | **Active** | Universal SSL (Cloudflare Edge) | `laxmi-enterprises.pages.dev` |

> [!NOTE]
> **Email DNS Integrity Maintained:**
> Existing Zoho Mail records remain 100% untouched and functional on Cloudflare DNS:
> - **MX Records:** `10 mx.zoho.com`, `20 mx2.zoho.com`, `50 mx3.zoho.com`
> - **TXT SPF:** `v=spf1 include:zohomail.com include:_spf.nevtan.com ~all`
> - **Zoho Verification:** `zoho-verification=zb59602475.zmverify.zoho.com`
>
> Cloudflare automatically handles CNAME flattening at root (`@`), serving the Pages deployment without conflicting with MX/TXT records.

---

## 8. Free-Tier Allowances & Cost Validation

Cloudflare Pages Free Tier includes:
- **Bandwidth:** Unlimited
- **Requests:** Unlimited
- **Concurrent Builds:** 1
- **Builds per Month:** 500 builds/month (more than enough for dozens of updates daily)
- **Preview Deployments:** Unlimited
- **SSL / TLS:** Free automated Wildcard SSL certificates
- **Cost Risk:** Zero. Cloudflare does not bill for Pages overages on the Free plan; builds simply queue if monthly limits are reached.

---

## 9. Rollback & Troubleshooting

- **Instant Rollback:** If a bad commit is pushed, open Cloudflare Pages → **Deployments** → find the last working deployment → click **•••** → **Rollback to this deployment**. Rollback is instantaneous (0 seconds downtime).
- **Build Logs:** Full terminal output is viewable live during each build under the **Deployments** tab.
