import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/reservas")({ component: Reservas });

function Reservas() {
	return (
		<div className="p-8">
			<h1 className="text-2xl font-semibold tracking-tight">Reservas</h1>
			<p className="mt-2 text-muted-foreground">
				Tus reservas aparecerán aquí.
			</p>
		</div>
	);
}
