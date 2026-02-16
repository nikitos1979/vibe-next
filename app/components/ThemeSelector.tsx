"use client";

import { useTheme, themes, Theme } from "./ThemeProvider";

const labels: Record<Theme, string> = {
  dark: "Dark",
  light: "Light",
  midnight: "Midnight",
  solarized: "Solarized",
};

export default function ThemeSelector() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="fixed top-3 right-3 z-40">
      <select
        value={theme}
        onChange={(e) => setTheme(e.target.value as Theme)}
        className="bg-theme-control border border-theme-border text-theme-text rounded px-2 py-1 text-sm outline-none focus:border-accent-blue cursor-pointer"
      >
        {themes.map((t) => (
          <option key={t} value={t}>
            {labels[t]}
          </option>
        ))}
      </select>
    </div>
  );
}
