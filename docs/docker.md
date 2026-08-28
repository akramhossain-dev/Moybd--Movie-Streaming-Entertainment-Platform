# 🐳 Moybd Docker & Containerization Guide

This document describes the production-ready Docker architecture for the **Moybd — Movie Streaming & Entertainment Platform**.

---

## 🏗️ Docker Architecture Overview

Moybd utilizes multi-stage Docker builds based on `node:20-alpine` images for ultra-lightweight, secure, and reproducible deployments.

```
┌─────────────────────────────────────────────────────────────┐
│                    Moybd Docker Platform                    │
├──────────────────────────────┬──────────────────────────────┤
│  Frontend (Next.js 15)       │  Backend (Express API)       │
│  - Multi-stage build         │  - Multi-stage build         │
│  - Next.js Standalone mode   │  - Production node_modules   │
│  - Non-root user: `nextjs`   │  - Non-root user: `expressjs`│
│  - Port 3000                 │  - Port 8080                 │
│  - Size: ~71.9MB (gzip)      │  - Size: ~56.5MB (gzip)      │
└──────────────────────────────┴──────────────────────────────┘
```

---

## 🚀 Quick Start with Docker Compose

### 1. Production Mode

```bash
# 1. Copy environment template
cp .env.docker.example .env.docker

# 2. Fill in database and secret values in .env.docker

# 3. Build and launch containers
docker compose --env-file .env.docker up -d --build
```

- **Frontend Application**: `http://localhost:3000`
- **Backend API**: `http://localhost:8080`
- **Backend Health Check**: `http://localhost:8080/api/health`

### 2. Development Mode (With Hot Reloading)

```bash
docker compose -f docker-compose.dev.yml up --build
```

---

## 🛠️ Building & Running Containers Individually

### Frontend Container

```bash
# Build production image
docker build -t moybd-frontend:latest ./frontend

# Run container
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_API_URL=http://localhost:8080 \
  -e NEXT_PUBLIC_AES_SECRET=your_aes_secret \
  moybd-frontend:latest
```

### Backend Container

```bash
# Build production image
docker build -t moybd-backend:latest ./backend

# Run container
docker run -p 8080:8080 \
  -e PORT=8080 \
  -e MONGODB_URI="your_mongodb_atlas_uri" \
  -e SECRET_KEY="your_jwt_secret" \
  moybd-backend:latest
```

---

## 🛡️ Security & Best Practices Implemented

1. **Non-Root Execution**: Runs as unprivileged system users (`nextjs:1001` and `expressjs:1001`).
2. **Minimal Image Footprint**: Alpine Linux base with zero build caches or dev tools in final layers.
3. **Secret Isolation**: Secrets are injected via runtime environment variables only (never in build layers).
4. **Health Check Endpoint**: Built-in health monitoring at `/api/health`.
5. **Next.js Standalone Optimization**: Enables `output: 'standalone'` for minimum memory usage.
