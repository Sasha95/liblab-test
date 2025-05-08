# Architecture & Design Overview

## Overview

This project is a modern web application built with **Next.js 15 (App Router)**, **React 19**, and **TypeScript**. It follows a modular, scalable architecture inspired by feature-sliced design, leveraging React Server Components (RSC) for optimal performance and maintainability. Styling is managed with **CSS Modules** for encapsulation and theme flexibility.

## Directory Structure

```
src/
  app/         # Next.js app router, layouts, pages, error/loading boundaries
  feature/     # Feature modules (UI + logic for user-facing features)
  entities/    # Domain entities (models, entity-specific UI)
  shared/      # Shared UI, utilities, and API logic
```

### Details

- **app/**: Entry point for routing, layouts, and global error/loading handling. Uses RSC by default, with minimal `use client` usage.
- **feature/**: Contains user-facing features, each in its own folder (e.g., `quote-list`, `character-list`, `movie-list`). Promotes separation of concerns and reusability.
- **entities/**: Encapsulates domain logic and UI for core entities (e.g., `character`, `quote`, `movie`). Each entity has `model/` (logic, hooks) and `ui/` (components, styles).
- **shared/**: Houses shared UI components (`ui/`), utilities (`utils/`), and API logic (`api/`). Encourages DRY principles and consistency.

## Architectural Patterns

- **Feature-Sliced Design:** Clear separation between features, entities, and shared code for scalability and maintainability.
- **React Server Components (RSC):** Default for all components unless client interactivity is required. Minimizes client bundle size and improves performance.
- **TypeScript-First:** All code is strictly typed. Types are preferred over interfaces, and `satisfies` is used for type validation.
- **CSS Modules/SCSS:** Local scoping for styles, with support for SCSS features. Promotes maintainable and conflict-free styling.

## Example: Entity Structure

```
src/entities/character/
  model/
    use-characters.ts   # Data fetching and logic for characters
  ui/
    character/
      Character.tsx     # Character UI component
      character.module.css
```

## Extensibility

- **Add new features:** Create a new folder in `feature/`.
- **Add new entities:** Create a new folder in `entities/` with `model/` and `ui/` subfolders.
- **Share logic/UI:** Place in `shared/` for reuse across the app.

## Rationale

This architecture is designed for:

- **Scalability:** Easy to add new features/entities without cross-cutting changes.
- **Maintainability:** Clear boundaries and modular code reduce technical debt.
- **Performance:** Server-first rendering and minimal client JS.
- **Type Safety:** TypeScript throughout for reliability and developer experience.

---

For further details, see the `README.md` and inline code comments.
