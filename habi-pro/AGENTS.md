# Repository Guidelines

## Project Structure & Module Organization
Keep application code in `src/`, grouped by agent capability (e.g. `src/core`, `src/tools`, `src/workflows`). Shared configs live in `src/config/`. Mirror that layout inside `tests/` to keep unit and integration suites discoverable. Runtime assets such as prompt templates, sample transcripts, and datasets live in `assets/`. Shared documentation, ADRs, and handoff notes go in `docs/`. Automation scripts and seeding utilities belong in `scripts/`; provide both PowerShell (`*.ps1`) and Bash (`*.sh`) variants when practical.

## Build, Test, and Development Commands
Create a virtual environment with `python -m venv .venv` and activate it before installing dependencies. Run `pip install -r requirements.txt` after pulling new changes. Use `make lint` to apply `ruff` and `black` across `src/` and `tests/`. `make test` runs the pytest suite with coverage thresholds enforced. `make run` launches the default agent loop via `python -m src.main`. Document any new workflow entry points by adding a matching `make` target.

## Coding Style & Naming Conventions
Follow PEP 8 with 4-space indentation. Prefer type hints on public functions and dataclasses for agent state. Modules use snake_case filenames; classes remain PascalCase; async tasks and tool functions are snake_case verbs. Keep prompts under `assets/prompts/` named `role__intent.md`. Run `ruff --fix` before pushing; formatter disagreements resolve in favor of `black`.

## Testing Guidelines
All new features need pytest coverage and should include scenario fixtures under `tests/fixtures/`. Name test modules `test_<feature>.py` and use `@pytest.mark.slow` for long-running flows. Maintain >=90% statement coverage; check locally with `pytest --cov=src --cov-report=term-missing`. Document integration test setup in `docs/testing.md` when adding external services.

## Commit & Pull Request Guidelines
Use Conventional Commit prefixes (`feat:`, `fix:`, `chore:`, `docs:`, `test:`). Keep messages under 72 characters on the subject line and include context in the body when behavior changes. Pull requests need a summary, validation notes (commands run), and links to any related issues. Attach screenshots or terminal excerpts for UX-facing changes and mention reviewers responsible for affected subsystems.

## Security & Configuration Tips
Store secrets only in `.env.local` files ignored by Git; share sample values via `.env.example`. Rotate API keys used by agents monthly and revoke tokens when collaborators depart. Validate third-party tool dependencies before inclusion and document required scopes in `docs/security.md`.
