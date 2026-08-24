import { Monitor, Moon, Sun } from "lucide-react";

import { type Theme, useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const themeOptions: Array<{ value: Theme; label: string }> = [
	{ value: "light", label: "Claro" },
	{ value: "dark", label: "Oscuro" },
	{ value: "system", label: "Automático" },
];

export function ModeToggle() {
	const { theme, setTheme } = useTheme();
	const ThemeIcon = theme === "light" ? Sun : theme === "dark" ? Moon : Monitor;

	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				render={
					<Button variant="outline" size="icon" aria-label="Cambiar tema">
						<ThemeIcon aria-hidden="true" />
						<span className="sr-only">Cambiar tema</span>
					</Button>
				}
			/>
			<DropdownMenuContent align="end">
				<DropdownMenuLabel>Tema</DropdownMenuLabel>
				<DropdownMenuRadioGroup
					value={theme}
					onValueChange={(value) => {
						if (value === "light" || value === "dark" || value === "system") {
							setTheme(value);
						}
					}}
				>
					{themeOptions.map((option) => (
						<DropdownMenuRadioItem key={option.value} value={option.value}>
							{option.label}
						</DropdownMenuRadioItem>
					))}
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
