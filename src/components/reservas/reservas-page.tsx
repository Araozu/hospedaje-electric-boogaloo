import { FilterContainer } from "@/components/ui/filter-container";
import {
	addCalendarDays,
	floors,
	getReservationDays,
	getWeekStart,
	queryReservations,
} from "@/data/reservas";

import { FloorReservationView } from "./floor-reservation-view";

export function Reservas() {
	const weekStart = getWeekStart(new Date());
	const days = getReservationDays(weekStart);
	const reservations = queryReservations({
		startDate: weekStart,
		endDate: addCalendarDays(weekStart, days.length),
	});

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
						<FloorReservationView
							floor={f}
							days={days}
							reservations={reservations}
						/>
					</div>
				))}
			</div>
		</div>
	);
}
