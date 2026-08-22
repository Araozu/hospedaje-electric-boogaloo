import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/habitaciones")({
	component: Habitaciones,
});

function Habitaciones() {
	return (
		<div className="p-8">
			<h1 className="text-2xl font-semibold tracking-tight">Habitaciones</h1>
			<p className="mt-2 text-muted-foreground">
				Tus habitaciones aparecerán aquí.
			</p>
		</div>
	);
}
