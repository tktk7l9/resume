import { describe, expect, it } from "vitest";
import en from "@/i18n/dictionaries/en";
import ja from "@/i18n/dictionaries/ja";
import { formatDate } from "@/lib/format-date";

describe("formatDate", () => {
  it("counts months inclusively", () => {
    expect(formatDate("2026-04", "2026-09", "ja", ja).formattedPeriod).toBe(
      "6ヶ月",
    );
    expect(formatDate("2025-03", "2026-03", "ja", ja).formattedPeriod).toBe(
      "1年1ヶ月",
    );
  });

  it("rolls twelve months over into a whole year", () => {
    expect(formatDate("2012-04", "2018-03", "ja", ja).formattedPeriod).toBe(
      "6年",
    );
    expect(formatDate("2020-01", "2020-12", "ja", ja).formattedPeriod).toBe(
      "1年",
    );
    expect(formatDate("2012-04", "2018-03", "en", en).formattedPeriod).toBe(
      "6y",
    );
  });

  it("treats a single month as one month", () => {
    expect(formatDate("2020-05", "2020-05", "ja", ja).formattedPeriod).toBe(
      "1ヶ月",
    );
  });

  it("formats the start-end label per locale", () => {
    expect(formatDate("2021-07", "2024-08", "ja", ja).periodStartEndLabel).toBe(
      "2021年7月 - 2024年8月",
    );
    expect(formatDate("2021-07", "2024-08", "en", en).periodStartEndLabel).toBe(
      "Jul 2021 - Aug 2024",
    );
  });

  it("wraps the period in locale-appropriate parentheses", () => {
    expect(formatDate("2021-07", "2024-08", "ja", ja).periodLabel).toBe(
      "（3年2ヶ月）",
    );
    expect(formatDate("2021-07", "2024-08", "en", en).periodLabel).toBe(
      "(3y 2mo)",
    );
  });

  it("uses the present label for ongoing items", () => {
    const now = new Date(2026, 8, 15);
    const result = formatDate("2026-04", undefined, "en", en, now);
    expect(result.periodStartEndLabel).toBe("Apr 2026 - Present");
    expect(result.formattedPeriod).toBe("6mo");
  });
});
