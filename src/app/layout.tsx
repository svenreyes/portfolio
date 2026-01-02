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

const anovaBold = localFont({
  src: "../../public/fonts/sas/Anova-Bold.otf",
  variable: "--font-anova-bold",
  weight: "700",
});

const nunitoSans = localFont({
  src: "../../public/fonts/extend/NunitoSans-VariableFont_YTLC,opsz,wdth,wght.ttf",
  variable: "--font-nunito-sans",
  weight: "100 900",
});

const nersans = localFont({
  src: "../../public/fonts/skulpt/Nersans Font.ttf",
  variable: "--font-nersans",
  weight: "400",
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
        className={`${nordiqueRegular.variable} ${nordiqueSemibold.variable} ${nordiqueLight.variable} ${anovaBold.variable} ${nunitoSans.variable} ${nersans.variable} antialiased`}
        style={{ fontFamily: "var(--font-nordique)" }}
      >
        {children}
      </body>
    </html>
  );
}
