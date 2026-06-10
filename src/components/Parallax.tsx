import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef, type ReactNode } from "react";

type ParallaxProps = {
  children: ReactNode;
  speed?: number; // negative = moves up faster, positive = lags behind
  className?: string;
  fade?: boolean;
  scale?: boolean;
};

/**
 * Wrap any block in scroll-driven parallax.
 * Tracks its own position relative to the viewport.
 */
export function Parallax({
  children,
  speed = -80,
  className,
  fade = false,
  scale = false,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [Math.abs(speed), -Math.abs(speed) * (speed < 0 ? 1 : -1)]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const s = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1, 1.05]);

  return (
    <motion.div
      ref={ref}
      style={{
        y,
        ...(fade ? { opacity } : {}),
        ...(scale ? { scale: s } : {}),
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Returns the global window scrollY as a MotionValue<number 0..1 (page progress)>. */
export function usePageScroll(): MotionValue<number> {
  const { scrollYProgress } = useScroll();
  return scrollYProgress;
}
