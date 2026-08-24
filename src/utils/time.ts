/**
 * Gets the current date and the percentage of the day.
 * Uses the browser timezone.
 *
 * The returned percentage is a number between `[0-1)`, with 2 decimals precision
 */
export function GetDayPercentage(): [Date, number] {
	const MINUTES_PER_DAY = 24 * 60;
	const now = new Date();
	const minutesSinceMidnight = now.getHours() * 60 + now.getMinutes();
	const dayPercentagePrecise = minutesSinceMidnight / MINUTES_PER_DAY;
	const dayPercentageRounded = Math.floor(dayPercentagePrecise * 100) / 100;

	return [now, dayPercentageRounded];
}
