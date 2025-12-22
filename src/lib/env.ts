type OptionalString = string | undefined;

export const env = {
  authProvider: process.env.NEXT_PUBLIC_AUTH_PROVIDER as OptionalString,
  authSecret: process.env.AUTH_SECRET as OptionalString,
  authUrl: process.env.AUTH_URL as OptionalString,
};
