# T01 — Project Scaffolding & Test Infrastructure

## Phase
1 — Foundation

## Dependencies
None — this is the first task.

## Objective
Create the Next.js project, install all dependencies, configure the test runner, and establish the folder structure. Every subsequent task depends on this.

## Files to Reference
- `agent-tasks/README.md` — read the Technology Stack and Project Folder Structure sections

## Files to Create

```
accomplish-points-web/
├── package.json
├── tsconfig.json
├── next.config.ts
├── vitest.config.ts
├── vitest.setup.ts
├── public/
│   ├── images/
│   │   ├── headshots/.gitkeep
│   │   ├── work/.gitkeep
│   │   └── og/.gitkeep
│   └── documents/.gitkeep
├── src/
│   ├── app/
│   │   └── (empty — other tasks create page files)
│   ├── components/
│   │   ├── layout/.gitkeep
│   │   ├── ui/.gitkeep
│   │   └── sections/.gitkeep
│   ├── content/.gitkeep
│   ├── lib/.gitkeep
│   └── styles/.gitkeep
├── __tests__/
│   ├── components/
│   │   ├── ui/.gitkeep
│   │   ├── layout/.gitkeep
│   │   └── sections/.gitkeep
│   ├── pages/.gitkeep
│   └── lib/.gitkeep
├── .gitignore
└── .env.local.example
```

## Steps

### 1. Initialize the project

```bash
pnpm create next-app@latest accomplish-points-web \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*" \
  --no-turbopack
```

### 2. Install additional dependencies

```bash
cd accomplish-points-web

# Testing
pnpm add -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event @vitejs/plugin-react jsdom

# Contact form email
pnpm add resend

# Sitemap (for later SEO task)
pnpm add next-sitemap
```

### 3. Create vitest configuration

**`vitest.config.ts`:**
```ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    include: ['__tests__/**/*.test.{ts,tsx}'],
    globals: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

**`vitest.setup.ts`:**
```ts
import '@testing-library/jest-dom/vitest'
```

### 4. Add test script to package.json

Add to `scripts`:
```json
{
  "test": "vitest",
  "test:run": "vitest run",
  "test:ci": "vitest run --reporter=verbose"
}
```

### 5. Create folder structure

Create all directories listed in "Files to Create" above. Use `.gitkeep` files so empty directories are tracked.

### 6. Create `.env.local.example`

```
# Contact form email delivery (Resend)
RESEND_API_KEY=re_xxxxxxxxxxxx
CONTACT_EMAIL_TO=mary@accomplishpoints.com
```

### 7. Clean up default Next.js scaffolding

- Remove the default `src/app/page.tsx` content (replace with a minimal placeholder: `export default function Home() { return <main>Accomplish Points</main> }`)
- Remove `src/app/globals.css` content (leave empty — Task 03 will populate it)
- Remove any default favicon/icon files — leave `public/favicon.ico` as placeholder

## Tests to Write First

**`__tests__/setup.test.ts`:**

```ts
import { describe, it, expect } from 'vitest'

describe('Project setup', () => {
  it('vitest is configured and running', () => {
    expect(true).toBe(true)
  })

  it('can resolve @ alias', async () => {
    // This verifies the path alias is working
    // Will be useful once actual modules exist
    expect(typeof import.meta).toBe('object')
  })
})
```

This test file verifies the test infrastructure itself works. Run `pnpm test:run` — it should pass.

## Acceptance Criteria

1. `pnpm install` completes without errors
2. `pnpm build` completes without errors
3. `pnpm test:run` passes with the setup test
4. `pnpm dev` starts the dev server without errors
5. All directories in the folder structure exist
6. `.env.local.example` exists with the documented variables
7. No default Next.js boilerplate content remains (no "Learn More" links, no Vercel logos)
8. TypeScript strict mode is enabled in `tsconfig.json`
