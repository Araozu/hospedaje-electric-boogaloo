import { type DayName, weekDays } from "@/utils/time";

import type { Room } from "./types";

type RoomViewProps = {
	room: Room;
	currentTimeRatio: number;
	currentDayLabel: DayName;
};

export function RoomView({
	room,
	currentTimeRatio: redLine,
	currentDayLabel,
}: RoomViewProps) {
	return (
		<div className="grid grid-cols-[6rem_repeat(7,minmax(2.5rem,1fr))] border-t group">
			<div
				className="flex items-center justify-center px-1 text-sm font-medium
				border-r bg-muted/40 group-hover:bg-accent/50 transition-colors"
			>
				{room.name}
			</div>
			{weekDays.map((day) => (
				<div
					key={`${room.name}-${day.name}`}
					className="relative min-h-16 shadow-xs transition-colors hover:border-primary/50 hover:bg-accent/50"
				>
					{day.label === currentDayLabel ? (
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
