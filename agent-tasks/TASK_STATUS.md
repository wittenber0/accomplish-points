# Task Status

> **Purpose:** Single source of truth for task completion. Agents MUST check this file before starting a task to verify dependencies are complete, and MUST update it when finishing.

## How to Update

- When you **start** a task: change `[ ]` to `[~]` (in-progress)
- When you **complete** a task (all acceptance criteria met, tests pass): change `[~]` to `[x]`
- Do NOT mark a task complete unless `pnpm test:run` passes for your test files

## Phase 1 — Foundation

- [x] **T01** — Project Scaffolding & Test Infrastructure
- [x] **T02** — Tailwind Design Tokens & Config
- [x] **T03** — Global Styles & Font Loading
- [x] **T04** — Content Data Files

## Phase 2 — UI Components

- [ ] **T05** — Button Component
- [ ] **T06** — SectionHeading Component
- [ ] **T07** — TestimonialCard Component
- [ ] **T08** — ServiceCard Component
- [ ] **T09** — CredentialBadge Component
- [ ] **T10** — CallToAction Section Component

## Phase 3 — Layout

- [ ] **T11** — Header & Navigation (Desktop + Mobile)
- [ ] **T12** — Footer
- [ ] **T13** — Root Layout

## Phase 4 — Pages

- [ ] **T14** — Home Page
- [ ] **T15** — About Page
- [ ] **T16** — Services Page
- [ ] **T17** — Clients & Testimonials Page
- [ ] **T18** — Contact Page & Form
- [ ] **T19** — 404 Page

## Phase 5 — Polish

- [x] **T20** — Image Selection & Placeholders
- [ ] **T21** — SEO, Accessibility & Deployment
