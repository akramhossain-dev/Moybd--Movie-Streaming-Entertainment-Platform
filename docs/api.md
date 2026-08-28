# Moybd API Specification

## Overview

The Moybd backend exposes a RESTful HTTP API running under the `/api` prefix. Standard response envelopes use JSON formatted as:

```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": []
}
```

Error responses return standard HTTP status codes (`400`, `401`, `403`, `404`, `429`, `500`) with structured error messages:

```json
{
  "success": false,
  "message": "Error description"
}
```

---

## API Endpoint Inventory

| Method | Endpoint | Authentication | Authorization | Purpose |
|--------|----------|----------------|---------------|---------|
| `POST` | `/api/auth/register` | None (Rate Limited) | Public | Initiate user registration & send email verification code |
| `POST` | `/api/auth/verify` | None | Public | Verify code & create user account |
| `POST` | `/api/auth/login` | None (Rate Limited) | Public | Authenticate user & issue HttpOnly JWT cookie |
| `POST` | `/api/auth/logout` | None | Public | Clear `auth_token` cookie |
| `POST` | `/api/auth/forgot-password` | None (Rate Limited) | Public | Send password reset code via email |
| `POST` | `/api/auth/reset-password` | None | Public | Reset password using reset code |
| `GET` | `/api/auth/me` | JWT Cookie / Bearer | Authenticated User | Fetch profile metadata for current session |
| `GET` | `/api/dashboard/publicmovies` | None | Public | Retrieve published movies (sanitized output) |
| `GET` | `/api/dashboard/latestmovies` | None | Public | Retrieve latest published movies |
| `GET` | `/api/dashboard/movie` | None | Public | Retrieve published feature films |
| `GET` | `/api/dashboard/series` | None | Public | Retrieve published TV & web series |
| `GET` | `/api/dashboard/search` | None | Public | Query titles/genres with server-side regex search |
| `GET` | `/api/dashboard/` | JWT Cookie / Bearer | Admin (`admin`/`jmhub`) | Fetch administrative catalog metrics |
| `GET` | `/api/dashboard/users` | JWT Cookie / Bearer | Admin (`admin`/`jmhub`) | Fetch user accounts list (passwords excluded) |
| `DELETE` | `/api/dashboard/users/:id` | JWT Cookie / Bearer | Admin (`admin`/`jmhub`) | Delete specified user account |
| `PUT` | `/api/dashboard/users/:id` | JWT Cookie / Bearer | Admin (`admin`/`jmhub`) | Update role for specified user |
| `GET` | `/api/dashboard/draftmovies` | JWT Cookie / Bearer | Admin (`admin`/`jmhub`) | Retrieve movies in Draft status |
| `POST` | `/api/movie/post` | JWT Cookie / Bearer | Admin (`admin`/`jmhub`) | Publish new movie or series entry |
| `GET` | `/api/movie/:id` | None | Public | Retrieve full movie metadata document by ID |
| `PUT` | `/api/movie/:id` | JWT Cookie / Bearer | Admin (`admin`/`jmhub`) | Update existing movie or series entry |
| `DELETE` | `/api/movie/:id` | JWT Cookie / Bearer | Admin (`admin`/`jmhub`) | Delete specified movie entry |
| `GET` | `/api/genre/:genre` | None | Public | Retrieve published items by genre (sanitized output) |
| `POST` | `/api/download/request` | None (Rate Limited) | Public | Request encrypted single-use download token |
| `GET` | `/api/download/file` | None | Public | Decrypt token & redirect to target media URL |
| `POST` | `/api/comments/new` | JWT Cookie / Bearer | Authenticated User | Submit new user comment |
| `PUT` | `/api/comments/update/:id` | JWT Cookie / Bearer | Owner / Admin | Update comment content or status |
| `DELETE` | `/api/comments/delete/:id` | JWT Cookie / Bearer | Owner / Admin | Delete comment & pull ref from movie |
| `GET` | `/api/comments/published` | None | Public | Fetch published comments |
| `GET` | `/api/comments/draft` | JWT Cookie / Bearer | Admin (`admin`/`jmhub`) | Fetch draft comments for moderation |
| `GET` | `/api/comments/all` | JWT Cookie / Bearer | Admin (`admin`/`jmhub`) | Fetch all comments across catalog |
| `POST` | `/api/captcha/verify` | None | Public | Verify Google reCAPTCHA v3 site token |
| `POST` | `/api/contact/submit` | None | Public | Submit user contact form message |

---

## Detailed Endpoint Documentation

### Authentication APIs

#### 1. Login (`POST /api/auth/login`)
- **Authentication**: None
- **Rate Limit**: 10 requests / 15 mins
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "userpassword"
  }
  ```
- **Response** (`200 OK`): Sets HTTP-Only `auth_token` cookie.
  ```json
  {
    "success": true,
    "message": "User logged in successfully",
    "token": "eyJhbGciOiJIUzI1Ni...",
    "user": {
      "id": "673f1a2b...",
      "name": "John Doe",
      "email": "user@example.com",
      "role": "user"
    }
  }
  ```

#### 2. Get Authenticated User Profile (`GET /api/auth/me`)
- **Authentication**: JWT Cookie (`auth_token`) or `Authorization: Bearer <token>`
- **Response** (`200 OK`):
  ```json
  {
    "success": true,
    "user": {
      "userId": "673f1a2b...",
      "name": "John Doe",
      "email": "user@example.com",
      "role": "user"
    }
  }
  ```

---

### Search & Catalog APIs

#### 1. Search Catalog (`GET /api/dashboard/search`)
- **Parameters**: `q` (query string, required)
- **Response** (`200 OK`):
  ```json
  {
    "success": true,
    "data": [
      {
        "_id": "673f8e...",
        "title": "Inception",
        "slug": "inception-2010",
        "category": "Bollywood",
        "titlecategory": "Movies",
        "hasDownload": true,
        "availableResolutions": ["480p", "720p", "1080p"]
      }
    ]
  }
  ```

#### 2. Public Movies List (`GET /api/dashboard/publicmovies`)
- **Parameters**: `page` (optional, default: 1), `limit` (optional, default: 100)
- **Response** (`200 OK`): Returns array of sanitized movie documents (raw download URLs removed).

---

### Protected Admin APIs

#### 1. Create Movie (`POST /api/movie/post`)
- **Authentication**: JWT Cookie / Bearer Header
- **Authorization**: Admin (`admin` or `jmhub`)
- **Request Body**:
  ```json
  {
    "title": "Movie Title",
    "slug": "movie-title-2026",
    "titlecategory": "Movies",
    "status": "Publish",
    "downloadlink": {
      "720p": "https://storage.cdn.com/file720.mp4"
    }
  }
  ```
- **Response** (`201 Created`): Returns created movie document.

#### 2. User Accounts List (`GET /api/dashboard/users`)
- **Authentication**: JWT Cookie / Bearer Header
- **Authorization**: Admin (`admin` or `jmhub`)
- **Response** (`200 OK`): Returns array of user documents. Password hashes (`password`) are strictly excluded via projection `.select('-password')`.

---

### Download Subsystem APIs

#### 1. Request Download Authorization (`POST /api/download/request`)
- **Rate Limit**: 15 requests / 1 min
- **Request Body**:
  ```json
  {
    "movieId": "673f8e...",
    "resolution": "720p",
    "type": "movie",
    "episodeIndex": 0
  }
  ```
- **Response** (`200 OK`):
  ```json
  {
    "success": true,
    "downloadUrl": "/api/download/file?token=a1b2c3d4..."
  }
  ```

#### 2. Execute Download / Stream (`GET /api/download/file`)
- **Parameters**: `token` (encrypted payload token, required)
- **Behavior**: Decrypts token with `DOWNLOAD_ENCRYPTION_KEY`. Validates 1-hour expiration timestamp. Redirects (`302 Found`) to target storage URL.

---

### Unimplemented Features

> [!NOTE]
> **NOT IMPLEMENTED**: Media File Upload Endpoints (`/api/upload/*`). Media assets are referenced via external HTTPS URL strings.
