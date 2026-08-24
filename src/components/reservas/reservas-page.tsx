import { FloorReservationView } from "./floor-reservation-view";
import type { Floor } from "./types";

export function Reservas() {
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
			<h1 className="text-2xl font-heading font-semibold tracking-tight">
				Reservas
			</h1>
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
