import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, Float } from "@react-three/drei";
import { Suspense, useRef } from "react";
import type { Mesh, Group } from "three";

function Planet() {
  const earthRef = useRef<Mesh>(null);
  const cloudsRef = useRef<Mesh>(null);
  const cityRef = useRef<Group>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (earthRef.current) earthRef.current.rotation.y = t * 0.08;
    if (cloudsRef.current) cloudsRef.current.rotation.y = t * 0.12;
    if (cityRef.current) cityRef.current.rotation.y = t * 0.08;
  });

  // Generate procedural city lights
  const cities = Array.from({ length: 80 }, (_, i) => {
    const phi = Math.acos(2 * Math.random() - 1);
    const theta = Math.random() * Math.PI * 2;
    const r = 1.52;
    return [
      r * Math.sin(phi) * Math.cos(theta),
      r * Math.cos(phi),
      r * Math.sin(phi) * Math.sin(theta),
      i,
    ] as const;
  });

  return (
    <group position={[0, -0.2, 0]}>
      {/* Atmosphere glow */}
      <Sphere args={[1.75, 64, 64]}>
        <meshBasicMaterial color="#3a8dff" transparent opacity={0.08} />
      </Sphere>
      <Sphere args={[1.62, 64, 64]}>
        <meshBasicMaterial color="#5ab0ff" transparent opacity={0.15} />
      </Sphere>

      {/* Earth */}
      <mesh ref={earthRef}>
        <sphereGeometry args={[1.5, 64, 64]} />
        <meshStandardMaterial
          color="#0a2540"
          emissive="#0a1a3a"
          emissiveIntensity={0.4}
          roughness={0.9}
          metalness={0.1}
        />
      </mesh>

      {/* Continents bumps via icosahedron overlay */}
      <mesh rotation={[0.2, 0, 0]}>
        <icosahedronGeometry args={[1.51, 4]} />
        <meshStandardMaterial
          color="#0f7a4a"
          emissive="#0f5a3a"
          emissiveIntensity={0.3}
          roughness={1}
          flatShading
          transparent
          opacity={0.45}
          wireframe
        />
      </mesh>

      {/* City lights */}
      <group ref={cityRef}>
        {cities.map(([x, y, z, i]) => (
          <mesh key={i} position={[x, y, z]}>
            <sphereGeometry args={[0.012, 6, 6]} />
            <meshBasicMaterial color={i % 3 === 0 ? "#FFD700" : i % 3 === 1 ? "#FF8A3D" : "#FFB347"} />
          </mesh>
        ))}
      </group>

      {/* Cloud layer */}
      <mesh ref={cloudsRef}>
        <sphereGeometry args={[1.56, 48, 48]} />
        <meshStandardMaterial
          color="#ffffff"
          transparent
          opacity={0.08}
          roughness={1}
        />
      </mesh>

      {/* Orbiting rocket */}
      <Float speed={2} rotationIntensity={0.4} floatIntensity={0.5}>
        <group position={[2.2, 0.6, 0.4]} rotation={[0, 0, -0.4]}>
          <mesh>
            <coneGeometry args={[0.06, 0.3, 8]} />
            <meshStandardMaterial color="#f5f5f5" metalness={0.8} roughness={0.2} />
          </mesh>
          <mesh position={[0, -0.2, 0]}>
            <cylinderGeometry args={[0.06, 0.06, 0.1, 8]} />
            <meshStandardMaterial color="#FF6EC7" emissive="#FF6EC7" emissiveIntensity={2} />
          </mesh>
        </group>
      </Float>
    </group>
  );
}

export function Earth() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 2]}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.15} />
        <directionalLight position={[5, 3, 5]} intensity={1.5} color="#fff5e0" />
        <pointLight position={[-5, -2, -3]} intensity={1} color="#7B61FF" />
        <Planet />
      </Suspense>
    </Canvas>
  );
}
