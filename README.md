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

The site goes live at `https://kkhanna-dev.github.io/kres-solutions-site/` a minute or two later. Every later push to `main` redeploys.

## Custom domain (when you have one)

1. Buy the domain (Cloudflare Registrar or Porkbun are cheap and don't upsell). `kressolutions.com` or `kres.solutions` are the obvious picks if available.
2. At the DNS provider, add:
   - `A` records for the root (`@`) pointing at `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `CNAME` record for `www` pointing at `kkhanna-dev.github.io`
3. In the repo, add a file named `CNAME` containing only the domain, e.g. `kressolutions.com`, commit and push.
4. Repo → Settings → Pages → **Custom domain**: enter the domain, save, then tick **Enforce HTTPS** once the certificate shows up (up to an hour).
5. Update the four URLs that mention `kkhanna-dev.github.io/kres-solutions-site` (in `index.html` head, `404.html`, `robots.txt`, `sitemap.xml`) to the new domain. Also drop the `/kres-solutions-site` prefix in `404.html` links.

## Contact form

Right now the form builds an email and opens the visitor's mail app (no backend needed, works on Pages). Address is set in `assets/main.js` (`TO`) and in the Contact section of `index.html`.

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

- Rishi's bio in the About section is a placeholder. Replace it with his real one-liner and add his LinkedIn.
- The contact email is Kartik's personal dev address. Swap for a company address once the domain exists (Cloudflare Email Routing forwards `hello@yourdomain` to Gmail for free).
- The Experience section describes engagements the founders delivered as employees of other companies without naming them. Keep it that way unless you have permission to name clients.

## Local preview

Open `index.html` in a browser, or run `python3 -m http.server 8000` in this folder and visit `http://localhost:8000`.
