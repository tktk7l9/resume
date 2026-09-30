import { describe, expect, it } from "vitest";
import {
  careerStarts,
  formatExperienceYears,
  yearsSince,
} from "@/lib/experience-years";

describe("yearsSince", () => {
  it("rounds to the nearest half year", () => {
    const now = new Date(2026, 9, 1);
    expect(yearsSince("2018-04", now)).toBe(8.5);
    expect(yearsSince("2021-03", now)).toBe(5.5);
    expect(yearsSince("2026-08", now)).toBe(0);
  });

  it("never goes negative for a future start", () => {
    expect(yearsSince("2030-01", new Date(2026, 0, 1))).toBe(0);
  });

  it("keeps the career start dates aligned with the résumé", () => {
    expect(careerStarts.engineer).toBe("2018-04");
    expect(careerStarts.frontend).toBe(careerStarts.remote);
  });
});

describe("formatExperienceYears", () => {
  it("phrases whole and half years per language", () => {
    expect(formatExperienceYears("2018-04", new Date(2026, 9, 1))).toEqual({
      ja: "8 年半",
      en: "8.5 years",
      enValue: "8.5",
    });
    expect(formatExperienceYears("2018-04", new Date(2026, 3, 1))).toEqual({
      ja: "8 年",
      en: "8 years",
      enValue: "8",
    });
  });

  it("handles the first year specially", () => {
    expect(formatExperienceYears("2026-01", new Date(2026, 1, 1)).ja).toBe(
      "半年未満",
    );
    expect(formatExperienceYears("2026-01", new Date(2026, 7, 1)).ja).toBe(
      "半年",
    );
    expect(formatExperienceYears("2025-01", new Date(2026, 1, 1)).en).toBe(
      "1 year",
    );
  });
});
