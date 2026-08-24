import {
	isSameCalendarDay,
	type ReservationDay,
	type Room,
} from "@/data/reservas";

type RoomViewProps = {
	room: Room;
	days: Array<ReservationDay>;
	currentTimeRatio: number;
	currentDate: Date;
};

export function RoomView({
	room,
	days,
	currentTimeRatio: redLine,
	currentDate,
}: RoomViewProps) {
	return (
		<div className="grid grid-cols-[6rem_repeat(7,minmax(2.5rem,1fr))] border-t group">
			<div
				className="flex items-center justify-center px-1 text-sm font-medium
				border-r bg-muted/40 group-hover:bg-accent/50 transition-colors"
			>
				{room.name}
			</div>
			{days.map((day) => (
				<div
					key={`${room.name}-${day.date.toISOString()}`}
					className="relative min-h-16 shadow-xs transition-colors hover:border-primary/50 hover:bg-accent/50"
				>
					{isSameCalendarDay(day.date, currentDate) ? (
						<div
							className="absolute h-full w-0.5 bg-red-400/75"
							style={{ left: `${redLine * 100}%` }}
						></div>
					) : null}
				</div>
			))}
		</div>
	);
}
