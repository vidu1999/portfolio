"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  Mail, MapPin, Phone, Send, Star,
  CheckCircle, Sparkles, Zap, Globe, MessageSquare, ArrowRight,
  Quote, Github, Linkedin, Facebook, Twitter
} from "lucide-react";
import { testimonials } from "@/app/data";
import ContactForm from "./ContactForm";
import { Canvas } from '@react-three/fiber';
import { ContactMe } from '../models/ContactMe';
import Ster from "../models/Ster";
/* ─────────────────────────────────────────────────
   Floating particles
───────────────────────────────────────────────── */
const PARTICLES = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  size: `${2 + Math.random() * 4}px`,
  delay: `${Math.random() * 14}s`,
  duration: `${8 + Math.random() * 14}s`,
  color: ["#a855f7","#06b6d4","#ec4899","#6366f1","#22d3ee","#f472b6"][i % 6],
}));



/* ─────────────────────────────────────────────────
   3-D Tilt Card wrapper
───────────────────────────────────────────────── */
function TiltCard({ children, className = "" }) {
  const ref = useRef(null);

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotX = ((y - cy) / cy) * -8;
    const rotY = ((x - cx) / cx) * 8;
    el.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(16px)`;
    el.style.boxShadow = `${-rotY * 2}px ${rotX * 2}px 60px rgba(99,102,241,.4)`;
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0)";
    el.style.boxShadow = "";
  };

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ transition: "transform .5s cubic-bezier(.22,1,.36,1), box-shadow .5s ease", transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────────
   Animated 3-D Star / Orb
───────────────────────────────────────────────── */
function SpinningOrb() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="relative flex h-44 w-44 items-center justify-center">
        {/* outer ring */}
        <div
          className="absolute inset-0 rounded-full border border-cyan-400/30 orb-rotate"
          style={{ boxShadow: "0 0 40px rgba(6,182,212,.25)" }}
        />
        {/* middle ring */}
        <div
          className="absolute inset-4 rounded-full border border-violet-400/40"
          style={{
            animation: "orbRotate 12s linear infinite reverse",
            boxShadow: "0 0 30px rgba(168,85,247,.3)",
          }}
        />
        {/* inner glow */}
        <div className="absolute inset-8 rounded-full bg-[radial-gradient(circle,rgba(139,92,246,.6),rgba(6,182,212,.3),transparent_80%)]" />
        {/* center model */}
        
        {/* sparkle dots */}
        {[0, 60, 120, 180, 240, 300].map((deg, i) => (
          <div
            key={deg}
            className="sparkle absolute h-2 w-2 rounded-full"
            style={{
              background: ["#a855f7","#06b6d4","#ec4899","#6366f1","#22d3ee","#f472b6"][i],
              top: `${50 - 44 * Math.cos((deg * Math.PI) / 180)}%`,
              left: `${50 + 44 * Math.sin((deg * Math.PI) / 180)}%`,
              animationDuration: `${1.5 + i * .3}s`,
              animationDelay: `${i * .25}s`,
              boxShadow: `0 0 8px ${["#a855f7","#06b6d4","#ec4899","#6366f1","#22d3ee","#f472b6"][i]}`,
            }}
          />
        ))}
      </div><div className="fixed h-[30%] w-full" >
          <Canvas camera={{ position: [0, 0, 2], fov: 75 }}>
            <ambientLight intensity={1.2} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <directionalLight position={[-5, 5, 5]} intensity={0.8} />
            <ContactMe />
          </Canvas>
        </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────
   Person / Testimonial Card
───────────────────────────────────────────────── */
function TestimonialCard({ t, delay }) {
  return (
    <TiltCard
      className={`slide-up delay-${delay} relative overflow-hidden rounded-3xl border border-white/10 bg-[linear-gradient(145deg,rgba(12,17,40,.97),rgba(7,10,24,.99))] p-6`}
    >
      {/* top glow */}
      <div
        className="pointer-events-none absolute -top-10 left-1/2 h-32 w-32 -translate-x-1/2 rounded-full blur-2xl"
        style={{ background: t.glow }}
      />
      {/* quote icon */}
      <Quote className="absolute right-5 top-5 h-8 w-8 opacity-10 text-white" />
      {/* stars */}
      <div className="mb-3 flex gap-1">
        {Array.from({ length: t.rating }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" style={{ filter: "drop-shadow(0 0 4px rgba(251,191,36,.7))" }} />
        ))}
      </div>
      <p className="text-sm leading-relaxed text-slate-300">{t.text}</p>
      <div className="mt-5 flex items-center gap-3">
        <div 
  className={`flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br ${t.gradient} text-xs font-bold text-white shadow-lg`}
  style={{ boxShadow: `0 0 18px ${t.glow}` }}
>
  <img 
    src={`/per/${t.img}`} 
    alt={t.name} 
    className="h-full w-full object-cover rounded-2xl" 
  />
</div>
        <div>
          <p className="text-sm font-semibold text-white">{t.name}</p>
          <p className="text-xs text-slate-400">{t.role}</p>
        </div>
      </div>
    </TiltCard>
  );
}

/* ─────────────────────────────────────────────────
   Contact Info Row
───────────────────────────────────────────────── */
function ContactRow({ icon: Icon, label, value, gradient, glow }) {
  return (
    <div className="group flex items-center gap-4">
      <div
        className={`icon-pulse relative flex-shrink-0 rounded-2xl bg-gradient-to-br ${gradient} p-3 transition-transform duration-300 group-hover:scale-110`}
        style={{ boxShadow: `0 0 22px ${glow}` }}
      >
        <Icon className="h-5 w-5 text-white" />
        <div className="absolute inset-0 rounded-2xl bg-white/10 opacity-0 transition-opacity group-hover:opacity-100" />
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">{label}</p>
        <p className="mt-0.5 text-sm font-medium text-slate-200">{value}</p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────
   Main App
───────────────────────────────────────────────── */
export default function App() {
  const [submitted, setSubmitted] = useState(false);
  const [hoveredSocial, setHoveredSocial] = useState(null);

  // Intersection observer for slide-in animations
  useEffect(() => {
    const els = document.querySelectorAll(".slide-left,.slide-right,.slide-up");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) e.target.style.animationPlayState = "running";
      }),
      { threshold: 0.15 }
    );
    els.forEach((el) => {
      el.style.animationPlayState = "paused";
      obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const socials = [
    { icon: Github, label: "GitHub", gradient: "from-slate-500 to-slate-700", glow: "#64748b", url: "https://github.com/vidu1999" },
    { icon: Linkedin, label: "LinkedIn", gradient: "from-blue-500 to-indigo-600", glow: "#3b82f6", url: "https://www.linkedin.com/in/vidura-kavinda-a76b34204/" },
    { icon: Twitter, label: "X", gradient: "from-slate-700 to-slate-900", glow: "#1f2937", url: "https://x.com/Vidura1999" },
    { icon: Facebook, label: "Facebook", gradient: "from-blue-600 to-blue-800", glow: "#1e40af", url: "https://facebook.com/vidura.kavinda.5" },
  ];

  return (
    <section className="relative min-h-[100svh] w-full overflow-x-hidden px-4 pb-16 pt-10 text-white md:px-8 lg:px-10">

      {/* ── background grid ── */}
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-60" />

      {/* ── animated floating particles ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {PARTICLES.map((p) => (
          <div
            key={p.id}
            className="particle absolute bottom-0 rounded-full"
            style={{
              left: p.left, width: p.size, height: p.size,
              background: p.color, boxShadow: `0 0 6px ${p.color}`,
              animationDuration: p.duration, animationDelay: p.delay,
            }}
          />
        ))}
      </div>

      {/* ── aurora blobs ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="aurora1 absolute -left-32 top-10 h-96 w-96 rounded-full bg-violet-600/25 blur-[130px]" />
        <div className="aurora2 absolute -right-32 top-40 h-96 w-96 rounded-full bg-cyan-500/20 blur-[140px]" />
        <div className="aurora3 absolute bottom-20 left-1/3 h-80 w-80 rounded-full bg-fuchsia-600/20 blur-[120px]" />
        <div className="aurora1 absolute bottom-10 right-1/4 h-72 w-72 rounded-full bg-blue-600/15 blur-[110px]" style={{ animationDelay: "-4s" }} />
      </div>

      <div className="relative mx-auto max-w-[1400px]">

        {/* ════════════════════════════════════════════
            HEADER
        ════════════════════════════════════════════ */}
        <div className="mb-10 flex flex-col items-center text-center slide-up">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-violet-300"
            style={{ boxShadow: "0 0 20px rgba(139,92,246,.2)" }}>
            <Sparkles className="h-3 w-3" />
            Available for projects
          </div>
          <h1 className="bg-[linear-gradient(135deg,#fff_0%,#c4b5fd_30%,#67e8f9_60%,#f9a8d4_100%)] bg-clip-text text-5xl font-bold tracking-tight text-transparent md:text-7xl"
            style={{ textShadow: "none", filter: "drop-shadow(0 0 30px rgba(167,139,250,.3))" }}>
            Contact Me
          </h1>
          <p className="mt-4 max-w-xl text-base text-slate-400 md:text-lg">
            Let's build something <span className="font-semibold text-white">extraordinary</span> together.{" "}
            Reach out and I'll get back within 24 hours.
          </p>
        </div>

        {/* ════════════════════════════════════════════
            MAIN CARD
        ════════════════════════════════════════════ */}
        <div className="glow-border overflow-hidden rounded-[32px] border bg-[linear-gradient(160deg,rgba(14,18,42,.97),rgba(7,10,22,.99))]"
          style={{ boxShadow: "0 0 0 1px rgba(255,255,255,.04), 0 40px 100px rgba(0,0,0,.6)" }}>

          {/* rainbow top bar */}
          <div className="h-1 w-full bg-[linear-gradient(90deg,#6366f1,#a855f7,#ec4899,#06b6d4,#22d3ee,#6366f1)] bg-[length:200%_100%]"
            style={{ animation: "shimmer 4s linear infinite" }} />

          <div className="grid gap-0 lg:grid-cols-[1.2fr_.8fr]">

            {/* ── LEFT: FORM ── */}
            <div className="border-r border-white/[.06] px-6 py-10 md:px-10 md:py-12 slide-left">

              <div className="mb-2 flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-violet-400" />
                <span className="text-xs font-semibold uppercase tracking-widest text-violet-400">Send a Message</span>
              </div>
              <h2 className="mb-2 text-3xl font-bold text-white md:text-4xl">
                Let's <span className="bg-[linear-gradient(90deg,#a855f7,#06b6d4)] bg-clip-text text-transparent">Talk</span>
              </h2>
              <p className="mb-8 text-slate-400">Fill out the form and I'll respond as soon as possible.</p>

              <ContactForm />
            </div>

            {/* ── RIGHT: INFO + 3-D ORBS ── */}
            <div className="relative flex flex-col justify-between overflow-hidden px-6 py-10 md:px-10 md:py-12 slide-right">

              {/* inner aurora */}
              <div className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-violet-600/20 blur-[100px]" />
              <div className="pointer-events-none absolute -bottom-16 -left-8 h-64 w-64 rounded-full bg-cyan-500/15 blur-[90px]" />

              {/* contact info card */}
              <TiltCard className="relative z-10 rounded-[24px] border border-white/10 bg-[linear-gradient(145deg,rgba(14,18,42,.98),rgba(9,12,30,.98))] p-6"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-xl bg-gradient-to-br from-fuchsia-500/30 to-violet-600/20 p-2.5"
                    style={{ boxShadow: "0 0 20px rgba(168,85,247,.25)" }}>
                    <Mail className="h-5 w-5 text-violet-300" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Contact Information</h3>
                </div>

                {/* divider */}
                <div className="mb-5 h-px bg-[linear-gradient(90deg,transparent,rgba(167,139,250,.4),rgba(103,232,249,.4),transparent)]" />

                <div className="space-y-5">
                  <ContactRow icon={Mail}   label="Email"    value="vidurakavindadev@gmail.com" gradient="from-fuchsia-500 to-violet-600" glow="rgba(168,85,247,.45)" />
                  <ContactRow icon={Phone}  label="Phone"    value="+94 76 230 3781"  gradient="from-sky-400 to-blue-600"      glow="rgba(59,130,246,.45)" />
                  <ContactRow icon={MapPin} label="Location" value="SRI LANKA,COlOMBO" gradient="from-violet-400 to-fuchsia-600" glow="rgba(167,139,250,.45)" />
                </div>

                {/* social icons */}
                <div className="mt-6 border-t border-white/[.07] pt-5">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-500">Follow Me</p>
                  <div className="flex gap-3">
                    {socials.map((s, i) => (
                      <a
                        key={i}
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onMouseEnter={() => setHoveredSocial(i)}
                        onMouseLeave={() => setHoveredSocial(null)}
                        className={`relative rounded-xl bg-gradient-to-br ${s.gradient} p-2.5 transition-all duration-300`}
                        style={{
                          boxShadow: hoveredSocial === i ? `0 0 20px ${s.glow}` : "none",
                          transform: hoveredSocial === i ? "translateY(-4px) scale(1.15)" : "translateY(0) scale(1)",
                        }}
                        aria-label={s.label}
                      >
                        <s.icon className="h-4 w-4 text-white" />
                      </a>
                    ))}
                  </div>
                </div>
              </TiltCard>

              {/* spinning 3-D orb */}
              <div className="relative mt-6 h-52 w-full">
                <SpinningOrb />
                {/* skill badges floating around */}
                {[
                  { label: "React", color: "#61dafb", top: "8%",  left: "5%"  },
                  { label: "Three.js", color: "#a855f7", top: "8%",  right: "5%"  },
                  { label: "UI/UX",    color: "#ec4899", bottom: "8%", left: "5%"  },
                  { label: "Node.js",  color: "#22c55e", bottom: "8%", right: "5%"  },
                ].map((b, i) => (
                  <div
                    key={i}
                    className="sparkle absolute rounded-full border border-white/10 px-3 py-1 text-xs font-semibold"
                    style={{
                      ...b,
                      color: b.color,
                      background: `${b.color}18`,
                      boxShadow: `0 0 12px ${b.color}55`,
                      animationDuration: `${2 + i * .4}s`,
                      animationDelay: `${i * .5}s`,
                    }}
                  >
                    {b.label}
                  </div>
                ))}
              </div>

              {/* quick stats */}
              <div className="mt-4 grid grid-cols-3 gap-3">
                {[
                  { value: "50+", label: "Projects", color: "#a855f7" },
                  { value: "98%", label: "Satisfaction", color: "#06b6d4" },
                  { value: "<24h", label: "Response", color: "#ec4899" },
                ].map((stat, i) => (
                  <div key={i} className="rounded-2xl border border-white/[.08] bg-white/[.03] p-3 text-center">
                    <p className="text-lg font-bold" style={{ color: stat.color, textShadow: `0 0 16px ${stat.color}` }}>
                      {stat.value}
                    </p>
                    <p className="text-xs text-slate-500">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════
            TESTIMONIALS
        ════════════════════════════════════════════ */}
        <div className="mt-12 overflow-hidden rounded-[32px] border border-white/[.08] bg-[linear-gradient(160deg,rgba(10,14,32,.97),rgba(7,10,22,.99))]"
          style={{ boxShadow: "0 30px 80px rgba(0,0,0,.5)" }}>

          {/* rainbow bar */}
          <div className="h-1 w-full bg-[linear-gradient(90deg,#06b6d4,#6366f1,#a855f7,#ec4899,#f59e0b,#06b6d4)] bg-[length:200%_100%]"
            style={{ animation: "shimmer 5s linear infinite" }} />

          <div className="px-6 py-10 md:px-10">
            {/* section header */}
            <div className="mb-10 flex items-center justify-center gap-4">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
              <div className="flex items-center gap-3">
                <div className="h-2.5 w-2.5 rotate-45 rounded-[2px] bg-cyan-300" style={{ boxShadow: "0 0 20px rgba(103,232,249,.9)" }} />
                <h3 className="neon-text text-3xl font-bold tracking-tight text-white md:text-4xl">
                  Client Testimonials
                </h3>
                <div className="h-2.5 w-2.5 rotate-45 rounded-[2px] bg-fuchsia-400" style={{ boxShadow: "0 0 20px rgba(232,121,249,.9)" }} />
              </div>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-fuchsia-400/50 to-transparent" />
            </div>

            {/* testimonial grid + orb */}
            <div className="grid gap-6 lg:grid-cols-[220px_1fr]">

              {/* orb column */}
              <div className="hidden rounded-3xl border border-white/[.07] bg-[radial-gradient(circle_at_50%_20%,rgba(78,168,255,.12),transparent_60%),linear-gradient(160deg,rgba(12,16,35,.98),rgba(7,10,22,.98))] lg:flex lg:items-center lg:justify-center">
                <SpinningOrb /><div className="absolute" >
          <Canvas camera={{ position: [0, 0, 2], fov: 75 }}>
            <ambientLight intensity={1.2} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <directionalLight position={[-5, 5, 5]} intensity={0.8} />
            <Ster />
          </Canvas>
        </div>
              </div>

              {/* cards */}
              <div className="grid gap-4 sm:grid-cols-2">
                {testimonials.map((t, i) => (
                  <TestimonialCard key={i} t={t} delay={((i % 4) + 1)} />
                ))}
              </div>
            </div>

            {/* bottom strip */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 border-t border-white/[.06] pt-8">
              {[
                { icon: Zap,     label: "Fast Delivery",    color: "#f59e0b" },
                { icon: Star,    label: "5-Star Quality",   color: "#a855f7" },
                { icon: Globe,   label: "Global Clients",   color: "#06b6d4" },
                { icon: Sparkles,label: "Creative Solutions",color: "#ec4899" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <item.icon className="h-4 w-4" style={{ color: item.color, filter: `drop-shadow(0 0 6px ${item.color})` }} />
                  <span className="text-sm font-medium text-slate-300">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
