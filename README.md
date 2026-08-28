# Moybd

## Overview

Moybd is a full-stack movie and web series streaming and downloading platform built with Next.js App Router and Express.js. It features content browsing, dynamic catalog filtering, server-side search, a secure single-use download token system, user authentication, and an administrative dashboard for content moderation and user management.

## Features

- **Content Catalog**: Browse featured movies, TV series, anime, and category listings (Action, Bollywood, Hollywood, South, etc.).
- **Dynamic Search**: Server-side search API with debounced autocomplete query support.
- **Secure Download Gateway**: Server-side tokenized AES-256 link generation preventing direct exposure of underlying media storage URLs.
- **Authentication**: User registration with email verification codes, password reset flow, and HttpOnly JWT cookie sessions.
- **Role-Based Access Control**: Protected admin dashboard routes and admin API endpoints (`admin` / `jmhub` roles).
- **Interactive Moderation**: Comment submission, status approval (`Publish` vs `Draft`), and moderation panel.
- **Responsive Dark UI**: Custom dark-themed layout built with React, Tailwind CSS, Swiper, and Boxicons.
- **SEO & Social Sharing**: Dynamic Next.js App Router sitemap generation (`/sitemap.xml`) and per-movie Open Graph / Twitter Card metadata.

## Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19, Tailwind CSS, Axios, Swiper, JS-Cookie, React Icons, Boxicons.
- **Backend**: Node.js, Express.js (ES Modules), Mongoose, Bcrypt, JsonWebToken, Helmet, Morgan, Express-Rate-Limit, Nodemailer.
- **Database**: MongoDB (Cloud Atlas / local instance).
- **Containerization & CI/CD**: Docker, Docker Compose, GitHub Actions.

## Architecture

Moybd employs a decoupled architecture separating the Next.js client-rendered frontend from the Express REST API backend. Authentication is governed via HttpOnly JWT cookies and verified via Express middleware on protected backend endpoints.

For detailed system diagrams, data flow models, and database schema documentation, see [docs/architecture.md](docs/architecture.md).

## Getting Started

For local installation, environment variable configuration, and development commands, see [docs/development.md](docs/development.md).

## API

For complete REST API endpoint specifications, request/response formats, and authentication requirements, see [docs/api.md](docs/api.md).

## Security

For authentication details, authorization controls, rate limiting, and security header configurations, see [docs/security.md](docs/security.md).

## Deployment

For Docker container setup, environment variable management, and GitHub Actions CI/CD workflows, see [docs/deployment.md](docs/deployment.md).

## Project Structure

```text
.
├── backend/
│   ├── api/             # Express API route declarations
│   ├── controllers/     # Controller business logic
│   ├── libs/            # Shared utilities (DB connection, sanitization, crypto)
│   ├── middleware/      # JWT verification, role check, rate limiters
│   ├── models/          # Mongoose database schemas (User, Post, Comment, Token)
│   ├── main.js          # Express application entry point
│   └── Dockerfile       # Backend container definition
├── frontend/
│   ├── app/             # Next.js App Router pages and dynamic routes
│   ├── next.config.mjs  # Next.js configuration
│   └── Dockerfile       # Frontend container definition
├── docs/                # Architecture, API, Development, Security, & Deployment docs
├── docker-compose.yml   # Multi-container production deployment definition
└── README.md            # Repository overview
```

## License

This project is licensed under the Apache License 2.0. See [LICENSE](LICENSE) for details.
