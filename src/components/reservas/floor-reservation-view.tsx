import { ChevronDown } from "lucide-react";
import { useEffect, useId, useState } from "react";

import { Button } from "@/components/ui/button";
import type { Floor, Reservation, ReservationDay } from "@/data/reservas";
import { GetDayPercentage } from "@/utils/time";

import { RoomView } from "./room-view";

type FloorReservationViewProps = {
	floor: Floor;
	days: Array<ReservationDay>;
	reservations: Array<Reservation>;
};

export function FloorReservationView({
	floor,
	days,
	reservations,
}: FloorReservationViewProps) {
	const [isOpen, setIsOpen] = useState(true);
	const contentId = useId();

	// NOTE: this could be a single global thing, & pass down via context.
	// Only one per app needed
	const [nowLineData, setNowLineData] = useState(GetDayPercentage());
	useEffect(() => {
		const id = setInterval(() => setNowLineData(GetDayPercentage()), 60_000);
		return () => clearInterval(id);
	}, []);

	return (
		<div className="my-4 overflow-hidden rounded-md border bg-card shadow-sm">
			<div className="flex items-center justify-between bg-linear-to-b from-muted to-secondary px-4 py-2">
				<h2 className="text-lg font-heading font-medium">{floor.name}</h2>
				<Button
					variant={isOpen ? "secondary" : "active"}
					aria-label={`${isOpen ? "Contraer" : "Expandir"} ${floor.name}`}
					aria-expanded={isOpen}
					aria-controls={contentId}
					onClick={() => setIsOpen((open) => !open)}
				>
					<ChevronDown
						className={`transition-transform ${isOpen ? "-rotate-180" : ""}`}
					/>

					<span className="w-16">{isOpen ? "Ocultar" : "Expandir"}</span>
				</Button>
			</div>
			<div id={contentId} hidden={!isOpen} className="overflow-x-auto">
				<div className="min-w-xl">
					<div className="grid grid-cols-[6rem_minmax(0,1fr)] bg-muted/40 py-2">
						<div className="flex items-center border-r px-1 text-xs font-medium text-muted-foreground"></div>
						<div className="grid grid-cols-[repeat(14,minmax(0,1fr))]">
							{days.map((day) => (
								<div
									key={day.dateKey}
									className="col-span-2 flex items-center justify-center gap-1 border-r px-1 py-1 text-xs font-semibold font-mono text-muted-foreground"
									title={day.name}
								>
									{day.shortName}
									<span className="text-foreground">{day.dayNumber}</span>
								</div>
							))}
						</div>
					</div>
					{floor.rooms.length > 0 ? (
						floor.rooms.map((room) => (
							<RoomView
								key={room.id}
								room={room}
								days={days}
								reservations={reservations.filter(
									(reservation) => reservation.roomId === room.id,
								)}
								currentTimeRatio={nowLineData[1]}
								currentDate={nowLineData[0]}
							/>
						))
					) : (
						<div className="px-4 py-6 text-sm text-muted-foreground">
							No hay habitaciones en esta planta.
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
