import { FilterContainer } from "@/components/ui/filter-container";
import { floors } from "@/data/reservas";

import { FloorReservationView } from "./floor-reservation-view";

export function Reservas() {
	return (
		<div className="p-8">
			<h1 className="text-2xl font-heading font-semibold tracking-tight mb-4">
				Reservas
			</h1>
			<div className="flex gap-4">
				<span className="font-heading">Tipo:</span>
				<FilterContainer
					allText="Todos"
					options={[
						{ label: "doble", text: "Doble" },
						{ label: "matrimonial", text: "Matrimonial" },
						{ label: "deluxe", text: "Suite Deluxe" },
					]}
				/>

				<span className="font-heading">Disponibles:</span>
				<FilterContainer
					allText="Todo"
					options={[
						{ label: "now", text: "Hoy" },
						{ label: "week", text: "Semana" },
					]}
				/>
			</div>
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
