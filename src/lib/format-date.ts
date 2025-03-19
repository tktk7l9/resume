import { differenceInMonths, format, parse } from "date-fns";

/**
 * 指定された日付範囲をフォーマットし、期間（月数）を計算します。
 * @param startDate 開始日付 (例: "2023-01")
 * @param endDate 終了日付 (例: "2023-12")。省略時は現在の日付を使用。
 * @returns フォーマットされた期間ラベルと月数。
 */
export function formatDate(startDate: string, endDate?: string) {
  // 日付文字列をDate型に変換
  const startDateParsed = parse(startDate, "yyyy-MM", new Date());
  const endDateParsed = endDate
    ? parse(endDate, "yyyy-MM", new Date())
    : new Date();

  // 期間（月数）の計算
  const totalMonthsDifference = differenceInMonths(
    endDateParsed,
    startDateParsed,
  );
  const totalYears = Math.floor(totalMonthsDifference / 12); // 年数
  const remainingMonths = (totalMonthsDifference % 12) + 1; // 残りの月数

  // 開始日と終了日のフォーマット
  const formattedStartDate = format(startDateParsed, "yyyy年MM月");
  const formattedEndDate = endDate
    ? format(endDateParsed, "yyyy年MM月")
    : "現在";

  // 期間（月数）のフォーマット
  let formattedPeriod = "";
  if (totalYears > 0) formattedPeriod += `${totalYears}年`;
  if (remainingMonths > 0) formattedPeriod += `${remainingMonths}ヶ月`;
  if (!formattedPeriod) formattedPeriod = "1ヶ月"; // 月数が0の場合は1ヶ月とする

  return {
    periodStartEndLabel: `${formattedStartDate} - ${formattedEndDate}`, // 期間ラベル
    formattedPeriod, // 期間（月数）
  };
}
