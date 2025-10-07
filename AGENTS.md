# Repository Guidelines

## Project Structure & Module Organization
- `src/` holds Astro code: `components/` for reusable UI, `layouts/` for shells, `pages/` for routes, `icons/`, with shared Tailwind layers in `styles/base.css`.
- Static assets live in `public/`; builds land in `dist/` and must remain untouched. Shared types belong in `types/`, and import aliases (e.g., `components/*`) are defined in `tsconfig.json`.
- `astro.config.ts` centralizes Tailwind, sitemap integration, and dev host/port resolution; update it when introducing new integrations.

## Build, Test, and Development Commands
- `pnpm install` sets up dependencies (pnpm 10.x). `pnpm dev` or `pnpm start` boots the Astro dev server through Vite.
- `pnpm build` runs `astro check` ahead of the production build; inspect `dist/` only after it succeeds.
- `pnpm preview` serves the built site for QA smoke tests.

## Coding Style & Naming Conventions
- Run `pnpm exec prettier --write .`; Prettier with `prettier-plugin-astro` enforces two-space indentation across Astro, TS, and CSS.
- Components and layouts use PascalCase filenames, route files under `src/pages/` stay kebab-case, and shared utilities belong in `src/components` or `types/`.
- Keep Tailwind utilities close to markup, promoting only repeated patterns into `styles/base.css`.

## Testing Guidelines
- Percy visual snapshots run during CI; document intentional diffs in the PR and refresh snapshots locally with the update command.

## Commit & Pull Request Guidelines
- Follow the Conventional Commit style visible in history (`chore(ci): …`, `feat: …`, `fix: …`) to keep automation clean.
- PRs should state scope, link issues, list validation (`pnpm build`, `pnpm test:e2e`), and attach screenshots for UI edits; call out config or asset changes explicitly.

## Environment & Deployment Notes
- Dev host/port pull from `.env` (`ASTRO_DEV_SERVER_LOCAL_HOST/PORT`); Cloudflare Pages ships `master` to https://yuna.work and provides preview URLs via `CF_PAGES_URL` in checks.
