import { useRouterState } from "@tanstack/react-router";

import { NavbarHeader } from "./navbar/navbar-header";
import { NavbarNavigation } from "./navbar/navbar-navigation";
import { navigationItems } from "./navbar/navigation-items";

export function AppNavbar() {
	const pathname = useRouterState({
		select: (state) => state.location.pathname,
	});
	const currentSection =
		navigationItems.find((item) => item.to === pathname)?.label ?? "Inicio";

	return (
		<header
			className="sticky top-0 z-100 w-full border-b border-border font-heading
			bg-linear-to-b from-muted to-secondary"
		>
			<NavbarHeader currentSection={currentSection} />
			<NavbarNavigation currentSection={currentSection} />
		</header>
	);
}
