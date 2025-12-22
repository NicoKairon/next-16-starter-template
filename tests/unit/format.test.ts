import { describe, expect, it } from "vitest";

import { formatCount } from "@/lib/format";

describe("formatCount", () => {
  it("formats numbers with commas", () => {
    expect(formatCount(12345)).toBe("12,345");
  });
});
