/**
 * Converts a date to PST if it appears to be a simple date (midnight UTC)
 * This ensures dates like "2024-01-18" display as January 18, not January 17
 */
export function adjustDateForPST(date: Date): Date {
  // If the date is at midnight UTC, it's likely a simple date that needs PST adjustment
  if (date.getUTCHours() === 0 && date.getUTCMinutes() === 0 && date.getUTCSeconds() === 0) {
    // This was likely a simple date like "2024-01-18", adjust to PST noon
    const dateStr = date.toISOString().split('T')[0]; // Get YYYY-MM-DD
    return new Date(`${dateStr}T12:00:00-08:00`);
  }
  // Otherwise return as-is (it already has a specific time)
  return date;
}