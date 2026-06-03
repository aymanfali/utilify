# Utilify — All-in-One Online Utility Tools (Next.js)

Lightning-fast, fully client-side utility suite built with **Next.js 14 (App Router)**, **Tailwind CSS**, and **Lucide Icons**. Zero server cost — every tool runs in the browser.

## Tools included
- JSON Formatter (pretty / minify / validate)
- Case Converter (UPPER, lower, camel, snake, kebab, slug)
- Word & Character Counter
- Base64 Encoder / Decoder
- URL Encoder / Decoder
- Password Generator (`crypto.getRandomValues`)
- CSS Shadow & Border-Radius visual editor
- Color Palette Generator (Space to regenerate)

## Run locally
```bash
npm install
npm run dev
```
Open http://localhost:3000

## Build for production
```bash
npm run build && npm start
```

## Ad placeholders
`components/AdSlot.tsx` exports 4 IAB sizes (728×90, 320×100, 300×600, 300×250). Replace the placeholder markup with your ad network's script (AdSense, Ezoic, etc.) — slot positions in `app/page.tsx` are already optimized for viewability (top banner, contextual square below output, right-rail skyscraper on ≥xl).

## Project structure
```
app/
  layout.tsx     # root layout (dark mode, sonner toaster, metadata)
  page.tsx       # sidebar + tool dashboard
  globals.css    # tailwind + design tokens
components/
  ui.tsx         # Button, Input, Textarea, Slider, Switch, Label
  AdSlot.tsx     # ad placeholders
  tools.tsx      # all 8 tools (vanilla JS, client-side only)
lib/utils.ts     # cn() helper
```
<<<<<<< HEAD
=======

---

## Roadmap & Contributing

Planned improvements:

- Polished component documentation and Storybook examples
- CI (GitHub Actions) and test coverage reporting
- Publish a component package for reuse across projects

Contributing guide:

- Fork the repo and create a branch for your feature: `git checkout -b feat/your-feature`
- Run `npm install` and ensure `npm run lint` passes
- Open a pull request describing your changes

See [CONTRIBUTING.md](CONTRIBUTING.md) (create it if you want to formalize rules).
>>>>>>> 7b3afb1553403d454db9bdea63b5a26f325087d4
