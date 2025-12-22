# Auth scaffold

This template ships a pluggable auth surface in `src/lib/auth/index.ts`. By default it is disabled and returns `null` sessions.

## Enable Auth.js (NextAuth)

1. Configure environment variables:

```
AUTH_URL=http://localhost:3000
AUTH_SECRET=your-secret
NEXT_PUBLIC_AUTH_PROVIDER=authjs
```

2. Add providers in `src/lib/auth/authjs.ts`. Example:

```ts
import GitHub from "next-auth/providers/github";

const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub({ clientId: "", clientSecret: "" })],
  // ...
});
```

3. Create the Auth.js route handler in `src/app/api/auth/[...nextauth]/route.ts` and export the handlers:

```ts
export { handlers as GET, handlers as POST } from "@/lib/auth/authjs";
```

Notes:
- Cookie defaults are HttpOnly, `SameSite=Lax`, and Secure in production.
- Use `getSession()` or `requireUser()` from `src/lib/auth/index.ts` in server components and actions.
