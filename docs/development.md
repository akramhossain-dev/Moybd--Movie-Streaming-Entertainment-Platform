# Moybd Local Development Guide

## Prerequisites

Ensure your environment meets the following requirements before setting up Moybd locally:

- **Node.js**: `v20.x` or higher (LTS recommended)
- **npm**: `v10.x` or higher
- **MongoDB**: `v6.0`+ local instance or a MongoDB Atlas connection string
- **Git**: Installed and configured

---

## Environment Variables

Copy `.env.example` templates to `.env` in both the `backend/` and `frontend/` directories.

### Backend Environment Variables (`backend/.env`)

| Variable | Required | Scope | Purpose | Example Value |
|----------|----------|-------|---------|---------------|
| `PORT` | No | SERVER-ONLY | Express HTTP port (default: 5000) | `8080` |
| `MONGODB_URI` | Yes | SERVER-ONLY | MongoDB connection URI | `mongodb://127.0.0.1:27017/moybd` |
| `SECRET_KEY` | Yes | SERVER-ONLY | Secret key used to sign JWT auth tokens | `local_dev_jwt_secret_key` |
| `RECAPTCHA_SECRET_KEY` | Yes | SERVER-ONLY | Google reCAPTCHA v3 site secret key | `your_recaptcha_secret_key` |
| `EMAIL_USER` | Yes | SERVER-ONLY | Nodemailer Gmail address for verification codes | `your_email@gmail.com` |
| `EMAIL_PASS` | Yes | SERVER-ONLY | Nodemailer Gmail app-specific password | `your_app_password` |
| `DOWNLOAD_ENCRYPTION_KEY` | Yes | SERVER-ONLY | 64-char hex key for AES-256-CBC link encryption | `c8f94e1d3b7a5...` |
| `ALLOWED_ORIGINS` | No | SERVER-ONLY | Comma-separated CORS allowed origin origins | `http://localhost:3000,https://moybd.sbs` |

### Frontend Environment Variables (`frontend/.env`)

| Variable | Required | Scope | Purpose | Example Value |
|----------|----------|-------|---------|---------------|
| `NEXT_PUBLIC_API_URL` | Yes | PUBLIC | Base URL of backend REST API | `http://localhost:8080` |

---

## Installation

Run the following commands from the project root directory:

```bash
# 1. Clone repository
git clone https://github.com/akramhossain-dev/Moybd--Movie-Streaming-Entertainment-Platform.git
cd Moybd--Movie-Streaming-Entertainment-Platform

# 2. Install root, frontend, and backend dependencies
npm run install:all
```

Or install dependencies manually per project directory:

```bash
cd backend && npm install
cd ../frontend && npm install
```

---

## Local Development

To start both frontend and backend development servers concurrently from the root directory:

```bash
npm run dev
```

Or run services individually:

```bash
# Backend development server (runs nodemon on port 8080)
npm run backend

# Frontend development server (runs Next.js on port 3000)
npm run frontend
```

Access services locally:
- **Frontend App**: `http://localhost:3000`
- **Backend API**: `http://localhost:8080`
- **Health Check**: `http://localhost:8080/api/health`

---

## Available Scripts

The repository `package.json` defines the following scripts:

### Root Scripts (`package.json`)
- `npm run dev`: Runs frontend and backend concurrently.
- `npm run frontend`: Navigates to `frontend/` and starts Next.js dev server (`npm run dev`).
- `npm run backend`: Navigates to `backend/` and starts Express dev server with nodemon (`npm run dev`).
- `npm run build`: Navigates to `frontend/` and builds Next.js production bundle (`npm run build`).
- `npm run build:frontend`: Alias for `npm run build`.
- `npm run lint`: Runs ESLint on frontend (`npm run lint`).
- `npm run lint:frontend`: Alias for `npm run lint`.
- `npm run install:all`: Installs dependencies in both `frontend/` and `backend/`.
- `npm run install:frontend`: Installs dependencies in `frontend/`.
- `npm run install:backend`: Installs dependencies in `backend/`.

### Backend Scripts (`backend/package.json`)
- `npm run dev`: Runs Express server using `nodemon main.js`.
- `npm run start`: Runs Express server using `node main.js`.

### Frontend Scripts (`frontend/package.json`)
- `npm run dev`: Starts Next.js development server (`next dev`).
- `npm run build`: Compiles optimized Next.js production build (`next build`).
- `npm run start`: Starts Next.js production server (`next start`).
- `npm run lint`: Runs Next.js ESLint validation (`next lint`).

---

## Production Build

To test production build compilation locally:

```bash
# Validate backend JavaScript syntax
node --check backend/main.js

# Compile frontend production bundle
npm run build
```

---

## Project Structure

```text
Moybd--Movie-Streaming-Entertainment-Platform/
├── backend/
│   ├── api/             # Express API route modules
│   ├── controllers/     # Request handlers and business logic
│   ├── libs/            # Database connection, sanitization, crypto helpers
│   ├── middleware/      # verifyToken, verifyAdmin, rate limiters
│   ├── models/          # Mongoose schemas (User, Post, Comment, Token)
│   ├── main.js          # Express entry point
│   ├── package.json     # Backend dependencies
│   └── Dockerfile       # Backend container build definition
├── frontend/
│   ├── app/             # Next.js App Router (pages, dynamic routes, layouts)
│   ├── component/       # React UI components (Navbar, Footer, Slider, Cards)
│   ├── next.config.mjs  # Next.js configuration (images, output standalone)
│   ├── package.json     # Frontend dependencies
│   └── Dockerfile       # Frontend container build definition
├── docs/                # Project engineering documentation
├── docker-compose.yml   # Multi-container production compose file
├── .gitignore           # Git untracked path specifications
└── README.md            # Root documentation entry point
```

---

## Database Setup

1. Ensure MongoDB service is running locally (`mongodb://127.0.0.1:27017`) or supply a remote URI in `backend/.env`.
2. Indexes (`email`, `slug`, `{ status: 1, category: 1 }`, `{ status: 1, titlecategory: 1 }`) and TTL indexes (`tokens` 10-min expiration) build automatically via Mongoose on application startup.

---

## Troubleshooting

- **MongoDB Connection Error**: Verify `MONGODB_URI` in `backend/.env` and ensure the database daemon is running.
- **CORS Error**: Check `ALLOWED_ORIGINS` in `backend/.env` to confirm `http://localhost:3000` is listed.
- **Port Conflict**: If port `8080` or `3000` is in use, modify `PORT` in `backend/.env` or set `PORT=3001` for Next.js.
