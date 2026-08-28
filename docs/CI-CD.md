# 🚀 Moybd CI/CD Pipeline Documentation

This document describes the continuous integration (CI) and continuous deployment (CD) architecture for the **Moybd — Movie Streaming & Entertainment Platform**.

---

## 🏗️ Architecture Overview

```
Developer Push / PR
       │
       ▼
GitHub Actions CI (.github/workflows/ci.yml)
       ├── 1. Setup Node.js (v20 LTS + npm cache)
       ├── 2. Install Dependencies (npm ci)
       ├── 3. ESLint Code Quality Check (`npm run lint`)
       ├── 4. Backend Module & Syntax Verification (`node --check backend/main.js`)
       └── 5. Next.js Production Build Validation (`npm run build`)
       │
       ├── (Failed)  ──► Block PR Merge & Stop Deployment
       └── (Passed)  ──► GitHub Actions CD / Deployment Gate (.github/workflows/cd.yml)
                                 │
                                 ▼
                     Production Deployment Gate
```

---

## 🛠️ Workflows Included

| Workflow File | Trigger Events | Primary Responsibilities |
| :--- | :--- | :--- |
| **`ci.yml`** | `push` / `pull_request` (`main`, `master`) | ESLint validation, Backend syntax check, Next.js production build validation |
| **`cd.yml`** | `push` to (`main`, `master`) | Production deployment gate, build environment verification |
| **`codeql.yml`** | `push` / `pull_request` / `weekly` | Automated CodeQL static security analysis for JS/TS |
| **`dependabot.yml`** | Weekly schedule | Automated PR updates for npm dependencies & GitHub Actions |

---

## 🔑 Required GitHub Secrets

Configure these secrets in **GitHub Repository Settings ➔ Secrets and variables ➔ Actions**:

### Production Secrets

- **`NEXT_PUBLIC_API_URL`**: Production backend API URL (e.g. `https://api.moybd.sbs`)
- **`NEXT_PUBLIC_AES_SECRET`**: Production AES client encryption key
- **`MONGODB_URI`**: Production MongoDB Atlas connection string
- **`SECRET_KEY`**: Production JWT authentication secret key
- **`DOWNLOAD_ENCRYPTION_KEY`**: Server-side AES-256-GCM 64-character hex link signing key

---

## 💻 Reproducing CI Locally

Developers can reproduce all CI quality gates locally before pushing changes:

```bash
# 1. Install dependencies
npm run install:all

# 2. Run ESLint code quality checks
npm run lint

# 3. Validate backend syntax
node --check backend/main.js

# 4. Run Next.js production build validation
npm run build
```

---

## 🛡️ Recommended Branch Protection Rules

In GitHub Repository Settings ➔ Branches ➔ Add rule for `main`:

1. Check **Require a pull request before merging**.
2. Check **Require status checks to pass before merging**:
   - `ESLint Validation`
   - `Backend Syntax & Module Validation`
   - `Production Build Validation`
3. Check **Require branches to be up to date before merging**.
4. Check **Do not allow bypassing the above settings**.
