# Security Policy

## Supported Versions

We actively issue security updates and patches for the following versions of Moybd:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

If you discover a security vulnerability or security bug within the Moybd Movie Streaming Platform, please **do not** open a public issue on GitHub.

Instead, please report security issues by emailing our team directly:

- **Email**: `security@moybd.sbs`
- **Response Time**: You will receive an initial response within 24–48 hours.

Please include the following details in your report:
- Type of issue (e.g., authentication bypass, XSS, CORS misconfiguration, secret leakage)
- Location of the vulnerability (file name, endpoint, line number if known)
- Steps to reproduce or proof-of-concept (PoC)
- Potential impact of the vulnerability

## Security Architecture Summary

- **Authentication**: JWT tokens issued via HttpOnly, SameSite cookies.
- **Authorization**: Server-side middleware (`verifyToken`, `verifyAdmin`) protecting sensitive endpoints.
- **Data Protection**: Direct streaming/download URLs encrypted at rest using AES-256-GCM.
- **Rate Limiting**: Configured for authentication and download endpoints to mitigate brute force and DoS.
- **Headers**: Production security headers enforced via `helmet`.
