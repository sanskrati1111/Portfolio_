import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { Suspense, useRef, useState } from "react";
import type { Mesh, Group } from "three";

export type Project = {
  name: string;
  tag: string;
  color: string;
  emissive: string;
  orbit: number;
  speed: number;
  size: number;
  description: string;
  tech: string[];
};

function PlanetMesh({
  project,
  onHover,
  isHovered,
}: {
  project: Project;
  onHover: (p: Project | null) => void;
  isHovered: boolean;
}) {
  const groupRef = useRef<Group>(null);
  const meshRef = useRef<Mesh>(null);
  const ringRef = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime * project.speed;
    if (groupRef.current) {
      groupRef.current.position.x = Math.cos(t) * project.orbit;
      groupRef.current.position.z = Math.sin(t) * project.orbit;
    }
    if (meshRef.current) meshRef.current.rotation.y += 0.01;
    if (ringRef.current) ringRef.current.rotation.z += 0.005;
  });

  return (
    <>
      {/* Orbit ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[project.orbit - 0.01, project.orbit + 0.01, 128]} />
        <meshBasicMaterial color={project.emissive} transparent opacity={isHovered ? 0.6 : 0.15} />
      </mesh>
      <group ref={groupRef}>
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.3}>
          <mesh
            ref={meshRef}
            scale={isHovered ? project.size * 1.4 : project.size}
            onPointerOver={(e) => {
              e.stopPropagation();
              onHover(project);
              document.body.style.cursor = "pointer";
            }}
            onPointerOut={() => {
              onHover(null);
              document.body.style.cursor = "";
            }}
          >
            <sphereGeometry args={[1, 48, 48]} />
            <meshStandardMaterial
              color={project.color}
              emissive={project.emissive}
              emissiveIntensity={isHovered ? 1.2 : 0.5}
              roughness={0.4}
              metalness={0.3}
            />
          </mesh>
          {/* Planet ring */}
          <mesh ref={ringRef} rotation={[Math.PI / 2.5, 0, 0]} scale={isHovered ? project.size * 1.4 : project.size}>
            <ringGeometry args={[1.3, 1.7, 64]} />
            <meshBasicMaterial color={project.emissive} transparent opacity={0.4} side={2} />
          </mesh>
        </Float>
      </group>
    </>
  );
}

function Sun() {
  const ref = useRef<Mesh>(null);
  useFrame(({ clock }) => {
    if (ref.current) {
      const s = 1 + Math.sin(clock.elapsedTime * 2) * 0.05;
      ref.current.scale.set(s, s, s);
    }
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.7, 48, 48]} />
      <meshBasicMaterial color="#FFD700" />
    </mesh>
  );
}

export function ProjectGalaxy({ projects }: { projects: Project[] }) {
  const [hovered, setHovered] = useState<Project | null>(null);

  return (
    <div className="relative h-[600px] w-full">
      <Canvas camera={{ position: [0, 4, 9], fov: 50 }} dpr={[1, 2]}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.3} />
          <pointLight position={[0, 0, 0]} intensity={3} color="#FFD700" />
          <Sun />
          {projects.map((p) => (
            <PlanetMesh
              key={p.name}
              project={p}
              isHovered={hovered?.name === p.name}
              onHover={setHovered}
            />
          ))}
        </Suspense>
      </Canvas>

      {/* HUD overlay */}
      <div className="pointer-events-none absolute inset-0 flex items-end justify-center p-6">
        <div className="glass-strong w-full max-w-2xl rounded-xl px-6 py-4 transition-all duration-300">
          {hovered ? (
            <div className="animate-in fade-in">
              <div className="font-mono text-xs uppercase tracking-[0.3em] text-[#00D4FF]">
                Planet · {hovered.tag}
              </div>
              <h3 className="mt-1 font-display text-3xl">{hovered.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{hovered.description}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {hovered.tech.map((t) => (
                  <span key={t} className="rounded-full border border-white/15 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-white/80">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
              ⊹ Hover a planet to scan its mission profile ⊹
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
