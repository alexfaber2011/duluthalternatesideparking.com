# Repository Guidelines

## Project Structure & Module Organization
- Root directory contains all source files.
- `index.html` – main page markup.
- `index.js` – client‑side JavaScript entry point.
- `service-worker.js` – caching logic for offline support.
- Assets (icons, images, PDFs) live alongside the markup (e.g., `icon-192.png`, `parking-calendar.pdf`).
- Static files (`CNAME`, `manifest.json`, `favicon.ico`) are served directly.

## Development & Preview Commands
| Command | Description |
|---|---|
| `python -m http.server 8000` | Quickly serve the repository locally for testing. |
| `npx serve .` *(requires Node)* | Alternative static server with live reload. |
| `git pull && git push` | Standard Git workflow to sync changes. |

## Coding Style & Naming Conventions
- **Indentation**: 2 spaces, no tabs.
- **HTML**: kebab‑case for custom data attributes, semantic tags preferred.
- **JavaScript**: `camelCase` for variables/functions, `PascalCase` for classes.
- **Assets**: snake_case with descriptive suffixes (`icon_128.png`, `parking_calendar.pdf`).
- **Linting**: Use `eslint` (if added) with the Airbnb base config; run `npx eslint .` before committing.
- **Formatting**: Run `prettier --write .` to enforce consistent spacing.

## Testing Guidelines
- No automated test suite yet; manual testing is the primary method.
- Verify UI changes in at least two browsers (Chrome, Firefox) and on mobile viewports.
- Check Service Worker behavior with Chrome DevTools → Application → Service Workers.
- Add a `README.md` entry describing any manual test steps performed.

## Commit & Pull Request Guidelines
- **Commit messages**: short imperative sentence, ≤ 50 characters, no trailing period (e.g., `fix favicons`).
- **Pull requests**:
  - Provide a concise description of the change.
  - Reference related issue numbers (`Closes #12`).
  - Include screenshots for visual updates.
  - Ensure the branch is up‑to‑date with `main` before merging.

## Security & Configuration Tips
- Keep third‑party scripts minimal; audit any external libraries before inclusion.
- Update the `manifest.json` `scope` and `start_url` if the site path changes.
- Review Service Worker cache strategies for sensitive data.

