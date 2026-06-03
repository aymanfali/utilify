

# Utilify

A lightweight starter and component collection built with React, TanStack Start, Vite, and Tailwind CSS. Utilify provides a curated set of accessible UI components (Radix + Tailwind), file-based routes, and a fast developer experience for prototyping and producing modern web apps.

---

## Visuals & Badges

- Add CI / coverage / license badges here (e.g. GitHub Actions, Codecov)
- Screenshot placeholder:

![Screenshot placeholder](./assets/screenshot.png)

---

## Key Features

- Reusable UI components: a collection of accessible components using Radix primitives and Tailwind styles.
- TanStack Start example app: file-based routing, SSR-ready server entry, and example pages under `src/routes`.
- TypeScript-first: complete TypeScript support and Vite-based dev tooling.
- Fast DX: Vite dev server, opinionated ESLint + Prettier config, and handy scripts for building and previewing.

---

## Tech Stack

- React 19
- TanStack Start / Router
- Vite (dev server & build)
- TypeScript
- Tailwind CSS
- Radix UI primitives
- Utility libraries: `clsx`, `date-fns`, `zod`, `@tanstack/react-query`

---

## Getting Started

These steps get you a working development environment using the project's existing scripts.

### Prerequisites

- Node.js v18+ (higher versions such as v20 are fine)
- npm (bundled with Node) or `pnpm` / `yarn`
- (Optional) Bun — a `bunfig.toml` is present if you prefer Bun workflows

### Installation

1. Clone the repository:

```bash
git clone https://github.com/aymanfali/utilify.git
cd utilify
```

2. Install dependencies:

```bash
npm install
# or
pnpm install
```

3. (Optional) Copy any environment example if you need to provide runtime values:

```bash
cp .env.example .env
# Edit `.env` as needed
```

4. Run the dev server:

```bash
npm run dev
```

Open http://localhost:5173 (Vite default) in your browser. The exact port may vary — check the console output.

---

## Environment Variables

This project primarily relies on Vite and server-only `.server.ts` helpers for environment access. Example env keys you might add to `.env`:

```env
# Vite public vars (exposed to client):
VITE_API_URL=http://localhost:3000

# Server-only vars (read inside server files):
NODE_ENV=development
DATABASE_URL=postgres://user:pass@localhost:5432/db
SENTRY_DSN=
```

Notes:
- Prefix client-exposed vars with `VITE_` so Vite includes them in the client bundle.
- Server-only code lives in files like `src/lib/*.server.ts` — those reads do not get bundled to the browser.

---

## Usage & Common Commands

Scripts defined in `package.json`:

- `npm run dev` — Start Vite development server
- `npm run build` — Build production bundles with Vite
- `npm run build:dev` — Build with `development` mode
- `npm run preview` — Preview production build locally
- `npm run lint` — Run ESLint
- `npm run format` — Run Prettier to format files

Examples:

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint and format
npm run lint
npm run format
```

Server entry and SSR
- The app's server entry is wired via `src/server.ts` and imports the TanStack Start server entry. This repository is ready to deploy to edge runtimes or Node-like hosts that accept a `fetch` handler.

---

## Running Tests

There are no test scripts included by default. To add testing, consider Jest, Vitest, or Playwright for end-to-end tests. Example with Vitest:

```bash
# install
npm install -D vitest @testing-library/react

# run tests
npx vitest
```

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

---

## License

This project is currently unlicensed — add a `LICENSE` file (for example, `MIT`) to make the terms explicit.

---

## Acknowledgements

- Built with TanStack Start starter templates and Radix UI primitives
- Tailwind CSS for utility-first styling

---

If you'd like, I can:

- Add real screenshots and CI badges
- Generate a `CONTRIBUTING.md` and `LICENSE` file (MIT)
- Add a simple `vitest` test setup and sample test


