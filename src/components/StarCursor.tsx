import { useEffect, useState } from "react";

export function StarCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([]);

  useEffect(() => {
    let id = 0;
    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setTrail((t) => [...t.slice(-8), { x: e.clientX, y: e.clientY, id: id++ }]);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <>
      {trail.map((p, i) => (
        <div
          key={p.id}
          className="pointer-events-none fixed z-[9998] rounded-full bg-[#00D4FF]"
          style={{
            left: p.x,
            top: p.y,
            width: 4 + i * 0.5,
            height: 4 + i * 0.5,
            opacity: (i / trail.length) * 0.5,
            transform: "translate(-50%,-50%)",
            filter: "blur(1px)",
            transition: "opacity 0.3s",
          }}
        />
      ))}
      <div
        className="pointer-events-none fixed z-[9999]"
        style={{ left: pos.x, top: pos.y, transform: "translate(-50%,-50%)" }}
      >
        <div className="relative h-5 w-5">
          <div className="absolute inset-0 rotate-45 bg-[#7B61FF]" style={{ clipPath: "polygon(50% 0%, 60% 40%, 100% 50%, 60% 60%, 50% 100%, 40% 60%, 0% 50%, 40% 40%)", filter: "drop-shadow(0 0 6px #7B61FF)" }} />
        </div>
      </div>
    </>
  );
}
