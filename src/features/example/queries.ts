import { useQuery } from "@tanstack/react-query";

export const exampleQueryKeys = {
  all: ["example"] as const,
  detail: () => [...exampleQueryKeys.all, "detail"] as const,
};

export type ExamplePayload = {
  title: string;
  description: string;
};

async function fetchExample(): Promise<ExamplePayload> {
  const response = await fetch("/example.json");

  if (!response.ok) {
    throw new Error("Failed to load example payload");
  }

  return response.json() as Promise<ExamplePayload>;
}

export function useExampleQuery() {
  return useQuery({
    queryKey: exampleQueryKeys.detail(),
    queryFn: fetchExample,
  });
}
