import { useRouterState } from "@tanstack/react-router";

import { NavbarHeader } from "./reservas/navbar/navbar-header";
import { NavbarNavigation } from "./reservas/navbar/navbar-navigation";
import { navigationItems } from "./reservas/navbar/navigation-items";

export function AppNavbar() {
	const pathname = useRouterState({
		select: (state) => state.location.pathname,
	});
	const currentSection =
		navigationItems.find((item) => item.to === pathname)?.label ?? "Inicio";

	return (
		<header
			className="sticky top-0 z-20 w-full border-b border-border font-heading
			bg-linear-to-b from-muted to-secondary"
		>
			<NavbarHeader currentSection={currentSection} />
			<NavbarNavigation currentSection={currentSection} />
		</header>
	);
}
