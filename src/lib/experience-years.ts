import { differenceInMonths, parse } from "date-fns";

/**
 * Career start dates (yyyy-MM), aligned with entries in `src/data/experience.ts`.
 * - engineer: first professional role (ISOL training, 2018-04)
 * - frontend / remote: CAPS frontend role (2021-07)
 */
export const careerStarts = {
  engineer: "2018-04",
  frontend: "2021-07",
  remote: "2021-07",
} as const;

export type ExperienceYearsLabel = {
  /** e.g. "8 年半" / "8 年" */
  ja: string;
  /** e.g. "8.5 years" / "8 years" */
  en: string;
  /** Numeric phrase without unit, e.g. "8.5" / "8" */
  enValue: string;
};

/** Round month span to the nearest half-year (0.5 increments). */
export function yearsSince(startDate: string, now = new Date()): number {
  const start = parse(startDate, "yyyy-MM", now);
  const months = Math.max(0, differenceInMonths(now, start));
  return Math.round(months / 6) / 2;
}

export function formatExperienceYears(
  startDate: string,
  now = new Date(),
): ExperienceYearsLabel {
  const years = yearsSince(startDate, now);
  const isHalf = years % 1 !== 0;
  const whole = Math.floor(years);

  let ja: string;
  if (years === 0) {
    ja = "半年未満";
  } else if (years === 0.5) {
    ja = "半年";
  } else if (isHalf) {
    ja = `${whole} 年半`;
  } else {
    ja = `${whole} 年`;
  }

  const enValue = isHalf ? years.toFixed(1) : String(whole);
  const en = years === 1 ? "1 year" : `${enValue} years`;

  return { ja, en, enValue };
}
