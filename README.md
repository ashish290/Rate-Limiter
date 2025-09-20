# Rate Limiter Middleware (Express.js)

## 📌 Overview
This project implements a **rate-limiting middleware** for an Express.js application. The middleware ensures that each user can only make a limited number of requests within a defined time window. If the user exceeds the limit, the server responds with an HTTP `429 Too Many Requests` error.

---

## 🚀 Features
- Allows **5 requests per minute per user** (default).
- Users are uniquely identified by a **UUID v4**.
- Request counters are stored in an **in-memory Map**.
- **Automatic reset** of request counts after the configured time window.
- Works **globally** across all routes.
- Returns helpful **rate-limit headers**:
  - `X-RateLimit-Limit` → Maximum requests allowed.
  - `X-RateLimit-Remaining` → Requests left in the current window.
  - `X-RateLimit-Reset` → Time (in seconds) until reset.
- Configurable with **environment variables**:
  - `RATE_LIMIT` → Maximum requests allowed (default: `5`).
  - `RATE_WINDOW_SEC` → Window duration in seconds (default: `60`).
- Friendly JSON error response on exceeding limit:
  ```json
  {
    "error": "rate_limited",
    "message": "Too many requests, please try again later."
  }
