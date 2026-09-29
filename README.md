# Portfolio

A single-page, **terminal-style** portfolio site. No build step, no dependencies, no framework — just HTML, CSS and vanilla JS.


## About

**Caesarico Bayu Sejati** — twelfth-grade Computer & Network Engineering student at SMK Darma Siswa 1 Waru, Sidoarjo, East Java, Indonesia.

I work on IT infrastructure, Linux system administration, and cybersecurity.

## Metadata & Attribution

This portfolio was created by **Caesarico Bayu Sejati**, a student of **SMK Darma Siswa 1 Waru, Sidoarjo**, and is self-authored — no template, generator or framework.

The attribution is machine-readable in the `<head>` of `index.html`:

| Kind | Tags |
|---|---|
| Authorship | `author`, `creator`, `designer`, `owner`, `copyright`, `publisher` |
| Social preview | Open Graph (`og:type=profile`, `og:title`, `og:description`, `og:image`, `profile:*`) |
| Twitter / X | `twitter:card`, `twitter:title`, `twitter:description`, `twitter:creator` |
| Structured data | JSON-LD `schema.org/Person` — name, `alumniOf` (SMK Darma Siswa 1 Waru), Sidoarjo address, `knowsAbout`, GitHub `sameAs` |
| SEO | `description`, `robots`, `canonical`, `theme-color` |

> The absolute URLs use the deployed domain `https://projek-bayu.my.id/`. Update `canonical`, `og:url`, `og:image` and `twitter:image` if the site moves.

## Contact

| | |
|---|---|
| **Email** | [caesaricob@gmail.com](mailto:caesaricob@gmail.com) |
| **GitHub** | [@AuthenticCaesarSalad](https://github.com/AuthenticCaesarSalad) |

## What I Do

### Systems & Tooling
Linux (Ubuntu, Kali) · Bash / CLI · System administration · Termux

### Networking
Computer networking · Network configuration

### Servers & Virtualization
Virtual machines · Proxmox · Ubuntu Server · Server administration

### DevOps
Docker containerization · Docker Compose · Kubernetes (k3s) · CI/CD pipelines · GitHub Actions · Nginx / reverse proxy

### Security Research
Cybersecurity · Threat analysis · OSINT

## Experience

### Intern — PT E-T-A Indonesia
*Current · 12th grade*

Senior-year internship supporting IT operations, applying networking and system administration skills in a real-world industrial environment.

### Web Developer & Intern — CSRG PENS
*11th grade*

Internship with the Cyber Security Research Group at Politeknik Elektronika Negeri Surabaya (PENS), contributing to their web profile. See [c307.pens.ac.id](https://c307.pens.ac.id).

### Homelab, DevOps & Security Research
*Personal*

Most of my free time goes to Linux: managing virtual machines, containerising services with Docker and Docker Compose, wiring up CI/CD pipelines with GitHub Actions, and building virtual labs to practice server deployment, administration and infrastructure automation.

## Repository Structure

| File | Purpose |
|---|---|
| `index.html` | Page markup, content and SEO metadata |
| `style.css` | Terminal theme, responsive layout, reduced-motion handling |
| `index.js` | Scramble headline, typewriter terminal, live clock, scroll reveals, interactive shell |
| `favico.png` | Site favicon (512×512), also used as the apple-touch-icon |
| `robots.txt` | Allows all crawlers, points at the sitemap |
| `sitemap.xml` | Single-URL sitemap for `projek-bayu.my.id` |
| `vercel.json` | Static deploy config — security headers and cache rules |
| `.backup/` | The original paper/editorial design, kept for reference (git-ignored, never deployed) |

## Interactive Shell

The contact section has a real command prompt. Supported commands:

`help` · `whoami` · `skills` · `projects` · `exp` · `contact` · `github` · `ls` · `date` · `clear` · `sudo`

Docker &amp; Kubernetes: `docker ps` · `docker images` · `docker version` · `docker compose` · `kubectl get pods` · `kubectl get nodes` (alias `k`)

Aliases: `h`, `me`, `stack`, `work`, `mail`. Use `↑` / `↓` to walk through command history.

## Running Locally

Open `index.html` in any browser, or serve it:

```powershell
python -m http.server 8000
# then visit http://localhost:8000
```

## Deploying — Vercel + Cloudflare

The site is plain static files, so Vercel needs no build step. `vercel.json` sets `framework: null`.

1. **Push to GitHub**, then in Vercel → *Add New Project* → import the repo. Leave Build Command and Output Directory empty.
2. **Add the domain** in Vercel → Settings → Domains → `projek-bayu.my.id`. Vercel will ask for a `CNAME` record pointing at `cname.vercel-dns.com`.
3. **In Cloudflare DNS**, create that record with **Proxy status = DNS only (grey cloud)**. Proxied + Vercel both terminate TLS and cause redirect loops.
4. **In Cloudflare → SSL/TLS**, set encryption mode to **Full (strict)**, and enable **Always Use HTTPS** under Edge Certificates.
5. Back in Vercel, confirm the domain passes its check, and make sure `www.` redirects to the apex so authority isn't split.

### After it goes live

- Verify the property in [Google Search Console](https://search.google.com/search-console) using a **Domain** property, then add Cloudflare's verification TXT record.
- Open *URL Inspection* → **Request Indexing**. This is what cuts discovery from weeks to days.
- Add `https://projek-bayu.my.id/sitemap.xml` under *Sitemaps*.
- Import the same property into [Bing Webmaster Tools](https://www.bing.com/webmasters) — it syndicates to DuckDuckGo and ChatGPT search.
- Test social previews with the Open Graph debugger and X's Card Validator.

Absolute URLs used in `canonical`, `og:*`, `twitter:*`, JSON-LD, `robots.txt` and `sitemap.xml` all assume `https://projek-bayu.my.id/`. Update them together if the domain changes.
