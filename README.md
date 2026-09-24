# KRES Solutions website

Source for https://kressolutions.com. Plain HTML and CSS with a few lines of JavaScript. No framework and no build step.

```
site/                      everything that gets published
  index.html               home page            -> kressolutions.com/
  services/index.html      services page        -> kressolutions.com/services/
  about/index.html         about page           -> kressolutions.com/about/
  careers/index.html       careers page         -> kressolutions.com/careers/
  contact/index.html       contact page         -> kressolutions.com/contact/
  404.html                 not-found page
  assets/site.css          all styles
  assets/site.js           mobile menu and skip link
  assets/fonts/            self-hosted fonts (SIL Open Font License)
  .well-known/security.txt vulnerability reporting contact (RFC 9116)
  robots.txt, sitemap.xml
tools/                     source pages for og.png, apple-touch-icon.png, and the LinkedIn banner (not published)
.github/workflows/deploy.yml   publishes site/ to GitHub Pages on every push to main
```

## Editing

Each page is a complete HTML file. The header and footer are repeated in every page, so if you change the navigation or footer, change it in all six HTML files.

After editing CSS or JS, bump the `?v=` number on the `site.css` and `site.js` links in every page so browsers fetch the new file.

Preview locally: `cd site && python3 -m http.server 8000`, then open http://localhost:8000.

## Security

- Content Security Policy on every page: scripts, styles, and fonts load only from this domain; no inline scripts, no framing of other sites, no form submissions.
- No third-party requests: fonts are self-hosted, and there is no analytics, cookies, or tracking.
- External links use `rel="noopener noreferrer"`; referrer policy is `strict-origin-when-cross-origin`.
- HTTPS is enforced in Settings > Pages.
- `security.txt` expires 2027-09-24. Update the `Expires` line before then.

GitHub Pages does not allow custom response headers, so HSTS, `X-Frame-Options`, and `Permissions-Policy` cannot be set here. Putting Cloudflare in front of the site would allow them.

## Hosting

- DNS is managed at Wix (registrar for kressolutions.com). Root A records point to GitHub Pages (185.199.108-111.153); `www` is a CNAME to `kkhanna-dev.github.io`.
- MX records point to Google for info@kressolutions.com. Do not change them.
- Custom domain and Enforce HTTPS are set in the repo under Settings > Pages.
