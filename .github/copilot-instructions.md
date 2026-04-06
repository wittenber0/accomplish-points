# Accomplish Points Consulting — Website Build

## Project Context

This is a professional marketing website for Accomplish Points Consulting. The full architecture spec is in `WEBSITE_PLAN.md`. The implementation is broken into 21 agent tasks in `agent-tasks/`.

## Agent Task Workflow

When asked to work on the website build:

1. Read `agent-tasks/README.md` for the shared design system, tech stack, and conventions.
2. Read `agent-tasks/TASK_STATUS.md` to find a ready task (all dependencies marked `[x]`, task itself is `[ ]`).
3. Claim the task by changing `[ ]` to `[~]` in `TASK_STATUS.md`.
4. Read the assigned task file (`agent-tasks/T{XX}-*.md`).
5. All file paths in tasks are relative to `accomplish-points-web/`. Work from that directory.
6. Write tests first, then implement. Run `pnpm test:run` and `pnpm build` before marking complete.
7. Mark the task `[x]` in `TASK_STATUS.md` when done.

## Code Conventions

- TypeScript strict mode. No `any` types.
- Tailwind CSS for all styling. No CSS-in-JS.
- No emojis anywhere in code or content.
- No exclamation points in website copy.
- Test-first: Vitest + React Testing Library.
- All commands run from `accomplish-points-web/`.
