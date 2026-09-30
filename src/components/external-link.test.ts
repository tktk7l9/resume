import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { ExternalLink } from "@/components/external-link";

const hint = "（新しいタブで開く）";

// ExternalLink is a plain server component, so it can be called directly
// without a DOM; the file stays *.test.ts to match the vitest include.
function render(props: Parameters<typeof ExternalLink>[0]) {
  return renderToStaticMarkup(ExternalLink(props));
}

describe("ExternalLink", () => {
  it("opens in a new tab and says so for screen readers", () => {
    const html = render({
      href: "https://example.com",
      newTabHint: hint,
      children: "Example Inc.",
    });
    expect(html).toContain('target="_blank"');
    expect(html).toContain('rel="noopener noreferrer"');
    expect(html).toContain("Example Inc.");
    expect(html).toContain(`<span class="sr-only">${hint}</span>`);
  });

  it("appends the hint to aria-label on icon-only links", () => {
    const html = render({
      href: "https://github.com/x",
      ariaLabel: "GitHub",
      newTabHint: hint,
      children: "icon",
    });
    expect(html).toContain(`aria-label="GitHub${hint}"`);
    expect(html).not.toContain("sr-only");
  });

  it("renders no hint when none is given", () => {
    const html = render({ href: "https://example.com", children: "x" });
    expect(html).not.toContain("sr-only");
    expect(html).not.toContain("aria-label");
  });
});
