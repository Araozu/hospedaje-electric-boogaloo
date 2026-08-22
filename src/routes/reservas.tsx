import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/reservas")({ component: Reservas });

type Floor = {
	name: string;
	rooms: Array<Room>
};

type Room = {
	name: string;
}

function Reservas() {
	const floors: Array<Floor> = [
		{
			name: "Planta Baja",
			rooms: []
		},
		{
			name: "Piso 1",
			rooms: [
				{ name: "101" },
				{ name: "102" },
				{ name: "103" },
				{ name: "104" },
			]
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
			]
		},
	];

	return (
		<div className="p-8">
			<h1 className="text-2xl font-semibold tracking-tight">Reservas</h1>
			<div>
				{floors.map((f) => (
					<div className="">
						<FloorReservationView floor={f} />
					</div>
				))}
			</div>
		</div>
	);
}

function FloorReservationView({ floor }: { floor: Floor }) {
	return (
		<div className="rounded overflow-hidden border my-4">
			<div
				className="bg-linear-to-b from-muted to-secondary px-4 py-2
					font-medium text-lg"
			>
				{floor.name}

				{/* add collapsible button */}
			</div>
			<div>
				{floor.rooms.map(r => <RoomView room={r} />)}
			</div>
		</div >
	)
}

function RoomView({ room }: { room: Room }) {
	return (
		<div className="border-t px-2 py-1">
			{room.name}
		</div >
	)
}
