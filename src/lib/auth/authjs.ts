import "server-only";

import NextAuth, { type Session } from "next-auth";

const secureCookies = process.env.NODE_ENV === "production";

const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [],
  session: { strategy: "jwt" },
  cookies: {
    sessionToken: {
      name: "next-auth.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: secureCookies,
      },
    },
    callbackUrl: {
      name: "next-auth.callback-url",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: secureCookies,
      },
    },
    csrfToken: {
      name: "next-auth.csrf-token",
      options: {
        httpOnly: false,
        sameSite: "lax",
        path: "/",
        secure: secureCookies,
      },
    },
  },
});

export { handlers, signIn, signOut };

export async function getSession(): Promise<Session | null> {
  return auth();
}

export async function requireUser() {
  const session = await auth();

  if (!session?.user) {
    throw new Error("No active session.");
  }

  return session.user;
}
