import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const nordiqueRegular = localFont({
  src: "../assets/NordiquePro-Regular.otf",
  variable: "--font-nordique",
  weight: "400",
});

const nordiqueSemibold = localFont({
  src: "../assets/NordiquePro-Semibold.otf",
  variable: "--font-nordique-semibold",
  weight: "600",
});

const nordiqueLight = localFont({
  src: "../assets/NordiquePro-Light.otf",
  variable: "--font-nordique-light",
  weight: "300",
});

export const metadata: Metadata = {
  title: "Sven Reyes - Portfolio",
  description: "Portfolio of Sven Reyes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${nordiqueRegular.variable} ${nordiqueSemibold.variable} ${nordiqueLight.variable} antialiased`}
        style={{ fontFamily: "var(--font-nordique)" }}
      >
        {children}
      </body>
    </html>
  );
}
