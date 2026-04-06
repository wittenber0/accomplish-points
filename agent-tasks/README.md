# Agent Tasks — Accomplish Points Consulting Website

## About This Project

Build a professional marketing website for **Accomplish Points Consulting**, a solo consulting practice run by Mary Cook Swanson in Bend, Oregon. The site targets public service organizations, government agencies, and university leaders. Full business context is in `BUSINESS_PLAN.md`. Full architecture spec is in `WEBSITE_PLAN.md`. Raw content is in `content/*.md`.

---

## Working Directory

T01 creates the project in a subdirectory called `accomplish-points-web/`. **All file paths in every task (e.g. `src/components/ui/Button.tsx`) are relative to `accomplish-points-web/`.** When working on any task after T01, `cd` into `accomplish-points-web/` first. Run all commands (`pnpm test:run`, `pnpm build`, etc.) from inside that directory.

---

## Fleet Operations — How Agents Coordinate

This section is for autonomous agents executing tasks in parallel. Follow this workflow exactly.

### 1. Find a Ready Task

Read `agent-tasks/TASK_STATUS.md`. A task is **ready** when:
- Its status is `[ ]` (not started)
- ALL of its dependencies (listed in the task file and the Task Index below) are `[x]` (complete)

If no tasks are ready, stop and report that you are blocked.

### 2. Claim the Task

Edit `TASK_STATUS.md` and change your task's checkbox from `[ ]` to `[~]`. This signals to other agents that the task is in progress. If the task is already `[~]`, it is claimed by another agent — pick a different ready task.

### 3. Execute the Task

1. Read `agent-tasks/README.md` (this file) for shared context.
2. Read your task file (`agent-tasks/T{XX}-*.md`).
3. Read only the files listed in your task's "Files to Reference" section.
4. Create test files first. Verify they fail.
5. Implement until all tests pass.
6. Run `pnpm test:run` from `accomplish-points-web/` — all tests must pass (not just yours).
7. Run `pnpm build` — must complete without errors.

### 4. Mark Complete

Edit `TASK_STATUS.md` and change your task's checkbox from `[~]` to `[x]`.

### 5. Rules

- **Do not start a task whose dependencies are not `[x]`.** Wait or pick another.
- **Do not modify files outside your task's scope.** If you need to fix a bug in a dependency, report it — do not fix it yourself.
- **Do not skip tests.** Every task defines tests. Write them first.
- **One task per agent at a time.** Finish and mark complete before claiming another.

---

## How to Use These Tasks (Manual)

1. **Read this README first.** It contains the shared design system, tech conventions, and test methodology that every task references.
2. **Check your task's dependencies.** Do not start a task until all listed dependencies are marked complete in `TASK_STATUS.md`.
3. **Write tests before implementation.** Every task specifies tests. Create the test file(s) first, verify they fail, then implement.
4. **Do not explore outside your task's scope.** Each task lists exactly which files to read and create. Do not refactor adjacent code or add unrequested features.

---

## Technology Stack

| Layer | Choice | Version |
|-------|--------|---------|
| Framework | Next.js (App Router) | 14+ |
| Language | TypeScript | 5+ |
| Styling | Tailwind CSS | 3+ |
| Testing | Vitest + React Testing Library + jsdom | Latest |
| Package Manager | pnpm | Latest |
| Deployment | Vercel | — |
| Fonts | `next/font` (Google Fonts, self-hosted) | — |
| Images | `next/image` | — |
| Contact Form | Next.js Server Action + Resend | — |
| Linting | ESLint + Prettier (Next.js defaults) | — |

### NOT Using

- No CSS-in-JS, no animation libraries, no state management libraries, no headless CMS, no database, no authentication, no dark mode.

---

## Project Folder Structure

```
accomplish-points-web/
├── public/
│   ├── images/
│   │   ├── headshots/
│   │   ├── work/
│   │   └── og/
│   ├── documents/
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── about/page.tsx
│   │   ├── services/page.tsx
│   │   ├── clients/page.tsx
│   │   ├── contact/page.tsx
│   │   └── not-found.tsx
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Navigation.tsx
│   │   │   └── MobileNav.tsx
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── SectionHeading.tsx
│   │   │   ├── TestimonialCard.tsx
│   │   │   ├── ServiceCard.tsx
│   │   │   ├── CredentialBadge.tsx
│   │   │   └── ContactForm.tsx
│   │   └── sections/
│   │       ├── Hero.tsx
│   │       ├── ServicesOverview.tsx
│   │       ├── TestimonialStrip.tsx
│   │       ├── CredentialsBar.tsx
│   │       └── CallToAction.tsx
│   ├── content/
│   │   ├── services.ts
│   │   ├── testimonials.ts
│   │   ├── clients.ts
│   │   └── credentials.ts
│   ├── lib/
│   │   ├── metadata.ts
│   │   └── actions.ts
│   └── styles/
│       └── globals.css
├── __tests__/
│   ├── components/
│   │   ├── ui/
│   │   └── layout/
│   ├── pages/
│   └── lib/
├── tailwind.config.ts
├── next.config.ts
├── vitest.config.ts
├── tsconfig.json
└── package.json
```

---

## Design System Reference

All agents must use these exact values. Do not invent colors, fonts, or spacing values.

### Color Palette

```ts
// Tailwind config extension — use these EXACTLY
colors: {
  brand: {
    slate: '#2F3C4A',   // Primary text, headings, nav
    teal: '#2A5C5A',    // Primary brand color — links, accents, active states
    sage: '#7A9E8E',    // Secondary accents — subtle backgrounds, badges
    amber: '#C29545',   // Warm accent — CTA hover, decorative rules, pull-quote borders
    stone: '#E8E3DA',   // Alternating section backgrounds, card backgrounds
    cream: '#FAF8F4',   // Page background
  },
  body: {
    DEFAULT: '#3D3830', // Paragraph text (warm near-black)
    muted: '#7A746A',   // Captions, metadata
  },
  border: {
    DEFAULT: '#D4CFC6', // Dividers, card borders
  },
  status: {
    success: '#3D7A5F', // Form success
    error: '#A13D2D',   // Form error
  },
}
```

### Typography

| Role | Font | Weights | CSS Variable |
|------|------|---------|-------------|
| Headings | Source Serif 4 | 600, 700 | `--font-heading` |
| Body | Source Sans 3 | 400, 600 | `--font-body` |

**Type Scale (1.25 ratio, 16px base):**

| Element | Size | Line Height | Weight | Font | Letter Spacing |
|---------|------|-------------|--------|------|---------------|
| H1 | 2.441rem | 1.2 | 700 | Heading | -0.02em |
| H2 | 1.953rem | 1.25 | 600 | Heading | -0.01em |
| H3 | 1.563rem | 1.3 | 600 | Heading | 0 |
| H4 | 1.25rem | 1.4 | 600 | Heading | 0 |
| Body | 1.125rem | 1.7 | 400 | Body | 0 |
| Body Small | 1rem | 1.6 | 400 | Body | 0 |
| Caption | 0.875rem | 1.5 | 400 | Body | 0.01em |
| Nav/Button | 0.9375rem | 1 | 600 | Body | 0.03-0.04em |

**Max body text width:** `65ch` / `max-w-prose`

### Spacing

- **Container max width:** 1200px (use Tailwind `max-w-7xl`)
- **Container padding:** `px-6` mobile, `md:px-8` tablet, `lg:px-12` desktop
- **Section vertical padding:** `py-14 lg:py-20` (56px mobile, 80px desktop)
- **Section internal gap (heading to content):** `mt-8` (32px)

### Responsive Breakpoints

| Name | Width | Usage |
|------|-------|-------|
| `sm` | 640px | Minor adjustments |
| `md` | 768px | Tablet |
| `lg` | 1024px | **Primary layout breakpoint** — desktop nav, multi-column |
| `xl` | 1280px | Max container |

### Component Patterns

**Buttons (2 variants only):**
- Primary: `bg-brand-teal text-white`, radius `4px`, padding `py-3 px-7`, uppercase, letter-spaced. Hover: darken 10%.
- Secondary (Ghost): `border border-brand-teal text-brand-teal bg-transparent`. Hover: fill to `bg-brand-teal text-white`.
- Transition: `transition-colors duration-150`

**Cards:**
- Border: `border border-border`, radius `rounded`, padding `p-8`
- Background: contrast with section (`brand-cream` on stone sections, `brand-stone` on cream sections)
- No box shadow. No hover effects.

**Testimonial cards:**
- Left border: `border-l-[3px] border-brand-amber`
- Quote text: italic. Attribution: name semibold, title/org in muted.
- No quotation mark icons.

**Credential badges:**
- `bg-brand-stone border border-border rounded-sm px-3 py-1 text-sm text-brand-slate`

**Decorative horizontal rule (under H1/H2):**
- `w-12 h-0.5 bg-brand-amber` — left-aligned, `mt-3` below heading
- This is the ONLY decorative element. Use sparingly.

---

## Anti-Patterns — MUST AVOID

These are explicit prohibitions. An agent's work will be rejected if any appear:

1. **No emojis** — not in code, not in rendered text, not in alt text, nowhere
2. **No gradient backgrounds** or colorful blob/wave shapes
3. **No pill-shaped buttons** (large border-radius) — use `rounded` (4px) only
4. **No box shadows on cards** — use border + background contrast
5. **No stock photography** — use only Mary's actual photos or solid-color placeholders
6. **No icon grids** — do not give each service a colorful circle icon
7. **No parallax scrolling** or scroll-triggered animations
8. **No dark mode**
9. **No decorative SVG illustrations** of people, line art, etc.
10. **No exclamation points** in website copy
11. **No `framer-motion`**, GSAP, or animation libraries

---

## Test-First Methodology

### Setup

Tests use **Vitest** + **React Testing Library** + **jsdom**. The test infrastructure is set up in Task 01.

### For Every Task

1. Create the test file(s) listed in the task BEFORE writing implementation code.
2. Write all assertions. Verify the tests fail (red).
3. Implement the code until all tests pass (green).
4. Do not add code that isn't covered by a test assertion.

### Test File Naming Convention

- Component `Button.tsx` → test at `__tests__/components/ui/Button.test.tsx`
- Page `app/about/page.tsx` → test at `__tests__/pages/about.test.tsx`
- Lib `lib/actions.ts` → test at `__tests__/lib/actions.test.ts`

### Common Test Imports

```tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
```

---

## Dependency Graph

```
PHASE 1 — Foundation
  T01 ─────────────────────────────────────────────────────┐
  T02 (depends: T01) ──────────────────────────────────────┤
  T03 (depends: T01) ──────────────────────────────────────┤
  T04 (depends: T01) ──────────────────────────────────────┤
                                                            │
PHASE 2 — UI Components (depends: T02, T03)                │
  T05 (depends: T02, T03) ─────────────────────────────────┤
  T06 (depends: T02, T03) ─────────────────────────────────┤
  T07 (depends: T02, T03) ─────────────────────────────────┤
  T08 (depends: T02, T03) ─────────────────────────────────┤
  T09 (depends: T02, T03) ─────────────────────────────────┤
  T10 (depends: T02, T03) ─────────────────────────────────┤
                                                            │
PHASE 3 — Layout (depends: T02, T03, T05)                  │
  T11 (depends: T02, T03, T05) ────────────────────────────┤
  T12 (depends: T02, T03) ─────────────────────────────────┤
  T13 (depends: T03, T11, T12) ────────────────────────────┤
                                                            │
PHASE 4 — Pages (depends: T04, T13, + relevant components) │
  T14 (depends: T04, T13, T05, T06, T07, T08, T09, T10) ──┤
  T15 (depends: T04, T13, T06, T08, T09, T10) ─────────────┤
  T16 (depends: T04, T13, T06, T08, T10) ──────────────────┤
  T17 (depends: T04, T13, T06, T07, T10) ──────────────────┤
  T18 (depends: T04, T13, T05, T06, T10) ──────────────────┤
  T19 (depends: T13, T05, T06) ────────────────────────────┤
                                                            │
PHASE 5 — Integration & Polish (depends: all pages)        │
  T20 (depends: T01) ──────────────────────────────────────┤
  T21 (depends: T14-T19) ──────────────────────────────────┘
```

### Parallelism Opportunities

- **T02, T03, T04** can all run in parallel (all depend only on T01)
- **T05–T10** can all run in parallel (all depend only on T02+T03)
- **T11, T12** can run in parallel (both depend on T02+T03+T05)
- **T14–T19** can all run in parallel (once T13 + their component deps are done)
- **T20** can run anytime after T01
- **T21** runs last after all pages are complete

---

## Task Index

| ID | Phase | Title | Dependencies |
|----|-------|-------|-------------|
| T01 | 1 | Project Scaffolding & Test Infrastructure | None |
| T02 | 1 | Tailwind Design Tokens & Config | T01 |
| T03 | 1 | Global Styles & Font Loading | T01 |
| T04 | 1 | Content Data Files | T01 |
| T05 | 2 | Button Component | T02, T03 |
| T06 | 2 | SectionHeading Component | T02, T03 |
| T07 | 2 | TestimonialCard Component | T02, T03 |
| T08 | 2 | ServiceCard Component | T02, T03 |
| T09 | 2 | CredentialBadge Component | T02, T03 |
| T10 | 2 | CallToAction Section Component | T02, T03, T05, T06 |
| T11 | 3 | Header & Navigation (Desktop + Mobile) | T02, T03, T05 |
| T12 | 3 | Footer | T02, T03 |
| T13 | 3 | Root Layout | T03, T11, T12 |
| T14 | 4 | Home Page | T04, T13, T05-T10 |
| T15 | 4 | About Page | T04, T05, T06, T09, T10, T13 |
| T16 | 4 | Services Page | T04, T05, T06, T09, T10, T13 |
| T17 | 4 | Clients & Testimonials Page | T04, T06, T07, T10, T13 |
| T18 | 4 | Contact Page & Form | T05, T06, T13 |
| T19 | 4 | 404 Page | T13, T05, T06 |
| T20 | 5 | Image Selection & Processing | T01 |
| T21 | 5 | SEO, Accessibility & Deployment | T14–T19 |
