import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { Suspense, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Points } from "three";

function NebulaCloud({ color, position }: { color: string; position: [number, number, number] }) {
  const ref = useRef<Points>(null);
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.z = clock.elapsedTime * 0.02;
    }
  });
  return (
    <mesh position={position}>
      <sphereGeometry args={[8, 32, 32]} />
      <meshBasicMaterial color={color} transparent opacity={0.06} />
    </mesh>
  );
}

export function SpaceBackground() {
  const { scrollYProgress } = useScroll();

  // Distant star layer drifts slowly, mid layer drifts more — classic parallax.
  const farY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const midY = useTransform(scrollYProgress, [0, 1], ["0%", "-35%"]);
  const nearY = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);
  const hue = useTransform(scrollYProgress, [0, 0.5, 1], [0, 30, 60]);

  return (
    <motion.div
      className="fixed inset-0 -z-10 bg-[#040418]"
      style={{ filter: useTransform(hue, (h) => `hue-rotate(${h}deg)`) }}
    >
      {/* Far stars — slow drift */}
      <motion.div className="absolute inset-0" style={{ y: farY }}>
        <Canvas camera={{ position: [0, 0, 1], fov: 75 }} dpr={[1, 2]}>
          <Suspense fallback={null}>
            <Stars radius={140} depth={80} count={9000} factor={5} fade speed={0.8} />
            <NebulaCloud color="#7B61FF" position={[-10, 5, -20]} />
            <NebulaCloud color="#FF6EC7" position={[12, -8, -25]} />
            <NebulaCloud color="#00D4FF" position={[5, 10, -30]} />
            <NebulaCloud color="#9DFF00" position={[-8, -10, -28]} />
            <NebulaCloud color="#FFD700" position={[14, 4, -22]} />
          </Suspense>
        </Canvas>
      </motion.div>

      {/* Distant glowing planet */}
      <div
        className="pointer-events-none absolute right-[8%] top-[12%] size-48 rounded-full opacity-70"
        style={{
          background: "radial-gradient(circle at 30% 30%, #ffb37a 0%, #d35a4a 40%, #4a1e3a 80%, transparent)",
          boxShadow: "0 0 80px #ff6ec7, inset -20px -20px 60px rgba(0,0,0,0.6)",
        }}
      />
      {/* Aurora ribbon */}
      <div
        className="pointer-events-none absolute -left-[10%] top-[40%] h-40 w-[140%] opacity-30 blur-2xl"
        style={{
          background: "linear-gradient(90deg, transparent, #9DFF00, #00D4FF, #7B61FF, transparent)",
          transform: "rotate(-8deg)",
          animation: "aurora-shift 12s ease infinite",
          backgroundSize: "300% 100%",
        }}
      />

      {/* Mid parallax layer — twinkly dust */}
      <motion.div className="pointer-events-none absolute inset-0" style={{ y: midY }}>
        {Array.from({ length: 60 }).map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white twinkle"
            style={{
              top: `${(i * 53) % 100}%`,
              left: `${(i * 37) % 100}%`,
              width: `${1 + (i % 3)}px`,
              height: `${1 + (i % 3)}px`,
              opacity: 0.3 + ((i % 5) / 10),
              animationDelay: `${(i % 5) * 0.6}s`,
            }}
          />
        ))}
      </motion.div>

      {/* Near layer — shooting stars (fastest parallax) */}
      <motion.div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        style={{ y: nearY }}
      >
        {[...Array(4)].map((_, i) => (
          <span
            key={i}
            className="absolute h-px w-32 bg-gradient-to-r from-white to-transparent"
            style={{
              top: `${10 + i * 20}%`,
              right: `-20%`,
              animation: `shoot ${6 + i * 2}s linear ${i * 3}s infinite`,
            }}
          />
        ))}
      </motion.div>

      {/* Gradient overlay — fades atmosphere as you scroll deeper */}
      <div className="pointer-events-none absolute inset-0 bg-mission-gradient" />
    </motion.div>
  );
}
