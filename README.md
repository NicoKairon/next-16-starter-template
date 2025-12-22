# Next Template

Reusable Next.js 16 App Router starter with React 19, TypeScript, Tailwind, shadcn/ui, and modern data + form tooling.

## Commands

```bash
pnpm dev
pnpm build
pnpm start
pnpm lint
pnpm test
pnpm test:unit
pnpm test:e2e
```

Turbopack is enabled for dev and build by default.

For Playwright, run `pnpm dev` in another terminal first.

## Folder layout

- `src/app` App Router routes with `(public)` and `(app)` groups.
- `src/components` Shared UI components (shadcn/ui-based).
- `src/features` Feature-first modules (queries, forms, stores).
- `src/lib` Shared helpers (env, query client, axios wrapper, auth surface).
- `src/server` Server-only utilities guarded by `server-only`.

## Auth

Auth is intentionally disabled by default. The contract lives in `src/lib/auth/index.ts`. To enable Auth.js/NextAuth, follow `docs/auth.md` and set `NEXT_PUBLIC_AUTH_PROVIDER=authjs`.

## Optional add-ons

- **Sentry**: install the SDK and follow the App Router guide from Sentry. Add config files under `sentry.*` and wire the `instrumentation.ts` file. Keep it optional so it can be removed cleanly.
- **PWA**: add `next-pwa`, include a `manifest.json`, and configure service worker caching rules.
- **CMS**: add your preferred CMS SDK (Sanity, Contentful, etc.) and keep the integration inside a `src/features/content` module.

## Conventions

- Use absolute imports via `@/`.
- Avoid barrel exports; import files directly.
- Keep server-only code in `src/server/**`.
