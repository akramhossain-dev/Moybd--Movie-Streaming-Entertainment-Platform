# Moybd Security Architecture & Controls

## Executive Security Summary

The Moybd platform implements defense-in-depth security controls across the application layer, authentication handlers, data storage layer, and media download subsystem.

---

## Implemented Security Controls

### 1. Authentication & Session Management
- **Implementation Status**: `IMPLEMENTED`
- **Mechanism**: User logins issue standard signed JSON Web Tokens (JWT) using `jsonwebtoken` and `process.env.SECRET_KEY`.
- **Cookie Security**: Auth tokens are dispatched in HTTP-Only cookies (`auth_token`) with `sameSite: 'strict'`, `httpOnly: true`, and `secure: true` in production environments.
- **Session Profile Verification**: The frontend validates admin authorization by calling the backend profile endpoint `GET /api/auth/me`. Client-side token decryption was removed; no secret keys are exposed to browser JavaScript bundles.

### 2. Authorization & Access Control
- **Implementation Status**: `IMPLEMENTED`
- **Middleware Guard**: Protected API endpoints execute Express middleware prior to controller execution:
  - `verifyToken`: Decodes and validates JWT integrity.
  - `verifyAdmin`: Enforces user role restriction (`admin` or `jmhub`).
- **Resource Ownership**: Comment mutation endpoints (`PUT /api/comments/update/:id`, `DELETE /api/comments/delete/:id`) verify that the calling user matches the comment `userId` or possesses administrative status.

### 3. Password Security
- **Implementation Status**: `IMPLEMENTED`
- **Mechanism**: Passwords are hashed using `bcrypt` with a work factor of 10 salt rounds prior to storage.
- **Data Projection**: Password hashes are strictly excluded from API outputs via Mongoose projection (`User.find().select('-password')`).

### 4. Temporary Token Storage (TTL)
- **Implementation Status**: `IMPLEMENTED`
- **Mechanism**: Email verification and password reset codes are stored in the MongoDB `tokens` collection rather than volatile Node.js process memory.
- **Expiration**: Documents automatically expire after 10 minutes (600 seconds) via a MongoDB Time-To-Live (TTL) index (`createdAt`).

### 5. Download Subsystem Security
- **Implementation Status**: `IMPLEMENTED`
- **URL Protection**: Raw media stream/download URLs are never exposed in public API responses. `sanitizeMovieForPublic()` strips all direct link structures.
- **Token Generation**: Requests to `/api/download/request` construct an AES-256-CBC encrypted token containing the target destination URL and an expiration timestamp (1 hour).
- **Key Isolation**: The encryption key (`DOWNLOAD_ENCRYPTION_KEY`) resides exclusively on the Express backend server and is never transmitted to clients.

### 6. Security Headers & CORS
- **Implementation Status**: `IMPLEMENTED`
- **Security Headers**: `helmet({ crossOriginResourcePolicy: false })` is attached to Express globally, enforcing `X-Content-Type-Options`, `X-Frame-Options`, and `Strict-Transport-Security`.
- **CORS Lockdown**: Cross-Origin Resource Sharing is locked down in `backend/main.js` using `corsOptions` with dynamic origin matching against `process.env.ALLOWED_ORIGINS`.

### 7. Rate Limiting
- **Implementation Status**: `IMPLEMENTED`
- **Middleware**: Express endpoints utilize `express-rate-limit` to prevent brute-force attacks and abuse:
  - `POST /api/auth/login`: 10 requests / 15 minutes.
  - `POST /api/auth/register`: 5 requests / 1 hour.
  - `POST /api/auth/forgot-password`: 5 requests / 1 hour.
  - `POST /api/download/request`: 15 requests / 1 minute.

### 8. Secret Management
- **Implementation Status**: `IMPLEMENTED`
- **Git Tracking**: `.gitignore` excludes `.env`, `*.env`, `.env.*`, `.env.local` recursively. Live secrets are excluded from Git commits.

### 9. Token Revocation & Blacklisting
- **Implementation Status**: `IMPLEMENTED`
- **Mechanism**: JWTs include a unique `jti` claim. Upon logout or admin revocation, the token `jti` is stored in the MongoDB `RevokedToken` collection with an automatic 7-day TTL expiration index (`expires: 604800`). `verifyToken` checks the revocation list before granting access.

### 10. Anti-CSRF Token Validation
- **Implementation Status**: `IMPLEMENTED`
- **Mechanism**: Anti-CSRF double-submit token verification middleware (`verifyCSRF`) generates an `XSRF-TOKEN` cookie and enforces `X-CSRF-Token` or `X-XSRF-TOKEN` header validation on state-changing HTTP requests (`POST`, `PUT`, `DELETE`).

### 11. Content Security Policy (CSP)
- **Implementation Status**: `IMPLEMENTED`
- **Mechanism**: `helmet.contentSecurityPolicy` directives enforce restrictive source origin policies for `default-src`, `script-src` (Google reCAPTCHA), `style-src` (Google Fonts), `img-src` (external movie posters), `media-src` (video streaming targets), and `frame-src` (YouTube & Google embeds).
