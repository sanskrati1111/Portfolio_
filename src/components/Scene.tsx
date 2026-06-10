import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Float, Stars } from "@react-three/drei";
import { useRef, Suspense } from "react";
import type { Mesh } from "three";

function Blob() {
  const ref = useRef<Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.elapsedTime * 0.15;
    ref.current.rotation.y = state.clock.elapsedTime * 0.2;
  });
  return (
    <Float speed={1.4} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={ref} scale={2.2}>
        <icosahedronGeometry args={[1, 16]} />
        <MeshDistortMaterial
          color="#7c5cff"
          emissive="#ff3ea5"
          emissiveIntensity={0.35}
          roughness={0.15}
          metalness={0.85}
          distort={0.45}
          speed={2.2}
        />
      </mesh>
    </Float>
  );
}

export function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 50 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} color="#ff3ea5" />
        <directionalLight position={[-5, -3, -5]} intensity={0.8} color="#3ed1ff" />
        <Stars radius={60} depth={40} count={2500} factor={4} fade speed={1} />
        <Blob />
      </Suspense>
    </Canvas>
  );
}
