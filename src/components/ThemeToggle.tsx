import { useEffect, useState } from "react";

export type Theme = "dark" | "light";

export function useTheme(): [Theme, (t: Theme) => void] {
  const [theme, setThemeState] = useState<Theme>("dark");

  useEffect(() => {
    const saved = (typeof window !== "undefined" && (localStorage.getItem("theme") as Theme)) || "dark";
    setThemeState(saved);
    document.documentElement.dataset.theme = saved;
  }, []);

  const setTheme = (t: Theme) => {
    setThemeState(t);
    document.documentElement.dataset.theme = t;
    try { localStorage.setItem("theme", t); } catch {}
  };

  return [theme, setTheme];
}

export function ThemeToggle({ theme, onToggle }: { theme: Theme; onToggle: () => void }) {
  const isLight = theme === "light";
  return (
    <button
      onClick={onToggle}
      aria-label="Toggle theme"
      className="fixed right-4 top-4 z-50 flex h-11 w-20 items-center rounded-full border border-white/20 bg-black/40 px-1 backdrop-blur-md transition-colors data-[light=true]:border-black/15 data-[light=true]:bg-white/60"
      data-light={isLight}
    >
      <span
        className="flex size-9 items-center justify-center rounded-full text-lg shadow-lg transition-transform duration-500"
        style={{
          transform: isLight ? "translateX(36px)" : "translateX(0)",
          background: isLight
            ? "radial-gradient(circle at 30% 30%, #ffd166, #ff8a3d)"
            : "radial-gradient(circle at 30% 30%, #4f3ed1, #0a0a2a)",
          boxShadow: isLight ? "0 0 24px #ffb347" : "0 0 18px #7B61FF",
        }}
      >
        {isLight ? "☀️" : "🌙"}
      </span>
    </button>
  );
}
