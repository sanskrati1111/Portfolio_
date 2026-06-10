import { useEffect, useState } from "react";

export function ScrollRocket() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(Math.min(1, Math.max(0, window.scrollY / h)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="pointer-events-none fixed right-6 top-0 z-50 hidden h-screen w-1 md:block">
      <div className="absolute inset-y-8 left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-[#10b981] via-[#7B61FF] to-[#00D4FF] opacity-30" />
      <div
        className="absolute left-1/2 -translate-x-1/2 transition-transform duration-150"
        style={{ top: `calc(${progress * 100}% - 12px)` }}
      >
        <div className="relative">
          <div className="absolute -inset-2 animate-pulse rounded-full bg-[#FF6EC7] opacity-40 blur" />
          <span className="relative block text-xl" style={{ filter: "drop-shadow(0 0 6px #FF6EC7)" }}>🚀</span>
        </div>
      </div>
      <div className="absolute -left-12 top-4 font-mono text-[10px] uppercase tracking-widest text-white/40">
        {Math.round(progress * 100)}%
      </div>
    </div>
  );
}
