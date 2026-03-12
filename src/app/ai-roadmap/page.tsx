"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Brain,
  ArrowLeft,
  Sparkles,
  Target,
  BookOpen,
  Code,
  Briefcase,
  Clock,
  CheckCircle,
  Lightbulb,
  Rocket,
  ShieldCheck,
  AlertTriangle,
  LayoutGrid,
  Star,
  MapPin,
  Wand2,
  ChevronDown,
  ChevronRight,
  TrendingUp,
  Zap,
  Activity,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Particles Component for the cinematic vibe
const Particles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-cyan-500/30 rounded-full"
          initial={{
            x: Math.random() * 100 + "%",
            y: Math.random() * 100 + "%",
            opacity: Math.random() * 0.5,
          }}
          animate={{
            y: [null, "-100%"],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

// Comprehensive Branch Definitions with Branch-Specific Interests
const BRANCH_DEFINITIONS: Record<string, {
  name: string;
  interests: Array<{ value: string; label: string; description: string }>;
  category: "engineering" | "non-engineering";
}> = {
  // ENGINEERING BRANCHES
  cse: {
    name: "Computer Science Engineering",
    category: "engineering",
    interests: [
      { value: "fullstack", label: "Full Stack Development", description: "Build complete web applications" },
      { value: "backend", label: "Backend Systems", description: "Server-side development and APIs" },
      { value: "ai", label: "AI/ML Engineering", description: "Machine learning and artificial intelligence" },
      { value: "data", label: "Data Science", description: "Data analysis and insights" },
      { value: "cyber", label: "Cybersecurity", description: "Security and ethical hacking" },
      { value: "cloud", label: "Cloud & DevOps", description: "Cloud infrastructure and deployment" },
      { value: "mobile", label: "Mobile App Development", description: "iOS and Android apps" },
    ],
  },
  it: {
    name: "Information Technology",
    category: "engineering",
    interests: [
      { value: "fullstack", label: "Full Stack Development", description: "Build complete web applications" },
      { value: "backend", label: "Backend Systems", description: "Server-side development" },
      { value: "ai", label: "AI/ML Engineering", description: "Machine learning applications" },
      { value: "data", label: "Data Science", description: "Data analysis and business intelligence" },
      { value: "cyber", label: "Cybersecurity", description: "Information security" },
      { value: "cloud", label: "Cloud & DevOps", description: "Infrastructure and deployment" },
    ],
  },
  ece: {
    name: "Electronics & Communication Engineering",
    category: "engineering",
    interests: [
      { value: "embedded", label: "Embedded Systems", description: "Microcontrollers and firmware" },
      { value: "iot", label: "IoT & Sensors", description: "Internet of Things applications" },
      { value: "signal", label: "Signal Processing", description: "Digital signal processing" },
      { value: "ai", label: "AI for Electronics", description: "AI applications in embedded systems" },
      { value: "power", label: "Power Systems", description: "Electrical power and control" },
      { value: "ev", label: "EV Technology", description: "Electric vehicle systems" },
      { value: "robotics", label: "Robotics Control", description: "Robotic systems and automation" },
    ],
  },
  ee: {
    name: "Electrical Engineering",
    category: "engineering",
    interests: [
      { value: "power", label: "Power Systems", description: "Electrical power generation and distribution" },
      { value: "control", label: "Control Systems", description: "Automation and control engineering" },
      { value: "ev", label: "EV Technology", description: "Electric vehicle technology" },
      { value: "renewable", label: "Renewable Energy", description: "Solar, wind, and green energy" },
      { value: "iot", label: "IoT & Smart Grids", description: "Smart electrical systems" },
      { value: "ai", label: "AI for Power Systems", description: "AI in electrical engineering" },
    ],
  },
  me: {
    name: "Mechanical Engineering",
    category: "engineering",
    interests: [
      { value: "design", label: "Machine Design & CAD", description: "Product design and SolidWorks" },
      { value: "manufacturing", label: "Manufacturing & CNC", description: "Production and machining" },
      { value: "automotive", label: "Automotive Engineering", description: "Vehicle design and systems" },
      { value: "robotics", label: "Robotics & Mechatronics", description: "Robotic systems" },
      { value: "automation", label: "Industrial Automation", description: "Smart manufacturing" },
      { value: "ai", label: "AI for Manufacturing", description: "Predictive maintenance and smart systems" },
      { value: "product", label: "Product Design", description: "Consumer product development" },
    ],
  },
  civil: {
    name: "Civil Engineering",
    category: "engineering",
    interests: [
      { value: "structural", label: "Structural Design", description: "Building and bridge design" },
      { value: "construction", label: "Construction Planning", description: "Project management" },
      { value: "bim", label: "BIM & AutoCAD", description: "Building Information Modeling" },
      { value: "smart", label: "Smart Cities", description: "Urban planning and infrastructure" },
      { value: "sustainable", label: "Sustainable Construction", description: "Green building practices" },
      { value: "data", label: "Infrastructure Analytics", description: "Data-driven construction" },
    ],
  },
  mechatronics: {
    name: "Mechatronics Engineering",
    category: "engineering",
    interests: [
      { value: "robotics", label: "Robotics Systems", description: "Robotic design and control" },
      { value: "automation", label: "Industrial Automation", description: "Automated manufacturing" },
      { value: "embedded", label: "Embedded Systems", description: "Microcontroller programming" },
      { value: "ai", label: "AI for Robotics", description: "Intelligent robotic systems" },
      { value: "control", label: "Control Systems", description: "System control and automation" },
    ],
  },
  robotics: {
    name: "Robotics Engineering",
    category: "engineering",
    interests: [
      { value: "robotics", label: "Robotic Systems", description: "Robot design and development" },
      { value: "ai", label: "AI for Robotics", description: "Machine learning in robotics" },
      { value: "automation", label: "Automation Systems", description: "Industrial automation" },
      { value: "embedded", label: "Embedded Control", description: "Robot control systems" },
      { value: "vision", label: "Computer Vision", description: "Vision systems for robots" },
    ],
  },
  chemical: {
    name: "Chemical Engineering",
    category: "engineering",
    interests: [
      { value: "process", label: "Process Engineering", description: "Chemical process design" },
      { value: "data", label: "Process Analytics", description: "Data analysis for processes" },
      { value: "ai", label: "AI for Chemical Processes", description: "ML in chemical engineering" },
      { value: "safety", label: "Process Safety", description: "Safety and risk management" },
      { value: "optimization", label: "Process Optimization", description: "Efficiency improvement" },
    ],
  },
  aerospace: {
    name: "Aerospace Engineering",
    category: "engineering",
    interests: [
      { value: "design", label: "Aircraft Design", description: "Aerospace vehicle design" },
      { value: "simulation", label: "Simulation & CFD", description: "Computational fluid dynamics" },
      { value: "ai", label: "AI for Aerospace", description: "ML in aerospace systems" },
      { value: "control", label: "Flight Control Systems", description: "Avionics and control" },
      { value: "materials", label: "Aerospace Materials", description: "Advanced materials" },
    ],
  },
  // NON-ENGINEERING BRANCHES
  bca: {
    name: "BCA (Bachelor of Computer Applications)",
    category: "non-engineering",
    interests: [
      { value: "web", label: "Web Development", description: "Frontend and backend web development" },
      { value: "fullstack", label: "Full Stack Development", description: "Complete web applications" },
      { value: "testing", label: "Software Testing", description: "QA and testing" },
      { value: "backend", label: "Backend APIs", description: "Server-side development" },
      { value: "database", label: "Database Management", description: "Database design and administration" },
      { value: "ai", label: "AI Tools Usage", description: "Using AI tools and platforms" },
      { value: "saas", label: "SaaS Product Building", description: "Software as a service" },
    ],
  },
  mca: {
    name: "MCA (Master of Computer Applications)",
    category: "non-engineering",
    interests: [
      { value: "fullstack", label: "Full Stack Development", description: "Complete applications" },
      { value: "backend", label: "Backend Systems", description: "Enterprise backend development" },
      { value: "ai", label: "AI/ML Engineering", description: "Machine learning systems" },
      { value: "data", label: "Data Science", description: "Data analysis and insights" },
      { value: "cloud", label: "Cloud & DevOps", description: "Cloud infrastructure" },
      { value: "architecture", label: "Software Architecture", description: "System design" },
    ],
  },
  bba: {
    name: "BBA (Bachelor of Business Administration)",
    category: "non-engineering",
    interests: [
      { value: "analytics", label: "Business Analytics", description: "Data-driven business decisions" },
      { value: "product", label: "Product Management", description: "Product strategy and development" },
      { value: "marketing", label: "Digital Marketing", description: "Online marketing and growth" },
      { value: "ai", label: "AI for Business", description: "AI in business decisions" },
      { value: "operations", label: "Operations & Strategy", description: "Business operations tools" },
      { value: "finance", label: "Business Finance Tools", description: "Financial analysis tools" },
    ],
  },
  mba: {
    name: "MBA (Master of Business Administration)",
    category: "non-engineering",
    interests: [
      { value: "analytics", label: "Business Analytics", description: "Advanced business intelligence" },
      { value: "product", label: "Product Management", description: "Product leadership" },
      { value: "strategy", label: "Business Strategy", description: "Strategic planning and execution" },
      { value: "ai", label: "AI for Business", description: "AI-driven business transformation" },
      { value: "consulting", label: "Business Consulting", description: "Consulting and advisory" },
    ],
  },
  bcom: {
    name: "B.Com (Bachelor of Commerce)",
    category: "non-engineering",
    interests: [
      { value: "analytics", label: "Business Analytics", description: "Commerce data analysis" },
      { value: "finance", label: "Financial Tools", description: "Financial analysis and tools" },
      { value: "accounting", label: "Accounting Software", description: "Accounting and ERP systems" },
      { value: "ecommerce", label: "E-commerce", description: "Online business platforms" },
    ],
  },
  bsc_it: {
    name: "B.Sc IT (Information Technology)",
    category: "non-engineering",
    interests: [
      { value: "web", label: "Web Development", description: "Web applications" },
      { value: "data", label: "Data Science", description: "Data analysis" },
      { value: "ai", label: "AI Tools", description: "AI applications" },
      { value: "database", label: "Database Systems", description: "Database management" },
    ],
  },
  bsc_physics: {
    name: "B.Sc Physics",
    category: "non-engineering",
    interests: [
      { value: "data", label: "Data Science", description: "Scientific data analysis" },
      { value: "ai", label: "AI for Science", description: "ML in physics research" },
      { value: "simulation", label: "Scientific Computing", description: "Computational physics" },
    ],
  },
  bsc_math: {
    name: "B.Sc Mathematics",
    category: "non-engineering",
    interests: [
      { value: "data", label: "Data Science", description: "Statistical analysis" },
      { value: "ai", label: "AI/ML", description: "Mathematical foundations of ML" },
      { value: "analytics", label: "Analytics", description: "Mathematical modeling" },
    ],
  },
  diploma: {
    name: "Diploma / Polytechnic",
    category: "non-engineering",
    interests: [
      { value: "web", label: "Web Development", description: "Practical web skills" },
      { value: "technical", label: "Technical Skills", description: "Hands-on technical training" },
      { value: "tools", label: "Industry Tools", description: "Professional tools usage" },
    ],
  },
};

// Branch-Aware Interest Validator and Adapter
function validateAndAdaptInterest(discipline: string, interest: string): {
  adaptedInterest: string;
  interestLabel: string;
  isTransitionPath: boolean;
  transitionNote?: string;
} {
  const branch = BRANCH_DEFINITIONS[discipline];
  if (!branch) {
    // Fallback for unknown branches
    return {
      adaptedInterest: interest,
      interestLabel: interest,
      isTransitionPath: false,
    };
  }

  // Check if interest is compatible with branch
  const compatibleInterest = branch.interests.find(i => i.value === interest);
  if (compatibleInterest) {
    return {
      adaptedInterest: interest,
      interestLabel: compatibleInterest.label,
      isTransitionPath: false,
    };
  }

  // If incompatible, adapt to closest compatible interest
  const firstCompatible = branch.interests[0];
  return {
    adaptedInterest: firstCompatible.value,
    interestLabel: firstCompatible.label,
    isTransitionPath: true,
    transitionNote: `You selected an interest that doesn't directly align with ${branch.name}. We've adapted your roadmap to focus on ${firstCompatible.label}, which is more relevant to your branch. You can still pursue your original interest, but you'll need additional foundational learning.`,
  };
}

// Get branch-specific interests for dropdown
function getBranchInterests(discipline: string) {
  const branch = BRANCH_DEFINITIONS[discipline];
  return branch?.interests || [];
}

// Branch-First Personalized Roadmap Generator
function generatePersonalizedRoadmap(
  targetYear: string,
  discipline: string,
  interest: string
) {
  // Step 1: Validate and adapt interest based on branch
  const { adaptedInterest, interestLabel, isTransitionPath, transitionNote } = 
    validateAndAdaptInterest(discipline, interest);

  // Step 2: Determine experience level
  const isBeginner = targetYear === "1" || targetYear === "2";
  const isIntermediate = targetYear === "3";
  const isAdvanced = targetYear === "4";

  const stage = isBeginner ? "Beginner" : isIntermediate ? "Intermediate" : "Advanced";

  // Step 3: Get branch-specific roadmap
  const roadmapSteps: any[] = [];

  // Branch-specific foundation phase
  if (isBeginner) {
    roadmapSteps.push(
      getBranchFoundationPhase(discipline, adaptedInterest, stage)
    );
  } else if (isIntermediate) {
    roadmapSteps.push(
      getBranchCorePhase(discipline, adaptedInterest, stage)
    );
  }

  // Branch-specific specialization
  roadmapSteps.push(
    getBranchSpecializationPhase(discipline, adaptedInterest, stage, isBeginner, isIntermediate)
  );

  // Branch-specific projects
  roadmapSteps.push(
    getBranchProjectsPhase(discipline, adaptedInterest, stage, isBeginner, isIntermediate)
  );

  // Advanced phase (if not beginner)
  if (!isBeginner) {
    roadmapSteps.push(
      getBranchAdvancedPhase(discipline, adaptedInterest, stage, isIntermediate)
    );
  }

  // Career prep
  roadmapSteps.push(
    getBranchCareerPhase(discipline, adaptedInterest, targetYear)
  );

  // Get branch display name
  const branch = BRANCH_DEFINITIONS[discipline];
  const branchName = branch?.name || discipline;

  return {
    steps: roadmapSteps,
    stage,
    discipline: branchName,
    interest: interestLabel,
    isTransitionPath,
    transitionNote,
  };
}

// Generic Roadmap Generator for any branch
function generateGenericRoadmapPhase(
  discipline: string,
  interest: string,
  phase: "foundation" | "core" | "specialization" | "projects" | "advanced" | "career",
  stage: string,
  isBeginner: boolean,
  isIntermediate: boolean,
  targetYear?: string
) {
  const branch = BRANCH_DEFINITIONS[discipline];
  const branchName = branch?.name || discipline;
  const branchCategory = branch?.category || "engineering";
  const selectedInterest = branch?.interests.find(i => i.value === interest);

  // Get phase-specific content based on branch and interest
  const phaseContent = getPhaseContentForBranch(discipline, interest, phase, stage, branchCategory);

  const monthMap: Record<string, Record<string, string>> = {
    foundation: { beginner: "Month 1-2", intermediate: "Month 1", advanced: "Month 1" },
    core: { beginner: "Month 3-4", intermediate: "Month 2-3", advanced: "Month 1-2" },
    specialization: { beginner: "Month 5-6", intermediate: "Month 4-5", advanced: "Month 3-4" },
    projects: { beginner: "Month 7-8", intermediate: "Month 6-7", advanced: "Month 5-6" },
    advanced: { beginner: "N/A", intermediate: "Month 8-9", advanced: "Month 7-8" },
    career: { beginner: "Month 9-10", intermediate: "Month 10-11", advanced: "Month 9-10" },
  };

  return {
    month: phaseContent.month || monthMap[phase]?.[isBeginner ? "beginner" : (stage === "Advanced") ? "advanced" : "intermediate"] || "Month 1",
    title: phaseContent.title,
    description: phaseContent.description,
    skills: phaseContent.skills || [],
    projects: phaseContent.projects || [],
    color: phaseContent.color || "cyan",
    whatToLearn: phaseContent.whatToLearn,
    whyImportant: phaseContent.whyImportant,
    howToLearn: phaseContent.howToLearn,
    expectedOutcome: phaseContent.expectedOutcome,
  };
}

// Get phase content for any branch-interest combination
function getPhaseContentForBranch(
  discipline: string,
  interest: string,
  phase: string,
  stage: string,
  category: string
) {
  // Use existing specific generators for known branches
  if (discipline === "cse" || discipline === "it") {
    if (phase === "foundation") return getCSEFoundation(interest, stage);
    if (phase === "core") return getCSECore(interest, stage);
    if (phase === "specialization") return getCSESpecialization(interest, stage, "Month 3-4");
    if (phase === "projects") return getCSEProjects(interest, stage, "Month 5-6");
    if (phase === "advanced") return getCSEAdvanced(interest, stage, "Month 7-8");
    if (phase === "career") return getCSECareer(interest, "4", "Month 9-10");
  }

  if (discipline === "ece") {
    if (phase === "foundation") return getECEFoundation(interest, stage);
    if (phase === "core") return getECECore(interest, stage);
    if (phase === "specialization") return getECESpecialization(interest, stage, "Month 3-4");
    if (phase === "projects") return getECEProjects(interest, stage, "Month 5-6");
    if (phase === "advanced") return getECEAdvanced(interest, stage, "Month 7-8");
    if (phase === "career") return getECECareer(interest, "4", "Month 9-10");
  }

  if (discipline === "me") {
    if (phase === "foundation") return getMEFoundation(interest, stage);
    if (phase === "core") return getMECore(interest, stage);
    if (phase === "specialization") return getMESpecialization(interest, stage, "Month 3-4");
    if (phase === "projects") return getMEProjects(interest, stage, "Month 5-6");
    if (phase === "advanced") return getMEAdvanced(interest, stage, "Month 7-8");
    if (phase === "career") return getMECareer(interest, "4", "Month 9-10");
  }

  // Generic generator for other branches
  return generateGenericPhaseContent(discipline, interest, phase, stage, category);
}

// Generic phase content generator
function generateGenericPhaseContent(
  discipline: string,
  interest: string,
  phase: string,
  stage: string,
  category: string
) {
  const branch = BRANCH_DEFINITIONS[discipline];
  const branchName = branch?.name || discipline;
  const selectedInterest = branch?.interests.find(i => i.value === interest);

  // This is a simplified generic generator - in production, you'd want more specific content
  const phaseTemplates: Record<string, any> = {
    foundation: {
      title: `${branchName} Foundation Building`,
      description: `As a ${stage} in ${branchName}, you'll start with fundamentals that bridge your academic knowledge with ${selectedInterest?.label || interest}. This phase builds your core understanding.`,
      skills: ["Fundamental Concepts", "Basic Tools", "Core Knowledge"],
      projects: ["Introductory Project", "Learning Exercise", "Basic Application"],
      color: "cyan",
      whatToLearn: `Learn the fundamentals of ${selectedInterest?.label || interest} as it applies to ${branchName}. Start with basics and build your foundation.`,
      whyImportant: `Strong fundamentals are essential. This phase establishes the base knowledge you'll need for everything else.`,
      howToLearn: `Take introductory courses, practice with basic projects, and join communities related to ${branchName} and ${selectedInterest?.label || interest}.`,
      expectedOutcome: `You'll understand the basics and have completed 2-3 introductory projects.`,
    },
    // Add other phases similarly...
  };

  return phaseTemplates[phase] || phaseTemplates.foundation;
}

// Branch-Specific Phase Generators
function getBranchFoundationPhase(discipline: string, interest: string, stage: string) {
  // Try specific generators first
  if (discipline === "cse" || discipline === "it") {
    return getCSEFoundation(interest, stage);
  } else if (discipline === "ece") {
    return getECEFoundation(interest, stage);
  } else if (discipline === "me") {
    return getMEFoundation(interest, stage);
  }
  
  // Use generic generator for other branches
  return generateGenericRoadmapPhase(discipline, interest, "foundation", stage, stage === "Beginner", stage === "Intermediate");
}

function getBranchCorePhase(discipline: string, interest: string, stage: string) {
  if (discipline === "cse" || discipline === "it") {
    return getCSECore(interest, stage);
  } else if (discipline === "ece") {
    return getECECore(interest, stage);
  } else if (discipline === "me") {
    return getMECore(interest, stage);
  }
  // Generic fallback
  const branch = BRANCH_DEFINITIONS[discipline];
  const selectedInterest = branch?.interests.find(i => i.value === interest);
  return {
    month: "Month 1",
    title: `${branch?.name || discipline} Core Skills`,
    description: `Focus on core ${selectedInterest?.label || interest} skills for ${branch?.name || discipline}.`,
    skills: ["Core Skills", "Essential Tools", "Fundamental Concepts"],
    projects: ["Core Project", "Applied Exercise"],
    color: "cyan",
    whatToLearn: `Learn core ${selectedInterest?.label || interest} concepts as they apply to ${branch?.name || discipline}.`,
    whyImportant: "Core skills are the foundation of your specialization.",
    howToLearn: `Take intermediate courses, practice with projects, and build your expertise in ${selectedInterest?.label || interest}.`,
    expectedOutcome: "You'll have a solid understanding of core concepts and completed practical projects.",
  };
}

function getBranchSpecializationPhase(discipline: string, interest: string, stage: string, isBeginner: boolean, isIntermediate: boolean) {
  const month = isBeginner ? "Month 3-4" : isIntermediate ? "Month 2-3" : "Month 1-2";
  
  if (discipline === "cse" || discipline === "it") {
    return getCSESpecialization(interest, stage, month);
  } else if (discipline === "ece") {
    return getECESpecialization(interest, stage, month);
  } else if (discipline === "me") {
    return getMESpecialization(interest, stage, month);
  }
  // Generic fallback
  const branch = BRANCH_DEFINITIONS[discipline];
  const selectedInterest = branch?.interests.find(i => i.value === interest);
  return {
    month,
    title: `${selectedInterest?.label || interest} Specialization`,
    description: `Master ${selectedInterest?.label || interest} as it applies to ${branch?.name || discipline}.`,
    skills: ["Advanced Skills", "Specialized Tools", "Expert Knowledge"],
    projects: ["Specialized Project", "Advanced Application"],
    color: "purple",
    whatToLearn: `Deep dive into ${selectedInterest?.label || interest} specialization for ${branch?.name || discipline}.`,
    whyImportant: "Specialization makes you stand out and prepares you for advanced roles.",
    howToLearn: `Take advanced courses, work on specialized projects, and build expertise in ${selectedInterest?.label || interest}.`,
    expectedOutcome: "You'll have specialized knowledge and completed advanced projects in your field.",
  };
}

function getBranchProjectsPhase(discipline: string, interest: string, stage: string, isBeginner: boolean, isIntermediate: boolean) {
  const month = isBeginner ? "Month 5-6" : isIntermediate ? "Month 4-5" : "Month 3-4";
  
  if (discipline === "cse" || discipline === "it") {
    return getCSEProjects(interest, stage, month);
  } else if (discipline === "ece") {
    return getECEProjects(interest, stage, month);
  } else if (discipline === "me") {
    return getMEProjects(interest, stage, month);
  }
  // Generic fallback
  const branch = BRANCH_DEFINITIONS[discipline];
  const selectedInterest = branch?.interests.find(i => i.value === interest);
  return {
    month,
    title: "Real-World Projects",
    description: `Build practical ${selectedInterest?.label || interest} projects for ${branch?.name || discipline}.`,
    skills: ["Project Management", "Deployment", "Real-World Application"],
    projects: ["Portfolio Project", "Industry Application", "Complete Solution"],
    color: "emerald",
    whatToLearn: `Build complete projects that solve real problems in ${branch?.name || discipline} using ${selectedInterest?.label || interest}.`,
    whyImportant: "Real projects prove your skills and create a portfolio that gets you hired.",
    howToLearn: `Build end-to-end projects, deploy them, document your work, and create a portfolio showcasing your ${branch?.name || discipline} + ${selectedInterest?.label || interest} skills.`,
    expectedOutcome: "You'll have a portfolio of real projects that demonstrate your capabilities.",
  };
}

function getBranchAdvancedPhase(discipline: string, interest: string, stage: string, isIntermediate: boolean) {
  const month = isIntermediate ? "Month 6-7" : "Month 5-6";
  
  if (discipline === "cse" || discipline === "it") {
    return getCSEAdvanced(interest, stage, month);
  } else if (discipline === "ece") {
    return getECEAdvanced(interest, stage, month);
  } else if (discipline === "me") {
    return getMEAdvanced(interest, stage, month);
  }
  // Generic fallback
  const branch = BRANCH_DEFINITIONS[discipline];
  const selectedInterest = branch?.interests.find(i => i.value === interest);
  return {
    month,
    title: "Advanced Specialization",
    description: `Advanced ${selectedInterest?.label || interest} for ${branch?.name || discipline} professionals.`,
    skills: ["Expert-Level Skills", "Advanced Tools", "Leadership"],
    projects: ["Research Project", "Advanced Solution", "Industry Contribution"],
    color: "rose",
    whatToLearn: `Master advanced concepts in ${selectedInterest?.label || interest} for ${branch?.name || discipline}.`,
    whyImportant: "Advanced skills position you for senior roles and leadership opportunities.",
    howToLearn: `Take expert-level courses, work on research projects, contribute to industry, and build advanced expertise.`,
    expectedOutcome: "You'll be ready for senior roles and can lead projects in your field.",
  };
}

function getBranchCareerPhase(discipline: string, interest: string, targetYear: string) {
  const month = targetYear === "4" ? "Month 7-8" : "Month 8-9";
  
  if (discipline === "cse" || discipline === "it") {
    return getCSECareer(interest, targetYear, month);
  } else if (discipline === "ece") {
    return getECECareer(interest, targetYear, month);
  } else if (discipline === "me") {
    return getMECareer(interest, targetYear, month);
  }
  // Generic fallback
  const branch = BRANCH_DEFINITIONS[discipline];
  const selectedInterest = branch?.interests.find(i => i.value === interest);
  return {
    month,
    title: "Career & Placement Preparation",
    description: `Prepare for ${targetYear === "4" ? "full-time roles" : "internships"} in ${branch?.name || discipline} with ${selectedInterest?.label || interest} focus.`,
    skills: ["Resume Building", "Interview Prep", "Portfolio Development", "Networking"],
    projects: ["Portfolio Website", "Project Showcase", "Resume Optimization"],
    color: "amber",
    whatToLearn: `How to showcase your ${branch?.name || discipline} + ${selectedInterest?.label || interest} skills, prepare for interviews, and network in your industry.`,
    whyImportant: "Technical skills alone don't get you hired. You need to present yourself well and demonstrate value.",
    howToLearn: `Build a portfolio, practice interviews, network in ${branch?.name || discipline} communities, and apply strategically to roles.`,
    expectedOutcome: `You'll be prepared to land ${targetYear === "4" ? "full-time" : "internship"} roles in ${branch?.name || discipline} with ${selectedInterest?.label || interest} focus.`,
  };
}

// Computer Science Engineering Roadmaps
function getCSEFoundation(interest: string, stage: string) {
  const skills = interest === "ai" 
    ? ["Python Programming", "NumPy & Pandas", "Basic Statistics", "Jupyter Notebooks", "Git & GitHub"]
    : interest === "web"
    ? ["HTML & CSS", "JavaScript Fundamentals", "Git Basics", "VS Code", "Responsive Design"]
    : ["Python Basics", "Pandas & NumPy", "Basic Statistics", "Data Visualization", "Jupyter Notebooks"];

  const projects = interest === "ai"
    ? ["Python Calculator", "Data Analysis Project", "Simple ML Model"]
    : interest === "web"
    ? ["Personal Portfolio", "Landing Page", "Interactive Form"]
    : ["Sales Data Analysis", "Student Grade Tracker", "Basic Dashboard"];

  return {
    month: "Month 1-2",
    title: "CS Foundation Building",
    description: `As a Computer Science student, you'll build strong programming fundamentals. This phase establishes your coding skills, problem-solving approach, and understanding of how software works.`,
    skills,
    projects,
    color: "cyan",
    whatToLearn: interest === "ai" 
      ? "Python programming (variables, loops, functions, OOP), NumPy for numerical computing, Pandas for data manipulation, basic statistics (mean, median, standard deviation), and how to use Jupyter Notebooks for experimentation."
      : interest === "web"
      ? "HTML structure and semantics, CSS styling (flexbox, grid), JavaScript fundamentals (variables, functions, DOM manipulation), Git version control, and how websites work from browser to server."
      : "Python programming basics, Pandas for data manipulation, NumPy for numerical operations, basic statistical concepts, and data visualization with Matplotlib/Seaborn.",
    whyImportant: "As a CS student, strong fundamentals are non-negotiable. Everything you build later depends on this foundation. Good programming habits learned here will serve you throughout your career.",
    howToLearn: "Start with freeCodeCamp or Python.org tutorials. Practice daily on platforms like LeetCode (easy problems). Build small projects every week. Join CS communities on Discord/Reddit. Read 'Automate the Boring Stuff' for Python or MDN Web Docs for web.",
    expectedOutcome: "You'll be comfortable writing code, solving basic problems, and have 2-3 small projects completed. You understand how programming works and can learn new concepts independently.",
  };
}

function getCSECore(interest: string, stage: string) {
  const skills = interest === "ai"
    ? ["Machine Learning Fundamentals", "Scikit-learn", "Data Preprocessing", "Model Evaluation", "Feature Engineering"]
    : interest === "web"
    ? ["React.js", "Node.js", "REST APIs", "Database Design", "Authentication"]
    : ["Advanced Pandas", "SQL", "Statistical Analysis", "Data Visualization", "Exploratory Data Analysis"];

  const projects = interest === "ai"
    ? ["Email Spam Classifier", "House Price Predictor", "Image Classification Model"]
    : interest === "web"
    ? ["E-commerce Frontend", "Blog with CMS", "Social Media Clone"]
    : ["Customer Segmentation", "Sales Forecasting", "A/B Testing Analysis"];

  return {
    month: "Month 1",
    title: "CS Core Skills Deep Dive",
    description: `Since you're intermediate, we'll focus on ${interest === "ai" ? "machine learning" : interest === "web" ? "fullstack development" : "data science"} core concepts. This builds on your CS foundation.`,
    skills,
    projects,
    color: "cyan",
    whatToLearn: interest === "ai"
      ? "Supervised learning (classification, regression), unsupervised learning (clustering), model training and evaluation, cross-validation, and how to use scikit-learn library effectively."
      : interest === "web"
      ? "React.js for building interactive UIs, Node.js for backend development, REST API design, database modeling (SQL/NoSQL), and connecting frontend to backend."
      : "Advanced data manipulation with Pandas, SQL queries for databases, statistical hypothesis testing, creating meaningful visualizations, and exploratory data analysis techniques.",
    whyImportant: "These are the core skills that define a CS professional in your chosen field. Master these, and you can build real applications that solve problems.",
    howToLearn: interest === "ai"
      ? "Take Andrew Ng's Machine Learning course on Coursera. Practice with scikit-learn tutorials. Build projects from Kaggle competitions. Read 'Hands-On Machine Learning'."
      : interest === "web"
      ? "React documentation and 'React - The Complete Guide' on Udemy. Build projects from Frontend Mentor. Practice on CodeSandbox. Learn Node.js from Node.js official docs."
      : "Take 'Applied Data Science' courses on Coursera. Practice SQL on HackerRank. Build projects with real datasets. Read 'Python for Data Analysis'.",
    expectedOutcome: interest === "ai"
      ? "You'll have built your first ML models that make real predictions. You understand how machine learning works and can train models independently."
      : interest === "web"
      ? "You'll have a complete fullstack application deployed. You can build both frontend and backend, and connect them together."
      : "You'll be able to analyze complex datasets, write SQL queries, and create meaningful visualizations. You can extract insights from data.",
  };
}

function getCSESpecialization(interest: string, stage: string, month: string) {
  const skills = interest === "ai"
    ? ["Deep Learning (TensorFlow/PyTorch)", "Neural Networks", "NLP Basics", "Computer Vision", "Model Deployment"]
    : interest === "web"
    ? ["Next.js/React", "Express.js/Node.js", "Database Optimization", "Authentication & Security", "API Design"]
    : ["Machine Learning for Data", "Advanced SQL", "Time Series Analysis", "Business Intelligence", "Statistical Modeling"];

  const projects = interest === "ai"
    ? ["Chatbot with NLP", "Image Recognition App", "Sentiment Analysis Tool"]
    : interest === "web"
    ? ["Fullstack Social App", "E-commerce Platform", "Real-time Chat App"]
    : ["Predictive Analytics Dashboard", "Customer Churn Analysis", "Market Research Platform"];

  return {
    month,
    title: interest === "ai" ? "AI/ML Specialization" : interest === "web" ? "Fullstack Development" : "Data Science Deep Dive",
    description: `Master ${interest === "ai" ? "deep learning and AI systems" : interest === "web" ? "production-ready web development" : "advanced data science techniques"}. This is where you become a specialist in your field.`,
    skills,
    projects,
    color: "purple",
    whatToLearn: interest === "ai"
      ? "Deep learning with neural networks, natural language processing, computer vision, transformer models, and deploying ML models to production."
      : interest === "web"
      ? "Advanced React patterns, Next.js for production apps, backend architecture, database optimization, authentication systems, and deploying scalable applications."
      : "Machine learning for data analysis, advanced SQL, time series forecasting, business intelligence tools, and creating data-driven solutions.",
    whyImportant: "Specialization makes you stand out. While others know basics, you'll have deep expertise in your chosen area - skills that are in high demand.",
    howToLearn: interest === "ai"
      ? "Deep Learning Specialization on Coursera. Fast.ai's practical course. Build projects: chatbot, image classifier. Read research papers. Join AI communities."
      : interest === "web"
      ? "Next.js documentation and tutorials. Build a fullstack project. Learn from production codebases on GitHub. Take advanced courses on Frontend Masters."
      : "Advanced courses on Coursera/edX. Work on Kaggle competitions. Build a portfolio of 3-5 projects. Read 'The Art of Data Science'.",
    expectedOutcome: interest === "ai"
      ? "You'll have built AI applications like chatbots or image classifiers. You understand deep learning and can apply it to real problems."
      : interest === "web"
      ? "You'll have production-ready web applications. You can build complex features, handle authentication, and deploy scalable apps."
      : "You'll be creating advanced analytics, building ML models for data, and generating business insights. You're a skilled data scientist.",
  };
}

function getCSEProjects(interest: string, stage: string, month: string) {
  const skills = interest === "ai"
    ? ["Model Deployment", "API Development", "Cloud Platforms (AWS/GCP)", "MLOps Basics", "Docker"]
    : interest === "web"
    ? ["DevOps Basics", "CI/CD", "Docker", "Cloud Deployment", "Performance Optimization"]
    : ["Dashboard Tools (Tableau/PowerBI)", "Cloud Analytics", "Automated Reporting", "Data Pipelines", "API Integration"];

  const projects = interest === "ai"
    ? ["AI-Powered Recommendation System", "Automated Content Moderation", "Smart Assistant Application"]
    : interest === "web"
    ? ["Production-Ready SaaS App", "Open Source Contribution", "Client Project"]
    : ["End-to-End Analytics Platform", "Business Intelligence Solution", "Data-Driven Product Feature"];

  return {
    month,
    title: "Real-World CS Projects",
    description: `Build ${interest === "ai" ? "AI-powered applications" : interest === "web" ? "production web applications" : "data-driven solutions"} that solve real problems. This is where you apply everything you've learned as a CS professional.`,
    skills,
    projects,
    color: "emerald",
    whatToLearn: interest === "ai"
      ? "Deploying AI models to production, building APIs, using cloud platforms, containerization with Docker, and making your AI accessible to others."
      : interest === "web"
      ? "DevOps practices, containerization with Docker, continuous deployment, scaling applications, and making your apps production-ready."
      : "Building dashboards, automated reporting systems, data pipelines, and presenting insights to stakeholders. Create tools that help businesses make decisions.",
    whyImportant: "Real projects prove you can build solutions, not just learn theory. Employers want to see what you've actually created. This is what gets you hired.",
    howToLearn: interest === "ai"
      ? "Deploy models on Hugging Face Spaces or Streamlit. Learn Docker basics. Build an API with FastAPI. Create a portfolio website showcasing projects."
      : interest === "web"
      ? "Deploy on Vercel/Netlify (free). Learn GitHub Actions for CI/CD. Build a SaaS project. Contribute to open source."
      : "Create dashboards with Tableau Public (free) or Streamlit. Build a data blog. Share projects on GitHub. Write case studies.",
    expectedOutcome: interest === "ai"
      ? "You'll have AI projects live on the internet that people can use. You can deploy models and build AI products. Your portfolio is impressive."
      : interest === "web"
      ? "You'll have multiple deployed applications. You understand DevOps and can ship production code. You're ready for real-world work."
      : "You'll have dashboards and data products that solve business problems. You can present insights professionally. Your portfolio showcases your skills.",
  };
}

function getCSEAdvanced(interest: string, stage: string, month: string) {
  const skills = interest === "ai"
    ? ["Advanced Neural Networks", "Transformer Models", "Reinforcement Learning", "Model Optimization", "Research Methods"]
    : interest === "web"
    ? ["Microservices Architecture", "System Design", "Performance Optimization", "Advanced Security", "Scalability Patterns"]
    : ["Advanced ML Models", "Big Data Tools", "Statistical Modeling", "Advanced Visualization", "Data Engineering"];

  const projects = interest === "ai"
    ? ["Production ML System", "Research Project", "AI Startup MVP"]
    : interest === "web"
    ? ["Scalable Web Platform", "Open Source Library", "Technical Blog/Content"]
    : ["Advanced Analytics Platform", "Research Publication", "Data Product"];

  return {
    month,
    title: "Advanced CS Specialization",
    description: `Dive deep into advanced ${interest === "ai" ? "AI research and production systems" : interest === "web" ? "system architecture and scaling" : "advanced analytics and ML"}. This phase prepares you for senior CS roles.`,
    skills,
    projects,
    color: "rose",
    whatToLearn: interest === "ai"
      ? "Cutting-edge AI: transformer models, reinforcement learning, optimizing models for production, research methodologies, and contributing to AI research."
      : interest === "web"
      ? "System design for large applications, microservices, performance optimization, building scalable platforms, and architecting systems that handle millions of users."
      : "Advanced machine learning models, big data tools (Spark, Hadoop), statistical modeling, and creating sophisticated analytics platforms.",
    whyImportant: "Advanced skills position you for senior roles and higher salaries. You become the person who solves complex technical challenges.",
    howToLearn: interest === "ai"
      ? "Take advanced courses on DeepLearning.AI. Read research papers on arXiv. Build research projects. Contribute to open source AI libraries."
      : interest === "web"
      ? "Study system design (Grokking the System Design Interview). Build scalable projects. Contribute to major open source projects."
      : "Advanced ML courses. Work on complex business problems. Publish analysis on Medium/LinkedIn. Build advanced dashboards.",
    expectedOutcome: interest === "ai"
      ? "You'll be working on cutting-edge AI projects. You understand advanced concepts and can solve complex problems. You're ready for senior roles."
      : interest === "web"
      ? "You'll be architecting systems and building scalable platforms. You understand advanced concepts and can lead technical projects."
      : "You'll be creating enterprise-level data solutions. You can handle complex analytics and drive business strategy with data.",
  };
}

function getCSECareer(interest: string, targetYear: string, month: string) {
  return {
    month,
    title: "CS Career & Placement Preparation",
    description: `Prepare for ${targetYear === "4" ? "full-time CS roles" : "internships and placements"}. Build your portfolio, practice technical interviews, and connect with the tech industry.`,
    skills: ["Resume Building", "Technical Interviews", "Portfolio Development", "LinkedIn Optimization", "System Design Prep"],
    projects: ["Portfolio Website", "GitHub Showcase", "Resume Optimization", "Interview Prep"],
    color: "amber",
    whatToLearn: interest === "ai"
      ? "How to showcase your AI projects, prepare for ML system design interviews, build a strong portfolio, and network in the AI community."
      : interest === "web"
      ? "Portfolio development, technical interview prep (algorithms, system design), contributing to open source, and building your professional brand."
      : "Creating a data science portfolio, preparing case studies, networking with data professionals, and acing data science interviews.",
    whyImportant: "Technical skills alone don't get you hired. You need to present yourself well, network, and demonstrate value. This phase ensures you get opportunities.",
    howToLearn: interest === "ai"
      ? "Build a portfolio website. Write technical blog posts. Practice coding interviews on LeetCode. Prepare ML system design answers. Network on LinkedIn and Twitter."
      : interest === "web"
      ? "Create a stunning portfolio. Contribute to open source. Practice technical interviews. Build a strong GitHub profile. Network with developers."
      : "Create a data science portfolio. Write case studies. Practice SQL and Python interviews. Build a LinkedIn presence. Network in data communities.",
    expectedOutcome: interest === "ai"
      ? "You'll have a strong portfolio, be interview-ready, and have connections in the AI community. You're prepared to land your dream AI job."
      : interest === "web"
      ? "You'll have an impressive portfolio, be ready for technical interviews, and have a network of developers. You're prepared for web development roles."
      : "You'll have a data science portfolio, case studies, and be interview-ready. You're prepared to launch your data science career.",
  };
}

// Electronics & Communication Engineering Roadmaps
function getECEFoundation(interest: string, stage: string) {
  const skills = interest === "ai"
    ? ["Python Programming", "Signal Processing Basics", "NumPy & SciPy", "MATLAB Basics", "Circuit Analysis"]
    : ["Python Programming", "Data Collection (Sensors)", "Basic Statistics", "IoT Basics", "Embedded Systems Intro"];

  const projects = interest === "ai"
    ? ["Signal Filtering Project", "Noise Reduction Algorithm", "Basic Pattern Recognition"]
    : ["Sensor Data Collection", "IoT Device Monitoring", "Basic Analytics Dashboard"];

  return {
    month: "Month 1-2",
    title: "ECE Foundation Building",
    description: `As an Electronics & Communication student, you'll combine your hardware knowledge with ${interest === "ai" ? "AI for signal processing" : "data science for IoT"}. This phase bridges electronics and software.`,
    skills,
    projects,
    color: "cyan",
    whatToLearn: interest === "ai"
      ? "Python programming basics, signal processing fundamentals (fourier transforms, filtering), NumPy/SciPy for signal analysis, MATLAB basics, and how AI can process electronic signals."
      : "Python programming, working with sensor data, basic statistics, IoT device communication protocols, and collecting data from embedded systems.",
    whyImportant: "As an ECE student, combining your hardware knowledge with software/AI skills makes you highly valuable. You understand both the physical and digital worlds.",
    howToLearn: "Start with Python basics (freeCodeCamp). Learn signal processing from your ECE curriculum. Practice with MATLAB/Simulink. Build projects with Arduino/Raspberry Pi. Join ECE communities.",
    expectedOutcome: "You'll be comfortable programming, understand how to process signals/data from electronic devices, and have 2-3 projects combining hardware and software.",
  };
}

function getECECore(interest: string, stage: string) {
  const skills = interest === "ai"
    ? ["ML for Signal Processing", "Digital Signal Processing", "Embedded AI Basics", "Sensor Data Analysis", "Real-time Processing"]
    : ["IoT Data Analytics", "Time Series Analysis", "Sensor Fusion", "Edge Computing Basics", "Data Visualization"];

  const projects = interest === "ai"
    ? ["Voice Recognition System", "Image Processing for Embedded", "Predictive Maintenance"]
    : ["Smart Home Analytics", "Industrial IoT Dashboard", "Predictive Sensor Analytics"];

  return {
    month: "Month 1",
    title: "ECE Core Skills Deep Dive",
    description: `Focus on ${interest === "ai" ? "AI applications in electronics and signal processing" : "data science for IoT and embedded systems"}. This builds on your ECE foundation.`,
    skills,
    projects,
    color: "cyan",
    whatToLearn: interest === "ai"
      ? "Machine learning for signal processing, digital signal processing techniques, running AI models on embedded systems, analyzing sensor data, and real-time signal analysis."
      : "Analyzing IoT data streams, time series analysis for sensor data, combining data from multiple sensors, edge computing concepts, and visualizing embedded system data.",
    whyImportant: "These skills combine your ECE expertise with modern AI/data techniques. You become valuable for roles in IoT, embedded AI, and smart systems.",
    howToLearn: "Take 'Machine Learning for Signal Processing' courses. Practice with Arduino/Raspberry Pi projects. Learn TensorFlow Lite for embedded. Build IoT projects. Read ECE + AI research papers.",
    expectedOutcome: interest === "ai"
      ? "You'll have built AI systems that process electronic signals. You understand how to run AI on embedded devices and analyze sensor data."
      : "You'll be able to collect and analyze data from IoT devices. You can build dashboards and extract insights from embedded systems.",
  };
}

function getECESpecialization(interest: string, stage: string, month: string) {
  const skills = interest === "ai"
    ? ["Edge AI", "TinyML", "Neural Networks for Signals", "Embedded ML Deployment", "Real-time AI Systems"]
    : ["Advanced IoT Analytics", "Predictive Maintenance", "Industrial IoT", "Edge Analytics", "Sensor Network Analysis"];

  const projects = interest === "ai"
    ? ["Edge AI Device", "Smart Sensor System", "Real-time Signal Classifier"]
    : ["Industrial IoT Platform", "Predictive Maintenance System", "Smart City Analytics"];

  return {
    month,
    title: interest === "ai" ? "AI for Electronics & IoT" : "Data Science for Embedded Systems",
    description: `Master ${interest === "ai" ? "AI applications in electronics, edge computing, and embedded systems" : "advanced data analytics for IoT and industrial applications"}. This is your ECE specialization.`,
    skills,
    projects,
    color: "purple",
    whatToLearn: interest === "ai"
      ? "Edge AI and TinyML (running AI on microcontrollers), neural networks for signal processing, deploying ML models on embedded devices, and building real-time AI systems."
      : "Advanced analytics for IoT data, predictive maintenance algorithms, industrial IoT platforms, edge analytics, and analyzing sensor networks.",
    whyImportant: "This specialization makes you unique. You combine ECE hardware expertise with cutting-edge AI/data skills - exactly what industries need for smart devices and IoT.",
    howToLearn: "Take TinyML courses. Practice with ESP32/Arduino Nano. Learn TensorFlow Lite. Build edge AI projects. Study industrial IoT platforms. Join IoT communities.",
    expectedOutcome: interest === "ai"
      ? "You'll have built AI systems running on embedded devices. You understand edge AI and can deploy ML models on microcontrollers."
      : "You'll have built IoT analytics platforms. You can analyze industrial data and create predictive maintenance systems.",
  };
}

function getECEProjects(interest: string, stage: string, month: string) {
  const skills = interest === "ai"
    ? ["Edge Deployment", "Hardware-Software Integration", "Real-time Systems", "Power Optimization", "Model Compression"]
    : ["IoT Platform Development", "Cloud Integration", "Data Pipelines", "Dashboard Creation", "API Development"];

  const projects = interest === "ai"
    ? ["Smart Edge AI Device", "Real-time Signal Processing System", "Embedded Vision System"]
    : ["Complete IoT Analytics Platform", "Industrial Monitoring System", "Smart Agriculture Solution"];

  return {
    month,
    title: "Real-World ECE Projects",
    description: `Build ${interest === "ai" ? "edge AI systems and embedded intelligence" : "complete IoT solutions and analytics platforms"} that solve real electronics and communication problems.`,
    skills,
    projects,
    color: "emerald",
    whatToLearn: interest === "ai"
      ? "Deploying AI models on edge devices, integrating hardware and software, optimizing for power consumption, compressing models for embedded systems, and building real-time AI applications."
      : "Building complete IoT platforms, integrating with cloud services, creating data pipelines, building dashboards, and developing APIs for IoT data.",
    whyImportant: "Real projects prove you can build complete systems combining hardware and software. This is what ECE employers want to see - practical, deployable solutions.",
    howToLearn: "Build end-to-end projects. Deploy to edge devices or cloud. Document your hardware-software integration. Create a portfolio showcasing both electronics and software skills.",
    expectedOutcome: interest === "ai"
      ? "You'll have edge AI devices that work in real-world conditions. You can deploy AI on embedded systems and optimize for production."
      : "You'll have complete IoT solutions deployed. You can build analytics platforms that integrate hardware and cloud services.",
  };
}

function getECEAdvanced(interest: string, stage: string, month: string) {
  const skills = interest === "ai"
    ? ["Advanced Edge AI", "Neural Architecture Search", "Hardware-Accelerated AI", "Research in Embedded AI", "System-on-Chip Design"]
    : ["Advanced Industrial IoT", "Digital Twin Concepts", "AI-Driven Analytics", "5G/6G Integration", "Cybersecurity for IoT"];

  const projects = interest === "ai"
    ? ["Research-Grade Edge AI", "Custom AI Chip Design", "Advanced Embedded System"]
    : ["Enterprise IoT Platform", "Digital Twin Implementation", "5G-Enabled Analytics"];

  return {
    month,
    title: "Advanced ECE Specialization",
    description: `Dive deep into ${interest === "ai" ? "cutting-edge embedded AI and hardware-accelerated systems" : "advanced IoT platforms and industrial analytics"}. Prepare for senior ECE roles.`,
    skills,
    projects,
    color: "rose",
    whatToLearn: interest === "ai"
      ? "Advanced edge AI techniques, neural architecture search for embedded systems, hardware-accelerated AI, research methodologies, and system-on-chip design for AI."
      : "Advanced industrial IoT platforms, digital twin concepts, AI-driven analytics, 5G/6G integration for IoT, and cybersecurity for connected systems.",
    whyImportant: "Advanced ECE + AI/data skills position you for senior roles in semiconductor companies, IoT platforms, and embedded systems design.",
    howToLearn: "Take advanced embedded AI courses. Study research papers on edge AI. Learn FPGA/ASIC basics. Build research-grade projects. Network in semiconductor/IoT industries.",
    expectedOutcome: interest === "ai"
      ? "You'll be working on cutting-edge embedded AI projects. You understand hardware-software co-design and can lead embedded AI initiatives."
      : "You'll be building enterprise IoT platforms. You understand industrial systems and can drive IoT strategy for companies.",
  };
}

function getECECareer(interest: string, targetYear: string, month: string) {
  return {
    month,
    title: "ECE Career & Placement Preparation",
    description: `Prepare for ${targetYear === "4" ? "full-time ECE roles" : "internships"} in embedded systems, IoT, semiconductor, or electronics companies. Showcase your hardware+software skills.`,
    skills: ["Resume Building", "Technical Interviews", "Portfolio Development", "Hardware Project Showcase", "Industry Networking"],
    projects: ["Portfolio Website", "GitHub Showcase", "Hardware Demo Videos", "Resume Optimization"],
    color: "amber",
    whatToLearn: interest === "ai"
      ? "How to showcase embedded AI projects, prepare for ECE+AI interviews, demonstrate hardware-software integration skills, and network in embedded systems industry."
      : "Creating an IoT/data science portfolio, preparing for ECE+data interviews, showcasing hardware projects, and networking in IoT/electronics industries.",
    whyImportant: "ECE careers require demonstrating both hardware and software skills. Your portfolio should show complete systems, not just code or circuits separately.",
    howToLearn: "Build a portfolio showcasing hardware+software projects. Create demo videos. Practice ECE technical interviews. Network at electronics/IoT conferences. Join ECE professional groups.",
    expectedOutcome: interest === "ai"
      ? "You'll have a strong portfolio showing embedded AI projects, be interview-ready for ECE+AI roles, and have industry connections."
      : "You'll have an impressive IoT/data portfolio, be ready for ECE+data interviews, and have connections in electronics/IoT industries.",
  };
}

// Mechanical Engineering Roadmaps
function getMEFoundation(interest: string, stage: string) {
  const skills = interest === "ai"
    ? ["Python Programming", "CAD Basics (SolidWorks/AutoCAD)", "Manufacturing Processes", "Basic Statistics", "Data Collection"]
    : ["Python Programming", "Excel/Sheets Advanced", "Basic Statistics", "Manufacturing Data", "Process Analysis"];

  const projects = interest === "ai"
    ? ["CAD Automation Script", "Quality Control Analysis", "Manufacturing Data Analysis"]
    : ["Production Data Dashboard", "Quality Metrics Analysis", "Process Optimization Study"];

  return {
    month: "Month 1-2",
    title: "ME Foundation Building",
    description: `As a Mechanical Engineering student, you'll combine your mechanical knowledge with ${interest === "ai" ? "AI for manufacturing and robotics" : "data science for industrial analytics"}. This bridges mechanical engineering and modern tech.`,
    skills,
    projects,
    color: "cyan",
    whatToLearn: interest === "ai"
      ? "Python programming basics, CAD software basics (SolidWorks or AutoCAD), understanding manufacturing processes, basic statistics, and how AI can improve mechanical systems."
      : "Python programming, advanced Excel for data analysis, basic statistics, understanding manufacturing data, and analyzing mechanical processes.",
    whyImportant: "As an ME student, adding AI/data skills to your mechanical knowledge makes you highly valuable. You understand both physical systems and how to optimize them with data/AI.",
    howToLearn: "Start with Python basics. Learn CAD software from your ME curriculum. Practice with manufacturing data. Build projects analyzing mechanical processes. Join ME+tech communities.",
    expectedOutcome: "You'll be comfortable programming, understand how to analyze mechanical/manufacturing data, and have 2-3 projects combining ME knowledge with software skills.",
  };
}

function getMECore(interest: string, stage: string) {
  const skills = interest === "ai"
    ? ["ML for Manufacturing", "Predictive Maintenance", "Robotics Basics", "Quality Control AI", "Process Optimization"]
    : ["Manufacturing Analytics", "Quality Data Analysis", "Process Monitoring", "Statistical Process Control", "Production Dashboards"];

  const projects = interest === "ai"
    ? ["Predictive Maintenance System", "Quality Defect Detection", "Robotic Control System"]
    : ["Production Analytics Dashboard", "Quality Control System", "Process Optimization Platform"];

  return {
    month: "Month 1",
    title: "ME Core Skills Deep Dive",
    description: `Focus on ${interest === "ai" ? "AI applications in manufacturing, robotics, and mechanical systems" : "data science for industrial processes and manufacturing"}. This builds on your ME foundation.`,
    skills,
    projects,
    color: "cyan",
    whatToLearn: interest === "ai"
      ? "Machine learning for manufacturing processes, predictive maintenance algorithms, robotics control systems, AI for quality control, and optimizing mechanical systems with AI."
      : "Analyzing manufacturing data, quality control statistics, process monitoring techniques, statistical process control, and creating production analytics dashboards.",
    whyImportant: "These skills combine your ME expertise with modern AI/data techniques. You become valuable for roles in smart manufacturing, Industry 4.0, and industrial automation.",
    howToLearn: "Take 'AI for Manufacturing' courses. Practice with manufacturing datasets. Learn robotics basics. Build projects analyzing production data. Read Industry 4.0 research.",
    expectedOutcome: interest === "ai"
      ? "You'll have built AI systems for manufacturing. You understand how to apply AI to mechanical processes and quality control."
      : "You'll be able to analyze manufacturing data and create analytics dashboards. You can optimize production processes using data.",
  };
}

function getMESpecialization(interest: string, stage: string, month: string) {
  const skills = interest === "ai"
    ? ["Industrial AI", "Robotics & Automation", "Digital Twin", "Smart Manufacturing", "AI-Driven Design"]
    : ["Advanced Manufacturing Analytics", "Supply Chain Analytics", "Industrial IoT Integration", "Predictive Analytics", "Business Intelligence"];

  const projects = interest === "ai"
    ? ["Smart Manufacturing System", "Robotic Automation Project", "Digital Twin Implementation"]
    : ["Complete Manufacturing Analytics Platform", "Supply Chain Optimization", "Industrial Intelligence Dashboard"];

  return {
    month,
    title: interest === "ai" ? "AI for Mechanical Engineering" : "Data Science for Manufacturing",
    description: `Master ${interest === "ai" ? "AI applications in manufacturing, robotics, and smart systems" : "advanced analytics for industrial processes and supply chains"}. This is your ME specialization.`,
    skills,
    projects,
    color: "purple",
    whatToLearn: interest === "ai"
      ? "Industrial AI systems, robotics and automation, digital twin technology, smart manufacturing concepts, and AI-driven design optimization."
      : "Advanced manufacturing analytics, supply chain data analysis, industrial IoT integration, predictive analytics for production, and business intelligence for manufacturing.",
    whyImportant: "This specialization makes you unique. You combine ME expertise with cutting-edge AI/data skills - exactly what industries need for Industry 4.0 and smart manufacturing.",
    howToLearn: "Take Industry 4.0 courses. Learn robotics platforms (ROS). Study digital twin concepts. Build smart manufacturing projects. Join manufacturing tech communities.",
    expectedOutcome: interest === "ai"
      ? "You'll have built AI systems for manufacturing and robotics. You understand smart manufacturing and can design AI-driven mechanical systems."
      : "You'll have built complete manufacturing analytics platforms. You can analyze industrial data and create predictive systems for production.",
  };
}

function getMEProjects(interest: string, stage: string, month: string) {
  const skills = interest === "ai"
    ? ["System Integration", "Robotics Deployment", "Manufacturing Integration", "Performance Optimization", "Safety Systems"]
    : ["Platform Development", "Cloud Integration", "Real-time Analytics", "Dashboard Creation", "API Development"];

  const projects = interest === "ai"
    ? ["Complete Smart Manufacturing System", "Robotic Automation Solution", "AI-Powered Quality System"]
    : ["Enterprise Manufacturing Platform", "Supply Chain Analytics System", "Industrial Intelligence Platform"];

  return {
    month,
    title: "Real-World ME Projects",
    description: `Build ${interest === "ai" ? "complete smart manufacturing and robotic systems" : "enterprise manufacturing analytics platforms"} that solve real industrial problems.`,
    skills,
    projects,
    color: "emerald",
    whatToLearn: interest === "ai"
      ? "Deploying AI systems in manufacturing environments, integrating robotics, ensuring safety compliance, optimizing production with AI, and building complete industrial solutions."
      : "Building complete manufacturing platforms, integrating with ERP systems, creating real-time analytics, building dashboards for production teams, and developing APIs for industrial data.",
    whyImportant: "Real projects prove you can build complete industrial solutions. This is what manufacturing companies want - practical, deployable systems that improve production.",
    howToLearn: "Build end-to-end manufacturing projects. Integrate with real manufacturing data. Document your ME+tech integration. Create a portfolio showcasing both mechanical and software skills.",
    expectedOutcome: interest === "ai"
      ? "You'll have smart manufacturing systems that work in real industrial conditions. You can deploy AI/robotics solutions in manufacturing environments."
      : "You'll have complete manufacturing analytics platforms deployed. You can build systems that integrate mechanical processes with data analytics.",
  };
}

function getMEAdvanced(interest: string, stage: string, month: string) {
  const skills = interest === "ai"
    ? ["Advanced Industrial AI", "Autonomous Systems", "Research in Manufacturing AI", "System Optimization", "Advanced Robotics"]
    : ["Advanced Industrial Analytics", "AI-Driven Optimization", "Digital Transformation", "Advanced Supply Chain", "Enterprise Systems"];

  const projects = interest === "ai"
    ? ["Research-Grade Manufacturing AI", "Autonomous Manufacturing System", "Advanced Robotic System"]
    : ["Enterprise Digital Platform", "AI-Driven Optimization System", "Complete Digital Transformation"];

  return {
    month,
    title: "Advanced ME Specialization",
    description: `Dive deep into ${interest === "ai" ? "cutting-edge manufacturing AI and autonomous systems" : "advanced industrial analytics and digital transformation"}. Prepare for senior ME roles.`,
    skills,
    projects,
    color: "rose",
    whatToLearn: interest === "ai"
      ? "Advanced industrial AI systems, autonomous manufacturing, research methodologies in manufacturing AI, system-level optimization, and advanced robotics control."
      : "Advanced industrial analytics, AI-driven process optimization, digital transformation strategies, advanced supply chain analytics, and enterprise-level manufacturing systems.",
    whyImportant: "Advanced ME + AI/data skills position you for senior roles in manufacturing companies, industrial automation, and Industry 4.0 initiatives.",
    howToLearn: "Take advanced manufacturing AI courses. Study research papers on Industry 4.0. Learn advanced robotics. Build research-grade projects. Network in manufacturing/automation industries.",
    expectedOutcome: interest === "ai"
      ? "You'll be working on cutting-edge manufacturing AI projects. You understand autonomous systems and can lead Industry 4.0 initiatives."
      : "You'll be building enterprise manufacturing platforms. You understand digital transformation and can drive analytics strategy for manufacturing companies.",
  };
}

function getMECareer(interest: string, targetYear: string, month: string) {
  return {
    month,
    title: "ME Career & Placement Preparation",
    description: `Prepare for ${targetYear === "4" ? "full-time ME roles" : "internships"} in manufacturing, automation, robotics, or industrial companies. Showcase your mechanical+tech skills.`,
    skills: ["Resume Building", "Technical Interviews", "Portfolio Development", "ME Project Showcase", "Industry Networking"],
    projects: ["Portfolio Website", "GitHub Showcase", "Project Demo Videos", "Resume Optimization"],
    color: "amber",
    whatToLearn: interest === "ai"
      ? "How to showcase manufacturing AI projects, prepare for ME+AI interviews, demonstrate mechanical+software integration skills, and network in manufacturing/automation industry."
      : "Creating a manufacturing analytics portfolio, preparing for ME+data interviews, showcasing industrial projects, and networking in manufacturing/industrial analytics industries.",
    whyImportant: "ME careers require demonstrating both mechanical knowledge and modern tech skills. Your portfolio should show complete industrial solutions, not just theoretical knowledge.",
    howToLearn: "Build a portfolio showcasing ME+tech projects. Create demo videos of your systems. Practice ME technical interviews. Network at manufacturing/automation conferences. Join ME professional groups.",
    expectedOutcome: interest === "ai"
      ? "You'll have a strong portfolio showing manufacturing AI projects, be interview-ready for ME+AI roles, and have industry connections in manufacturing/automation."
      : "You'll have an impressive manufacturing analytics portfolio, be ready for ME+data interviews, and have connections in industrial/manufacturing industries.",
  };
}

// Legacy helper functions (kept for compatibility but will be replaced)
function getFoundationSkills(discipline: string, interest: string, isBeginner: boolean): string[] {
  if (interest === "ai") {
    return isBeginner
      ? ["Python Basics", "NumPy & Pandas", "Basic Statistics", "Jupyter Notebooks"]
      : ["Python Advanced", "Data Structures", "OOP Concepts", "Git & GitHub"];
  } else if (interest === "web") {
    return isBeginner
      ? ["HTML & CSS", "JavaScript Basics", "Git Basics", "VS Code"]
      : ["JavaScript ES6+", "DOM Manipulation", "Responsive Design", "Chrome DevTools"];
  } else {
    return isBeginner
      ? ["Python Basics", "Excel/Sheets", "Basic Statistics", "Data Visualization"]
      : ["Python Advanced", "SQL Basics", "Pandas", "Matplotlib/Seaborn"];
  }
}

function getFoundationProjects(discipline: string, interest: string, isBeginner: boolean): string[] {
  if (interest === "ai") {
    return isBeginner
      ? ["Calculator App", "Number Guessing Game", "Simple Data Analysis"]
      : ["Weather App with API", "Todo List with Classes", "Data Cleaning Project"];
  } else if (interest === "web") {
    return isBeginner
      ? ["Personal Portfolio", "Landing Page", "Simple Form"]
      : ["Interactive Quiz App", "Weather Dashboard", "Todo App with LocalStorage"];
  } else {
    return isBeginner
      ? ["Sales Data Analysis", "Student Grade Tracker", "Simple Charts"]
      : ["Customer Analysis Dashboard", "Stock Price Tracker", "Survey Data Analysis"];
  }
}

function getCoreSkills(discipline: string, interest: string): string[] {
  if (interest === "ai") {
    return ["Machine Learning Basics", "Scikit-learn", "Data Preprocessing", "Model Evaluation"];
  } else if (interest === "web") {
    return ["React.js", "Node.js Basics", "REST APIs", "Database (MongoDB/PostgreSQL)"];
  } else {
    return ["Advanced Pandas", "SQL Queries", "Statistical Analysis", "Data Visualization Tools"];
  }
}

function getCoreProjects(discipline: string, interest: string): string[] {
  if (interest === "ai") {
    return ["Spam Email Classifier", "House Price Predictor", "Image Classification"];
  } else if (interest === "web") {
    return ["E-commerce Frontend", "Blog with CMS", "Social Media Clone"];
  } else {
    return ["Sales Forecasting", "Customer Segmentation", "A/B Testing Analysis"];
  }
}

function getSpecializationTitle(interest: string): string {
  if (interest === "ai") return "AI/ML Specialization";
  if (interest === "web") return "Fullstack Development";
  return "Data Science Deep Dive";
}

function getSpecializationDescription(interest: string, discipline: string, stage: string): string {
  if (interest === "ai") {
    return `Learn ${stage === "Beginner" ? "fundamental" : "advanced"} machine learning concepts. Understand how AI models work, train them, and deploy them. This is where you become an AI engineer.`;
  } else if (interest === "web") {
    return `Master ${stage === "Beginner" ? "core" : "advanced"} fullstack development. Build complete web applications from frontend to backend. Learn to deploy and scale.`;
  } else {
    return `Deep dive into ${stage === "Beginner" ? "essential" : "advanced"} data science techniques. Learn to extract insights from data and make data-driven decisions.`;
  }
}

function getSpecializationSkills(interest: string, discipline: string): string[] {
  if (interest === "ai") {
    return ["Deep Learning (TensorFlow/PyTorch)", "Neural Networks", "NLP Basics", "Computer Vision"];
  } else if (interest === "web") {
    return ["Next.js/React", "Express.js/Node.js", "Database Design", "Authentication & Security"];
  } else {
    return ["Machine Learning for Data", "Advanced SQL", "Time Series Analysis", "Business Intelligence"];
  }
}

function getSpecializationProjects(interest: string, discipline: string): string[] {
  if (interest === "ai") {
    return ["Chatbot with NLP", "Image Recognition App", "Sentiment Analysis Tool"];
  } else if (interest === "web") {
    return ["Fullstack Social App", "E-commerce Platform", "Real-time Chat App"];
  } else {
    return ["Predictive Analytics Dashboard", "Customer Churn Analysis", "Market Research Report"];
  }
}

function getProjectSkills(interest: string, discipline: string): string[] {
  if (interest === "ai") {
    return ["Model Deployment", "API Development", "Cloud Platforms (AWS/GCP)", "MLOps Basics"];
  } else if (interest === "web") {
    return ["DevOps Basics", "CI/CD", "Docker", "Cloud Deployment (Vercel/AWS)"];
  } else {
    return ["Dashboard Tools (Tableau/PowerBI)", "Cloud Analytics", "Automated Reporting", "Data Pipelines"];
  }
}

function getRealWorldProjects(interest: string, discipline: string): string[] {
  if (interest === "ai") {
    return ["AI-Powered Recommendation System", "Automated Content Moderation", "Smart Assistant Application"];
  } else if (interest === "web") {
    return ["Production-Ready SaaS App", "Open Source Contribution", "Client Project"];
  } else {
    return ["End-to-End Analytics Platform", "Business Intelligence Solution", "Data-Driven Product Feature"];
  }
}

function getAdvancedSkills(interest: string, discipline: string): string[] {
  if (interest === "ai") {
    return ["Advanced Neural Networks", "Transformer Models", "Reinforcement Learning", "Model Optimization"];
  } else if (interest === "web") {
    return ["Microservices Architecture", "System Design", "Performance Optimization", "Advanced Security"];
  } else {
    return ["Advanced ML Models", "Big Data Tools", "Statistical Modeling", "Advanced Visualization"];
  }
}

function getAdvancedProjects(interest: string, discipline: string): string[] {
  if (interest === "ai") {
    return ["Production ML System", "Research Project", "AI Startup MVP"];
  } else if (interest === "web") {
    return ["Scalable Web Platform", "Open Source Library", "Technical Blog/Content"];
  } else {
    return ["Advanced Analytics Platform", "Research Publication", "Data Product"];
  }
}

function getCareerSkills(interest: string): string[] {
  return [
    "Resume Building",
    "Technical Interviews",
    "Portfolio Development",
    "LinkedIn Optimization",
    "Networking",
  ];
}

function getWhatToLearn(discipline: string, interest: string, phase: string): string {
  const phaseMap: Record<string, Record<string, string>> = {
    foundations: {
      ai: "Python programming, basic statistics, data manipulation with NumPy/Pandas, and understanding how data works. Start with simple projects like building a calculator or analyzing a dataset.",
      web: "HTML structure, CSS styling, JavaScript fundamentals, and how websites work. Build your first portfolio page and a simple interactive website.",
      data: "Python basics, working with spreadsheets, basic statistics, and data visualization. Create your first data analysis project using real-world data.",
    },
    core: {
      ai: "Machine learning fundamentals: supervised learning, model training, evaluation metrics. Learn scikit-learn and build your first ML model that predicts something useful.",
      web: "React.js for building interactive UIs, Node.js for backend, databases for storing data, and connecting frontend to backend. Build a complete fullstack application.",
      data: "Advanced data manipulation, SQL for databases, statistical analysis, and creating meaningful visualizations. Analyze complex datasets and extract insights.",
    },
    specialization: {
      ai: "Deep learning with neural networks, natural language processing, computer vision. Build AI applications that can understand text, images, or make predictions.",
      web: "Advanced frameworks like Next.js, backend architecture, authentication systems, and deploying applications. Build production-ready web applications.",
      data: "Machine learning for data analysis, advanced SQL, time series forecasting, and business intelligence. Create data-driven solutions for real problems.",
    },
    projects: {
      ai: "Deploying AI models to production, building APIs, using cloud platforms, and making your AI accessible to others. Build an AI product people can actually use.",
      web: "DevOps practices, containerization with Docker, continuous deployment, and scaling applications. Deploy your apps so they're live on the internet.",
      data: "Building dashboards, automated reporting systems, data pipelines, and presenting insights to stakeholders. Create tools that help businesses make decisions.",
    },
    advanced: {
      ai: "Cutting-edge AI: transformer models, reinforcement learning, optimizing models for production. Work on advanced projects that push the boundaries.",
      web: "System design for large applications, microservices, performance optimization, and building scalable platforms. Architect systems that handle millions of users.",
      data: "Advanced machine learning models, big data tools, statistical modeling, and creating sophisticated analytics platforms. Build enterprise-level data solutions.",
    },
    career: {
      ai: "How to showcase your AI projects, prepare for technical interviews, build a strong portfolio, and network in the AI community. Get ready to land your dream job.",
      web: "Portfolio development, technical interview prep, contributing to open source, and building your professional brand. Position yourself as a skilled developer.",
      data: "Creating a data science portfolio, preparing case studies, networking with data professionals, and acing data science interviews. Launch your data career.",
    },
  };
  return phaseMap[phase]?.[interest] || "Relevant skills and knowledge for this phase.";
}

function getWhyImportant(discipline: string, interest: string, phase: string): string {
  const whyMap: Record<string, Record<string, string>> = {
    foundations: {
      ai: "Without strong fundamentals, you'll struggle with advanced AI concepts. This phase builds the foundation that everything else depends on. Think of it as learning to walk before you run.",
      web: "Every website uses HTML, CSS, and JavaScript. Mastering these basics means you can build anything on the web. Skip this, and you'll always feel lost.",
      data: "Data science is about understanding data first. If you can't manipulate and visualize data, you can't extract insights. This is your starting point.",
    },
    core: {
      ai: "This is where you transition from programming to AI. You'll learn how machines actually learn, which is the core skill of an AI engineer.",
      web: "Fullstack development means you can build complete applications. This makes you valuable because you can work on both frontend and backend.",
      data: "Core data science skills let you solve real business problems. Companies need people who can turn data into actionable insights.",
    },
    specialization: {
      ai: "Specialization makes you stand out. While others know basics, you'll know deep learning, NLP, or computer vision - skills that are in high demand.",
      web: "Specialized skills mean you can build complex, production-ready applications. This is what separates junior from senior developers.",
      data: "Specialization in data science means you can handle complex analytics, build ML models, and create data products that drive business value.",
    },
    projects: {
      ai: "Real projects prove you can build AI solutions, not just learn theory. Employers want to see what you've actually created.",
      web: "Deployed projects show you can build and ship applications. This is what gets you hired - proven ability to deliver.",
      data: "Real-world projects demonstrate you can solve business problems with data. This is your portfolio that speaks louder than a degree.",
    },
    advanced: {
      ai: "Advanced skills position you for senior roles and higher salaries. You become the person who solves complex AI challenges.",
      web: "Advanced knowledge means you can architect systems, lead teams, and solve complex technical problems. This is senior-level expertise.",
      data: "Advanced data science skills make you a strategic asset. You can lead data initiatives and drive business decisions with analytics.",
    },
    career: {
      ai: "Technical skills alone don't get you hired. You need to present yourself well, network, and demonstrate value. This phase ensures you get opportunities.",
      web: "The job market is competitive. Career prep ensures you stand out, ace interviews, and land the best opportunities in web development.",
      data: "Data science roles require both technical skills and business understanding. Career prep helps you communicate your value to employers.",
    },
  };
  return whyMap[phase]?.[interest] || "This phase is crucial for your career development.";
}

function getHowToLearn(discipline: string, interest: string, phase: string): string {
  const howMap: Record<string, Record<string, string>> = {
    foundations: {
      ai: "Start with free courses: Python on Codecademy or freeCodeCamp. Practice daily on platforms like LeetCode (easy problems). Build 2-3 small projects. Join Python communities on Discord/Reddit.",
      web: "freeCodeCamp's Responsive Web Design course is perfect. Build along with tutorials, then create your own variations. Use MDN Web Docs as reference. Practice on CodePen.",
      data: "Take 'Python for Everybody' on Coursera (free). Practice with Kaggle Learn's free courses. Work with real datasets from Kaggle. Join data science communities.",
    },
    core: {
      ai: "Take Andrew Ng's Machine Learning course on Coursera. Practice with scikit-learn tutorials. Build projects from Kaggle competitions. Read 'Hands-On Machine Learning' book.",
      web: "React documentation and 'React - The Complete Guide' on Udemy. Build projects from Frontend Mentor. Practice on CodeSandbox. Contribute to open source.",
      data: "Take 'Applied Data Science' courses on Coursera. Practice SQL on HackerRank. Build projects with real datasets. Read 'Python for Data Analysis' book.",
    },
    specialization: {
      ai: "Deep Learning Specialization on Coursera. Fast.ai's practical course. Build projects: chatbot, image classifier. Read research papers. Join AI communities like Hugging Face.",
      web: "Next.js documentation and tutorials. Build a fullstack project. Learn from production codebases on GitHub. Take advanced courses on Frontend Masters or Pluralsight.",
      data: "Advanced courses on Coursera/edX. Work on Kaggle competitions. Build a portfolio of 3-5 projects. Read 'The Art of Data Science' book. Network on LinkedIn.",
    },
    projects: {
      ai: "Deploy models on Hugging Face Spaces or Streamlit. Learn Docker basics. Build an API with FastAPI. Create a portfolio website showcasing projects. Write blog posts about your work.",
      web: "Deploy on Vercel/Netlify (free). Learn GitHub Actions for CI/CD. Build a SaaS project. Contribute to open source. Write technical blog posts.",
      data: "Create dashboards with Tableau Public (free) or Streamlit. Build a data blog. Share projects on GitHub. Write case studies. Present at data meetups.",
    },
    advanced: {
      ai: "Take advanced courses on DeepLearning.AI. Read research papers on arXiv. Build research projects. Contribute to open source AI libraries. Attend AI conferences/meetups.",
      web: "Study system design (Grokking the System Design Interview). Build scalable projects. Contribute to major open source projects. Write technical content. Mentor others.",
      data: "Advanced ML courses. Work on complex business problems. Publish analysis on Medium/LinkedIn. Build advanced dashboards. Network with senior data scientists.",
    },
    career: {
      ai: "Build a portfolio website. Write technical blog posts. Practice coding interviews on LeetCode. Prepare ML system design answers. Network on LinkedIn and Twitter. Apply to 10+ companies weekly.",
      web: "Create a stunning portfolio. Contribute to open source. Practice technical interviews. Build a strong GitHub profile. Network with developers. Apply strategically.",
      data: "Create a data science portfolio. Write case studies. Practice SQL and Python interviews. Build a LinkedIn presence. Network in data communities. Apply to data roles.",
    },
  };
  return howMap[phase]?.[interest] || "Follow structured courses, practice regularly, and build projects.";
}

function getExpectedOutcome(discipline: string, interest: string, phase: string): string {
  const outcomeMap: Record<string, Record<string, string>> = {
    foundations: {
      ai: "You'll be comfortable with Python, can manipulate data, and have built 2-3 small projects. You understand the basics of how programming works.",
      web: "You'll have a working portfolio website and can build simple interactive pages. You understand how websites are structured and styled.",
      data: "You'll be able to analyze simple datasets, create basic visualizations, and understand data structures. You've completed your first data project.",
    },
    core: {
      ai: "You'll have built your first ML model that makes predictions. You understand how machine learning works and can train models on your own.",
      web: "You'll have a complete fullstack application deployed. You can build both frontend and backend, and connect them together.",
      data: "You'll be able to analyze complex datasets, write SQL queries, and create meaningful visualizations. You can extract insights from data.",
    },
    specialization: {
      ai: "You'll have built AI applications like chatbots or image classifiers. You understand deep learning and can apply it to real problems.",
      web: "You'll have production-ready web applications. You can build complex features, handle authentication, and deploy scalable apps.",
      data: "You'll be creating advanced analytics, building ML models for data, and generating business insights. You're a skilled data scientist.",
    },
    projects: {
      ai: "You'll have AI projects live on the internet that people can use. You can deploy models and build AI products. Your portfolio is impressive.",
      web: "You'll have multiple deployed applications. You understand DevOps and can ship production code. You're ready for real-world work.",
      data: "You'll have dashboards and data products that solve business problems. You can present insights professionally. Your portfolio showcases your skills.",
    },
    advanced: {
      ai: "You'll be working on cutting-edge AI projects. You understand advanced concepts and can solve complex problems. You're ready for senior roles.",
      web: "You'll be architecting systems and building scalable platforms. You understand advanced concepts and can lead technical projects.",
      data: "You'll be creating enterprise-level data solutions. You can handle complex analytics and drive business strategy with data.",
    },
    career: {
      ai: "You'll have a strong portfolio, be interview-ready, and have connections in the AI community. You're prepared to land your dream AI job.",
      web: "You'll have an impressive portfolio, be ready for technical interviews, and have a network of developers. You're prepared for web development roles.",
      data: "You'll have a data science portfolio, case studies, and be interview-ready. You're prepared to launch your data science career.",
    },
  };
  return outcomeMap[phase]?.[interest] || "You'll have gained valuable skills and completed meaningful projects.";
}

// Branch-Aware Personalized Gap Analysis
function getGapAnalysis(discipline: string, interest: string, stage: string) {
  const isBeginner = stage === "Beginner";
  const isAdvanced = stage === "Advanced";
  const stageKey = isBeginner ? "beginner" : isAdvanced ? "advanced" : "intermediate";

  // Extract branch code from discipline string
  const branchCode = discipline.toLowerCase().includes("computer") ? "cse" 
    : discipline.toLowerCase().includes("electronics") ? "ece"
    : discipline.toLowerCase().includes("mechanical") ? "me"
    : "cse"; // Default fallback

  // Branch-specific strengths
  const branchStrengths: Record<string, Record<string, string[]>> = {
    cse: {
      beginner: ["Strong Programming Foundation", "Problem-Solving Skills", "CS Curriculum Knowledge"],
      intermediate: ["Core CS Concepts", "Algorithm Knowledge", "Software Development"],
      advanced: ["Advanced CS Knowledge", "System Design", "Technical Leadership"],
    },
    ece: {
      beginner: ["Hardware Knowledge", "Circuit Understanding", "Signal Processing Basics"],
      intermediate: ["Embedded Systems", "Hardware-Software Integration", "Electronics Expertise"],
      advanced: ["Advanced Electronics", "System Integration", "Hardware Design"],
    },
    me: {
      beginner: ["Mechanical Fundamentals", "CAD Skills", "Manufacturing Knowledge"],
      intermediate: ["Design Expertise", "Manufacturing Processes", "Mechanical Systems"],
      advanced: ["Advanced Design", "Industrial Systems", "Mechanical Engineering Leadership"],
    },
  };

  // Interest-specific strengths (combined with branch)
  const interestStrengths: Record<string, Record<string, string[]>> = {
    ai: {
      beginner: ["Curiosity for AI", "Willingness to Learn", "Mathematical Thinking"],
      intermediate: ["ML Knowledge", "Python Proficiency", "Data Analysis"],
      advanced: ["Deep Learning Expertise", "Production Experience", "Research Capability"],
    },
    web: {
      beginner: ["Creative Thinking", "User Focus", "Design Sense"],
      intermediate: ["Fullstack Skills", "Framework Knowledge", "Deployment Experience"],
      advanced: ["System Architecture", "Performance Optimization", "Technical Leadership"],
    },
    data: {
      beginner: ["Data Curiosity", "Analytical Mindset", "Attention to Detail"],
      intermediate: ["Statistical Knowledge", "SQL Proficiency", "Visualization Skills"],
      advanced: ["Advanced Analytics", "Business Acumen", "Strategic Thinking"],
    },
  };

  // Branch-specific risks
  const branchRisks: Record<string, Record<string, string[]>> = {
    cse: {
      beginner: ["Tutorial Dependency", "No Real Projects", "Theory vs Practice"],
      intermediate: ["Technology Churn", "Keeping Up with Trends", "Imposter Syndrome"],
      advanced: ["Staying Current", "Team Management", "Business Understanding"],
    },
    ece: {
      beginner: ["Hardware-Software Gap", "Limited Software Exposure", "Tool Overwhelm"],
      intermediate: ["Integration Challenges", "Keeping Up with Both Fields", "Career Direction"],
      advanced: ["Balancing Expertise", "Industry Specialization", "Technology Evolution"],
    },
    me: {
      beginner: ["Limited Tech Exposure", "Traditional ME Focus", "Software Learning Curve"],
      intermediate: ["Industry 4.0 Transition", "Tech Integration", "Career Pivot Challenges"],
      advanced: ["Digital Transformation", "Balancing ME + Tech", "Industry Evolution"],
    },
  };

  // Interest-specific risks
  const interestRisks: Record<string, Record<string, string[]>> = {
    ai: {
      beginner: ["Overwhelming Complexity", "Math Anxiety", "Lack of Projects"],
      intermediate: ["Theory vs Practice Gap", "Deployment Challenges", "Model Interpretability"],
      advanced: ["Research vs Industry Gap", "Ethical Considerations", "Keeping Up with Research"],
    },
    web: {
      beginner: ["Framework Overload", "Tutorial Dependency", "No Real Projects"],
      intermediate: ["Technology Churn", "Scalability Knowledge", "Security Awareness"],
      advanced: ["Staying Current", "Team Management", "Business Understanding"],
    },
    data: {
      beginner: ["Statistics Intimidation", "Tool Overwhelm", "No Domain Knowledge"],
      intermediate: ["Business Communication", "Advanced Techniques", "Real-World Application"],
      advanced: ["Strategic Impact", "Team Leadership", "Industry Trends"],
    },
  };

  // Branch-specific gaps
  const branchGaps: Record<string, Record<string, string[]>> = {
    cse: {
      beginner: ["Real-World Projects", "Industry Tools", "Practical Experience"],
      intermediate: ["System Design", "DevOps Practices", "Production Systems"],
      advanced: ["Architecture Patterns", "Team Leadership", "Business Strategy"],
    },
    ece: {
      beginner: ["Software Skills", "AI/Data Integration", "Programming Projects"],
      intermediate: ["Edge AI/Data", "Hardware-Software Integration", "IoT Platforms"],
      advanced: ["Advanced Integration", "Research Publications", "Industry Leadership"],
    },
    me: {
      beginner: ["Tech Skills", "Data/AI Applications", "Software Integration"],
      intermediate: ["Manufacturing AI/Data", "Industrial Platforms", "Digital Transformation"],
      advanced: ["Advanced Manufacturing Tech", "Research Publications", "Industry 4.0 Leadership"],
    },
  };

  // Interest-specific gaps
  const interestGaps: Record<string, Record<string, string[]>> = {
    ai: {
      beginner: ["ML Fundamentals", "Math Foundations", "Project Portfolio"],
      intermediate: ["Model Deployment", "MLOps Practices", "Production Systems"],
      advanced: ["Research Publications", "Advanced Architectures", "Industry Leadership"],
    },
    web: {
      beginner: ["Backend Development", "Database Knowledge", "Deployment Skills"],
      intermediate: ["System Design", "DevOps Practices", "Security Knowledge"],
      advanced: ["Architecture Patterns", "Team Leadership", "Business Strategy"],
    },
    data: {
      beginner: ["Statistical Methods", "SQL Mastery", "Business Context"],
      intermediate: ["Advanced ML", "Big Data Tools", "Communication Skills"],
      advanced: ["Strategic Analytics", "Team Building", "Industry Expertise"],
    },
  };

  // Branch-specific actions
  const branchActions: Record<string, Record<string, string[]>> = {
    cse: {
      beginner: ["Build Real Projects", "Join CS Communities", "Contribute to Open Source"],
      intermediate: ["Deploy Applications", "Build Portfolio", "Network with Developers"],
      advanced: ["Lead Projects", "Mentor Others", "Speak at Conferences"],
    },
    ece: {
      beginner: ["Build Hardware-Software Projects", "Join ECE+Tech Communities", "Learn Programming"],
      intermediate: ["Build IoT/AI Projects", "Create Portfolio", "Network in Electronics Industry"],
      advanced: ["Lead Embedded Projects", "Mentor ECE Students", "Publish Research"],
    },
    me: {
      beginner: ["Build ME+Tech Projects", "Join Manufacturing Tech Communities", "Learn Data/AI"],
      intermediate: ["Build Industrial Projects", "Create Portfolio", "Network in Manufacturing"],
      advanced: ["Lead Industry 4.0 Projects", "Mentor ME Students", "Publish Research"],
    },
  };

  // Combine branch and interest strengths/risks/gaps/actions
  const combinedStrengths = [
    ...(branchStrengths[branchCode]?.[stageKey] || []),
    ...(interestStrengths[interest]?.[stageKey] || []),
  ].slice(0, 3);

  const combinedRisks = [
    ...(branchRisks[branchCode]?.[stageKey] || []),
    ...(interestRisks[interest]?.[stageKey] || []),
  ].slice(0, 3);

  const combinedGaps = [
    ...(branchGaps[branchCode]?.[stageKey] || []),
    ...(interestGaps[interest]?.[stageKey] || []),
  ].slice(0, 3);

  const combinedActions = branchActions[branchCode]?.[stageKey] || ["Build Projects", "Network", "Learn Continuously"];

  return [
    {
      title: "Your Strengths",
      items: combinedStrengths.length > 0 ? combinedStrengths : ["Analytical Thinking", "Technical Foundation"],
      icon: ShieldCheck,
      color: "emerald",
    },
    {
      title: "Potential Risks",
      items: combinedRisks.length > 0 ? combinedRisks : ["Skill Gaps", "Market Changes"],
      icon: AlertTriangle,
      color: "rose",
    },
    {
      title: "Skill Gaps to Address",
      items: combinedGaps.length > 0 ? combinedGaps : ["Advanced Concepts", "Real-World Experience"],
      icon: Target,
      color: "orange",
    },
    {
      title: "Immediate Actions",
      items: combinedActions,
      icon: Zap,
      color: "cyan",
    },
  ];
}

export default function AICareerRoadmap() {
  const [mounted, setMounted] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [targetYear, setTargetYear] = useState<string>("");
  const [discipline, setDiscipline] = useState<string>("");
  const [interest, setInterest] = useState<string>("");
  const [roadmapData, setRoadmapData] = useState<any>(null);

  // Get available interests for selected branch
  const availableInterests = discipline ? getBranchInterests(discipline) : [];

  useEffect(() => {
    setMounted(true);
  }, []);

  // Reset interest when branch changes
  useEffect(() => {
    if (discipline && availableInterests.length > 0) {
      setInterest(availableInterests[0].value);
    } else {
      setInterest("");
    }
  }, [discipline]);

  const handleGenerate = () => {
    if (!targetYear || !discipline || !interest) {
      alert("Please fill in all fields to generate your personalized roadmap.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const personalizedRoadmap = generatePersonalizedRoadmap(
        targetYear,
        discipline,
        interest
      );
      setRoadmapData(personalizedRoadmap);
      setIsGenerated(true);
      setLoading(false);
    }, 1500);
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#050508] text-white selection:bg-cyan-500/30 relative overflow-hidden font-sans">
      {/* Cinematic Background Elements */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        <div className="absolute top-0 left-0 w-full h-full bg-linear-to-b from-cyan-500/5 via-transparent to-transparent pointer-events-none" />
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full" />
        <div className="absolute top-1/2 -right-24 w-96 h-96 bg-purple-500/10 blur-[120px] rounded-full" />
        <Particles />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 border-b border-white/5 bg-black/20 backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-cyan-500/10 group-hover:border-cyan-500/20 transition-all duration-500">
              <ArrowLeft className="w-5 h-5 text-white/40 group-hover:text-cyan-400" />
            </div>
            <span className="text-sm font-bold tracking-widest uppercase text-white/40 group-hover:text-white transition-colors">
              Terminal
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
              <span className="text-[10px] font-black text-cyan-400 tracking-[0.2em] uppercase">
                Neural Core v4.0
              </span>
            </div>
          </div>
        </div>
      </nav>

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12 lg:py-20">
        {/* Header Section */}
        <div className="mb-20 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">
              Autonomous Pathfinding
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl lg:text-7xl font-black tracking-tighter"
          >
            AI Career <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-teal-400 to-purple-500">
              Roadmap.
            </span>
          </motion.h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* LEFT: Form Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-4"
          >
            <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-4xl p-8 relative overflow-hidden group shadow-2xl">
              <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-cyan-500/50 to-transparent" />

              <div className="space-y-8">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold tracking-tight flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
                      <Target className="w-4 h-4 text-cyan-400" />
                    </div>
                    Parameters
                  </h3>
                  <p className="text-sm text-white/40 leading-relaxed font-medium">
                    Configure your neural profile to generate a precision
                    roadmap.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black text-white/20 uppercase tracking-widest pl-1">
                      Current Year / Stage
                    </Label>
                    <Select value={targetYear} onValueChange={setTargetYear}>
                      <SelectTrigger className="h-14 bg-white/[0.02] border-white/5 rounded-2xl focus:ring-cyan-500/20 hover:bg-white/[0.04] transition-all">
                        <SelectValue placeholder="Select your year" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-white/10 text-black">
                        <SelectItem
                          className="text-black focus:bg-gray-100 focus:text-black"
                          value="1"
                        >
                          1st Year (Beginner)
                        </SelectItem>
                        <SelectItem
                          className="text-black focus:bg-gray-100 focus:text-black"
                          value="2"
                        >
                          2nd Year (Beginner+)
                        </SelectItem>
                        <SelectItem
                          className="text-black focus:bg-gray-100 focus:text-black"
                          value="3"
                        >
                          3rd Year (Intermediate)
                        </SelectItem>
                        <SelectItem
                          className="text-black focus:bg-gray-100 focus:text-black"
                          value="4"
                        >
                          4th Year (Advanced)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[10px] font-black text-white/20 uppercase tracking-widest pl-1">
                      Your Branch / Discipline
                    </Label>
                    <Select value={discipline} onValueChange={setDiscipline}>
                      <SelectTrigger className="h-14 bg-white/[0.02] border-white/5 rounded-2xl focus:ring-cyan-500/20 hover:bg-white/[0.04] transition-all">
                        <SelectValue placeholder="Select your branch" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-white/10 text-black max-h-[400px]">
                        <div className="px-2 py-1.5 text-xs font-bold text-gray-500 uppercase">Engineering</div>
                        {Object.entries(BRANCH_DEFINITIONS)
                          .filter(([_, def]) => def.category === "engineering")
                          .map(([key, def]) => (
                            <SelectItem
                              key={key}
                              className="text-black focus:bg-gray-100 focus:text-black"
                              value={key}
                            >
                              {def.name}
                            </SelectItem>
                          ))}
                        <div className="px-2 py-1.5 text-xs font-bold text-gray-500 uppercase mt-2">Non-Engineering</div>
                        {Object.entries(BRANCH_DEFINITIONS)
                          .filter(([_, def]) => def.category === "non-engineering")
                          .map(([key, def]) => (
                            <SelectItem
                              key={key}
                              className="text-black focus:bg-gray-100 focus:text-black"
                              value={key}
                            >
                              {def.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[10px] font-black text-white/20 uppercase tracking-widest pl-1">
                      Career Interest / Focus
                    </Label>
                    <Select 
                      value={interest} 
                      onValueChange={setInterest}
                      disabled={!discipline || availableInterests.length === 0}
                    >
                      <SelectTrigger className="h-14 bg-white/[0.02] border-white/5 rounded-2xl focus:ring-cyan-500/20 hover:bg-white/[0.04] transition-all disabled:opacity-50">
                        <SelectValue placeholder={discipline ? "Select interest" : "Select branch first"} />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-white/10 text-black">
                        {availableInterests.map((int) => (
                          <SelectItem
                            key={int.value}
                            className="text-black focus:bg-gray-100 focus:text-black"
                            value={int.value}
                          >
                            <div>
                              <div className="font-medium">{int.label}</div>
                              <div className="text-xs text-gray-500">{int.description}</div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {discipline && availableInterests.length > 0 && (
                      <p className="text-xs text-white/40 mt-1">
                        {availableInterests.length} interest{availableInterests.length > 1 ? "s" : ""} available for {BRANCH_DEFINITIONS[discipline]?.name}
                      </p>
                    )}
                  </div>

                  <Button
                    onClick={handleGenerate}
                    disabled={loading}
                    className="w-full h-16 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-black font-black text-xs tracking-[0.3em] uppercase transition-all shadow-[0_20px_40px_rgba(6,182,212,0.3)] hover:shadow-cyan-400/50 group relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    {loading ? (
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                        Analyzing...
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <Zap className="w-4 h-4 fill-current" />
                        Initiate Sequence
                      </div>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: Roadmap Output */}
          <div className="lg:col-span-8 relative">
            <AnimatePresence mode="wait">
              {!isGenerated && !loading ? (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full min-h-[500px] flex flex-col items-center justify-center text-center space-y-6 border-2 border-dashed border-white/5 rounded-[40px] bg-white/[0.01]"
                >
                  <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center animate-pulse">
                    <Brain className="w-10 h-10 text-white/20" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-xl font-bold text-white/40 tracking-tight">
                      System Idle
                    </p>
                    <p className="text-sm text-white/20">
                      Waiting for parameter sync...
                    </p>
                  </div>
                </motion.div>
              ) : isGenerated ? (
                <motion.div
                  key="roadmap"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-12"
                >
                  {/* Timeline Header */}
                  <div className="flex items-center justify-between px-4">
                    <h3 className="text-2xl font-black tracking-tight flex items-center gap-4">
                      <MapPin className="w-6 h-6 text-cyan-400" />
                      Active Trajectory
                    </h3>
                    <div className="flex items-center gap-4">
                      <Badge className="bg-cyan-500/10 text-cyan-400 border-cyan-500/20 px-4 py-1.5 text-[9px] font-black tracking-widest uppercase">
                        {roadmapData?.steps.length || 0} Phases Generated
                      </Badge>
                    </div>
                  </div>

                  {/* Personalized Roadmap Header */}
                  <div className="mb-8 p-6 bg-white/[0.02] border border-white/10 rounded-2xl">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                        <Target className="w-6 h-6 text-cyan-400" />
                      </div>
                      <div>
                        <h4 className="text-lg font-black text-white">
                          Your Personalized Roadmap
                        </h4>
                        <p className="text-sm text-white/60">
                          {roadmapData?.stage} • {roadmapData?.discipline} • {roadmapData?.interest}
                        </p>
                      </div>
                    </div>
                    {roadmapData?.isTransitionPath && roadmapData?.transitionNote && (
                      <div className="mb-4 p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                        <div className="flex items-start gap-3">
                          <AlertCircle className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-sm font-bold text-amber-400 mb-1">Interest Adaptation Notice</p>
                            <p className="text-xs text-white/80 leading-relaxed">{roadmapData.transitionNote}</p>
                          </div>
                        </div>
                      </div>
                    )}
                    <p className="text-sm text-white/80 leading-relaxed">
                      This roadmap is customized specifically for <strong>{roadmapData?.discipline}</strong> students. Each phase respects your branch knowledge and builds upon it, taking you from where you are now to where you want to be in your field.
                    </p>
                  </div>

                  {/* Vertical Roadmap */}
                  <div className="relative pl-12 space-y-12">
                    {/* Glowing Timeline Line */}
                    <div className="absolute left-[23px] top-0 bottom-0 w-[2px] bg-linear-to-b from-cyan-500 via-purple-500 to-transparent shadow-[0_0_15px_rgba(6,182,212,0.5)]" />

                    {roadmapData?.steps.map((step: any, i: number) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.2 }}
                        className="relative"
                      >
                        {/* Dot */}
                        <div className="absolute -left-[54px] top-0 w-11 h-11 flex items-center justify-center">
                          <div
                            className={`w-4 h-4 rounded-full bg-[#050508] border-2 border-${step.color === "cyan" ? "cyan" : step.color === "purple" ? "purple" : "emerald"}-400 shadow-[0_0_15px_rgba(6,182,212,0.5)] z-10 relative`}
                          >
                            <motion.div
                              animate={{
                                scale: [1, 1.5, 1],
                                opacity: [0.5, 1, 0.5],
                              }}
                              transition={{ repeat: Infinity, duration: 2 }}
                              className={`absolute inset-0 rounded-full bg-${step.color === "cyan" ? "cyan" : step.color === "purple" ? "purple" : "emerald"}-400/50`}
                            />
                          </div>
                        </div>

                        {/* Card */}
                        <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-4xl p-8 hover:bg-white/[0.05] transition-all duration-500 group relative overflow-hidden">
                          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 relative z-10">
                            <div className="space-y-4 flex-1">
                              <div className="flex items-center gap-4">
                                <span
                                  className={`text-[10px] font-black uppercase tracking-widest text-${step.color === "cyan" ? "cyan" : step.color === "purple" ? "purple" : "emerald"}-400`}
                                >
                                  {step.month}
                                </span>
                                <h4 className="text-xl font-black tracking-tight">
                                  {step.title}
                                </h4>
                              </div>
                              <p className="text-sm text-white/40 leading-relaxed font-medium">
                                {step.description}
                              </p>

                              {/* Detailed Learning Guide */}
                              <div className="mt-6 space-y-4 p-4 bg-white/[0.02] rounded-xl border border-white/5">
                                <div className="space-y-3">
                                  <div>
                                    <div className="flex items-center gap-2 mb-2">
                                      <BookOpen className="w-4 h-4 text-cyan-400" />
                                      <span className="text-xs font-black text-white/80 uppercase tracking-wider">What to Learn</span>
                                    </div>
                                    <p className="text-xs text-white/70 leading-relaxed">{step.whatToLearn}</p>
                                  </div>
                                  <div>
                                    <div className="flex items-center gap-2 mb-2">
                                      <Lightbulb className="w-4 h-4 text-amber-400" />
                                      <span className="text-xs font-black text-white/80 uppercase tracking-wider">Why This Matters</span>
                                    </div>
                                    <p className="text-xs text-white/70 leading-relaxed">{step.whyImportant}</p>
                                  </div>
                                  <div>
                                    <div className="flex items-center gap-2 mb-2">
                                      <Rocket className="w-4 h-4 text-purple-400" />
                                      <span className="text-xs font-black text-white/80 uppercase tracking-wider">How to Learn</span>
                                    </div>
                                    <p className="text-xs text-white/70 leading-relaxed">{step.howToLearn}</p>
                                  </div>
                                  <div>
                                    <div className="flex items-center gap-2 mb-2">
                                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                                      <span className="text-xs font-black text-white/80 uppercase tracking-wider">Expected Outcome</span>
                                    </div>
                                    <p className="text-xs text-white/70 leading-relaxed">{step.expectedOutcome}</p>
                                  </div>
                                </div>
                              </div>

                              <div className="flex flex-wrap gap-2 mt-4">
                                {step.skills.map((skill: string, si: number) => (
                                  <span
                                    key={si}
                                    className="text-[10px] font-bold px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/60"
                                  >
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>

                            <div className="md:w-48 space-y-4">
                              <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.3em]">
                                Project Milestones
                              </p>
                              <div className="space-y-2">
                                {step.projects.map((proj: string, pi: number) => (
                                  <div
                                    key={pi}
                                    className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5 group-hover:border-white/10 transition-all"
                                  >
                                    <div
                                      className={`w-1.5 h-1.5 rounded-full bg-${step.color === "cyan" ? "cyan" : step.color === "purple" ? "purple" : "emerald"}-500`}
                                    />
                                    <span className="text-[11px] font-bold text-white/60">
                                      {proj}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>

        {/* SECTION: Career Risk & Gap Analyzer */}
        <AnimatePresence>
          {isGenerated && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-32 space-y-12"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center border border-orange-500/20">
                  <AlertCircle className="w-6 h-6 text-orange-400" />
                </div>
                <div>
                  <h3 className="text-3xl font-black tracking-tighter">
                    Gap Analysis
                  </h3>
                  <p className="text-sm text-white/40 font-medium">
                    Personalized analysis for {roadmapData?.stage} level in {roadmapData?.interest}. Based on your current stage and goals.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {getGapAnalysis(roadmapData?.discipline || "", roadmapData?.interest || "", roadmapData?.stage || "").map((card, i) => (
                  <div
                    key={i}
                    className="group relative bg-white/[0.02] backdrop-blur-2xl border border-white/10 rounded-4xl p-8 hover:bg-white/[0.04] transition-all duration-700 overflow-hidden"
                  >
                    <motion.div
                      animate={{ opacity: [0.1, 0.3, 0.1] }}
                      transition={{ repeat: Infinity, duration: 4 }}
                      className={`absolute -top-10 -right-10 w-32 h-32 bg-${card.color}-500/20 blur-[60px] rounded-full`}
                    />

                    <div className="relative z-10 space-y-6">
                      <div
                        className={`w-12 h-12 rounded-2xl bg-${card.color}-500/10 flex items-center justify-center border border-${card.color}-500/20 group-hover:rotate-[12deg] transition-all`}
                      >
                        <card.icon
                          className={`w-6 h-6 text-${card.color}-400`}
                        />
                      </div>
                      <h4
                        className={`text-xl font-black tracking-tight text-${card.color}-400`}
                      >
                        {card.title}
                      </h4>
                      <div className="space-y-3">
                        {card.items.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                            {card.title === "Direct Actions" ? (
                              <CheckCircle className="w-3.5 h-3.5 text-cyan-400" />
                            ) : (
                              <div
                                className={`w-1.5 h-1.5 rounded-full bg-${card.color}-500/40`}
                              />
                            )}
                            <span className="text-[11px] font-bold text-white/50">
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Warnings / Pulsing Alert Card */}
              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 0px rgba(244,63,94,0)",
                    "0 0 40px rgba(244,63,94,0.1)",
                    "0 0 0px rgba(244,63,94,0)",
                  ],
                }}
                transition={{ repeat: Infinity, duration: 4 }}
                className="bg-rose-500/5 backdrop-blur-xl border border-rose-500/20 rounded-[40px] p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-rose-500/50" />
                <div className="flex items-center gap-8 relative z-10 text-center md:text-left">
                  <div className="w-20 h-20 rounded-[28px] bg-rose-500/10 border border-rose-500/20 flex items-center justify-center shrink-0">
                    <TrendingUp className="w-10 h-10 text-rose-400 rotate-180" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black tracking-tight text-white">
                      {roadmapData?.stage === "Beginner" 
                        ? "Start Building Your Foundation Now" 
                        : roadmapData?.stage === "Advanced"
                        ? "Time to Specialize and Lead"
                        : "Accelerate Your Growth"}
                    </h3>
                    <p className="text-sm text-white/40 font-medium max-w-lg">
                      {roadmapData?.stage === "Beginner"
                        ? `As a ${roadmapData?.stage.toLowerCase()} in ${roadmapData?.interest}, starting early gives you a huge advantage. Follow this roadmap consistently to build a strong foundation.`
                        : roadmapData?.stage === "Advanced"
                        ? `You're at an advanced stage. Focus on specialization, leadership, and building impactful projects. This roadmap will help you reach senior-level expertise.`
                        : `You're at an intermediate level. This is the perfect time to deepen your skills and build real-world projects. Follow this roadmap to accelerate your career.`}
                    </p>
                  </div>
                </div>
                <Button 
                  onClick={() => {
                    // Resolve conflict - could navigate to a resolution page or show modal
                    console.log("Resolve conflict clicked");
                    alert("Conflict resolution would be initiated here. This would update your roadmap.");
                  }}
                  className="h-16 px-10 rounded-2xl bg-rose-500 hover:bg-rose-400 text-white font-black text-xs tracking-widest uppercase transition-all shadow-[0_20px_40px_rgba(244,63,94,0.3)]"
                >
                  Start Your Journey
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="relative z-10 max-w-7xl mx-auto px-6 py-12 border-t border-white/5 text-center">
        <p className="text-[10px] font-black text-white/10 uppercase tracking-[0.5em]">
          Neural Pathfinding Engine • v4.0.2 Stable Build
        </p>
      </footer>
    </div>
  );
}



