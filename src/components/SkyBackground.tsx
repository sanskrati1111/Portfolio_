import { motion, useScroll, useTransform } from "framer-motion";

export function SkyBackground() {
  const { scrollYProgress } = useScroll();
  const sunY = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
  const cloudsX1 = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const cloudsX2 = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const hillsY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Sky gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, #7ec8ff 0%, #aee0ff 40%, #ffd9a8 80%, #ffb37a 100%)",
        }}
      />

      {/* Sun */}
      <motion.div
        style={{ y: sunY }}
        className="absolute left-1/2 top-[15%] -translate-x-1/2"
      >
        <div className="relative">
          <div className="absolute -inset-16 rounded-full bg-yellow-200 opacity-50 blur-3xl" />
          <div className="absolute -inset-8 rounded-full bg-orange-200 opacity-60 blur-2xl" />
          <div
            className="relative size-36 rounded-full"
            style={{
              background: "radial-gradient(circle at 35% 35%, #fff7c2, #ffd166 40%, #ff8a3d 90%)",
              boxShadow: "0 0 80px #ffb347, 0 0 160px #ff8a3d",
            }}
          />
        </div>
      </motion.div>

      {/* Drifting clouds layer 1 */}
      <motion.div style={{ x: cloudsX1 }} className="pointer-events-none absolute inset-0">
        {[
          { top: "12%", left: "5%", size: 180, opacity: 0.85 },
          { top: "25%", left: "60%", size: 240, opacity: 0.9 },
          { top: "45%", left: "20%", size: 200, opacity: 0.8 },
          { top: "60%", left: "75%", size: 260, opacity: 0.85 },
          { top: "75%", left: "10%", size: 220, opacity: 0.8 },
        ].map((c, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white blur-xl"
            style={{
              top: c.top,
              left: c.left,
              width: c.size,
              height: c.size * 0.55,
              opacity: c.opacity,
              animation: `float-slow ${10 + i * 2}s ease-in-out infinite`,
            }}
          />
        ))}
      </motion.div>

      {/* Drifting clouds layer 2 — slower, smaller */}
      <motion.div style={{ x: cloudsX2 }} className="pointer-events-none absolute inset-0">
        {[
          { top: "18%", left: "40%", size: 120 },
          { top: "55%", left: "50%", size: 140 },
          { top: "85%", left: "35%", size: 160 },
        ].map((c, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white opacity-70 blur-lg"
            style={{
              top: c.top,
              left: c.left,
              width: c.size,
              height: c.size * 0.5,
              animation: `float-slow ${14 + i * 3}s ease-in-out infinite`,
            }}
          />
        ))}
      </motion.div>

      {/* Distant rolling hills */}
      <motion.svg
        style={{ y: hillsY }}
        className="absolute bottom-0 left-0 right-0 h-48 w-full"
        viewBox="0 0 1200 200"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="hill1" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#7bbf7b" />
            <stop offset="100%" stopColor="#3d8a4a" />
          </linearGradient>
          <linearGradient id="hill2" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#4a9a5a" />
            <stop offset="100%" stopColor="#2d6b3a" />
          </linearGradient>
        </defs>
        <path d="M0 200 L0 120 Q200 60 400 100 T800 90 T1200 110 L1200 200 Z" fill="url(#hill1)" opacity="0.8" />
        <path d="M0 200 L0 150 Q300 100 600 140 T1200 150 L1200 200 Z" fill="url(#hill2)" />
      </motion.svg>

      {/* Bird silhouettes */}
      <div className="pointer-events-none absolute inset-0">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="absolute text-2xl opacity-60"
            style={{
              top: `${20 + i * 10}%`,
              left: "-10%",
              animation: `bird-fly ${22 + i * 6}s linear ${i * 4}s infinite`,
            }}
          >
            🕊️
          </span>
        ))}
      </div>
    </div>
  );
}
