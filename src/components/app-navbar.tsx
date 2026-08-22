import { Link, useRouterState } from "@tanstack/react-router";
import { Button } from "@/components/ui/button"
import {
	BedDouble,
	CalendarCheck,
	ChevronRight,
	House,
	PanelLeft,
} from "lucide-react";

const navigationItems = [
	{ label: "Inicio", to: "/", icon: House },
	{ label: "Reservas", to: "/reservas", icon: CalendarCheck },
	{ label: "Habitaciones", to: "/habitaciones", icon: BedDouble },
] as const;

export function AppNavbar() {
	const pathname = useRouterState({
		select: (state) => state.location.pathname,
	});
	const currentSection =
		navigationItems.find((item) => item.to === pathname)?.label ?? "Inicio";

	return (
		<header className="sticky top-0 z-20 w-full border-b border-border bg-background">
			<div className="flex h-8 items-center border-b border-border/70 bg-muted px-3 text-sm">
				<Link
					to="/"
					aria-label="Open library home"
					className="flex size-5 shrink-0 items-center justify-center rounded-sm text-foreground transition-colors hover:bg-background/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
				>
					<PanelLeft
						aria-hidden="true"
						className="size-3.5"
						strokeWidth={2.25}
					/>
				</Link>
				<span aria-hidden="true" className="mx-2 h-4 w-px bg-border" />
				<Link
					to="/"
					className="font-semibold tracking-tight text-foreground transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
				>
					Hospedajes
				</Link>
				<ChevronRight
					aria-hidden="true"
					className="mx-2 size-3.5 text-muted-foreground"
					strokeWidth={2}
				/>
				<span className="truncate text-foreground">{currentSection}</span>
			</div>

			<nav
				aria-label="Main navigation"
				className="flex min-h-9 items-center gap-1 overflow-x-auto px-3 py-1"
			>
				{navigationItems.map((item) => {
					const Icon = item.icon;
					const isActive = currentSection === item.label;

					return (
						<Link
							key={item.label}
							to={item.to}
							activeOptions={{ exact: item.to === "/" }}
						>
							<Button variant={isActive ? "default" : "ghost"}>
								<Icon
									aria-hidden="true"
									className="size-3.5"
									strokeWidth={2.25}
								/>
								{item.label}
							</Button>
						</Link>
					);
				})}
			</nav>
		</header>
	);
}
