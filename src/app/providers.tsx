"use client"
import { HeroUIProvider } from "@heroui/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import {ToastProvider} from "@heroui/toast";

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<HeroUIProvider>
			<NextThemesProvider attribute="class" defaultTheme="dark">
			<ToastProvider />
				{children}
			</NextThemesProvider>
		</HeroUIProvider>
	);
}
