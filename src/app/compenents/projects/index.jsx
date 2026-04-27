"use client"
import { useRef, useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Canvas } from '@react-three/fiber';
import { ProTable } from '../models/ProTable';
import { projectsData } from "@/app/data";

// ─── Data ────────────────────────────────────────────────────────────────────
const projects = projectsData;

const stats = [
  { value: "15+", label: "Projects Completed" },
  { value: "6+", label: "Years Experience" },
  { value: "15+", label: "Happy Clients" },
];

// ─── 3D Tilt Card ─────────────────────────────────────────────────────────────
function TiltCard({ project, offset, onClick }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [shine, setShine] = useState({ x: 50, y: 50 });

  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    const rotateY = (mouseX / (rect.width / 2)) * 15;
    const rotateX = -(mouseY / (rect.height / 2)) * 15;
    const shineX = ((e.clientX - rect.left) / rect.width) * 100;
    const shineY = ((e.clientY - rect.top) / rect.height) * 100;
    setTilt({ x: rotateX, y: rotateY });
    setShine({ x: shineX, y: shineY });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
    setShine({ x: 50, y: 50 });
  }, []);

  const isActive = offset === 0;

  return (
    <motion.div
      onClick={onClick}
      initial={false}
      animate={{ 
        x: offset * 340, 
        y: Math.abs(offset) * -40, 
        scale: isActive ? 1 : 0.85,
        rotateY: offset * -20,
        zIndex: 50 - Math.abs(offset),
        opacity: Math.abs(offset) <= 1 ? 1 : 0,
        pointerEvents: Math.abs(offset) <= 1 ? "auto" : "none"
      }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="absolute top-0 left-0 w-full"
      style={{ perspective: "1200px" }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="relative cursor-pointer"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${isHovered ? 1.04 : 1})`,
          transition: isHovered ? "transform 0.1s ease" : "transform 0.6s cubic-bezier(0.22,1,0.36,1)",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Outer glow border */}
        <div
          className={`absolute -inset-[2px] rounded-2xl bg-gradient-to-b ${project.borderColor} opacity-80`}
          style={{
            filter: isHovered ? `drop-shadow(0 0 20px ${project.glowColor})` : "none",
            transition: "filter 0.4s ease",
          }}
        />

        {/* Card body */}
        <div
          className="relative rounded-2xl overflow-hidden"
          style={{
            background: "linear-gradient(160deg, rgba(15,5,40,0.97) 0%, rgba(8,3,28,0.99) 100%)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {/* Shine overlay */}
          <div
            className="absolute inset-0 pointer-events-none z-20 rounded-2xl"
            style={{
              background: `radial-gradient(circle at ${shine.x}% ${shine.y}%, rgba(255,255,255,0.12) 0%, transparent 60%)`,
              opacity: isHovered ? 1 : 0,
              transition: "opacity 0.3s ease",
            }}
          />

          {/* Badge */}
          {project.badge && (
            <div className="absolute top-3 right-3 z-30">
              <span
                className={`px-3 py-1 text-xs font-black text-white rounded-md bg-gradient-to-r ${project.badgeColor} shadow-lg`}
              >
                {project.badge}
              </span>
            </div>
          )}

          {/* Image area */}
          <div className="relative overflow-hidden" style={{ height: "200px" }}>
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
              style={{
                transform: isHovered ? "scale(1.08)" : "scale(1)",
                transition: "transform 0.6s ease",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            {isHovered && (
              <div
                className="absolute inset-x-0 h-[2px] pointer-events-none scan-line"
                style={{
                  background: `linear-gradient(90deg, transparent, ${project.glowColor}, transparent)`,
                  top: 0,
                }}
              />
            )}
          </div>

          {/* Content */}
          <div className="p-5 space-y-4">
            <h3
              className="text-xl font-black text-white leading-tight"
              style={{
                textShadow: isHovered ? `0 0 20px ${project.glowColor}` : "none",
                transition: "text-shadow 0.3s ease",
              }}
            >
              {project.title}
            </h3>

            <p
              className="text-sm font-semibold"
              style={{ color: project.glowColor.replace("0.6", "1") }}
            >
              {project.subtitle}
            </p>

            <div className="flex items-center justify-between gap-3">
              <div
                className="flex items-center gap-2 px-3 py-2 rounded-lg w-fit"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: `1px solid ${project.glowColor.replace("0.6", "0.3")}`,
                }}
              >
                <span className="text-white text-xs font-bold">{project.techIcon}</span>
                <span className="text-gray-300 text-xs font-semibold">{project.tech}</span>
              </div>
              {project.date && (
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                  {new Date(project.date).toDateString()}
                </p>
              )}
            </div>

            <button
              className="w-full py-3 rounded-xl font-black text-sm text-white relative overflow-hidden transition-all duration-300"
              style={{
                background: isHovered
                  ? `linear-gradient(135deg, ${project.glowColor.replace("0.6", "0.4")}, ${project.glowColor.replace("0.6", "0.2")})`
                  : "rgba(255,255,255,0.07)",
                border: `1px solid ${project.glowColor.replace("0.6", "0.4")}`,
                boxShadow: isHovered ? `0 0 20px ${project.glowColor.replace("0.6", "0.3")}` : "none",
              }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                View Project
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom shadow/glow */}
      <div
        className="absolute -bottom-6 left-1/2 w-3/4 h-8 rounded-full blur-xl"
        style={{
          background: project.glowColor,
          transform: `translateX(-50%) scaleX(${isHovered ? 1.1 : 0.8})`,
          transition: "transform 0.4s ease, opacity 0.4s ease",
          opacity: isHovered ? 0.8 : 0.4,
        }}
      />
    </motion.div>
  );
}

// ─── Stat Counter ─────────────────────────────────────────────────────────────
function StatCounter({ value, label, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.8 + index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="text-center px-8"
    >
      <div
        className="text-4xl md:text-5xl font-black text-white mb-1"
        style={{ textShadow: "0 0 30px rgba(139,92,246,0.8)" }}
      >
        {value}
      </div>
      <div className="text-gray-400 text-sm font-semibold tracking-wide">{label}</div>
    </motion.div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [currentIndex, setCurrentIndex] = useState(0);
  const searchParams = useSearchParams();

  useEffect(() => {
    try {
      const target = searchParams.get("target");
      if (target) {
        const idx = projects.findIndex((p) => p.id.toString() === target.toString());
        if (idx >= 0) {
          setCurrentIndex(idx);
        }
      }
    } catch (e) {
      // ignore
    }
  }, [searchParams]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  }, []);

  useEffect(() => {
    const handleMouse = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <div
      className="relative min-h-[100svh] w-full overflow-hidden z-0"
     
    >
      {/* Hero Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/images/hero-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center top",
          opacity: 0.35,
          transform: `translate(${mousePos.x * -8}px, ${mousePos.y * -8}px) scale(1.05)`,
          transition: "transform 0.3s ease",
        }}
      />

      {/* Dark overlay gradient */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(88,28,135,0.3) 0%, transparent 60%), radial-gradient(ellipse at 0% 50%, rgba(30,58,138,0.2) 0%, transparent 50%), radial-gradient(ellipse at 100% 50%, rgba(126,34,206,0.2) 0%, transparent 50%), linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.6) 80%, rgba(0,0,0,0.85) 100%)",
        }}
      />

      {/* Grid overlay */}
      <div className="absolute inset-0 z-0 hex-grid" style={{ opacity: 0.4 }} />

      {/* ── Floating decorative elements ── */}
      {/* Top-left asteroids */}
      <div className="absolute top-16 left-4 z-10 float-slow opacity-70" style={{ animationDelay: "0s" }}>
        <div className="w-16 h-12 rounded-lg" style={{ background: "linear-gradient(135deg, #4a3728 0%, #2d1f15 100%)", boxShadow: "inset -3px -3px 8px rgba(0,0,0,0.5)" }} />
      </div>
      <div className="absolute top-8 left-20 z-10 float opacity-60" style={{ animationDelay: "1.5s" }}>
        <div className="w-10 h-8 rounded-md" style={{ background: "linear-gradient(135deg, #5a4535 0%, #3d2c1e 100%)" }} />
      </div>
      <div className="absolute top-32 left-10 z-10 float-reverse opacity-50" style={{ animationDelay: "0.8s" }}>
        <div className="w-8 h-6 rounded" style={{ background: "linear-gradient(135deg, #4a3728 0%, #2d1f15 100%)" }} />
      </div>

      {/* Top-right asteroids */}
      <div className="absolute top-12 right-8 z-10 float-reverse opacity-70" style={{ animationDelay: "0.5s" }}>
        <div className="w-20 h-14 rounded-xl" style={{ background: "linear-gradient(135deg, #4a3728 0%, #2d1f15 100%)", boxShadow: "inset -4px -4px 10px rgba(0,0,0,0.6)" }} />
      </div>
      <div className="absolute top-4 right-28 z-10 float-slow opacity-50" style={{ animationDelay: "2s" }}>
        <div className="w-12 h-9 rounded-lg" style={{ background: "linear-gradient(135deg, #5a4535 0%, #3d2c1e 100%)" }} />
      </div>

      {/* Left side decorations */}
      <div className="absolute top-1/3 left-6 z-10 float" style={{ animationDelay: "1s" }}>
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center"
          style={{ background: "rgba(139,92,246,0.15)", border: "1px solid rgba(139,92,246,0.4)", boxShadow: "0 0 20px rgba(139,92,246,0.3)" }}
        >
          <span className="text-2xl">🥽</span>
        </div>
      </div>

      <div className="absolute bottom-1/3 left-4 z-10 float-reverse" style={{ animationDelay: "0.7s" }}>
        <div
          className="w-16 h-12 rounded-xl flex items-center justify-center"
          style={{ background: "rgba(59,7,100,0.4)", border: "1px solid rgba(168,85,247,0.4)", boxShadow: "0 0 15px rgba(168,85,247,0.2)" }}
        >
          <span className="text-2xl">🎮</span>
        </div>
      </div>

      <div className="absolute top-2/3 left-10 z-10 float-slow" style={{ animationDelay: "1.2s" }}>
        <div
          className="w-12 h-12 rounded-lg flex items-center justify-center"
          style={{ background: "rgba(30,58,138,0.3)", border: "1px solid rgba(96,165,250,0.4)", boxShadow: "0 0 15px rgba(96,165,250,0.2)" }}
        >
          <span className="text-xl">🖥️</span>
        </div>
      </div>

      {/* Neon monitor outline */}
      <div className="absolute top-1/2 left-8 z-10 float" style={{ animationDelay: "2.5s" }}>
        <div
          className="w-10 h-10 rounded-lg"
          style={{ background: "transparent", border: "2px solid rgba(139,92,246,0.7)", boxShadow: "0 0 15px rgba(139,92,246,0.5), inset 0 0 15px rgba(139,92,246,0.1)" }}
        />
      </div>

      {/* Right side decorations */}
      {/* Planet with ring */}
      <div className="absolute top-1/2 right-4 z-10 float" style={{ animationDelay: "0.3s" }}>
        <div className="relative w-16 h-16 flex items-center justify-center">
          <div
            className="w-14 h-14 rounded-full"
            style={{
              background: "radial-gradient(circle at 35% 35%, #1e3a8a, #0f172a)",
              boxShadow: "0 0 25px rgba(6,182,212,0.5), inset -3px -3px 8px rgba(0,0,0,0.5)",
            }}
          />
          <div
            className="absolute"
            style={{
              width: "90px",
              height: "16px",
              border: "3px solid rgba(251,191,36,0.7)",
              borderRadius: "50%",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%) rotateX(70deg)",
              boxShadow: "0 0 10px rgba(251,191,36,0.4)",
            }}
          />
        </div>
      </div>

      {/* Neon diamond */}
      <div className="absolute top-1/3 right-16 z-10 float-reverse" style={{ animationDelay: "1.8s" }}>
        <div
          className="w-8 h-8 rotate-45"
          style={{ background: "linear-gradient(135deg, #ec4899, #8b5cf6)", boxShadow: "0 0 20px rgba(236,72,153,0.6)" }}
        />
      </div>

      {/* Crosshair/target */}
      <div className="absolute top-1/4 right-10 z-10 twinkle" style={{ animationDelay: "0.5s" }}>
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
          <circle cx="15" cy="15" r="10" stroke="rgba(168,85,247,0.8)" strokeWidth="1" />
          <line x1="15" y1="0" x2="15" y2="30" stroke="rgba(168,85,247,0.6)" strokeWidth="1" />
          <line x1="0" y1="15" x2="30" y2="15" stroke="rgba(168,85,247,0.6)" strokeWidth="1" />
          <circle cx="15" cy="15" r="3" fill="rgba(168,85,247,0.8)" />
        </svg>
      </div>

      {/* Trophy */}
      <div className="absolute bottom-1/3 right-6 z-10 float" style={{ animationDelay: "0.9s" }}>
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center"
          style={{ background: "rgba(120,53,15,0.3)", border: "1px solid rgba(251,191,36,0.5)", boxShadow: "0 0 20px rgba(251,191,36,0.3)" }}
        >
          <span className="text-2xl">🏆</span>
        </div>
      </div>

      {/* Orange gem/crystal */}
      <div className="absolute bottom-48 right-20 z-10 float-slow" style={{ animationDelay: "0.4s" }}>
        <div
          className="w-9 h-9"
          style={{
            background: "linear-gradient(135deg, #f97316, #dc2626)",
            clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
            boxShadow: "0 0 25px rgba(249,115,22,0.8)",
          }}
        />
      </div>

      {/* Cyan cube */}
      <div className="absolute bottom-44 left-1/4 z-10 drift" style={{ animationDelay: "0.6s" }}>
        <div
          className="w-10 h-10 rounded-lg"
          style={{
            background: "linear-gradient(135deg, rgba(6,182,212,0.6), rgba(6,182,212,0.2))",
            border: "1px solid rgba(6,182,212,0.6)",
            boxShadow: "0 0 20px rgba(6,182,212,0.5)",
            transform: "rotate(20deg)",
          }}
        />
      </div>

      {/* Purple cube */}
      <div className="absolute bottom-40 right-1/4 z-10 drift" style={{ animationDelay: "1.3s" }}>
        <div
          className="w-8 h-8 rounded-md"
          style={{
            background: "linear-gradient(135deg, rgba(168,85,247,0.5), rgba(99,26,168,0.3))",
            border: "1px solid rgba(168,85,247,0.7)",
            boxShadow: "0 0 18px rgba(168,85,247,0.5)",
            transform: "rotate(-15deg)",
          }}
        />
      </div>

      {/* Small diamond shapes scattered */}
      <div className="absolute top-1/4 left-1/2 z-10 twinkle" style={{ animationDelay: "1.5s" }}>
        <div className="w-5 h-5 rotate-45" style={{ background: "rgba(168,85,247,0.4)", border: "1px solid rgba(168,85,247,0.9)", boxShadow: "0 0 12px rgba(168,85,247,0.7)" }} />
      </div>
      <div className="absolute top-1/3 right-1/3 z-10 twinkle" style={{ animationDelay: "0.8s" }}>
        <div className="w-4 h-4 rotate-45" style={{ background: "rgba(236,72,153,0.4)", border: "1px solid rgba(236,72,153,0.9)", boxShadow: "0 0 10px rgba(236,72,153,0.7)" }} />
      </div>
      <div className="absolute top-2/3 right-1/4 z-10 twinkle" style={{ animationDelay: "2.2s" }}>
        <div className="w-3 h-3 rotate-45" style={{ background: "rgba(251,191,36,0.6)", border: "1px solid rgba(251,191,36,0.9)", boxShadow: "0 0 8px rgba(251,191,36,0.7)" }} />
      </div>

      {/* Stars */}
      {[...Array(24)].map((_, i) => (
        <div
          key={i}
          className="absolute z-0 twinkle rounded-full bg-white"
          style={{
            width: i % 4 === 0 ? "3px" : "2px",
            height: i % 4 === 0 ? "3px" : "2px",
            left: `${(i * 4.3 + 3) % 95}%`,
            top: `${(i * 6.7 + 5) % 85}%`,
            animationDelay: `${i * 0.25}s`,
            animationDuration: `${1.5 + (i % 4) * 0.5}s`,
          }}
        />
      ))}

      {/* ── Main Content ── */}
      <div className="relative z-20 min-h-screen flex flex-col">
        {/* 3D Stage Background */}
        <div className="absolute bottom-0 left-0 right-0 z-0 rounded-3xl  h-full -mt-32">
          <Canvas camera={{ position: [0, 2, 8], fov: 45 }}>
            <ambientLight intensity={0.6} />
            <directionalLight position={[5, 5, 5]} intensity={0.8} />
            <pointLight position={[-5, 5, 5]} intensity={0.5} />
            <ProTable scale={9} rotation={[0, -Math.PI/2, 0]} position={[-1, -1, 0]} />
          </Canvas>
        </div>

        {/* Header */}
        <div className="text-center pt-12 pb-4 px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1
              className="text-6xl md:text-8xl font-black tracking-tight mb-3"
              style={{
                background: "linear-gradient(180deg, #ffffff 0%, #e879f9 40%, #a855f7 70%, #7c3aed 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                filter: "drop-shadow(0 0 40px rgba(168,85,247,0.6))",
                letterSpacing: "-0.02em",
              }}
            >
              My Projects
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="text-gray-300 text-lg md:text-xl font-medium"
            style={{ textShadow: "0 0 20px rgba(168,85,247,0.4)" }}
          >
            A collection of my best work
          </motion.p>
        </div>

        {/* Cards Carousel */}
        <div className="flex-1 flex items-center justify-center px-4 py-8 relative z-10">
          {/* Navigation Controls */}
          <button
            onClick={handlePrev}
            className="absolute left-8 md:left-24 z-50 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(168,85,247,0.4)",
              backdropFilter: "blur(8px)",
              boxShadow: "0 0 20px rgba(168,85,247,0.2)",
            }}
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={handleNext}
            className="absolute right-8 md:right-24 z-50 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(168,85,247,0.4)",
              backdropFilter: "blur(8px)",
              boxShadow: "0 0 20px rgba(168,85,247,0.2)",
            }}
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="w-full max-w-sm relative" style={{ perspective: "2000px", height: "460px" }}>
            <div
              className="absolute inset-0"
              style={{
                transform: `rotateX(${mousePos.y * -1.5}deg) rotateY(${mousePos.x * 1.5}deg)`,
                transition: "transform 0.4s ease",
                transformStyle: "preserve-3d",
              }}
            >
              {projects.map((project, index) => {
                let offset = index - currentIndex;
                if (offset > projects.length / 2) offset -= projects.length;
                if (offset < -projects.length / 2) offset += projects.length;
                
                return (
                  <TiltCard 
                    key={project.id} 
                    project={project} 
                    offset={offset} 
                    onClick={() => setCurrentIndex(index)} 
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* Platform / Stage */}
        <div className="relative px-4 flex justify-center">
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="relative w-full max-w-5xl"
          >
            {/* Platform top surface */}
            <div
              className="relative h-12 rounded-t-2xl mx-6 platform-glow"
              style={{
                background: "linear-gradient(180deg, rgba(30,10,60,0.95) 0%, rgba(15,5,30,0.98) 100%)",
                border: "1px solid rgba(139,92,246,0.35)",
                borderBottom: "none",
              }}
            >
              {/* Lights row */}
              <div className="absolute top-3 left-0 right-0 flex justify-evenly px-6">
                {[...Array(20)].map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full"
                    style={{
                      background: i % 4 === 0 ? "#8b5cf6" : i % 4 === 1 ? "#06b6d4" : i % 4 === 2 ? "#ec4899" : "#a855f7",
                      boxShadow: `0 0 8px ${i % 4 === 0 ? "#8b5cf6" : i % 4 === 1 ? "#06b6d4" : i % 4 === 2 ? "#ec4899" : "#a855f7"}`,
                      animation: `twinkle ${1.5 + (i % 3) * 0.5}s ease-in-out infinite`,
                      animationDelay: `${i * 0.12}s`,
                    }}
                  />
                ))}
              </div>

               {/* ── 3D Stage Model ── */}
      <div className="absolute bottom-0 w-full -z-10 rounded-2xl overflow-hidden border border-white/10">
        <Canvas camera={{ position: [0, 2, 8], fov: 45 }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} />
          <pointLight position={[-5, 5, 5]} intensity={0.5} />
          <ProTable scale={1} rotation={[0, -Math.PI/2, 0]} position={[0, 0, 0]} />
        </Canvas>
      </div>
            </div>

            {/* Hex platform sections */}
            <div className="flex gap-2 mx-4 -mt-[1px]">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="flex-1 h-5"
                  style={{
                    background:
                      i === 1
                        ? "linear-gradient(90deg, rgba(6,182,212,0.12), rgba(6,182,212,0.06))"
                        : "linear-gradient(180deg, rgba(30,10,60,0.85) 0%, rgba(20,5,45,0.9) 100%)",
                    border: "1px solid rgba(139,92,246,0.2)",
                    borderTop: "none",
                    boxShadow: i === 1 ? "0 4px 20px rgba(6,182,212,0.15)" : "none",
                  }}
                />
              ))}
            </div>

            {/* Glow line */}
            <div
              className="h-[3px] w-full"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(6,182,212,0.9) 30%, rgba(139,92,246,0.9) 50%, rgba(236,72,153,0.9) 70%, transparent 100%)",
                boxShadow: "0 0 25px rgba(6,182,212,0.6)",
              }}
            />
          </motion.div>
        </div>

        {/* Stats Bar */}
        <div
          className="relative z-20"
          style={{
            background: "linear-gradient(90deg, rgba(0,0,0,0.7) 0%, rgba(10,1,30,0.92) 50%, rgba(0,0,0,0.7) 100%)",
            borderTop: "1px solid rgba(139,92,246,0.2)",
          }}
        >
          <div className="max-w-4xl mx-auto py-8 px-4">
            <div className="flex flex-wrap justify-center">
              <div className="flex flex-wrap justify-center divide-x divide-gray-700/50">
                {stats.map((stat, index) => (
                  <StatCounter key={stat.label} value={stat.value} label={stat.label} index={index} />
                ))}
              </div>
            </div>

            {/* Explore More button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.2 }}
              className="flex justify-center mt-6"
            >
              <button
                className="relative px-10 py-3 rounded-full font-black text-white text-sm overflow-hidden group transition-all duration-300 hover:scale-105"
                style={{
                  background: "linear-gradient(90deg, rgba(139,92,246,0.2), rgba(6,182,212,0.2))",
                  border: "1px solid rgba(139,92,246,0.6)",
                  boxShadow: "0 0 30px rgba(139,92,246,0.25), inset 0 1px 0 rgba(255,255,255,0.1)",
                }}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"
                  style={{ background: "linear-gradient(90deg, rgba(139,92,246,0.35), rgba(6,182,212,0.35))" }}
                />
                <span className="relative z-10 flex items-center gap-2">
                  Explore More
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Ambient Orbs ── */}
      <div
        className="absolute top-0 left-1/4 w-96 h-96 rounded-full pointer-events-none z-0"
        style={{
          background: "radial-gradient(circle, rgba(139,92,246,0.18) 0%, transparent 70%)",
          filter: "blur(50px)",
          transform: `translate(${mousePos.x * 15}px, ${mousePos.y * 15}px)`,
          transition: "transform 0.5s ease",
        }}
      />
      <div
        className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full pointer-events-none z-0"
        style={{
          background: "radial-gradient(circle, rgba(6,182,212,0.14) 0%, transparent 70%)",
          filter: "blur(50px)",
          transform: `translate(${mousePos.x * -12}px, ${mousePos.y * 12}px)`,
          transition: "transform 0.5s ease",
        }}
      />
      <div
        className="absolute bottom-1/3 left-1/3 w-72 h-72 rounded-full pointer-events-none z-0"
        style={{
          background: "radial-gradient(circle, rgba(236,72,153,0.12) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

     
    </div>
  );
}
