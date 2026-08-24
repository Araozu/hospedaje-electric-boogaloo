import { Link } from "@tanstack/react-router";
import { ChevronRight, PanelLeft } from "lucide-react";

type NavbarHeaderProps = {
	currentSection: string;
};

export function NavbarHeader({ currentSection }: NavbarHeaderProps) {
	return (
		<div className="flex h-8 items-center px-3 text-sm">
			<Link
				to="/"
				aria-label="Open library home"
				className="flex size-5 shrink-0 items-center justify-center rounded-sm text-foreground transition-colors hover:bg-background/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
			>
				<PanelLeft aria-hidden="true" className="size-3.5" strokeWidth={2.25} />
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
	);
}
