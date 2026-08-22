import { createFileRoute } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import { useId, useState } from "react";

import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/reservas")({ component: Reservas });

type Floor = {
	name: string;
	rooms: Array<Room>;
};

type Room = {
	name: string;
};

const weekDays = [
	{ label: "L", name: "Lunes" },
	{ label: "M", name: "Martes" },
	{ label: "X", name: "Miércoles" },
	{ label: "J", name: "Jueves" },
	{ label: "V", name: "Viernes" },
	{ label: "S", name: "Sábado" },
	{ label: "D", name: "Domingo" },
];

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
			<h1 className="text-2xl font-semibold tracking-tight">Reservas</h1>
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

	return (
		<div className="my-4 overflow-hidden rounded-md border bg-card shadow-sm">
			<div className="flex items-center justify-between bg-linear-to-b from-muted to-secondary px-4 py-2">
				<h2 className="text-lg font-medium">{floor.name}</h2>
				<Button
					variant="ghost"
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
				<div className="min-w-[36rem]">
					<div className="grid grid-cols-[minmax(8rem,1fr)_repeat(7,minmax(2.5rem,1fr))] gap-2 border-b bg-muted/40 px-3 py-2">
						<div className="flex items-center px-1 text-xs font-medium text-muted-foreground">
							Habitación
						</div>
						{weekDays.map((day) => (
							<div
								key={day.name}
								className="flex items-center justify-center rounded-md px-1 py-1 text-xs font-semibold text-muted-foreground"
								title={day.name}
							>
								{day.label}
							</div>
						))}
					</div>
					{floor.rooms.length > 0 ? (
						floor.rooms.map((room) => <RoomView key={room.name} room={room} />)
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

function RoomView({ room }: { room: Room }) {
	return (
		<div className="grid grid-cols-[minmax(8rem,1fr)_repeat(7,minmax(2.5rem,1fr))] gap-2 border-t px-3 py-2">
			<div className="flex items-center px-1 text-sm font-medium">
				{room.name}
			</div>
			{weekDays.map((day) => (
				<div
					key={`${room.name}-${day.name}`}
					className="aspect-square min-h-9 rounded-md border border-dashed bg-background shadow-xs transition-colors hover:border-primary/50 hover:bg-accent/50"
				/>
			))}
		</div>
	);
}
