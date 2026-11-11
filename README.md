# Weddingly

Weddingly is an early-stage wedding planning app for couples and families, with room for multi-event celebrations and Indian wedding traditions.

The current milestone is a working application foundation: a responsive welcome page, a dashboard preview, and a Spring Boot backend that connects to PostgreSQL. **`GET /api/health` is the only backend endpoint.** The guest, event, invitation, budget, and settings pages are previews; there are no accounts or saved wedding plans yet.

| Area | Stack |
| --- | --- |
| Backend | Java 25, Spring Boot, Maven Wrapper, Bean Validation |
| Database | PostgreSQL, Flyway migrations, Spring Data JPA / Hibernate |
| Frontend | Node.js 24, React, TypeScript, Vite, React Router, Tailwind CSS, local shadcn/ui components |
| Checks | JUnit Jupiter, MockMvc, ESLint, GitHub Actions |

The [Maven POM](backend/pom.xml) and [npm lockfile](frontend/package-lock.json) pin the build and dependencies.

## Run locally

You need **JDK 25**, **Node.js 24 with npm**, Bash for the backend launcher, and an accessible PostgreSQL database. The normal setup uses an installed PostgreSQL service. A separate Neon development database also works. Docker is optional and used only to package the backend. You do not need a global Maven installation.

Run the following setup commands from the repository root:

```bash
java -version
node --version
node scripts/setup-env.mjs
npm --prefix frontend ci
```

The setup script creates `backend/.env` and `frontend/.env` from their examples if they are missing. It preserves existing files and does not create databases or users. Both `.env` files are ignored by Git. The backend launcher reads `backend/.env`, and Vite reads `frontend/.env` when it starts.

### 1. Prepare PostgreSQL

For the local setup, start your installed PostgreSQL service and check it is reachable:

```bash
pg_isready -h localhost -p 5432
```

Use a separate database named `weddingly`. If you already have a local role with permission to create a database, you can reuse it. For example, with a local `postgres` role:

```bash
createdb -h localhost -p 5432 -U postgres -W weddingly
```

Replace `postgres` with your role if it differs. Enter that role's password at the prompt. Skip creation if the database already exists. If you prefer a dedicated role, here is the one-time setup on Ubuntu with local PostgreSQL administrator access:

```bash
sudo -u postgres createuser --pwprompt weddingly
sudo -u postgres createdb --owner=weddingly weddingly
```

Set `DATABASE_USERNAME` and `DATABASE_PASSWORD` in `backend/.env` to the role and password you chose. The example `DATABASE_URL` is `jdbc:postgresql://localhost:5432/weddingly`; adjust it if the server uses another host, port, or database name. The role must be able to connect and create the `weddingly` schema on first startup. If you use a hosted development database, follow [Connecting to Neon](#connecting-to-neon) instead.

### 2. Start the backend

From the repository root:

```bash
./backend/dev
```

From inside `backend/`, run `./dev`. The launcher loads the local `.env`, then starts Spring Boot with the Maven Wrapper. The API listens on port `8080` by default. Keep the terminal open and use **Ctrl+C** to stop it. Restart after changing `.env`.

```bash
curl --fail http://localhost:8080/api/health
# {"status":"UP"}
```

Spring Boot needs PostgreSQL during startup to run Flyway and initialize Hibernate. Once the app is running, the health endpoint returns a fixed liveness response; it does not query PostgreSQL on each request.

### 3. Start the frontend

Open another terminal at the repository root:

```bash
cd frontend
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) for the welcome page or [http://localhost:5173/dashboard](http://localhost:5173/dashboard) for the dashboard preview. The welcome page and dashboard do not request backend data.

### Check API connectivity

Open [http://localhost:5173/dev/api-status](http://localhost:5173/dev/api-status) directly while running `npm run dev`. This page calls `GET /api/health` using the configured API URL. A successful `{"status":"UP"}` response shows **API connected**. The request times out after eight seconds; use **Check again** to retry.

The diagnostics route is not linked from the app and is excluded from production builds.

## Configuration

| Variable | Where to set it | Purpose |
| --- | --- | --- |
| `SPRING_PROFILES_ACTIVE` | Backend | The local example uses `dev`, which enables local browser CORS. Leave it unset when deploying. |
| `DATABASE_URL` | Backend | PostgreSQL JDBC URL, for example `jdbc:postgresql://localhost:5432/weddingly`. |
| `DATABASE_USERNAME` | Backend | Local PostgreSQL or Neon role. |
| `DATABASE_PASSWORD` | Backend | Password for that role. |
| `PORT` | Backend | HTTP port, `8080` by default. |
| `CORS_ALLOWED_ORIGINS` | Backend, `dev` only | Comma-separated exact origins for `/api/**`; defaults to `http://localhost:5173` and `http://127.0.0.1:5173`. |
| `VITE_API_BASE_URL` | Frontend | API base URL used by development diagnostics; defaults to `http://localhost:8080`. Set an empty value only if a same-origin proxy already serves `/api/**`. |

The backend launcher sources its `.env` as a Bash file. Quote values containing shell characters, such as `&` in a JDBC URL. Spring Boot reads the exported values; direct Maven commands do not load `.env` on their own. Vite variables prefixed with `VITE_` are public and must never contain secrets.

### Connecting to Neon

In the Neon **Connect** dialog, select **Java** and use a direct (non-pooled) endpoint. The application and Flyway share this connection configuration. Use the host and database from the Java connection string, and supply the role and password separately:

```dotenv
DATABASE_URL='jdbc:postgresql://YOUR_NEON_HOST/YOUR_DATABASE?sslmode=require&channelBinding=require'
DATABASE_USERNAME=YOUR_NEON_ROLE
DATABASE_PASSWORD='YOUR_NEON_PASSWORD'
```

Keep the TLS settings from the Java connection string. The database role needs permission to create or migrate the `weddingly` schema. See [Neon's Java guide](https://neon.com/docs/guides/java) and [Neon's Flyway guide](https://neon.com/docs/guides/flyway). For local work or integration tests, use a separate Neon development branch or database.

## Repository layout

| Path | What's there |
| --- | --- |
| [`backend/`](backend/) | Spring Boot app, Maven Wrapper, local launcher, and optional Dockerfile. |
| [`backend/src/main/java/com/weddingly/`](backend/src/main/java/com/weddingly/) | Application entry point, health controller, shared development CORS and JSON error handling. |
| [`backend/src/main/resources/`](backend/src/main/resources/) | Spring configuration and versioned SQL migrations. |
| [`backend/src/test/`](backend/src/test/) | Web tests and an opt-in PostgreSQL integration test. |
| [`frontend/`](frontend/) | React app, Vite configuration, npm lockfile, and Vercel routing configuration. |
| [`scripts/setup-env.mjs`](scripts/setup-env.mjs) | Copies the environment templates without overwriting existing configuration. |
| [`.github/workflows/`](.github/workflows/) | Separate frontend and backend checks. |

Flyway creates and tracks the `weddingly` schema. The first migration documents the schema with a comment; it creates no application tables. Hibernate validates the schema, and schema changes belong in new Flyway migrations. Engineering conventions and the future guest-management rules are in [AGENTS.md](AGENTS.md).

## Checks

### Backend build and web tests

```bash
cd backend
./mvnw -B -ntp verify
```

The web tests cover the health response, development CORS, HTTP method handling, and the API error format. They do not need a running database. This command also builds `backend/target/weddingly-api-0.1.0.jar`.

### PostgreSQL integration test

Use a **dedicated test database**. For example, create `weddingly_test` on your local PostgreSQL service with the same owner as the role in `backend/.env`. Starting at the repository root, load the credentials and change the URL for this command only:

```bash
cd backend
set -a
. ./.env
set +a
DATABASE_URL=jdbc:postgresql://localhost:5432/weddingly_test ./mvnw -B -ntp -Pintegration verify
```

The integration test starts the application against PostgreSQL, checks connectivity and Flyway's migration history, and exercises the health endpoint. Flyway can apply pending migrations to the configured test database.

### Frontend checks

```bash
cd frontend
npm ci
npm run typecheck
npm run lint
npm run build
```

The production output is `frontend/dist/`. Use `npm run preview` to serve that build locally. The GitHub workflows run the database-independent backend checks and the frontend checks separately, based on changed paths. They do not deploy the project.

## Packaging and planned deployment

From the repository root, build the backend image with:

```bash
docker build -t weddingly-api ./backend
```

The [Dockerfile](backend/Dockerfile) builds and tests the app with a Java 25 JDK, then runs the resulting JAR as an unprivileged user on a Java 25 JRE. Supply `DATABASE_URL`, `DATABASE_USERNAME`, and `DATABASE_PASSWORD` as environment variables when running the container. The database lives outside the image. When using a local database from a container, the connection must use a host address reachable from that container.

The planned deployment is the frontend on **Vercel** (project root `frontend`, output `dist`) and the backend image on **Railway** or another container host with **Neon** as the database. `frontend/vercel.json` provides the SPA fallback so routes such as `/dashboard` work on refresh. The production frontend makes no backend requests today, so it does not need an API base URL. When browser-facing features are added, configure production origins or a same-origin proxy at that point. This repository does not configure an automatic deployment.

## Assets

The [wedding photograph](frontend/public/images/wedding-moment.jpg) comes from [Unsplash](https://images.unsplash.com/photo-1519741497674-611481863552) under the [Unsplash license](https://unsplash.com/license). DM Sans and Cormorant Garamond are served locally using Fontsource. The brand mark and botanical illustration are SVGs in the repository.
