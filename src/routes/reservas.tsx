import { createFileRoute } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import { useEffect, useId, useState } from "react";

import { Button } from "@/components/ui/button";
import { GetDayPercentage, weekDays, type DayName } from "@/utils/time";

export const Route = createFileRoute("/reservas")({ component: Reservas });

type Floor = {
	name: string;
	rooms: Array<Room>;
};

type Room = {
	name: string;
};

function Reservas() {
	const floors: Array<Floor> = [
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

	return (
		<div className="p-8">
			<h1 className="text-2xl font-heading font-semibold tracking-tight">Reservas</h1>
			<div className="mt-6">
				{floors.map((f) => (
					<div key={f.name}>
						<FloorReservationView floor={f} />
					</div>
				))}
			</div>
		</div>
	);
}

function FloorReservationView({ floor }: { floor: Floor }) {
	const [isOpen, setIsOpen] = useState(true);
	const contentId = useId();

	// NOTE: this could be a single global thing, & pass down via context.
	// Only one per app needed
	const [nowLineData, setNowLineData] = useState(GetDayPercentage())
	useEffect(() => {
		const id = setInterval(() => setNowLineData(GetDayPercentage()), 60_000)
		return () => clearInterval(id)
	})

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

					<span className="w-16">
						{isOpen ? "Ocultar" : "Expandir"}
					</span>
				</Button>
			</div>
			<div id={contentId} hidden={!isOpen} className="overflow-x-auto">
				<div className="min-w-xl">
					<div className="grid grid-cols-[6rem_repeat(7,minmax(2.5rem,1fr))] bg-muted/40 py-2">
						<div className="flex items-center px-1 text-xs font-medium text-muted-foreground"></div>
						{weekDays.map((day) => (
							<div
								key={day.name}
								className="flex items-center justify-center px-1 py-1 text-xs font-semibold font-mono text-muted-foreground"
								title={day.name}
							>
								{day.shortName}
							</div>
						))}
					</div>
					{floor.rooms.length > 0 ? (
						floor.rooms.map((room) => <RoomView
							key={room.name}
							room={room}
							currentTimeRatio={nowLineData[1]}
							currentDayLabel={nowLineData[0]}
						/>)
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

type RoomViewProps = { room: Room, currentTimeRatio: number, currentDayLabel: DayName }
function RoomView({ room, currentTimeRatio: redLine, currentDayLabel }: RoomViewProps) {
	return (
		<div className="grid grid-cols-[6rem_repeat(7,minmax(2.5rem,1fr))] border-t group">
			<div className="flex items-center justify-center px-1 text-sm font-medium
				border-r group-hover:bg-accent/50 transition-colors">
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
					) : <></>}
				</div>
			))}
		</div>
	);
}
