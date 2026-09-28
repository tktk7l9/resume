import { differenceInMonths, format, parse } from "date-fns";
import type { Locale } from "@/i18n/config";

type Dict = {
  timeline: {
    present: string;
    yearLabel: string;
    monthLabel: string;
  };
};

export function formatDate(
  startDate: string,
  endDate: string | undefined,
  locale: Locale,
  dict: Dict,
  now: Date = new Date(),
) {
  const startDateParsed = parse(startDate, "yyyy-MM", now);
  const endDateParsed = endDate ? parse(endDate, "yyyy-MM", now) : now;

  // Both ends are inclusive: 2026-04 to 2026-09 is six months.
  const totalMonths =
    Math.max(0, differenceInMonths(endDateParsed, startDateParsed)) + 1;
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  const startPattern = locale === "ja" ? "yyyy年M月" : "MMM yyyy";
  const formattedStartDate = format(startDateParsed, startPattern);
  const formattedEndDate = endDate
    ? format(endDateParsed, startPattern)
    : dict.timeline.present;

  const parts: string[] = [];
  if (years > 0) parts.push(`${years}${dict.timeline.yearLabel}`);
  if (months > 0) parts.push(`${months}${dict.timeline.monthLabel}`);
  const formattedPeriod = parts.join(locale === "en" ? " " : "");

  return {
    periodStartEndLabel: `${formattedStartDate} - ${formattedEndDate}`,
    formattedPeriod,
    periodLabel:
      locale === "ja" ? `（${formattedPeriod}）` : `(${formattedPeriod})`,
  };
}
