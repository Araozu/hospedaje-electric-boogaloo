import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

import { navigationItems } from "./navigation-items";

type NavbarNavigationProps = {
	currentSection: string;
};

export function NavbarNavigation({ currentSection }: NavbarNavigationProps) {
	return (
		<nav
			aria-label="Main navigation"
			className="flex min-h-9 items-center gap-1 overflow-x-auto px-3 pl-12 pr-1"
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
						<Button variant={isActive ? "default" : "secondary"}>
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
	);
}
