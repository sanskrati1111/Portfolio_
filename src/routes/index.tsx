import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { SpaceBackground } from "@/components/SpaceBackground";
import { SkyBackground } from "@/components/SkyBackground";
import { Earth } from "@/components/Earth";
import { ProjectGalaxy, type Project } from "@/components/ProjectGalaxy";
import { ScrollRocket } from "@/components/ScrollRocket";
import { ThemeToggle, useTheme } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Parallax } from "@/components/Parallax";
import { FloatingIslands, MountainPeaks, CloudReveal } from "@/components/LightSections";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sanskrati Arya — From Earth to Infinity" },
      { name: "description", content: "An interstellar portfolio of a software engineer, AI builder, and problem solver. Embark on a journey from Earth to the stars." },
      { property: "og:title", content: "Sanskrati Arya — From Earth to Infinity" },
      { property: "og:description", content: "An interstellar portfolio of a software engineer, AI builder, and problem solver." },
    ],
  }),
  component: Mission,
});

const ROLES = ["Software Engineer", "AI Builder", "Problem Solver", "Explorer"];

const JOURNEY = [
  { year: "2019", title: "School", desc: "First spark of curiosity." },
  { year: "2020", title: "Coding", desc: "Wrote my first program. Never stopped." },
  { year: "2023", title: "TCS", desc: "Real-world engineering at scale." },
{ year: "2024", title: "MERN", desc: "Full-stack web: React, Node, Mongo." },
  { year: "2025", title: "AI", desc: "Agents, intelligent products." },
  { year: "∞", title: "Future", desc: "Whatever comes next." },
];

const SKILLS = [
  { name: "Java", level: 70, color: "#FF8A3D" },
  { name: "React", level: 90, color: "#00D4FF" },
  { name: "Node.js", level: 85, color: "#9DFF00" },
  { name: "MongoDB", level: 82, color: "#10b981" },
  { name: "AWS", level: 50, color: "#FFD700" },
  { name: "SQL", level: 85, color: "#7B61FF" },
  { name: "AI", level: 60, color: "#FF6EC7" },
  { name: "Git", level: 90, color: "#FF8A3D" },
];

const MISSIONS = [
  { code: "M-01", org: "Tata Consultancy Services", role: "System Engineer", status: "DEPLOYED", desc: "Worked as a Frontend Developer at TCS, building and supporting enterprise web applications using React.js, JavaScript, HTML, and CSS." },
  { code: "M-02", org: "Support Engineering", role: "Reliability", status: "DEPLOYED", desc: "Tracing the impossible bug. SLA-grade incident response and customer trust." },
  { code: "M-03", org: "Java Development", role: "Backend Specialist", status: "DEPLOYED", desc: "REST APIs, JVM internals." },
  { code: "M-04", org: "AI Development", role: "AI Engineer", status: "ACTIVE", desc: "Building LLM-powered products that actually feel intelligent." },
];

const PROJECTS: Project[] = [
  { name: "AI Interview Simulator", tag: "AI · Realtime", color: "#7B61FF", emissive: "#FF6EC7", orbit: 2.2, speed: 0.4, size: 0.45, description: "Conducts realistic technical interviews with adaptive difficulty and instant feedback.", tech: ["Next.js", "OpenAI", "Tailwind"] },
  { name: "Smart Travel Planner", tag: "AI · Agents", color: "#10b981", emissive: "#9DFF00", orbit: 3.4, speed: 0.28, size: 0.4, description: "Multi-agent system that plans optimal itineraries based on budget, weather, and vibe.", tech: ["React", "Node", "LangChain", "Maps API"] },
  { name: "Portfolio Universe", tag: "WebGL · Story", color: "#00D4FF", emissive: "#7B61FF", orbit: 4.6, speed: 0.2, size: 0.35, description: "This very site. A scrollable journey from Earth to deep space, built with Three.js.", tech: ["TanStack", "Three.js", "Framer Motion"] },
];

const ACHIEVEMENTS = [
  { title: "500+ Coding Problems", x: 15, y: 25 },
  { title: "Java Coding Experience", x: 35, y: 15 },
  { title: "AI Projects Shipped", x: 55, y: 30 },
  { title: "Cloud Learning", x: 75, y: 18 },
  { title: "Certifications", x: 85, y: 55 },
  { title: "Technical Contributions", x: 25, y: 65 },
  { title: "Full stack Builder", x: 65, y: 70 },
  { title: "Mentorship", x: 45, y: 50 },
];

const HOBBIES = [
  { label: "Photography", emoji: "📷", caption: "Through the lens", img: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=700&q=80&auto=format&fit=crop" },
  { label: "Painting", emoji: "🎨", caption: "Color & canvas", img: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=700&q=80&auto=format&fit=crop" },
  { label: "Trekking", emoji: "🥾", caption: "Above the clouds", img: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=700&q=80&auto=format&fit=crop" },
  { label: "Adventure", emoji: "🪂", caption: "Leap of faith", img: "https://images.unsplash.com/photo-1521336575822-6da63fb45455?w=700&q=80&auto=format&fit=crop" },
  { label: "Dance", emoji: "💃", caption: "Rhythm in motion", img: "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=700&q=80&auto=format&fit=crop" },
  { label: "Table Tennis", emoji: "🏓", caption: "Fast volleys", img: "https://images.unsplash.com/photo-1611251135345-18c56206b863?w=700&q=80&auto=format&fit=crop" },
  { label: "Exploration", emoji: "🧭", caption: "Roads unknown", img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=700&q=80&auto=format&fit=crop" },
];

const FUTURE = [
  "Building AI products",
  "Mastering full-stack",
  "Cloud technologies",
  "Meaningful experiences",
  "New possibilities",
];

function Mission() {
  const [theme, setTheme] = useTheme();
  const isLight = theme === "light";
  return (
    <>
      <ThemeToggle theme={theme} onToggle={() => setTheme(isLight ? "dark" : "light")} />
      {isLight ? <SkyBackground /> : <SpaceBackground />}
      <ScrollRocket />
      <main className="relative">
        <Hero isLight={isLight} />
        <Origin />
        <Skills />
        <MissionControl />
        <GalaxySection isLight={isLight} />
        <Constellation isLight={isLight} />
        <AdventureLog />
        <FutureMissions isLight={isLight} />
        <ContactStation />
        <Footer />
      </main>
    </>
  );
}

/* ===================== SECTION 1 — HERO ===================== */
function Hero({ isLight }: { isLight: boolean }) {
  const [roleIdx, setRoleIdx] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const earthY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const earthScale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const mountainsY = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  useEffect(() => {
    const id = setInterval(() => setRoleIdx((i) => (i + 1) % ROLES.length), 2400);
    return () => clearInterval(id);
  }, []);

  return (
    <section ref={heroRef} id="launch" className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
      {!isLight && (
        <motion.div className="absolute inset-0" style={{ y: earthY, scale: earthScale }}>
          <Earth />
        </motion.div>
      )}

      <motion.svg
        style={{ y: mountainsY }}
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 w-full"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path d="M0 120 L0 80 L150 40 L280 70 L420 30 L580 65 L720 25 L880 60 L1020 35 L1200 75 L1200 120 Z" fill="url(#mtn)" opacity="0.85"/>
        <defs>
          <linearGradient id="mtn" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#1a0b3d"/>
            <stop offset="100%" stopColor="#040418"/>
          </linearGradient>
        </defs>
      </motion.svg>

      <motion.div style={{ y: contentY, opacity: contentOpacity }} className="relative z-10 mx-auto max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/15 bg-black/30 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.4em] backdrop-blur"
        >
          <span className="size-1.5 animate-pulse rounded-full bg-[#9DFF00]" />
          T-00:00 · Mission Ready
        </motion.div>

        <h1 className="font-display text-5xl leading-[0.95] tracking-tight md:text-8xl">
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="block text-white/90"
          >
            Hi, I'm
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6 }}
            className="block text-aurora"
          >
            Sanskrati Arya
          </motion.span>
        </h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-6 h-8 font-mono text-sm uppercase tracking-[0.4em] text-[#00D4FF] md:text-base"
        >
          <span className="opacity-50">{">"} </span>
          <motion.span
            key={roleIdx}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block"
          >
            {ROLES[roleIdx]}
          </motion.span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Button asChild size="lg" variant="hero">
            <a href="#origin">Initiate Launch 🚀</a>
          </Button>
          <Button asChild size="lg" variant="ghostGlow">
            <a href="#contact">Open Channel</a>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="mt-16 font-mono text-[10px] uppercase tracking-[0.4em] text-white/40"
        >
          ↓ scroll to depart ↓
        </motion.div>
      </motion.div>

    </section>
  );
}

/* ===================== SECTION 2 — ORIGIN STORY ===================== */
function Origin() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const textX = useTransform(scrollYProgress, [0, 0.5, 1], [-60, 0, 30]);
  const tlX = useTransform(scrollYProgress, [0, 0.5, 1], [60, 0, -30]);

  return (
    <section id="origin" ref={ref} className="relative min-h-screen overflow-hidden py-32">
      <div className="absolute inset-x-0 top-1/3 -z-10 mx-auto h-96 w-[120%] -translate-x-[10%] rounded-[100%] bg-gradient-to-t from-[#ff8a3d] via-[#ff6ec7] to-transparent opacity-25 blur-3xl" />
      <motion.div style={{ y }} className="absolute left-1/2 top-1/2 -z-10 h-[600px] w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-white/20 to-transparent" />

      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader chapter="Chapter 01" title="The Origin Story" subtitle="Every explorer begins on solid ground." />

        <div className="mt-16 grid gap-12 md:grid-cols-2">
          <motion.div
            style={{ x: textX }}
            className="space-y-5 text-lg leading-relaxed text-foreground/80"
          >
            <p>I'm a Full Stack Developer who fell in love with solving problems somewhere between curiosity and obsession.</p>
            <p>My journey started with Java, where I built a strong foundation in Data Structures, Algorithms, and object-oriented design, solving 500+ coding problems across platforms. From developing backend services and handling production systems at TCS to building scalable full-stack applications with the MERN stack. Today, I'm exploring the intersection of Full Stack Development and AI—building intelligent applications that don't just respond, but understand, analyze, and assist.</p>
            <p>Outside the terminal: a painter, a trekker, a slow-shutter photographer. The same hands that ship code also chase sunlight.</p>
          </motion.div>

          <motion.div style={{ x: tlX }} className="relative">
            <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-[#10b981] via-[#7B61FF] to-[#00D4FF]" />
            {JOURNEY.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1 }}
                className="relative mb-6 pl-12"
              >
                <span className="absolute left-2 top-1.5 size-5 rounded-full border-2 border-[#00D4FF] bg-background pulse-glow" style={{ ["--glow" as string]: "#7B61FF" }} />
                <div className="font-mono text-xs uppercase tracking-widest text-[#00D4FF]">{step.year}</div>
                <div className="font-display text-2xl">{step.title}</div>
                <div className="text-sm text-muted-foreground">{step.desc}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ===================== SECTION 3 — SKILLS THROUGH CLOUDS ===================== */
function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const drift = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section ref={ref} id="skills" className="relative min-h-screen py-32">
      <div className="absolute inset-x-0 top-20 -z-10 h-64 bg-gradient-to-r from-[#7B61FF]/10 via-[#00D4FF]/15 to-[#FF6EC7]/10 blur-3xl" />

      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader chapter="Chapter 02" title="Skills Through The Clouds" subtitle="Each cloud — a craft mastered along the climb." />

        <motion.div style={{ y: drift }} className="mt-16 grid grid-cols-2 gap-6 md:grid-cols-3">
          {SKILLS.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.05, y: -4 }}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md transition-all hover:border-white/30"
              style={{ animation: `float-slow ${6 + i * 0.5}s ease-in-out infinite`, animationDelay: `${i * 0.3}s` }}
            >
              <div
                className="absolute -right-10 -top-10 size-40 rounded-full opacity-30 blur-3xl transition-opacity group-hover:opacity-60"
                style={{ backgroundColor: s.color }}
              />
              <div className="relative">
                <div className="font-display text-2xl">{s.name}</div>
                <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${s.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: i * 0.05 + 0.3, ease: "easeOut" }}
                    className="h-full rounded-full"
                    style={{ background: `linear-gradient(90deg, ${s.color}, white)` }}
                  />
                </div>
                <div className="mt-2 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-foreground/60">
                  <span>Proficiency</span>
                  <span>{s.level}%</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ===================== SECTION 4 — MISSION CONTROL ===================== */
function MissionControl() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const gridY = useTransform(scrollYProgress, [0, 1], ["-10%", "20%"]);
  const headerScale = useTransform(scrollYProgress, [0, 0.4], [0.85, 1]);

  return (
    <section ref={ref} id="mission-control" className="relative min-h-screen py-32">
      <motion.div style={{ y: gridY }} className="absolute inset-0 -z-10 holo-grid opacity-20" />

      <div className="mx-auto max-w-6xl px-6">
        <motion.div style={{ scale: headerScale }}>
          <SectionHeader chapter="Chapter 03" title="Mission Control" subtitle="Logged operations across deployed timelines." />
        </motion.div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {MISSIONS.map((m, i) => {
            const fromLeft = i % 2 === 0;
            return (
              <motion.div
                key={m.code}
                initial={{ opacity: 0, x: fromLeft ? -80 : 80, rotateY: fromLeft ? -8 : 8 }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: "easeOut" }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="group relative overflow-hidden rounded-2xl border border-[#00D4FF]/20 bg-[#040420]/60 p-6 backdrop-blur-xl"
              >
                <div className="pointer-events-none absolute -right-20 -top-20 size-60 opacity-20">
                  <div className="absolute inset-0 rounded-full border border-[#00D4FF]/40" />
                  <div className="absolute inset-4 rounded-full border border-[#00D4FF]/30" />
                  <div className="absolute inset-8 rounded-full border border-[#00D4FF]/20" />
                  <div
                    className="absolute left-1/2 top-1/2 h-1/2 w-px origin-top bg-gradient-to-b from-[#00D4FF] to-transparent"
                    style={{ animation: "radar-scan 4s linear infinite" }}
                  />
                </div>

                <div className="flex items-center justify-between font-mono text-xs uppercase tracking-widest">
                  <span className="text-[#00D4FF]">{m.code}</span>
                  <span className={`flex items-center gap-2 ${m.status === "ACTIVE" ? "text-[#9DFF00]" : "text-white/40"}`}>
                    <span className={`size-1.5 rounded-full ${m.status === "ACTIVE" ? "bg-[#9DFF00] animate-pulse" : "bg-white/40"}`} />
                    {m.status}
                  </span>
                </div>
                <div className="mt-4 font-display text-3xl text-white">{m.org}</div>
                <div className="font-mono text-xs uppercase tracking-widest text-[#FF6EC7]">{m.role}</div>
                <p className="mt-3 text-sm text-white/70">{m.desc}</p>

                <div className="mt-5 flex items-center gap-2 border-t border-white/10 pt-4 font-mono text-[10px] uppercase tracking-widest text-white/40">
                  <span>TELEMETRY</span>
                  <span className="flex-1 truncate">{"▓".repeat(20 + i * 3)}{"░".repeat(8)}</span>
                  <span>NOMINAL</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ===================== SECTION 5 — PROJECT GALAXY ===================== */
function GalaxySection({ isLight }: { isLight: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 1.05]);
  return (
    <section ref={ref} id="projects" className="relative min-h-screen py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          chapter="Chapter 04"
          title={isLight ? "Floating Islands in the Clouds" : "Project Galaxy"}
          subtitle={isLight ? "Each island — a world I built from a single idea." : "Each planet — a world I built from a single idea."}
        />
        <motion.div style={{ scale }} className="mt-12 overflow-hidden rounded-3xl border border-white/10 bg-black/30 backdrop-blur-md">
          {isLight ? <FloatingIslands projects={PROJECTS} /> : <ProjectGalaxy projects={PROJECTS} />}
        </motion.div>
      </div>
    </section>
  );
}

/* ===================== SECTION 6 — CONSTELLATION ===================== */
function Constellation({ isLight }: { isLight: boolean }) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="constellation" className="relative min-h-screen py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          chapter="Chapter 05"
          title={isLight ? "Peaks of Achievement" : "Constellation of Achievements"}
          subtitle={isLight ? "Every flag — a summit reached." : "Connect the stars. The pattern was always there."}
        />

        {isLight ? (
          <div className="mt-16">
            <MountainPeaks items={ACHIEVEMENTS} />
          </div>
        ) : (
          <div className="relative mt-16 h-[500px] overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-[#0a0a2a] to-[#040418]">
            {Array.from({ length: 80 }).map((_, i) => (
              <span
                key={i}
                className="absolute size-px rounded-full bg-white twinkle"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  opacity: Math.random() * 0.8 + 0.2,
                }}
              />
            ))}

            <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
              {active !== null && ACHIEVEMENTS.map((a, i) => {
                if (i === active) return null;
                const dist = Math.hypot(a.x - ACHIEVEMENTS[active].x, a.y - ACHIEVEMENTS[active].y);
                if (dist > 45) return null;
                return (
                  <line
                    key={i}
                    x1={ACHIEVEMENTS[active].x}
                    y1={ACHIEVEMENTS[active].y}
                    x2={a.x}
                    y2={a.y}
                    stroke="#00D4FF"
                    strokeWidth="0.15"
                    opacity="0.7"
                    strokeDasharray="0.5 0.5"
                  />
                );
              })}
            </svg>

            {ACHIEVEMENTS.map((a, i) => (
              <button
                key={a.title}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                className="group absolute -translate-x-1/2 -translate-y-1/2"
                style={{ top: `${a.y}%`, left: `${a.x}%` }}
              >
                <div className="relative">
                  <span className="absolute -inset-3 rounded-full bg-[#FFD700] opacity-0 blur transition-opacity group-hover:opacity-60" />
                  <span className="relative block size-3 rounded-full bg-[#FFD700] ring-2 ring-white/20 transition-transform group-hover:scale-150" />
                </div>
                <div className="pointer-events-none absolute left-1/2 top-6 w-44 -translate-x-1/2 rounded-md border border-white/20 bg-black/80 px-2 py-1 text-center font-mono text-[10px] uppercase tracking-wider text-white opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
                  {a.title}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/* ===================== SECTION 7 — ADVENTURE LOG (horizontal scroll) ===================== */
function AdventureLog() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const x = useTransform(scrollYProgress, [0, 1], ["2%", "-78%"]);

  return (
    <section id="adventure" ref={ref} className="relative h-[300vh]">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="mx-auto w-full max-w-6xl px-6">
          <SectionHeader chapter="Chapter 06" title="Adventure Log" subtitle="A pilot is more than their mission. Scroll →" />
        </div>

        <motion.div style={{ x }} className="mt-12 flex gap-6 pl-6">
          {HOBBIES.map((h, i) => (
            <motion.div
              key={h.label}
              whileHover={{ y: -10, scale: 1.03 }}
              className="polaroid-card group relative flex h-[460px] w-[340px] shrink-0 flex-col overflow-hidden rounded-sm p-3 pb-0 shadow-2xl"
              style={{
                transform: `rotate(${i % 2 === 0 ? -2 : 2}deg)`,
              }}
            >
              {/* Tape */}
              <div className="pointer-events-none absolute -top-2 left-1/2 z-10 h-6 w-24 -translate-x-1/2 rotate-[-3deg] bg-[rgba(255,235,180,0.55)] backdrop-blur-sm" />
              {/* Photo */}
              <div className="relative h-[330px] w-full overflow-hidden bg-neutral-900/40">
                <img
                  src={h.img}
                  alt={h.label}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                <div
                  className="absolute left-3 top-3 rounded-sm px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.25em] text-white"
                  style={{ background: ["#7B61FF", "#00D4FF", "#FF6EC7", "#9DFF00", "#FFD700", "#FF8A3D", "#10b981", "#FF6EC7"][i] }}
                >
                  Log · {String(i + 1).padStart(2, "0")}
                </div>
              </div>
              {/* Handwritten caption */}
              <div className="polaroid-caption flex flex-1 flex-col items-center justify-center px-4 py-4 text-center">
                <div className="font-display text-2xl leading-tight">{h.label}</div>
                <div className="polaroid-sub mt-1 font-mono text-[10px] uppercase tracking-[0.3em]">
                  {h.caption}
                </div>
              </div>
            </motion.div>
          ))}

          {/* Final card */}
          <div className="flex h-[440px] w-[340px] shrink-0 items-center justify-center rounded-3xl border border-dashed border-white/30 text-center font-mono text-xs uppercase tracking-[0.3em] text-white/60">
            ⊹ to be continued ⊹
          </div>
        </motion.div>

        <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.4em] text-foreground/50">
          ↓ keep scrolling ↓
        </div>
      </div>
    </section>
  );
}

/* ===================== SECTION 8 — FUTURE MISSIONS (rocket launch) ===================== */
function FutureMissions({ isLight }: { isLight: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rocketY = useTransform(scrollYProgress, [0, 1], ["40vh", "-120vh"]);
  const rocketScale = useTransform(scrollYProgress, [0, 0.4, 1], [0.6, 1, 1.8]);
  const rocketRotate = useTransform(scrollYProgress, [0, 1], [-8, 0]);
  const trailHeight = useTransform(scrollYProgress, [0, 0.5, 1], [40, 400, 800]);
  const trailOpacity = useTransform(scrollYProgress, [0, 0.15, 1], [0, 1, 0.4]);
  const shake = useTransform(scrollYProgress, [0, 0.5, 1], [0, 2, 4]);

  if (isLight) {
    return (
      <section ref={ref} id="future" className="relative min-h-screen py-32">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeader chapter="Chapter 07" title="Future Destinations" subtitle="The clouds part to reveal what's ahead." center />
          <div className="mt-12">
            <CloudReveal items={FUTURE} />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} id="future" className="relative min-h-[200vh] py-32">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <div className="absolute left-1/2 top-1/2 -z-10 size-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-[#7B61FF] via-[#FF6EC7] to-[#00D4FF] opacity-20 blur-3xl pulse-glow" style={{ ["--glow" as string]: "#7B61FF" }} />

        {/* Launch pad */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#1a0b3d] to-transparent" />

        {/* Rocket + thrust */}
        <motion.div
          style={{ y: rocketY, scale: rocketScale, rotate: rocketRotate, x: shake }}
          className="pointer-events-none absolute left-1/2 -translate-x-1/2"
        >
          <div className="relative flex flex-col items-center">
            <RocketSVG />
            <motion.div
              style={{ height: trailHeight, opacity: trailOpacity }}
              className="w-3 rounded-full blur-md"
            >
              <div
                className="h-full w-full rounded-full"
                style={{
                  background:
                    "linear-gradient(to bottom, #fff7c2, #ffd166 30%, #ff8a3d 60%, #ff3d6e 100%)",
                  boxShadow: "0 0 40px #ff8a3d, 0 0 80px #ff3d6e",
                }}
              />
            </motion.div>
            {/* Particle puffs */}
            <motion.div style={{ opacity: trailOpacity }} className="absolute -bottom-4 left-1/2 -translate-x-1/2">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="absolute size-3 rounded-full bg-white/70 blur-sm"
                  style={{
                    left: `${(i - 1) * 14}px`,
                    animation: `float-slow ${1.5 + i * 0.3}s ease-in-out infinite`,
                  }}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>

        <div className="mx-auto max-w-5xl px-6 text-center">
          <SectionHeader chapter="Chapter 07" title="Future Missions" subtitle="Ignition. Liftoff. The portal ahead." center />

          <div className="mt-16 flex flex-wrap items-center justify-center gap-6">
            {FUTURE.map((f, i) => (
              <motion.div
                key={f}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.1 }}
                className="group relative"
                style={{ animation: `float-slow ${5 + i}s ease-in-out infinite`, animationDelay: `${i * 0.5}s` }}
              >
                <div
                  className="size-28 rounded-full border border-white/20 backdrop-blur-md transition-all md:size-36"
                  style={{
                    background: `radial-gradient(circle at 30% 30%, ${["#7B61FF","#00D4FF","#FF6EC7","#9DFF00","#FFD700"][i]}aa, ${["#7B61FF","#00D4FF","#FF6EC7","#9DFF00","#FFD700"][i]}22 60%, transparent)`,
                    boxShadow: `0 0 60px ${["#7B61FF","#00D4FF","#FF6EC7","#9DFF00","#FFD700"][i]}55`,
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center p-3 text-center font-display text-sm leading-tight md:text-base">
                  {f}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===================== SECTION 9 — CONTACT STATION ===================== */
function ContactStation() {
  const [sent, setSent] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [60, -40]);

  return (
    <section ref={ref} id="contact" className="relative min-h-screen py-32">
      <div className="mx-auto max-w-3xl px-6">
        <SectionHeader chapter="Chapter 08" title="Contact Space Station" subtitle="Open a channel. I'm listening." center />

        <motion.div
          style={{ y }}
          className="relative mt-16 overflow-hidden rounded-3xl border border-[#00D4FF]/30 bg-[#040420]/80 p-8 backdrop-blur-xl md:p-12"
        >
          <div className="absolute inset-0 -z-10 holo-grid opacity-20" />
          <div className="mb-6 flex items-center justify-between font-mono text-xs uppercase tracking-widest text-[#00D4FF]">
            <span className="flex items-center gap-2"><span className="size-1.5 animate-pulse rounded-full bg-[#9DFF00]" /> Station Online</span>
            <span>FREQ · 7.83 Hz</span>
          </div>

          {!sent ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
                setTimeout(() => setSent(false), 5000);
              }}
              className="space-y-4"
            >
              <Field label="Callsign / Name" placeholder="Commander..." />
              <Field label="Return Frequency / Email" placeholder="you@galaxy.io" type="email" />
              <div>
                <label className="mb-2 block font-mono text-[10px] uppercase tracking-widest text-white/60">Transmission</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Begin transmission..."
                  className="w-full rounded-md border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none transition-colors focus:border-[#00D4FF]"
                />
              </div>
              <Button type="submit" size="lg" variant="hero" className="w-full">
                Send Transmission →
              </Button>
            </form>
          ) : (
            <div className="relative flex flex-col items-center justify-center py-12 text-center">
              <div className="relative">
                <span className="absolute inset-0 rounded-full border-2 border-[#9DFF00]" style={{ animation: "radio-wave 2s ease-out infinite" }} />
                <span className="absolute inset-0 rounded-full border-2 border-[#9DFF00]" style={{ animation: "radio-wave 2s ease-out 0.6s infinite" }} />
                <div className="relative flex size-20 items-center justify-center rounded-full border-2 border-[#9DFF00] bg-[#9DFF00]/10 text-3xl">
                  📡
                </div>
              </div>
              <div className="mt-8 font-display text-2xl text-[#9DFF00]">Transmission Received</div>
              <div className="mt-1 font-mono text-xs uppercase tracking-widest text-white/60">Message Sent Successfully</div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

function Field({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="mb-2 block font-mono text-[10px] uppercase tracking-widest text-white/60">{label}</label>
      <input
        required
        {...props}
        className="w-full rounded-md border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none transition-colors focus:border-[#00D4FF]"
      />
    </div>
  );
}

/* ===================== Rocket SVG ===================== */
function RocketSVG() {
  return (
    <svg
      width="110"
      height="160"
      viewBox="0 0 110 160"
      style={{ filter: "drop-shadow(0 0 18px rgba(255,110,199,0.55)) drop-shadow(0 0 32px rgba(255,138,61,0.45))" }}
    >
      <defs>
        <linearGradient id="bodyGrad" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#f5f7ff" />
          <stop offset="50%" stopColor="#dfe4f5" />
          <stop offset="100%" stopColor="#8a92ad" />
        </linearGradient>
        <linearGradient id="noseGrad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#FF6EC7" />
          <stop offset="100%" stopColor="#7B61FF" />
        </linearGradient>
        <linearGradient id="finGrad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#00D4FF" />
          <stop offset="100%" stopColor="#4f3ed1" />
        </linearGradient>
        <radialGradient id="windowGrad" cx="0.5" cy="0.4" r="0.6">
          <stop offset="0%" stopColor="#fff7c2" />
          <stop offset="40%" stopColor="#00D4FF" />
          <stop offset="100%" stopColor="#0b2545" />
        </radialGradient>
      </defs>
      {/* Fins */}
      <path d="M22 110 L42 80 L42 120 Z" fill="url(#finGrad)" />
      <path d="M88 110 L68 80 L68 120 Z" fill="url(#finGrad)" />
      {/* Body */}
      <path d="M42 50 Q42 28 55 10 Q68 28 68 50 L68 115 L42 115 Z" fill="url(#bodyGrad)" stroke="#444c66" strokeWidth="1.2" />
      {/* Nose tip */}
      <path d="M48 28 Q55 6 62 28 Q55 22 48 28 Z" fill="url(#noseGrad)" />
      {/* Window */}
      <circle cx="55" cy="55" r="9" fill="url(#windowGrad)" stroke="#2a3050" strokeWidth="1.5" />
      <circle cx="52" cy="52" r="2.5" fill="#fff" opacity="0.9" />
      {/* Body stripe */}
      <rect x="42" y="78" width="26" height="4" fill="#FF6EC7" opacity="0.85" />
      <rect x="42" y="86" width="26" height="2" fill="#00D4FF" opacity="0.8" />
      {/* Nozzle */}
      <path d="M44 115 L66 115 L62 128 L48 128 Z" fill="#3a3f55" stroke="#1c1f2e" strokeWidth="1" />
      {/* Inner flame glow */}
      <ellipse cx="55" cy="132" rx="9" ry="6" fill="#fff7c2" opacity="0.9" />
    </svg>
  );
}


function Footer() {
  return (
    <footer className="relative py-12 text-center font-mono text-xs uppercase tracking-[0.3em] text-foreground/50">
      <div className="mb-2">⊹ End of transmission ⊹</div>
      <div>Crafted at Earth · destined for the stars</div>
    </footer>
  );
}

/* ===================== Shared ===================== */
function SectionHeader({ chapter, title, subtitle, center }: { chapter: string; title: string; subtitle: string; center?: boolean }) {
  return (
    <Parallax speed={40} className={center ? "text-center" : ""}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-mono text-xs uppercase tracking-[0.5em] text-[#00D4FF]"
      >
        ⊹ {chapter} ⊹
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="mt-3 font-display text-5xl leading-tight md:text-7xl"
      >
        {title}
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="mt-3 max-w-xl text-base text-foreground/60 md:text-lg"
      >
        {subtitle}
      </motion.p>
    </Parallax>
  );
}
