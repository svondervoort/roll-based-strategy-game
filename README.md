# react-test

React 19 + TypeScript + Tailwind CSS v4, built with Vite.

## Available Scripts

### `npm run dev` (alias: `npm start`)

Runs the app in development mode with hot module replacement.
Configured for [http://localhost:3000](http://localhost:3000); if that port is
taken, Vite prints the port it actually used. Override per run with
`npm run dev -- --port 3001`, or change `server.port` in `vite.config.ts`.

### `npm test`

Runs the test suite once with [Vitest](https://vitest.dev) in a jsdom
environment. Use `npm run test:watch` for interactive watch mode.

### `npm run build`

Type-checks with `tsc --noEmit`, then builds the production bundle to `build/`.
The type-check runs first, so a type error fails the build.

### `npm run preview`

Serves the contents of `build/` locally to sanity-check a production bundle.

## Tailwind

Tailwind v4 is wired in through the `@tailwindcss/vite` plugin
(`vite.config.ts`) and pulled in by the single `@import "tailwindcss";` at the
top of `src/index.css`. There is no `tailwind.config.js` — v4 is configured in
CSS. To customise the theme, add a `@theme` block to `src/index.css`:

```css
@import "tailwindcss";

@theme {
  --color-brand: oklch(0.72 0.19 250);
}
```

## Learn More

- [Vite](https://vite.dev)
- [Tailwind CSS v4](https://tailwindcss.com)
- [Vitest](https://vitest.dev)
- [React](https://react.dev)
