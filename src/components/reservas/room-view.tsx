import {
	getCalendarDayDifference,
	getDateKey,
	type Reservation,
	type ReservationDay,
	type ReservationStatus,
	type Room,
} from "@/data/reservas";
import { cn } from "@/lib/utils";
import { CircleArrowDownIcon, CircleCheckIcon, ClockIcon } from "lucide-react";

type RoomViewProps = {
	room: Room;
	days: Array<ReservationDay>;
	reservations: Array<Reservation>;
	currentTimeRatio: number;
	currentDate: Date;
};

const reservationStatusClasses: Record<ReservationStatus, string> = {
	confirmed: "border-primary/40 bg-primary/10 text-primary",
	pending: "border-chart-3/50 bg-chart-3/15 text-foreground",
	"checked-in": "border-chart-2/50 bg-chart-2/15 text-foreground",
};

const reservationStatusLabels: Record<ReservationStatus, string> = {
	confirmed: "Confirmada",
	pending: "Pendiente",
	"checked-in": "Alojado",
};

const gridColumnStartClasses = [
	"col-start-1",
	"col-start-2",
	"col-start-3",
	"col-start-4",
	"col-start-5",
	"col-start-6",
	"col-start-7",
	"col-start-8",
	"col-start-9",
	"col-start-10",
	"col-start-11",
	"col-start-12",
	"col-start-13",
	"col-start-14",
	"col-start-15",
] as const;

const gridColumnEndClasses = [
	"col-end-1",
	"col-end-2",
	"col-end-3",
	"col-end-4",
	"col-end-5",
	"col-end-6",
	"col-end-7",
	"col-end-8",
	"col-end-9",
	"col-end-10",
	"col-end-11",
	"col-end-12",
	"col-end-13",
	"col-end-14",
	"col-end-15",
] as const;

function getReservationPlacement(
	reservation: Reservation,
	days: Array<ReservationDay>,
): string {
	const visibleStart = days[0].dateKey;
	const lastGridLine = days.length * 2 + 1;
	const checkInOffset = getCalendarDayDifference(
		visibleStart,
		reservation.checkIn,
	);
	const checkOutOffset = getCalendarDayDifference(
		visibleStart,
		reservation.checkOut,
	);
	const startLine = Math.max(
		1,
		Math.min(lastGridLine - 1, (checkInOffset + 1) * 2),
	);
	const endLine = Math.max(
		startLine + 1,
		Math.min(lastGridLine, (checkOutOffset + 1) * 2),
	);

	return cn(
		gridColumnStartClasses[startLine - 1],
		gridColumnEndClasses[endLine - 1],
	);
}

function getReservationLabel(reservation: Reservation): string {
	return `${reservation.guestName}. Entrada ${reservation.checkIn}, salida ${reservation.checkOut}. ${reservationStatusLabels[reservation.status]}.`;
}

function getPlainReservationLabel(reservation: Reservation): string {
	return `${reservationStatusLabels[reservation.status]}`;
}

function getReservationIcon(reservation: Reservation) {
	switch (reservation.status) {
		case "confirmed":
			return <CircleCheckIcon size={14} />
		case "pending":
			return <ClockIcon size={14} />
		case "checked-in":
			return <CircleArrowDownIcon size={14} />
		default:
			const _: never = reservation.status
			_;
	}
}

export function RoomView({
	room,
	days,
	reservations,
	currentTimeRatio,
	currentDate,
}: RoomViewProps) {
	const currentDayIndex = days.findIndex(
		(day) => day.dateKey === getDateKey(currentDate),
	);
	const currentLinePosition =
		((currentDayIndex + currentTimeRatio) / days.length) * 100;

	return (
		<div className="grid grid-cols-[6rem_minmax(0,1fr)] border-t group">
			<div className="flex items-center justify-center border-r bg-muted/40 px-1 text-sm font-medium transition-colors group-hover:bg-accent/50">
				{room.name}
			</div>
			<div className="relative min-h-16">
				<div className="pointer-events-none absolute inset-0 grid grid-cols-[repeat(14,minmax(0,1fr))]">
					{days.map((day) => (
						<div
							key={`${room.id}-day-${day.dateKey}`}
							className="col-span-2 border-r transition-colors hover:bg-accent/50"
						></div>
					))}
				</div>
				<div className="relative grid min-h-16 grid-cols-[repeat(14,minmax(0,1fr))] items-center">
					{reservations.map((reservation) => (
						<div
							key={reservation.id}
							className={cn(
								"z-10 mx-0.5 min-w-0 overflow-hidden rounded-sm border px-1.5 py-1 text-[0.6875rem] font-medium leading-tight shadow-xs transition-[filter,transform] hover:brightness-105",
								reservationStatusClasses[reservation.status],
								getReservationPlacement(reservation, days),
							)}
							title={getReservationLabel(reservation)}
						>
							<span className="block truncate">{reservation.guestName}</span>
							<div className="flex gap-2">
								{getReservationIcon(reservation)} {getPlainReservationLabel(reservation)}
							</div>
							<span className="sr-only">
								{getReservationLabel(reservation)}
							</span>
						</div>
					))}
				</div>
				{currentDayIndex >= 0 ? (
					<div
						aria-hidden="true"
						className="pointer-events-none absolute inset-y-0 z-20 w-0.5 bg-destructive/75"
						style={{ left: `${currentLinePosition}%` }}
					></div>
				) : null}
			</div>
		</div>
	);
}
