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

- [x] **T05** — Button Component
- [x] **T06** — SectionHeading Component
- [x] **T07** — TestimonialCard Component
- [x] **T08** — ServiceCard Component
- [x] **T09** — CredentialBadge Component
- [x] **T10** — CallToAction Section Component

## Phase 3 — Layout

- [x] **T11** — Header & Navigation (Desktop + Mobile)
- [x] **T12** — Footer
- [x] **T13** — Root Layout

## Phase 4 — Pages

- [~] **T14** — Home Page
- [x] **T15** — About Page
- [~] **T16** — Services Page
- [x] **T17** — Clients & Testimonials Page
- [~] **T18** — Contact Page & Form
- [x] **T19** — 404 Page

## Phase 5 — Polish

- [x] **T20** — Image Selection & Placeholders
- [ ] **T21** — SEO, Accessibility & Deployment
