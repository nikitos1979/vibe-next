"use client";

type Status = "unreviewed" | "exact" | "not-exact";

interface NavSidebarProps {
  totalPairs: number;
  currentIndex: number;
  statuses: Status[];
  onSelect: (index: number) => void;
}

export default function NavSidebar({
  totalPairs,
  currentIndex,
  statuses,
  onSelect,
}: NavSidebarProps) {
  return (
    <div className="w-16 bg-theme-panel border-r border-theme-border flex flex-col items-center py-2 gap-1 overflow-y-auto">
      {Array.from({ length: totalPairs }, (_, i) => {
        const status = statuses[i];
        const isActive = i === currentIndex;
        const colorClass =
          status === "exact"
            ? "text-accent-green"
            : status === "not-exact"
            ? "text-accent-red"
            : "text-theme-text-secondary";

        return (
          <button
            key={i}
            onClick={() => onSelect(i)}
            className={`w-12 h-10 flex flex-col items-center justify-center rounded cursor-pointer transition-colors text-xs ${colorClass} ${
              isActive
                ? "bg-theme-control border border-accent-blue font-bold"
                : "hover:bg-theme-surface"
            }`}
          >
            <svg
              className="w-4 h-4 mb-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6z" />
            </svg>
            {i + 1}
          </button>
        );
      })}
    </div>
  );
}
