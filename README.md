# KRES Solutions — company website

Static site for KRES Solutions LLC. Plain HTML, CSS, and a little JavaScript. No build step, no framework, nothing to install.

```
index.html                 the site
404.html                   not-found page (GitHub Pages serves it automatically)
assets/styles.css          all styles (light + dark theme via CSS tokens)
assets/main.js             mobile nav, reveal-on-scroll, copy button, contact form
assets/favicon.svg         logo mark
assets/og.png              link preview image (1200x630)
og.html                    source page for og.png (not linked from the site)
robots.txt, sitemap.xml    search engine hints
.github/workflows/deploy.yml   deploys to GitHub Pages on every push to main
```

## Deploy to GitHub Pages (first time)

Everything is already committed on `main`. You just need a repo to push it to.

**With the GitHub CLI** (from inside this folder):

```bash
gh auth login                                   # skip if already logged in
gh repo create kres-solutions-site --public --source=. --remote=origin --push
```

**Without the CLI:** create an empty public repo called `kres-solutions-site` at github.com/new (no README, no .gitignore), then:

```bash
git remote add origin https://github.com/kkhanna-dev/kres-solutions-site.git
git push -u origin main
```

Then turn on Pages once:

1. Repo → **Settings** → **Pages**
2. Under **Build and deployment**, set **Source** to **GitHub Actions**
3. Go to the **Actions** tab. The "Deploy to GitHub Pages" run should already be there (it started on the push). If it was skipped, open it and click **Re-run all jobs**.

The site is served at `https://kressolutions.com` (custom domain set in Settings → Pages). Every later push to `main` redeploys.

## Custom domain

The site runs on `kressolutions.com`, registered through Cloudflare Registrar.

DNS records in Cloudflare (all set to **DNS only**, grey cloud):

| Type  | Name | Content |
|-------|------|---------|
| A     | @    | 185.199.108.153 |
| A     | @    | 185.199.109.153 |
| A     | @    | 185.199.110.153 |
| A     | @    | 185.199.111.153 |
| CNAME | www  | kkhanna-dev.github.io |

In the repo, Settings → Pages → Custom domain is `kressolutions.com` with **Enforce HTTPS** on. The `CNAME` file in this repo is kept for reference; with an Actions deploy, GitHub reads the domain from Settings.

Company email `info@kressolutions.com` forwards to Gmail through Cloudflare Email Routing.

## Contact form

Right now the form builds an email and opens the visitor's mail app (no backend needed, works on Pages). Address (`info@kressolutions.com`) is set in `assets/main.js` (`TO`) and in the Contact section of `index.html`.

To make it a real hosted form, sign up at [formspree.io](https://formspree.io) (free tier is fine), create a form, then in `index.html` change

```html
<form class="form" id="contact-form" novalidate>
```
to
```html
<form class="form" id="contact-form" action="https://formspree.io/f/YOUR_ID" method="POST">
```

and delete the `submit` handler block at the bottom of `assets/main.js`. Formspree sends you an email per submission.

## Editing content

Everything is in `index.html`, top to bottom in the same order as the page. Search for the section comments (`<!-- Services -->`, `<!-- About -->`, etc.). Colors and fonts are the tokens at the top of `assets/styles.css`.

Things to check before sharing widely:

- The Experience section describes engagements the founders delivered as employees of other companies without naming them. Keep it that way unless you have permission to name clients.

## Local preview

Open `index.html` in a browser, or run `python3 -m http.server 8000` in this folder and visit `http://localhost:8000`.
