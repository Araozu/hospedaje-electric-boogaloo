export type DayName = "L" | "M" | "Mi" | "J" | "V" | "S" | "D";

export const daysMap: Array<DayName> = ["D", "L", "M", "Mi", "J", "V", "S"];

export type WeekDay = { label: DayName; name: string; shortName: string };
export const weekDays: Array<WeekDay> = [
	{
		label: "L",
		name: "Lunes",
		shortName: "Lun",
	},
	{
		label: "M",
		name: "Martes",
		shortName: "Mar",
	},
	{
		label: "Mi",
		name: "Miércoles",
		shortName: "Mie",
	},
	{
		label: "J",
		name: "Jueves",
		shortName: "Jue",
	},
	{
		label: "V",
		name: "Viernes",
		shortName: "Vie",
	},
	{
		label: "S",
		name: "Sábado",
		shortName: "Sab",
	},
	{
		label: "D",
		name: "Domingo",
		shortName: "Dom",
	},
];

/**
 * Gets the current day, returns a day from L-S and the percentage of the day.
 * Uses the browser timezone.
 *
 * The returned percentage is a number between `[0-1)`, with 2 decimals precision
 */
export function GetDayPercentage(): [DayName, number] {
	const MINUTES_PER_DAY = 24 * 60;
	const now = new Date();
	const dayKey = daysMap[now.getDay()];
	const minutesSinceMidnight = now.getHours() * 60 + now.getMinutes();
	const dayPercentagePrecise = minutesSinceMidnight / MINUTES_PER_DAY;
	const dayPercentageRounded = Math.floor(dayPercentagePrecise * 100) / 100;

	return [dayKey, dayPercentageRounded];
}
