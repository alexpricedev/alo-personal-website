# Security Features

## CSRF Protection

CSRF uses HMAC tokens bound to HTTP method and path, derived from an HttpOnly `anon_id` cookie and an in-process signing key (see `src/server/utils/crypto.ts`). Mutating requests require `Origin` or `Referer` to match the request URL’s origin (or a caller-supplied `expectedOrigin` in middleware options).

### Key features

- **Origin/Referer validation** on mutating requests
- **Rate limiting** on failed CSRF verification attempts (per anonymous id)
- **Timing-safe comparison** of token material

### Usage

Generate a token where you render a form (same `anon_id` as the browser will send on POST):

```typescript
import { getRequestContext } from "../../middleware/request-context";
import { setAnonCookie } from "../../services/anon-cookie";
import { createCsrfToken } from "../../services/csrf";

const ctx = getRequestContext(req);
if (ctx.requiresSetCookie) setAnonCookie(req, ctx.anonId);
const token = createCsrfToken(ctx.anonId, "POST", "/your-path");
```

Validate on POST:

```typescript
import { csrfProtection } from "../../middleware/csrf";

const blocked = await csrfProtection(req, { method: "POST", path: "/your-path" });
if (blocked) return blocked;
```

## Environment

CSRF and flash signing do not use configurable secrets — no auth-related environment variables are required for those features.
