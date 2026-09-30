import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

// The 404 page cannot be rendered under Vitest (async server component), so
// guard its one non-obvious constraint at the source level: a `metadata`
// export is silently dropped on hydration for not-found.js, leaving the
// document untitled, which axe reports as document-title.
const source = readFileSync(
  new URL("./not-found.tsx", import.meta.url),
  "utf8",
);

describe("not-found page", () => {
  it("renders its title inline instead of exporting metadata", () => {
    expect(source).not.toMatch(
      /export (const|async function|function) (metadata|generateMetadata)\b/,
    );
    expect(source).toMatch(/<title>[^<]+<\/title>/);
  });
});
