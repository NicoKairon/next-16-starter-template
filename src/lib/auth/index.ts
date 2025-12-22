import "server-only";

import type { Session } from "next-auth";

import { env } from "@/lib/env";

export type AuthUser = NonNullable<Session["user"]>;

export type AuthSession = Session | null;

export async function getSession(): Promise<AuthSession> {
  if (env.authProvider === "authjs") {
    const { getSession } = await import("@/lib/auth/authjs");
    return getSession();
  }

  return null;
}

export async function requireUser(): Promise<AuthUser> {
  const session = await getSession();

  if (!session?.user) {
    throw new Error("Auth is not enabled. See docs/auth.md to turn it on.");
  }

  return session.user;
}

export async function signIn() {
  if (env.authProvider === "authjs") {
    const { signIn } = await import("@/lib/auth/authjs");
    return signIn();
  }

  throw new Error("Auth is not enabled. See docs/auth.md to turn it on.");
}

export async function signOut() {
  if (env.authProvider === "authjs") {
    const { signOut } = await import("@/lib/auth/authjs");
    return signOut();
  }

  throw new Error("Auth is not enabled. See docs/auth.md to turn it on.");
}
