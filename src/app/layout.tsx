import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Africa Tech LMS",
  description: "Learning Management System for Africa Tech",
  icons: {
    icon: [
      { url: '/images/IMG_0955-Photoroom%201.png' },
      { url: '/images/IMG_0955-Photoroom%201.png', type: 'image/png', sizes: '32x32' },
    ],
    apple: [
      { url: '/images/IMG_0955-Photoroom%201.png' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
		<html lang="en" className="dark" style={{ colorScheme: 'dark' }}>
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
