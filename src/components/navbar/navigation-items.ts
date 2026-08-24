import { BedDouble, CalendarCheck, House } from "lucide-react";

export const navigationItems = [
	{ label: "Inicio", to: "/", icon: House },
	{ label: "Reservas", to: "/reservas", icon: CalendarCheck },
	{ label: "Habitaciones", to: "/habitaciones", icon: BedDouble },
] as const;
