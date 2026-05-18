import type { Locale } from "@/i18n/config";
import { differenceInMonths, format, parse } from "date-fns";

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
) {
  const startDateParsed = parse(startDate, "yyyy-MM", new Date());
  const endDateParsed = endDate
    ? parse(endDate, "yyyy-MM", new Date())
    : new Date();

  const totalMonthsDifference = differenceInMonths(
    endDateParsed,
    startDateParsed,
  );
  const totalYears = Math.floor(totalMonthsDifference / 12);
  const remainingMonths = (totalMonthsDifference % 12) + 1;

  const startPattern = locale === "ja" ? "yyyy年MM月" : "MMM yyyy";
  const formattedStartDate = format(startDateParsed, startPattern);
  const formattedEndDate = endDate
    ? format(endDateParsed, startPattern)
    : dict.timeline.present;

  let formattedPeriod = "";
  if (totalYears > 0) {
    formattedPeriod += `${totalYears}${dict.timeline.yearLabel}${locale === "en" ? " " : ""}`;
  }
  if (remainingMonths > 0) {
    formattedPeriod += `${remainingMonths}${dict.timeline.monthLabel}`;
  }
  if (!formattedPeriod) {
    formattedPeriod = `1${dict.timeline.monthLabel}`;
  }

  return {
    periodStartEndLabel: `${formattedStartDate} - ${formattedEndDate}`,
    formattedPeriod: formattedPeriod.trim(),
  };
}
