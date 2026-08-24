export type Floor = {
	name: string;
	rooms: Array<Room>;
};

export type Room = {
	name: string;
};

export type DayName = "L" | "M" | "Mi" | "J" | "V" | "S" | "D";

export type ReservationDay = {
	date: Date;
	dayNumber: number;
	label: DayName;
	name: string;
	shortName: string;
};

const weekDayData: Array<Omit<ReservationDay, "date" | "dayNumber">> = [
	{ label: "D", name: "Domingo", shortName: "Dom" },
	{ label: "L", name: "Lunes", shortName: "Lun" },
	{ label: "M", name: "Martes", shortName: "Mar" },
	{ label: "Mi", name: "Miércoles", shortName: "Mie" },
	{ label: "J", name: "Jueves", shortName: "Jue" },
	{ label: "V", name: "Viernes", shortName: "Vie" },
	{ label: "S", name: "Sábado", shortName: "Sab" },
];

export function getReservationDays(startDate: Date): Array<ReservationDay> {
	return Array.from({ length: 7 }, (_, index) => {
		const date = new Date(startDate);
		date.setDate(date.getDate() + index);

		return {
			...weekDayData[date.getDay()],
			date,
			dayNumber: date.getDate(),
		};
	});
}

export function getWeekStart(date: Date): Date {
	const weekStart = new Date(date);
	weekStart.setHours(0, 0, 0, 0);
	weekStart.setDate(weekStart.getDate() - ((weekStart.getDay() + 6) % 7));
	return weekStart;
}

export function isSameCalendarDay(firstDate: Date, secondDate: Date): boolean {
	return (
		firstDate.getFullYear() === secondDate.getFullYear() &&
		firstDate.getMonth() === secondDate.getMonth() &&
		firstDate.getDate() === secondDate.getDate()
	);
}

export const floors: Array<Floor> = [
	{
		name: "Planta Baja",
		rooms: [],
	},
	{
		name: "Piso 1",
		rooms: [
			{ name: "101" },
			{ name: "102" },
			{ name: "103" },
			{ name: "104" },
			{ name: "105" },
			{ name: "106" },
			{ name: "108" },
			{ name: "110" },
			{ name: "111" },
			{ name: "115" },
		],
	},
	{
		name: "Piso 2",
		rooms: [
			{ name: "201" },
			{ name: "202" },
			{ name: "203" },
			{ name: "204" },
			{ name: "205" },
			{ name: "206" },
		],
	},
];
