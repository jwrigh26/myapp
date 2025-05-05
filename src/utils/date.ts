import { format, parseISO, parse } from 'date-fns';

/**
 * Formats a date string (ISO or MM-dd-yyyy) to "MMMM d, yyyy" (e.g., April 21, 2025).
 * Returns empty string if invalid.
 */
export function formatDisplayDate(dateStr?: string): string {
  if (!dateStr) return '';
  let date: Date | undefined;
  // Try ISO first
  try {
    date = parseISO(dateStr);
    if (!isNaN(date.getTime())) {
      return format(date, 'MMMM d, yyyy');
    }
  } catch {}
  // Try MM-dd-yyyy fallback
  try {
    date = parse(dateStr, 'MM-dd-yyyy', new Date());
    if (!isNaN(date.getTime())) {
      return format(date, 'MMMM d, yyyy');
    }
  } catch {}
  return '';
}
