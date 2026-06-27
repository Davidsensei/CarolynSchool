# Enjoy English Maebashi — Website

Modern redesign of the [Enjoy English Maebashi](https://www.enjoyenglish-maebashi.com/)
children's English school site (前橋こども英会話スクール). Static HTML/CSS/JS,
no build step.

**Live:** https://rainmog.github.io/CarolynScool/

## Files

| File | Purpose |
|------|---------|
| `index.html` | Main page (links external `style.css` + `script.js`). |
| `style.css` | All styles. Theme colors + fonts live in `:root` at the top. |
| `script.js` | Nav toggle, scroll behavior, contact-form handling. |
| `preview.html` | Self-contained single-file copy (CSS + JS inlined) for quick local preview. |
| `images/` | Photos used on the page. |

If you edit `index.html`/`style.css`, keep `preview.html` in sync (it inlines the same markup/styles).

## Editing

- **Colors / fonts:** edit the CSS variables in `:root` at the top of `style.css`.
- **Photos:** drop files in `images/`, reference with `<img class="photo" src="images/NAME.jpg" alt="...">`.
- **Course info / fees:** edit the relevant sections in `index.html`.

## Content source

Course names, ages, days, times, capacities (各クラス10名), and fees
(月謝 ¥7,700–11,000・入会金 ¥11,000〜・教材費 ¥6,000〜/年・無料体験)
mirror the live source site. Photos are sourced from the same site.

## Deploy

GitHub Pages serves the **`gh-pages`** branch (root). Push to that branch to publish:

```bash
git push origin HEAD:gh-pages
```
