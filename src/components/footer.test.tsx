import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Footer } from "@/components/footer";
import en from "@/i18n/dictionaries/en";
import ja from "@/i18n/dictionaries/ja";

afterEach(() => vi.useRealTimers());

describe("Footer", () => {
  it("shows the copyright with the current year and the localized name", () => {
    vi.useFakeTimers({ now: new Date(2031, 0, 15) });
    render(<Footer locale="ja" dict={ja} />);
    expect(screen.getByRole("contentinfo")).toHaveTextContent(
      "© 2031 齋藤 拓也",
    );
  });

  it("uses the English name on the English page", () => {
    vi.useFakeTimers({ now: new Date(2027, 5, 1) });
    render(<Footer locale="en" dict={en} />);
    expect(screen.getByRole("contentinfo")).toHaveTextContent(
      "© 2027 Takuya Saito",
    );
  });
});
