# Repository Guidelines

## Project Structure & Module Organization
- The repository is currently a clean slate; use this layout as you add code.
- `src/` for application modules; mirror domain areas (`src/api/`, `src/ui/`, `src/lib/`).
- `tests/` for automated tests, matching source paths (`tests/api/...` mirrors `src/api/...`).
- `scripts/` for helper CLI tasks; make them executable and document usage at the top.
- `docs/` for design notes and ADRs; `.github/workflows/` for CI when added.
- Keep shared configuration in the root (`Makefile`, `package.json` or `pyproject.toml`, `.editorconfig`).

## Build, Test, and Development Commands
- Prefer a `Makefile` (or package scripts) so contributors run one-liners; keep commands idempotent.
- Recommended targets once implemented:
  - `make setup` — install dependencies and set up local tooling.
  - `make lint` — run static analysis and formatting checks.
  - `make test` — run the full automated test suite with coverage.
  - `make format` — apply code formatters.
  - `make run` — start the app locally; document ports and env vars in the target header.

## Coding Style & Naming Conventions
- Default to 4-space indentation and UTF-8 text; enforce a formatter for the main language (`black`/`ruff` for Python, `prettier`/`eslint` for JS/TS).
- Use descriptive, kebab-case directory names; match file names to exported types/modules.
- Keep functions small; prefer pure helpers; document public functions with short docstrings/comments when intent is non-obvious.

## Testing Guidelines
- Co-locate tests in `tests/` mirroring source paths; name files `test_<module>.py` or `<module>.test.ts`.
- Cover new behavior with unit tests and at least one integration test per feature.
- Make tests deterministic (no live network calls without mocking); fail fast on lint/type/format issues in CI.

## Commit & Pull Request Guidelines
- Use concise, action-oriented commit subjects; conventional commits are encouraged (`feat:`, `fix:`, `chore:`).
- PRs should describe scope, risks, and how to validate (commands run, screenshots if UI).
- Link issues/tickets; mention breaking changes explicitly; keep diffs focused and reviewed by a peer.

## Security & Configuration Tips
- Never commit secrets; use environment variables and track a `.env.example` template.
- Keep dependencies minimal and pinned; add vulnerability checks to CI once CI is added.

## Agent Workflow Notes
- Before coding, inspect `src/` and `tests/` for existing patterns; add small comments only when intent is non-obvious.
- After changes, run `make lint` and `make test` (or equivalents) and note results in PRs.
