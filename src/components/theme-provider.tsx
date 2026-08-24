import {
	createContext,
	type ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";

export type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
	children: ReactNode;
	defaultTheme?: Theme;
	storageKey?: string;
};

type ThemeProviderState = {
	theme: Theme;
	setTheme: (theme: Theme) => void;
};

const ThemeProviderContext = createContext<ThemeProviderState | undefined>(
	undefined,
);

function isTheme(value: string | null): value is Theme {
	return value === "dark" || value === "light" || value === "system";
}

export function ThemeProvider({
	children,
	defaultTheme = "system",
	storageKey = "hospedajes-ui-theme",
}: ThemeProviderProps) {
	const [theme, setTheme] = useState<Theme>(() => {
		const storedTheme = window.localStorage.getItem(storageKey);
		return isTheme(storedTheme) ? storedTheme : defaultTheme;
	});

	useEffect(() => {
		const root = window.document.documentElement;
		const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

		const applyTheme = () => {
			const resolvedTheme =
				theme === "system" ? (mediaQuery.matches ? "dark" : "light") : theme;

			root.classList.remove("light", "dark");
			root.classList.add(resolvedTheme);
		};

		applyTheme();

		if (theme !== "system") {
			return;
		}

		mediaQuery.addEventListener("change", applyTheme);
		return () => mediaQuery.removeEventListener("change", applyTheme);
	}, [theme]);

	const value = {
		theme,
		setTheme: (nextTheme: Theme) => {
			window.localStorage.setItem(storageKey, nextTheme);
			setTheme(nextTheme);
		},
	};

	return (
		<ThemeProviderContext.Provider value={value}>
			{children}
		</ThemeProviderContext.Provider>
	);
}

export function useTheme() {
	const context = useContext(ThemeProviderContext);

	if (!context) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}

	return context;
}
