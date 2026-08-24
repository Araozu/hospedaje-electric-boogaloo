export type Floor = {
	name: string;
	rooms: Array<Room>;
};

export type Room = {
	id: string;
	name: string;
};

export type ReservationStatus = "confirmed" | "pending" | "checked-in";

export type Reservation = {
	id: string;
	roomId: string;
	guestName: string;
	checkIn: string;
	checkOut: string;
	status: ReservationStatus;
};

export type DayName = "L" | "M" | "Mi" | "J" | "V" | "S" | "D";

export type ReservationDay = {
	date: Date;
	dateKey: string;
	dayNumber: number;
	label: DayName;
	name: string;
	shortName: string;
};

const weekDayData: Array<
	Omit<ReservationDay, "date" | "dateKey" | "dayNumber">
> = [
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
			dateKey: getDateKey(date),
			dayNumber: date.getDate(),
		};
	});
}

export function getDateKey(date: Date): string {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");

	return `${year}-${month}-${day}`;
}

export function addCalendarDays(date: Date, days: number): Date {
	const result = new Date(date);
	result.setDate(result.getDate() + days);
	return result;
}

function getCalendarDayNumber(dateKey: string): number {
	const [year, month, day] = dateKey.split("-").map(Number);
	return Date.UTC(year, month - 1, day) / (24 * 60 * 60 * 1000);
}

export function getCalendarDayDifference(
	firstDate: string,
	secondDate: string,
): number {
	return getCalendarDayNumber(secondDate) - getCalendarDayNumber(firstDate);
}

export function getWeekStart(date: Date): Date {
	const weekStart = new Date(date);
	weekStart.setHours(0, 0, 0, 0);
	weekStart.setDate(weekStart.getDate() - ((weekStart.getDay() + 6) % 7));
	return weekStart;
}

type ReservationSeed = Omit<Reservation, "checkIn" | "checkOut"> & {
	checkInOffset: number;
	nights: number;
};

function createMockReservations(weekStart: Date): Array<Reservation> {
	const seeds: Array<ReservationSeed> = [
		{
			id: "res-101-1",
			roomId: "101",
			guestName: "Sofía Ramírez",
			checkInOffset: -2,
			nights: 3,
			status: "checked-in",
		},
		{
			id: "res-102-1",
			roomId: "102",
			guestName: "Martín Silva",
			checkInOffset: 0,
			nights: 1,
			status: "confirmed",
		},
		{
			id: "res-103-1",
			roomId: "103",
			guestName: "Camila Torres",
			checkInOffset: 1,
			nights: 3,
			status: "confirmed",
		},
		{
			id: "res-104-1",
			roomId: "104",
			guestName: "Diego Navarro",
			checkInOffset: 3,
			nights: 2,
			status: "pending",
		},
		{
			id: "res-105-1",
			roomId: "105",
			guestName: "Valentina Cruz",
			checkInOffset: 5,
			nights: 2,
			status: "confirmed",
		},
		{
			id: "res-106-1",
			roomId: "106",
			guestName: "Andrés Molina",
			checkInOffset: 6,
			nights: 1,
			status: "pending",
		},
		{
			id: "res-108-1",
			roomId: "108",
			guestName: "Lucía Herrera",
			checkInOffset: -1,
			nights: 1,
			status: "confirmed",
		},
		{
			id: "res-110-1",
			roomId: "110",
			guestName: "Javier Ortega",
			checkInOffset: 2,
			nights: 5,
			status: "confirmed",
		},
		{
			id: "res-111-1",
			roomId: "111",
			guestName: "Paula Méndez",
			checkInOffset: 0,
			nights: 2,
			status: "checked-in",
		},
		{
			id: "res-111-2",
			roomId: "111",
			guestName: "Nicolás Fuentes",
			checkInOffset: 2,
			nights: 2,
			status: "confirmed",
		},
		{
			id: "res-115-1",
			roomId: "115",
			guestName: "Renata Vidal",
			checkInOffset: 4,
			nights: 1,
			status: "confirmed",
		},
		{
			id: "res-201-1",
			roomId: "201",
			guestName: "Marcos Paredes",
			checkInOffset: -2,
			nights: 3,
			status: "confirmed",
		},
		{
			id: "res-202-1",
			roomId: "202",
			guestName: "Elena Rojas",
			checkInOffset: 0,
			nights: 4,
			status: "checked-in",
		},
		{
			id: "res-203-1",
			roomId: "203",
			guestName: "Tomás Cabrera",
			checkInOffset: 2,
			nights: 1,
			status: "pending",
		},
		{
			id: "res-204-1",
			roomId: "204",
			guestName: "Florencia León",
			checkInOffset: 4,
			nights: 2,
			status: "confirmed",
		},
		{
			id: "res-205-1",
			roomId: "205",
			guestName: "Gabriel Soto",
			checkInOffset: 6,
			nights: 1,
			status: "confirmed",
		},
	];

	return seeds.map(({ checkInOffset, nights, ...seed }) => {
		const checkIn = addCalendarDays(weekStart, checkInOffset);

		return {
			...seed,
			checkIn: getDateKey(checkIn),
			checkOut: getDateKey(addCalendarDays(checkIn, nights)),
		};
	});
}

export type ReservationQuery = {
	startDate: Date;
	endDate: Date;
	roomIds?: ReadonlyArray<string>;
};

export function queryReservations({
	startDate,
	endDate,
	roomIds,
}: ReservationQuery): Array<Reservation> {
	const startDateKey = getDateKey(startDate);
	const endDateKey = getDateKey(endDate);
	const reservations = createMockReservations(getWeekStart(startDate));

	return reservations.filter((reservation) => {
		const matchesRoom = roomIds?.includes(reservation.roomId) ?? true;
		const overlapsRange =
			reservation.checkIn < endDateKey && reservation.checkOut >= startDateKey;

		return matchesRoom && overlapsRange;
	});
}

export const floors: Array<Floor> = [
	{
		name: "Planta Baja",
		rooms: [],
	},
	{
		name: "Piso 1",
		rooms: [
			{ id: "101", name: "101" },
			{ id: "102", name: "102" },
			{ id: "103", name: "103" },
			{ id: "104", name: "104" },
			{ id: "105", name: "105" },
			{ id: "106", name: "106" },
			{ id: "108", name: "108" },
			{ id: "110", name: "110" },
			{ id: "111", name: "111" },
			{ id: "115", name: "115" },
		],
	},
	{
		name: "Piso 2",
		rooms: [
			{ id: "201", name: "201" },
			{ id: "202", name: "202" },
			{ id: "203", name: "203" },
			{ id: "204", name: "204" },
			{ id: "205", name: "205" },
			{ id: "206", name: "206" },
		],
	},
];
