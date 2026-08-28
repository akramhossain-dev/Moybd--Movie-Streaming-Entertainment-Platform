# Moybd Deployment & Containerization Guide

## Deployment Architecture

Moybd is containerized using Docker and orchestrated using Docker Compose. The production environment runs two containerized services behind an optional reverse proxy (e.g. Nginx or Cloudflare):

1. **Frontend Service (`moybd-frontend`)**: Next.js App Router running in standalone mode (`output: 'standalone'`) on Node.js 20.
2. **Backend Service (`moybd-backend`)**: Express.js REST API running on Node.js 20 with non-root security privileges.

```mermaid
graph TD
    Client[Client Browser / Reverse Proxy]
    FE[moybd-frontend :3000]
    BE[moybd-backend :8080]
    DB[(MongoDB Cloud / Local)]

    Client -->|HTTPS :443| FE
    Client -->|API Requests| BE
    FE -->|Server Fetch| BE
    BE -->|Mongoose| DB
```

---

## Production Environment Variables

Ensure the following environment variables are supplied to your production environment or `.env` file before executing Docker Compose:

```env
# Backend Production Settings
PORT=8080
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/moybd
SECRET_KEY=production_jwt_secret_key_min_32_chars
RECAPTCHA_SECRET_KEY=production_recaptcha_secret_key
EMAIL_USER=notifications@moybd.sbs
EMAIL_PASS=production_app_password
DOWNLOAD_ENCRYPTION_KEY=64_char_hex_encryption_key
ALLOWED_ORIGINS=https://moybd.sbs,https://www.moybd.sbs

# Frontend Production Settings
NEXT_PUBLIC_API_URL=https://api.moybd.sbs
```

---

## Docker Containerization

Both `frontend` and `backend` services use multi-stage `Dockerfile` definitions based on `node:20-alpine` to minimize image size and eliminate build toolchain vulnerabilities from production images.

### Backend Dockerfile (`backend/Dockerfile`)
- **Stage 1 (Dependencies)**: Installs production npm dependencies.
- **Stage 2 (Runner)**: Creates unprivileged user `expressjs` (UID 1001), copies dependencies and source code, exposes port `8080`, and configures container health check.
- **Health Check**: Executes `wget --spider http://localhost:8080/api/health` every 30s.

### Frontend Dockerfile (`frontend/Dockerfile`)
- **Stage 1 (Dependencies)**: Installs npm dependencies.
- **Stage 2 (Builder)**: Receives `NEXT_PUBLIC_API_URL` build argument and compiles Next.js standalone bundle (`npm run build`).
- **Stage 3 (Runner)**: Creates unprivileged user `nextjs` (UID 1001) and executes Next.js server (`node server.js`).

---

## Running with Docker Compose

### Production Mode (`docker-compose.yml`)

To build and start production containers in detached mode:

```bash
# 1. Build and start containers
docker compose up -d --build

# 2. Check container status
docker compose ps

# 3. View container logs
docker compose logs -f
```

Production service configuration:
- `moybd-backend`: Container name `moybd-backend`, restart `unless-stopped`, port `8080:8080`.
- `moybd-frontend`: Container name `moybd-frontend`, restart `unless-stopped`, port `3000:3000`. Dependent on `moybd-backend` passing health check.

### Development Mode (`docker-compose.dev.yml`)

To run containerized development with live source volume mounting:

```bash
docker compose -f docker-compose.dev.yml up --build
```

---

## CI/CD Workflows (GitHub Actions)

Continuous Integration and Continuous Deployment are managed via GitHub Actions under `.github/workflows/`:

### 1. CI Workflow (`.github/workflows/ci.yml`)
- **Triggers**: Push or Pull Request to `main` or `master` branches, or manual `workflow_dispatch`.
- **Jobs**:
  - `lint`: Runs `npm run lint:frontend` (Next.js ESLint type and code validation).
  - `backend-check`: Executes `node --check backend/main.js` to verify backend syntax.
  - `build`: Compiles Next.js production build (`npm run build:frontend`).
  - `docker-build`: Tests Docker image compilation for both `frontend/Dockerfile` and `backend/Dockerfile` using `docker/build-push-action`.

### 2. CD Workflow (`.github/workflows/cd.yml`)
- **Triggers**: Push to `main` or `master` branches.
- **Behavior**: Enforces production build gate validation prior to deployment notification.

### 3. CodeQL Security Workflow (`.github/workflows/codeql.yml`)
- **Triggers**: Weekly schedule and pull requests.
- **Behavior**: Scans JavaScript/TypeScript source files for security vulnerabilities.

---

## Health Checks & Diagnostics

The backend service exposes a dedicated health check endpoint:

- **Endpoint**: `GET /api/health`
- **Response**: `200 OK`
```json
{
  "status": "ok",
  "timestamp": "2026-08-28T22:20:00.000Z"
}
```

---

## Rollback & Preview Deployment Status

- **Preview Deployments**: `NOT IMPLEMENTED` (Pull requests trigger CI build checks, but external staging environments are not provisioned automatically).
- **Rollback Strategy**: Rollbacks are performed manually by reverting Git commits on `main` or re-deploying previously built Docker image tags.
