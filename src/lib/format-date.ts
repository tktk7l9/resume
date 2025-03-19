import { differenceInMonths, format } from "date-fns";

export function formatDate(startDate: string, endDate?: string) {
  // 期間（月数）の計算
  const monthsDiff = differenceInMonths(
    endDate ? format(endDate, "yyyy-MM") : new Date(),
    format(startDate, "yyyy-MM"),
  );
  const years = Math.floor(monthsDiff / 12);
  const months = (monthsDiff % 12) + 1;

  // フォーマット処理
  let periodMonth = "";
  const formatStart = format(format(startDate, "yyyy-MM"), "yyyy年MM月");
  const formatEnd = endDate
    ? format(endDate ? format(endDate, "yyyy-MM") : new Date(), "yyyy年MM月")
    : "現在";
  if (years > 0) periodMonth += `${years}年`;
  if (months > 0) periodMonth += `${months}ヶ月`;
  if (!periodMonth) periodMonth = "1ヶ月";

  return {
    periodStartEndLabel: `${formatStart} - ${formatEnd}`,
    periodMonth,
  };
}
