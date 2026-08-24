import { FloorReservationView } from "./floor-reservation-view";
import type { Floor } from "./types";
import { useState } from "react";
import { cn } from "#/lib/utils";

export function Reservas() {
	const floors: Array<Floor> = [
		{
			name: "Planta Baja",
			rooms: [],
		},
		{
			name: "Piso 1",
			rooms: [
				{ name: "101" },
				{ name: "102" },
				{ name: "103" },
				{ name: "104" },
			],
		},
		{
			name: "Piso 2",
			rooms: [
				{ name: "201" },
				{ name: "202" },
				{ name: "203" },
				{ name: "204" },
				{ name: "205" },
				{ name: "206" },
			],
		},
	];

	return (
		<div className="p-8">
			<h1 className="text-2xl font-heading font-semibold tracking-tight mb-4">
				Reservas
			</h1>
			<div>
				<RoomTypeFilter />
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

function RoomTypeFilter() {
	const [allActive, setAllActive] = useState(true);
	const [active, setActive] = useState<{ [k: string]: boolean }>({})

	function HandleChipClick(name: string, newState: boolean) {
		const state = {
			...active,
			[name]: newState,
		};
		setActive(state);

		if (Object.values(state).every(b => !b)) {
			// if no chip is clicked, All is enabled
			setAllActive(true);
		} else {
			// if at least 1 chip is clicked, All is disabled
			setAllActive(false);
		}
	}

	function HandleAllClick(newState: boolean) {
		if (newState === true) {
			setAllActive(true)
			setActive({});
		}
	}

	return (
		<div className="flex gap-4">
			<span className="font-heading">Tipo:</span>
			<div className="flex bg-linear-to-b from-muted to-secondary rounded-lg">
				<Chip
					active={allActive}
					onClick={HandleAllClick}
					position="left"
					className="border-r-4"
				>
					Todos
				</Chip>
				<Chip position="middle"
					active={active["matrimonial"]}
					onClick={(b) => HandleChipClick("matrimonial", b)}
				>
					Matrimonial
				</Chip>
				<Chip position="middle"
					active={active["single"]}
					onClick={(b) => HandleChipClick("single", b)}
				>
					Single
				</Chip>
				<Chip position="middle"
					active={active["doble"]}
					onClick={(b) => HandleChipClick("doble", b)}
				>
					Doble
				</Chip>
				<Chip position="right"
					active={active["litera"]}
					onClick={(b) => HandleChipClick("litera", b)}
				>
					Litera
				</Chip>
			</div>
		</div >
	);
}

type ChipBorderType = "left" | "middle" | "right"
type ChipProps = {
	position: ChipBorderType, className?: string, children: string,
	active: boolean, onClick: (newState: boolean) => void
}
function Chip({ position, className, children, active, onClick }: ChipProps) {
	const chipBorderClass = (() => {
		if (position === "left") return "rounded-l-lg border"
		else if (position === "middle") return "border-y border-r"
		else if (position === "right") return "rounded-r-lg border-y border-r"
		else {
			let _: never = position;
			return _;
		}
	})()

	return (
		<button className={cn([
			"inline-block text-sm font-heading font-medium",
			"px-2 transition-all cursor-pointer flex items-center align-middle gap-1",
			"group",
			"not:data-active:bg-muted",
			"data-active:bg-primary data-active:text-primary-foreground",
			chipBorderClass,
			className,
		])}
			data-active={active}
			onClick={() => onClick(!active)}
		>
			<span>{children}</span>
		</button>
	)
}
