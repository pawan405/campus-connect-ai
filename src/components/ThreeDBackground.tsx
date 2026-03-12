"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// The "Moving Grass" (Energy Lines)
function EnergyLines({ count = 40 }) {
  const lines = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const points = [];
      const z = (Math.random() - 0.5) * 10;
      const xOffset = (Math.random() - 0.5) * 30;

      // Creating the "Grass blade" curve
      for (let j = 0; j < 50; j++) {
        points.push(
          new THREE.Vector3(xOffset + Math.sin(j / 5) * 2, (j - 25) * 0.8, z),
        );
      }

      const curve = new THREE.CatmullRomCurve3(points);
      const speed = 0.02 + Math.random() * 0.04;
      const color = new THREE.Color(
        i % 2 === 0 ? "#06b6d4" : i % 3 === 0 ? "#a855f7" : "#3b82f6",
      );
      temp.push({ curve, speed, color, offset: Math.random() * Math.PI * 2 });
    }
    return temp;
  }, [count]);

  return (
    <>
      {lines.map((line, i) => (
        <Line key={i} {...line} />
      ))}
    </>
  );
}

function Line({ curve, speed, color, offset }: any) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      // THE MOVEMENT: This makes the grass "flow" upward
      const t = state.clock.getElapsedTime() * speed + offset;
      ref.current.position.y = ((t * 10) % 40) - 20;
    }
  });

  return (
    <mesh ref={ref}>
      <tubeGeometry args={[curve, 64, 0.02, 8, false]} />
      <meshBasicMaterial color={color} transparent opacity={0.5} />
    </mesh>
  );
}

function Scene() {
  const { mouse, camera } = useThree();
  useFrame(() => {
    camera.position.x = THREE.MathUtils.lerp(
      camera.position.x,
      mouse.x * 5,
      0.05,
    );
    camera.position.y = THREE.MathUtils.lerp(
      camera.position.y,
      mouse.y * 5,
      0.05,
    );
    camera.lookAt(0, 0, 0);
  });
  return (
    <>
      <color attach="background" args={["#020205"]} />
      <EnergyLines />
      <ambientLight intensity={1} />
    </>
  );
}

function ThreeDBackgroundComponent() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="fixed inset-0 z-0 bg-[#020205]" />;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 18], fov: 55 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}

export default ThreeDBackgroundComponent;
export { ThreeDBackgroundComponent as ThreeDBackground };
