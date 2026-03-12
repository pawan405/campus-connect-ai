"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  Float,
  Text,
  MeshDistortMaterial,
  Sphere,
  Grid,
  Environment,
  PresentationControls,
} from "@react-three/drei";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import * as THREE from "three";
import {
  Trophy,
  Users,
  Plus,
  Rocket,
  Globe,
  Clock,
  ArrowRight,
  Zap,
  Magnet,
  Brain,
  Search,
  ChevronRight,
  Star,
  Flame,
  Gamepad2,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

// --- 3D Components ---

function FloatingRings() {
  const ringRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!ringRef.current) return;
    ringRef.current.rotation.z += 0.005;
    ringRef.current.rotation.y += 0.002;
    ringRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2;
  });

  return (
    <group ref={ringRef}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[3, 0.02, 16, 100]} />
        <meshStandardMaterial
          color="#00f2ff"
          emissive="#00f2ff"
          emissiveIntensity={2}
          toneMapped={false}
        />
      </mesh>
      <mesh rotation={[Math.PI / 2.5, 0.2, 0]}>
        <torusGeometry args={[3.5, 0.015, 16, 100]} />
        <meshStandardMaterial
          color="#bc13fe"
          emissive="#bc13fe"
          emissiveIntensity={2}
          toneMapped={false}
        />
      </mesh>
      <mesh rotation={[Math.PI / 1.8, -0.2, 0]}>
        <torusGeometry args={[4, 0.01, 16, 100]} />
        <meshStandardMaterial
          color="#00ff9f"
          emissive="#00ff9f"
          emissiveIntensity={2}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

function GridFloor() {
  return (
    <group position={[0, -5, 0]}>
      <Grid
        infiniteGrid
        fadeDistance={50}
        fadeStrength={5}
        cellSize={1}
        sectionSize={5}
        sectionColor="#404040"
        cellColor="#202020"
      />
    </group>
  );
}

function HologramSphere() {
  return (
    <Float speed={4} rotationIntensity={1} floatIntensity={2}>
      <Sphere args={[1, 64, 64]}>
        <MeshDistortMaterial
          color="#00f2ff"
          speed={3}
          distort={0.4}
          radius={1}
          emissive="#00f2ff"
          emissiveIntensity={0.5}
          roughness={0}
          transparent
          opacity={0.6}
        />
      </Sphere>
      <pointLight
        position={[0, 0, 0]}
        color="#00f2ff"
        intensity={5}
        distance={10}
      />
    </Float>
  );
}

// --- UI Components ---

const HackathonCard = ({ hack, index }: { hack: any; index: number }) => {
  const router = useRouter();
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const rafRef = useRef<number | null>(null);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !isMountedRef.current) return;
    
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
    }
    
    rafRef.current = requestAnimationFrame(() => {
      if (!cardRef.current || !isMountedRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      setRotateX((y - centerY) / 10);
      setRotateY((centerX - x) / 10);
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    setRotateX(0);
    setRotateY(0);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      style={{ willChange: "transform" }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative group perspective-1000"
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transition: "transform 0.1s ease-out",
          willChange: "transform",
          backfaceVisibility: "hidden",
          transformStyle: "preserve-3d",
        }}
      >
        <div className="absolute -inset-0.5 bg-linear-to-r from-cyan-500 via-purple-500 to-emerald-500 rounded-2xl blur opacity-20 group-hover:opacity-60 transition duration-500" />
        <Card className="relative bg-black/40 backdrop-blur-xl border-white/10 border-t-white/20 h-full overflow-hidden">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-6">
              <div
                className={`p-3 rounded-xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform duration-300`}
              >
                {hack.status === "Ongoing" ? (
                  <Flame className="w-6 h-6 text-orange-500 animate-pulse" />
                ) : (
                  <Rocket className="w-6 h-6 text-cyan-400" />
                )}
              </div>
              <Badge
                variant="outline"
                className={`${hack.status === "Ongoing" ? "bg-orange-500/10 text-orange-400 border-orange-500/20" : "bg-cyan-500/10 text-cyan-400 border-cyan-500/20"} px-3 py-1 font-bold tracking-wider`}
              >
                {hack.status.toUpperCase()}
              </Badge>
            </div>

            <h3 className="text-xl font-black mb-2 text-white group-hover:text-cyan-400 transition-colors">
              {hack.name}
            </h3>

            <p className="text-white/40 text-sm mb-6 line-clamp-2">
              {hack.description}
            </p>

            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-2 text-xs text-white/50">
                <Globe className="w-3.5 h-3.5 text-emerald-400" />
                <span>
                  {hack.organizer} • {hack.mode}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-white/50">
                <Clock className="w-3.5 h-3.5 text-purple-400" />
                <span>{hack.duration}</span>
              </div>
            </div>

            <Button 
              onClick={() => {
                // Navigate to hackathon details
                router.push(`/hackathons/${hack.id}`);
              }}
              className="w-full bg-white/5 hover:bg-white/10 border-white/10 text-white font-bold group/btn relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                VIEW DETAILS{" "}
                <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-linear-to-r from-cyan-500/20 to-purple-500/20 translate-x-[-100%] group-hover/btn:translate-x-0 transition-transform duration-500" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

const TeamCard = ({ type }: { type: "create" | "join" }) => {
  const isCreate = type === "create";
  const [showModal, setShowModal] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [availableTeams, setAvailableTeams] = useState<any[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Mock available teams for JOIN
  useEffect(() => {
    if (!isCreate) {
      setAvailableTeams([
        { id: 1, name: "AI Innovators", members: 3, maxMembers: 5, skills: ["React", "AI", "Design"], hackathon: "Cyberpunk Hack 2077" },
        { id: 2, name: "Code Warriors", members: 2, maxMembers: 4, skills: ["Node.js", "ML", "UI/UX"], hackathon: "TechFest 2024" },
        { id: 3, name: "Digital Dreamers", members: 4, maxMembers: 6, skills: ["React", "AI", "Backend"], hackathon: "Hack the Future" },
      ]);
    }
  }, [isCreate]);

  const handleClick = () => {
    setShowModal(true);
  };

  const handleCreateTeam = () => {
    if (!teamName.trim()) {
      toast.error("Please enter a team name");
      return;
    }
    if (selectedSkills.length === 0) {
      toast.error("Please select at least one skill");
      return;
    }
    
    // Simulate team creation
    console.log("Creating team:", { name: teamName, skills: selectedSkills });
    toast.success(`Team "${teamName}" created successfully!`, {
      description: `Skills: ${selectedSkills.join(", ")}`,
    });
    setShowModal(false);
    setTeamName("");
    setSelectedSkills([]);
  };

  const handleJoinTeam = (teamId: number) => {
    const team = availableTeams.find(t => t.id === teamId);
    if (team) {
      if (team.members >= team.maxMembers) {
        toast.error("Team is full!");
        return;
      }
      console.log("Joining team:", team);
      toast.success(`Successfully joined "${team.name}"!`, {
        description: "You'll be notified about team updates.",
      });
      setShowModal(false);
    }
  };

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const allSkills = ["React", "AI", "Design", "Node.js", "Python", "ML", "UI/UX", "Backend", "Frontend", "Mobile"];

  return (
    <>
    <motion.div
      onClick={handleClick}
      whileHover={showModal ? {} : { y: -10, scale: 1.02 }}
      className="relative group cursor-pointer"
      style={{ pointerEvents: showModal ? 'none' : 'auto' }}
    >
      <div
        className={`absolute -inset-1 bg-linear-to-r ${isCreate ? "from-cyan-500 to-blue-600" : "from-purple-500 to-pink-600"} rounded-2xl blur-lg opacity-25 group-hover:opacity-75 transition duration-500`}
      />
      <Card className="relative bg-[#0c0c12]/80 backdrop-blur-2xl border-white/10 border-t-white/20 p-8 h-full flex flex-col items-center text-center overflow-hidden">
        {/* Animated Background Element */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-colors" />

        <div
          className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-6 relative`}
        >
          <div
            className={`absolute inset-0 bg-linear-to-br ${isCreate ? "from-cyan-500 to-blue-500" : "from-purple-500 to-pink-500"} blur-xl opacity-40 group-hover:opacity-80 transition-opacity`}
          />
          <div className="relative bg-black/40 w-full h-full rounded-2xl flex items-center justify-center border border-white/10">
            {isCreate ? (
              <Plus className="w-10 h-10 text-cyan-400 group-hover:rotate-90 transition-transform duration-500" />
            ) : (
              <Magnet className="w-10 h-10 text-purple-400 group-hover:scale-125 transition-transform" />
            )}
          </div>
        </div>

        <h3 className="text-2xl font-black mb-3 text-white">
          {isCreate ? "CREATE TEAM" : "JOIN TEAM"}
        </h3>

        <p className="text-white/40 text-sm leading-relaxed mb-6">
          {isCreate
            ? "Start your own squad, lead the project, and define the vision."
            : "Find the perfect match for your skills and join a winning project."}
        </p>

        <div className="flex gap-2 mt-auto">
          {isCreate ? (
            ["React", "AI", "Design"].map((s) => (
              <Badge
                key={s}
                variant="secondary"
                className="bg-white/5 text-cyan-400 border-none"
              >
                {s}
              </Badge>
            ))
          ) : (
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-[#0c0c12] bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center text-[10px] font-bold"
                >
                  U{i}
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>

      {/* Modal - Portal to body */}
      {mounted && typeof window !== 'undefined' && createPortal(
        <AnimatePresence>
          {showModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md"
              style={{ 
                pointerEvents: 'auto',
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                width: '100vw',
                height: '100vh',
              }}
              onClick={(e) => {
                if (e.target === e.currentTarget) setShowModal(false);
              }}
            >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              onMouseDown={(e) => e.stopPropagation()}
              onMouseMove={(e) => e.stopPropagation()}
              className={`relative bg-[#0c0c12] border ${isCreate ? "border-cyan-500/20" : "border-purple-500/20"} rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto`}
              style={{ pointerEvents: 'auto' }}
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4 text-white/60" />
              </button>

              {isCreate ? (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-black text-white mb-2">Create Your Team</h3>
                    <p className="text-white/60 text-sm">Start your own squad and lead the project</p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-white/80">Team Name</label>
                    <Input
                      value={teamName}
                      onChange={(e) => setTeamName(e.target.value)}
                      placeholder="Enter team name..."
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-white/80">Select Skills (Required)</label>
                    <div className="flex flex-wrap gap-2">
                      {allSkills.map((skill) => (
                        <button
                          key={skill}
                          onClick={() => toggleSkill(skill)}
                          className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                            selectedSkills.includes(skill)
                              ? "bg-cyan-500 text-black"
                              : "bg-white/5 text-white/60 hover:bg-white/10"
                          }`}
                        >
                          {skill}
                        </button>
                      ))}
                    </div>
                  </div>

                  <Button
                    onClick={handleCreateTeam}
                    className="w-full h-12 bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-black"
                  >
                    Create Team
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-black text-white mb-2">Join a Team</h3>
                    <p className="text-white/60 text-sm">Find the perfect match for your skills</p>
                  </div>

                  <div className="space-y-4">
                    {availableTeams.map((team) => (
                      <div
                        key={team.id}
                        className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-purple-500/50 transition-all"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="text-lg font-black text-white mb-1">{team.name}</h4>
                            <p className="text-sm text-white/60">{team.hackathon}</p>
                          </div>
                          <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                            {team.members}/{team.maxMembers} members
                          </Badge>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {team.skills.map((skill: string) => (
                            <Badge key={skill} variant="secondary" className="bg-white/5 text-white/60 border-none">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                        <Button
                          onClick={() => handleJoinTeam(team.id)}
                          className="w-full bg-linear-to-r from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500 text-white font-bold"
                        >
                          Join Team
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body
      )}
    </motion.div>
    </>
  );
};

// --- Main Page ---

const mockHackathons = [
  {
    id: 1,
    name: "CYBERPUNK HACK 2077",
    organizer: "Future Corp",
    mode: "Online",
    status: "Ongoing",
    duration: "48 Hours",
    description:
      "Build the next generation of decentralized infrastructure for the hyper-connected world of tomorrow.",
  },
  {
    id: 2,
    name: "NEURAL NETWORK JAM",
    organizer: "AI Institute",
    mode: "Online",
    status: "Ongoing",
    duration: "72 Hours",
    description:
      "A deep-dive into generative models and neural architectures. Push the boundaries of what machines can dream.",
  },
  {
    id: 3,
    name: "QUANTUM CODE CHALLENGE",
    organizer: "MIT",
    mode: "Offline",
    status: "Upcoming",
    duration: "24 Hours",
    description:
      "Solve impossible problems using quantum computing paradigms and high-performance algorithms.",
  },
  {
    id: 4,
    name: "GALAXY BUILDER",
    organizer: "NASA-X",
    mode: "Online",
    status: "Upcoming",
    duration: "1 Week",
    description:
      "Create visualization tools for deep-space data. Help humanity see the stars in high-definition.",
  },
];

export default function CrackHackPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [filterSkill, setFilterSkill] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize useScroll with the ref
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const springScroll = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  // Use useTransform directly, but it will only provide meaningful values after mount
  const opacity = useTransform(springScroll, [0, 0.2], [1, 0]);
  const scale = useTransform(springScroll, [0, 0.2], [1, 0.8]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Return a placeholder or the full content with a mounting check
  // But motion components need to be rendered for the refs to attach
  return (
    <div
      ref={containerRef}
      className="relative min-h-[300vh] bg-[#05050a] overflow-x-hidden"
    >
      {mounted && (
        <>
          {/* Fixed Background 3D Scene */}
          <div className="fixed inset-0 z-0 pointer-events-none">
              <Canvas shadows gl={{ antialias: true, alpha: true }}>
                <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
                <ambientLight intensity={0.5} />
                <pointLight
                  position={[10, 10, 10]}
                  intensity={2}
                  color="#00f2ff"
                />
                <pointLight
                  position={[-10, -10, 10]}
                  intensity={2}
                  color="#bc13fe"
                />

                <FloatingRings />

                <group position={[5, 2, -5]}>
                  <HologramSphere />
                </group>
                <group position={[-6, -3, -8]}>
                  <HologramSphere />
                </group>

                <OrbitControls
                  enableZoom={false}
                  enablePan={false}
                  autoRotate
                  autoRotateSpeed={0.5}
                  maxPolarAngle={Math.PI / 2}
                  minPolarAngle={Math.PI / 3}
                />
              </Canvas>
          </div>

          {/* Hero Section */}
          <section className="relative h-screen flex flex-col items-center justify-center text-center px-6 z-10">
            <motion.div style={{ opacity, scale }} className="space-y-6">
              <div className="relative inline-block">
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="absolute -inset-4 bg-cyan-500/20 blur-3xl rounded-full"
                />
                <motion.h1
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-7xl md:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-linear-to-b from-white via-white to-white/20"
                >
                  CrackHack <span className="text-cyan-400">🚀</span>
                </motion.h1>
              </div>

              <motion.p
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-lg md:text-2xl font-medium text-white/50 max-w-2xl mx-auto leading-relaxed uppercase tracking-[0.2em]"
              >
                Discover Hackathons. Build Teams.{" "}
                <span className="text-white">Win Together.</span>
              </motion.p>

              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex gap-4 justify-center pt-8"
              >
                <Button
                  onClick={() => {
                    // Scroll to hackathons section or navigate
                    const element = document.getElementById("hackathons-section");
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  size="lg"
                  className="h-16 px-8 rounded-full bg-cyan-500 hover:bg-cyan-400 text-black font-black text-lg shadow-[0_0_30px_rgba(6,182,212,0.5)]"
                >
                  EXPLORE NOW <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
              <div className="w-[1px] h-12 bg-linear-to-b from-cyan-500 to-transparent" />
            </motion.div>
          </section>

          {/* Content Wrapper */}
          <div className="relative z-10 max-w-7xl mx-auto px-6 space-y-32 pb-32">
            {/* Hackathon Discovery */}
            <section id="hackathons-section" className="space-y-16">
              <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                <div className="space-y-4">
                  <Badge className="bg-orange-500/10 text-orange-400 border-orange-500/20 px-4 py-1.5 text-xs font-bold tracking-widest uppercase">
                    Live & Upcoming
                  </Badge>
                  <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white">
                    ONGOING <span className="text-orange-500">HACKS</span>
                  </h2>
                </div>
                <div className="flex gap-4">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                    <input
                      placeholder="FILTER BY SKILL..."
                      value={filterSkill}
                      onChange={(e) => setFilterSkill(e.target.value)}
                      className="bg-white/5 border border-white/10 rounded-full py-3 pl-12 pr-6 text-sm focus:outline-none focus:border-cyan-500/50 transition-colors w-64 uppercase font-bold tracking-wider text-white placeholder:text-white/50 caret-white"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {mockHackathons
                  .filter((h) => {
                    if (h.status !== "Ongoing") return false;
                    if (!filterSkill.trim()) return true;
                    const skillLower = filterSkill.toLowerCase();
                    return (
                      h.name.toLowerCase().includes(skillLower) ||
                      h.description.toLowerCase().includes(skillLower)
                    );
                  })
                  .map((hack, i) => (
                    <HackathonCard key={hack.id} hack={hack} index={i} />
                  ))}
              </div>

              <div className="pt-20 space-y-16">
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white">
                  UPCOMING <span className="text-cyan-400">QUESTS</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {mockHackathons
                    .filter((h) => {
                      if (h.status !== "Upcoming") return false;
                      if (!filterSkill.trim()) return true;
                      const skillLower = filterSkill.toLowerCase();
                      return (
                        h.name.toLowerCase().includes(skillLower) ||
                        h.description.toLowerCase().includes(skillLower)
                      );
                    })
                    .map((hack, i) => (
                      <HackathonCard key={hack.id} hack={hack} index={i} />
                    ))}
                </div>
              </div>
            </section>

            {/* Team Zone */}
            <section className="relative py-20">
              {/* Section Decoration */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />

              <div className="text-center space-y-6 mb-20 relative">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8 }}
                >
                  <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white">
                    FORM YOUR{" "}
                    <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-purple-500 to-emerald-400">
                      DREAM TEAM
                    </span>{" "}
                    ⚡
                  </h2>
                  <p className="text-white/40 text-lg md:text-xl font-medium mt-4 max-w-2xl mx-auto uppercase tracking-wide">
                    Connect with the brightest minds across the country.
                  </p>
                </motion.div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
                <TeamCard type="create" />
                <TeamCard type="join" />
              </div>

              {/* Stats Bar */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="mt-32 grid grid-cols-2 md:grid-cols-4 gap-8 p-12 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-xl"
              >
                {[
                  {
                    label: "TOTAL HACKS",
                    value: "128+",
                    icon: Trophy,
                    color: "text-amber-400",
                  },
                  {
                    label: "ACTIVE TEAMS",
                    value: "450+",
                    icon: Users,
                    color: "text-cyan-400",
                  },
                  {
                    label: "TOTAL PRIZES",
                    value: "$500K",
                    icon: Star,
                    color: "text-purple-400",
                  },
                  {
                    label: "PARTNERS",
                    value: "50+",
                    icon: Globe,
                    color: "text-emerald-400",
                  },
                ].map((stat, i) => (
                  <div key={i} className="text-center space-y-2">
                    <stat.icon
                      className={`w-6 h-6 mx-auto ${stat.color} mb-3`}
                    />
                    <div className="text-3xl font-black text-white">
                      {stat.value}
                    </div>
                    <div className="text-[10px] font-bold text-white/30 tracking-widest uppercase">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </motion.div>
            </section>

            {/* Footer */}
            <footer className="pt-20 pb-10 border-t border-white/5 text-center">
              <div className="flex items-center justify-center gap-3 mb-8">
                <Brain className="w-8 h-8 text-cyan-400" />
                <span className="text-2xl font-black tracking-tighter">
                  CRACKHACK
                </span>
              </div>
              <p className="text-white/20 text-xs font-bold tracking-[0.3em] uppercase">
                Designed for the future of building • 2025
              </p>
            </footer>
          </div>

          {/* Mouse Cursor Glow */}
          <div
            className="fixed inset-0 z-50 pointer-events-none"
            style={{
              background: `radial-gradient(600px circle at var(--mouse-x, 0) var(--mouse-y, 0), rgba(6, 182, 212, 0.05), transparent 80%)`,
            }}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
              window.addEventListener('mousemove', (e) => {
                document.body.style.setProperty('--mouse-x', e.clientX + 'px');
                document.body.style.setProperty('--mouse-y', e.clientY + 'px');
              });
            `,
            }}
          />
        </>
      )}

      <style jsx global>{`
        .perspective-1000 {
          perspective: 1000px;
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}



