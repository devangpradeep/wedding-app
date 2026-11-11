# Weddingly engineering conventions

## Scope and architecture

- Preserve existing work, working functionality, and the configured Git remote. Never initialize a nested repository.
- Do not automatically commit or push changes.
- Prefer incremental feature development. Do not add speculative entities, empty modules, unnecessary dependencies, or abstractions.
- The backend is a modular monolith using modern Java and Spring Boot conventions. Use Java 25 consistently in compilation, local development, tests, CI, and Docker.
- Keep infrastructure simple for this hobby project. Use an installed PostgreSQL service for local development and Neon for hosted PostgreSQL. Docker is for the backend only; do not add database containers or Compose without a new user request.
- Organize real features under `com.weddingly` (future modules include `auth`, `wedding`, `event`, `guest`, `invitation`, and `budget`). Create modules as features are implemented.
- Controllers handle HTTP concerns, services implement business logic, repositories handle persistence, DTOs define API contracts, and entities represent persisted domain data. Prefer constructor injection.
- Use Flyway for every schema change. Keep `ddl-auto=validate`, `open-in-view=false`, and Flyway clean disabled. Never edit an applied migration; add a new one.
- Avoid destructive database operations. Do not modify production credentials or commit secrets. Keep real environment files ignored.
- Authentication and authorization have not been designed. Do not introduce fake authentication, hardcoded users, or insecure shortcuts.
- Use Spring's `ProblemDetail` errors and Bean Validation at API boundaries. Never expose stack traces or internal exception details in public responses.
- Add meaningful tests for new business logic and changed contracts. Spring Framework 7 requires JUnit 6; use Boot-managed JUnit Jupiter versions instead of overriding to JUnit 5.

## Frontend

- Use React, strict TypeScript, React Router, Vite, Tailwind CSS, and the local shadcn/ui components. Avoid unnecessary `any` types and unvalidated API response assertions.
- Keep reusable components in `frontend/src/components`, page layouts in `layouts`, feature code in `features`, and shared utilities in `lib`.
- The visual identity uses warm ivory, forest green, muted gold, DM Sans, and Cormorant Garamond. Preserve consistent tokens, typography, spacing, and restrained transitions.
- Keep the user experience responsive and accessible: readable contrast, keyboard navigation, visible focus, meaningful semantics, appropriate labels, and reduced-motion support.
- Distinguish planned features from working functionality. Never fabricate operational statistics, user records, authentication, or saved data.
- Avoid global state libraries until real application requirements justify them.
- All `VITE_*` values are public build-time configuration. Never place secrets in them.

## Verification

- Local API startup: `cd backend && ./dev` automatically loads `backend/.env` and starts the Maven Wrapper. `./backend/dev` also works from the repository root.
- Backend: `cd backend && ./mvnw -B -ntp verify` (Java 25; web tests need no database).
- Full backend and PostgreSQL integration: configure a dedicated test database on local PostgreSQL or a Neon development branch, export its backend environment, then `cd backend && ./mvnw -B -ntp -Pintegration verify`. CI runs the database-independent web tests and build.
- Frontend: `cd frontend && npm ci && npm run typecheck && npm run lint && npm run build` (Node 24).
- Use the existing Maven Wrapper and npm lockfile. Do not claim checks passed without running them successfully.
- Do not install system-wide packages or change global system configuration without user approval.

## Approved guest-management rules — for future implementation

1. Assigning a name to an existing reserved guest place must never automatically increase the invited headcount.
2. A household can initially contain zero named attendees, provided its guest allocation is defined.
3. A household's primary contact or coordinator does not necessarily have to be an invited attendee.
4. RSVP tracking must be maintained per individual guest or reserved guest place, per wedding event.
5. Invitation access and household membership are separate concepts. A family member may receive an individual invitation without leaving their household.
6. Removing a reserved guest place that has an RSVP response or relevant history must require explicit review rather than silently discarding information.
7. Guest-management and RSVP modifications must have an audit history so organizers can understand what changed, when, and by whom.

Whether an entirely unnamed household can receive an invitation is undecided. Do not introduce an irreversible restriction or assumption. These rules are documentation for later milestones; do not implement guest management as part of the foundation.
