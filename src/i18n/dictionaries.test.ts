import { describe, expect, it } from "vitest";
import en from "@/i18n/dictionaries/en";
import ja from "@/i18n/dictionaries/ja";

function keyPaths(value: unknown, prefix = ""): string[] {
  if (value === null || typeof value !== "object") return [prefix];
  return Object.entries(value).flatMap(([key, child]) =>
    keyPaths(child, prefix ? `${prefix}.${key}` : key),
  );
}

function leaves(value: unknown): unknown[] {
  if (value === null || typeof value !== "object") return [value];
  return Object.values(value).flatMap(leaves);
}

describe("dictionaries", () => {
  it("ja and en define exactly the same keys", () => {
    expect(keyPaths(en).sort()).toEqual(keyPaths(ja).sort());
  });

  it("has no empty strings in either language", () => {
    for (const dict of [ja, en]) {
      for (const leaf of leaves(dict)) {
        if (typeof leaf === "string") expect(leaf.trim()).not.toBe("");
      }
    }
  });
});
