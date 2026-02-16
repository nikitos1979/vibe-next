import type { Metadata } from "next";
import "./globals.css";
import ThemeProvider from "./components/ThemeProvider";
import ThemeSelector from "./components/ThemeSelector";

export const metadata: Metadata = {
  title: "Chemistry Match Tool",
  description: "Chemistry formula matching and review tool",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <ThemeSelector />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
