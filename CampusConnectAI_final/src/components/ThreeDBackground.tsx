"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

function EnergyLines({ count = 20 }) {
  const lines = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const points = [];
      const z = (Math.random() - 0.5) * 10;
      const xOffset = (Math.random() - 0.5) * 20;
      for (let j = 0; j < 50; j++) {
        points.push(new THREE.Vector3(xOffset + Math.sin(j / 5) * 2, (j - 25) * 0.8, z));
      }
      const curve = new THREE.CatmullRomCurve3(points);
      const speed = 0.02 + Math.random() * 0.05;
      const color = new THREE.Color(
        i % 2 === 0 ? "#06b6d4" : i % 3 === 0 ? "#a855f7" : "#3b82f6"
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
      ref.current.position.y = ((state.clock.getElapsedTime() * speed + offset) % 40) - 20;
      ref.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.2 + offset) * 0.1;
    }
  });

  return (
      <mesh ref={ref}>
        <tubeGeometry args={[curve, 64, 0.02, 8, false]} />
        <meshBasicMaterial color={color} transparent opacity={0.6} />
      </mesh>
    );
  }
  
  function DataParticles({ count = 100 }) {
    const meshRef = useRef<THREE.InstancedMesh>(null);
    const dummy = useMemo(() => new THREE.Object3D(), []);
    const particles = useMemo(() => {
      const temp = [];
      for (let i = 0; i < count; i++) {
        const x = (Math.random() - 0.5) * 30;
        const y = (Math.random() - 0.5) * 30;
        const z = (Math.random() - 0.5) * 20;
        const speed = 0.01 + Math.random() * 0.02;
        temp.push({ x, y, z, speed, offset: Math.random() * 100 });
      }
      return temp;
    }, [count]);
  
    useFrame((state) => {
      particles.forEach((p, i) => {
        p.y += p.speed;
        if (p.y > 15) p.y = -15;
        dummy.position.set(p.x, p.y, p.z);
        dummy.scale.setScalar(Math.sin(state.clock.getElapsedTime() + p.offset) * 0.1 + 0.1);
        dummy.updateMatrix();
        meshRef.current?.setMatrixAt(i, dummy.matrix);
      });
      if (meshRef.current) meshRef.current.instanceMatrix.needsUpdate = true;
    });
  
    return (
      <instancedMesh ref={meshRef} args={[new THREE.SphereGeometry(0.1, 8, 8), undefined, count]}>
        <meshBasicMaterial color="#06b6d4" transparent opacity={0.8} />
      </instancedMesh>

  );
}

function Scene() {
  const { mouse, camera } = useThree();
  const targetCameraPos = useRef(new THREE.Vector3(0, 0, 15));

  useFrame(() => {
    targetCameraPos.current.x = THREE.MathUtils.lerp(
      targetCameraPos.current.x,
      mouse.x * 3,
      0.02
    );
    targetCameraPos.current.y = THREE.MathUtils.lerp(
      targetCameraPos.current.y,
      mouse.y * 3,
      0.02
    );
    camera.position.copy(targetCameraPos.current);
    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <color attach="background" args={["#020205"]} />
      <EnergyLines count={30} />
      <DataParticles count={150} />
      <ambientLight intensity={0.5} />
    </>
  );
}

export default function ThreeDBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden bg-gradient-to-br from-[#020205] via-[#05051a] to-[#0a0212]">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene />
      </Canvas>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.15),transparent_75%)]" />
      <div className="absolute inset-0 backdrop-blur-[12px] opacity-40" />
    </div>
  );
}
