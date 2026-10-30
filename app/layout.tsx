import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import GlobalUI from "./components/GlobalUI";

// 1. Cargamos Poppins con sus archivos estáticos
const poppins = localFont({
  src: [
    { path: './fonts/Poppins-Regular.ttf', weight: '400', style: 'normal' },
    { path: './fonts/Poppins-Medium.ttf', weight: '500', style: 'normal' },
    { path: './fonts/Poppins-SemiBold.ttf', weight: '600', style: 'normal' },
    { path: './fonts/Poppins-Bold.ttf', weight: '700', style: 'normal' },
    { path: './fonts/Poppins-ExtraBold.ttf', weight: '800', style: 'normal' },
    { path: './fonts/Poppins-Black.ttf', weight: '900', style: 'normal' },
  ],
  variable: "--font-poppins"
});

// 2. Cargamos Nunito Sans usando el archivo variable
const nunitoSans = localFont({
  src: './fonts/NunitoSans-VariableFont.ttf',
  variable: "--font-nunito",
  weight: '300 700', // Rango de pesos requeridos para la fuente variable
});

export const metadata: Metadata = {
  title: "SIGSA | Sistemas de información geográfica SA de CV",
  description: "SIGSA es una empresa 100% mexicana con mas de 45 años de experiencia...",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${poppins.variable} ${nunitoSans.variable}`}>
      <body className="font-sans bg-[#030305] text-white antialiased overflow-x-hidden">
        <GlobalUI>
          {children}
        </GlobalUI>
      </body>
    </html>
  );
}