const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function parseYearMonth(value: string) {
  const [year, month] = value.split("-").map(Number);
  return { year, month };
}

export function formatMonthYear(value: string) {
  const { year, month } = parseYearMonth(value);
  return `${MONTHS[month - 1]} ${year}`;
}

export function formatDurationLength(startDate: string, endDate: string | null) {
  const start = parseYearMonth(startDate);
  const end = endDate
    ? parseYearMonth(endDate)
    : { year: new Date().getFullYear(), month: new Date().getMonth() + 1 };

  let totalMonths = (end.year - start.year) * 12 + (end.month - start.month) + 1;
  if (totalMonths < 1) totalMonths = 1;

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  if (years > 0 && months > 0) {
    return `${years} yr${years > 1 ? "s" : ""} ${months} mo${months > 1 ? "s" : ""}`;
  }
  if (years > 0) {
    return `${years} yr${years > 1 ? "s" : ""}`;
  }
  return `${months} mo${months > 1 ? "s" : ""}`;
}

export function formatDuration(startDate: string, endDate: string | null) {
  const startLabel = formatMonthYear(startDate);
  const endLabel = endDate ? formatMonthYear(endDate) : "Present";
  const length = formatDurationLength(startDate, endDate);
  return `${startLabel} – ${endLabel} · ${length}`;
}

export function formatRangeShort(startDate: string, endDate: string | null) {
  const startLabel = formatMonthYear(startDate);
  const endLabel = endDate ? formatMonthYear(endDate) : "Present";
  return `${startLabel} – ${endLabel}`;
}