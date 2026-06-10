import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import type { Project } from "./ProjectGalaxy";

/* ============== FLOATING ISLANDS IN THE CLOUDS (Projects in light mode) ============== */
export function FloatingIslands({ projects }: { projects: Project[] }) {
  return (
    <div className="relative h-[600px] w-full overflow-hidden rounded-3xl"
      style={{ background: "linear-gradient(to bottom, #bfe3ff 0%, #e6f3ff 60%, #fff2d6 100%)" }}>
      {/* Drifting clouds */}
      {[
        { top: "10%", left: "5%", size: 180, delay: 0 },
        { top: "25%", left: "70%", size: 220, delay: 2 },
        { top: "55%", left: "10%", size: 160, delay: 1 },
        { top: "70%", left: "65%", size: 240, delay: 3 },
        { top: "40%", left: "40%", size: 140, delay: 4 },
      ].map((c, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white opacity-80 blur-xl"
          style={{
            top: c.top, left: c.left, width: c.size, height: c.size * 0.55,
            animation: `float-slow ${10 + i * 2}s ease-in-out ${c.delay}s infinite`,
          }}
        />
      ))}

      {/* Sun rays */}
      <div className="pointer-events-none absolute right-10 top-8 size-32 rounded-full"
        style={{
          background: "radial-gradient(circle, #fff3a8 0%, #ffd166 50%, transparent 75%)",
          boxShadow: "0 0 80px #ffd166",
        }} />

      {/* Floating islands */}
      <div className="absolute inset-0 flex items-center justify-around px-8">
        {projects.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ y: 0 }}
            animate={{ y: [0, -18, 0] }}
            transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
            whileHover={{ scale: 1.08, y: -10 }}
            className="group relative w-64"
          >
            {/* Island */}
            <div className="relative mx-auto">
              {/* Grass top */}
              <div
                className="mx-auto h-16 w-48 rounded-t-full"
                style={{ background: `linear-gradient(180deg, #6fcf6f, #3d8a4a)` }}
              />
              {/* Rocky underside */}
              <svg viewBox="0 0 200 80" className="-mt-1 h-20 w-48 mx-auto">
                <path
                  d="M5 0 Q20 30 35 25 Q55 70 80 55 Q105 80 130 60 Q160 75 175 40 Q195 30 195 0 Z"
                  fill="url(#rock-grad)"
                />
                <defs>
                  <linearGradient id="rock-grad" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#8b6a4a" />
                    <stop offset="100%" stopColor="#5a3f2a" />
                  </linearGradient>
                </defs>
              </svg>
              {/* Tree / flag marker */}
              <div className="absolute left-1/2 -top-12 -translate-x-1/2 text-4xl">🌳</div>
            </div>

            {/* Sign */}
            <div className="mt-4 rounded-2xl border border-white/60 bg-white/80 p-4 text-center shadow-lg backdrop-blur">
              <div className="font-mono text-[10px] uppercase tracking-[0.25em]" style={{ color: p.color }}>
                {p.tag}
              </div>
              <div className="mt-1 font-display text-xl text-slate-800">{p.name}</div>
              <p className="mt-2 text-xs text-slate-600 line-clamp-2">{p.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Birds */}
      {[0, 1].map((i) => (
        <span
          key={i}
          className="absolute text-xl opacity-70"
          style={{ top: `${15 + i * 8}%`, left: "-10%", animation: `bird-fly ${24 + i * 5}s linear ${i * 5}s infinite` }}
        >
          🕊️
        </span>
      ))}
    </div>
  );
}

/* ============== MOUNTAIN PEAKS WITH FLAGS (Achievements in light mode) ============== */
export function MountainPeaks({ items }: { items: { title: string }[] }) {
  return (
    <div className="relative h-[500px] w-full overflow-hidden rounded-3xl border border-white/40"
      style={{ background: "linear-gradient(to bottom, #cfe8ff 0%, #ffe1b8 70%, #f6c993 100%)" }}>
      {/* Sun */}
      <div className="absolute left-1/2 top-10 size-24 -translate-x-1/2 rounded-full"
        style={{
          background: "radial-gradient(circle at 35% 35%, #fff7c2, #ffd166 50%, #ff8a3d 95%)",
          boxShadow: "0 0 60px #ffb347",
        }}
      />

      {/* Clouds */}
      {[
        { top: "18%", left: "8%", w: 120 },
        { top: "28%", left: "70%", w: 160 },
        { top: "12%", left: "55%", w: 90 },
      ].map((c, i) => (
        <div key={i} className="absolute rounded-full bg-white opacity-90 blur-md"
          style={{ top: c.top, left: c.left, width: c.w, height: c.w * 0.45,
            animation: `float-slow ${12 + i * 2}s ease-in-out infinite` }} />
      ))}

      {/* Mountains */}
      <svg className="absolute bottom-0 h-[75%] w-full" viewBox="0 0 1000 400" preserveAspectRatio="none">
        <defs>
          <linearGradient id="m1" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#6b7fa8" />
            <stop offset="60%" stopColor="#3d4f78" />
            <stop offset="100%" stopColor="#2a3858" />
          </linearGradient>
          <linearGradient id="m2" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#8aa0c8" />
            <stop offset="100%" stopColor="#4f6594" />
          </linearGradient>
          <linearGradient id="snow" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#cfe0ff" />
          </linearGradient>
        </defs>
        {/* Back peaks */}
        <path d="M0 400 L0 220 L160 100 L300 200 L440 80 L580 190 L720 90 L860 200 L1000 110 L1000 400 Z" fill="url(#m2)" />
        {/* Front peaks */}
        <path d="M0 400 L0 280 L120 200 L260 280 L400 160 L540 270 L680 180 L820 260 L1000 200 L1000 400 Z" fill="url(#m1)" />
        {/* Snow caps */}
        <path d="M120 200 L160 230 L100 230 Z" fill="url(#snow)" />
        <path d="M400 160 L440 200 L360 200 Z" fill="url(#snow)" />
        <path d="M680 180 L720 220 L640 220 Z" fill="url(#snow)" />
      </svg>

      {/* Achievement flags planted on peaks */}
      {[
        { x: 12, y: 50, color: "#e94560" },
        { x: 26, y: 65, color: "#ffd166" },
        { x: 40, y: 38, color: "#06aed5" },
        { x: 54, y: 60, color: "#9b5de5" },
        { x: 68, y: 42, color: "#f15bb5" },
        { x: 82, y: 55, color: "#00bbf9" },
        { x: 30, y: 78, color: "#10b981" },
        { x: 70, y: 78, color: "#ff8a3d" },
      ].slice(0, items.length).map((flag, i) => (
        <motion.div
          key={items[i].title}
          initial={{ y: -10, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.12 }}
          whileHover={{ scale: 1.15 }}
          className="group absolute -translate-x-1/2"
          style={{ left: `${flag.x}%`, top: `${flag.y}%` }}
        >
          <div className="h-10 w-px bg-slate-700" />
          <div className="absolute left-px top-0 h-3 w-6"
            style={{ background: flag.color, clipPath: "polygon(0 0, 100% 0, 80% 50%, 100% 100%, 0 100%)" }}
          />
          <div className="pointer-events-none absolute left-1/2 top-12 w-40 -translate-x-1/2 rounded-md border border-slate-300 bg-white/95 px-2 py-1 text-center font-mono text-[10px] uppercase tracking-wider text-slate-800 opacity-0 shadow-md transition-opacity group-hover:opacity-100">
            {items[i].title}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* ============== CLOUD REVEAL — Future Destinations (light mode) ============== */
export function CloudReveal({ items }: { items: string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const cloudsLeft = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);
  const cloudsRight = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
  const sunRotate = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <div ref={ref} className="relative h-[500px] w-full overflow-hidden rounded-3xl"
      style={{ background: "linear-gradient(to bottom, #a8d8ff 0%, #ffe1b8 80%, #ffc999 100%)" }}>
      {/* Sun with rotating rays */}
      <motion.div style={{ rotate: sunRotate }} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <svg width="280" height="280" viewBox="-50 -50 100 100">
          {Array.from({ length: 12 }).map((_, i) => (
            <rect key={i} x="-1" y="-48" width="2" height="20" fill="#ffd166" opacity="0.65"
              transform={`rotate(${i * 30})`} />
          ))}
          <circle r="22" fill="url(#sun-core)" />
          <defs>
            <radialGradient id="sun-core">
              <stop offset="0%" stopColor="#fff7c2" />
              <stop offset="60%" stopColor="#ffd166" />
              <stop offset="100%" stopColor="#ff8a3d" />
            </radialGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Destinations (revealed under clouds) */}
      <div className="absolute inset-0 flex flex-wrap items-center justify-center gap-5 p-12">
        {items.map((f, i) => (
          <motion.div
            key={f}
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + i * 0.15 }}
            className="relative z-10 flex size-32 items-center justify-center rounded-full border border-white/70 bg-white/70 p-4 text-center font-display text-sm leading-tight text-slate-800 shadow-lg backdrop-blur md:size-36 md:text-base"
            style={{ animation: `float-slow ${5 + i}s ease-in-out infinite`, animationDelay: `${i * 0.4}s` }}
          >
            {f}
          </motion.div>
        ))}
      </div>

      {/* Sliding cloud curtains revealing the scene */}
      <motion.div style={{ x: cloudsLeft }} className="pointer-events-none absolute inset-y-0 left-0 z-20 w-1/2">
        {[
          { top: "10%", left: "5%", w: 220 },
          { top: "40%", left: "20%", w: 260 },
          { top: "70%", left: "0%", w: 240 },
        ].map((c, i) => (
          <div key={i} className="absolute rounded-full bg-white blur-xl"
            style={{ top: c.top, left: c.left, width: c.w, height: c.w * 0.55, opacity: 0.95 }} />
        ))}
      </motion.div>
      <motion.div style={{ x: cloudsRight }} className="pointer-events-none absolute inset-y-0 right-0 z-20 w-1/2">
        {[
          { top: "15%", right: "5%", w: 240 },
          { top: "45%", right: "20%", w: 220 },
          { top: "75%", right: "0%", w: 260 },
        ].map((c, i) => (
          <div key={i} className="absolute rounded-full bg-white blur-xl"
            style={{ top: c.top, right: c.right, width: c.w, height: c.w * 0.55, opacity: 0.95 }} />
        ))}
      </motion.div>

      {/* Birds flying toward horizon */}
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="absolute z-30 text-xl opacity-80"
          style={{ top: `${20 + i * 10}%`, left: "-10%",
            animation: `bird-fly ${20 + i * 5}s linear ${i * 3}s infinite` }}
        >
          🕊️
        </span>
      ))}
    </div>
  );
}
