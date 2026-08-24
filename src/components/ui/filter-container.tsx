import { useState } from "react";

import { cn } from "@/lib/utils";

export type FilterOption = {
	label: string;
	text: string;
};

type FilterContainerProps = {
	allText: string;
	options: FilterOption[];
	className?: string;
};

type FilterChipPosition = "left" | "middle" | "right";

type FilterChipProps = {
	position: FilterChipPosition;
	className?: string;
	children: string;
	active: boolean;
	onClick: (newState: boolean) => void;
};

export function FilterContainer({
	allText,
	options,
	className,
}: FilterContainerProps) {
	const [active, setActive] = useState<Record<string, boolean>>({});
	const allActive = !Object.values(active).some(Boolean);

	function handleChipClick(label: string, newState: boolean) {
		setActive((current) => ({
			...current,
			[label]: newState,
		}));
	}

	return (
		<div
			className={cn(
				"flex rounded-lg bg-linear-to-b from-muted to-secondary",
				className,
			)}
		>
			<FilterChip
				active={allActive}
				onClick={() => setActive({})}
				position="left"
				className="border-r-4"
			>
				{allText}
			</FilterChip>
			{options.map((option, index) => (
				<FilterChip
					key={option.label}
					position={index === options.length - 1 ? "right" : "middle"}
					active={Boolean(active[option.label])}
					onClick={(newState) => handleChipClick(option.label, newState)}
				>
					{option.text}
				</FilterChip>
			))}
		</div>
	);
}

export function FilterChip({
	position,
	className,
	children,
	active,
	onClick,
}: FilterChipProps) {
	const chipBorderClass = (() => {
		switch (position) {
			case "left":
				return "rounded-l-lg border";
			case "middle":
				return "border-y border-r";
			case "right":
				return "rounded-r-lg border-y border-r";
		}
	})();

	return (
		<button
			type="button"
			className={cn(
				"inline-flex cursor-pointer items-center gap-1 px-2 text-sm font-heading font-medium transition-all",
				"group not:data-active:bg-muted data-active:bg-primary data-active:text-primary-foreground",
				chipBorderClass,
				className,
			)}
			data-active={active}
			aria-pressed={active}
			onClick={() => onClick(!active)}
		>
			<span>{children}</span>
		</button>
	);
}
