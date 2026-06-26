import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { Providers } from "@/components/Providers";
import { ThemeProvider } from "@/components/ThemeProvider";
import { DotSpotlight } from "@/components/DotSpotlight";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

// Use a different CSS variable name to avoid conflict with our
// globals.css @theme definition of --font-display (Clash Display takes priority).
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-grotesk" });

export const metadata: Metadata = {
  title: "Portfolio — Full Stack Developer",
  description: "Personal portfolio showcasing projects, experience and skills.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased bg-background text-foreground transition-colors duration-300`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          <DotSpotlight />
          <Providers>{children}</Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
