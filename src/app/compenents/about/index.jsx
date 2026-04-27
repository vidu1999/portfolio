"use client";
import React, { useRef, useState } from "react";
import pi from "/public/bg/vkj1.jpg";
import Image from "next/image";
import Link from "next/link";
import FacebookBtn from "../Facebook";
import Animation from "../Animation";
import { Download } from "lucide-react";
import { FaGithub, FaLinkedinIn, FaFacebookF } from "react-icons/fa";
import clsx from "clsx";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";

/* ─────────────────────────────────────────────
   REUSABLE 3D TILT CARD WRAPPER
───────────────────────────────────────────── */
const TiltCard = ({ children, className }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [12, -12]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), {
    stiffness: 200,
    damping: 20,
  });

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(px);
    y.set(py);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={clsx(
        "relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl",
        "shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:shadow-[0_16px_48px_rgba(99,102,241,0.3)]",
        "transition-shadow duration-500 cursor-default",
        className
      )}
    >
      {/* Inner glow overlay */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 via-transparent to-indigo-500/5" />
      {children}
    </motion.div>
  );
};

/* ─────────────────────────────────────────────
   STAT BADGE
───────────────────────────────────────────── */
const StatBadge = ({ value, label }) => (
  <motion.div
    whileHover={{ scale: 1.08, y: -4 }}
    className="flex flex-col items-center justify-center px-4 py-2 rounded-xl
               border border-indigo-500/30 bg-indigo-500/10 backdrop-blur-md"
  >
    <span className="text-2xl font-bold text-indigo-300">{value}</span>
    <span className="text-xs text-gray-400 mt-0.5 tracking-wide">{label}</span>
  </motion.div>
);

/* ─────────────────────────────────────────────
   SKILL ICON GRID ITEM
───────────────────────────────────────────── */
const SkillsCard = () => (
  <TiltCard className="p-5 w-full">
    <p className="text-xs uppercase tracking-widest text-indigo-400 mb-3 font-semibold">
      Tech Stack
    </p>
    <Image
      className="w-full h-auto rounded-lg"
      src="https://skillicons.dev/icons?i=appwrite,aws,babel,bootstrap,cloudflare,css,d3,docker,figma,firebase,gatsby,git,github,graphql,html,ipfs,js,jquery,kubernetes,linux,mongodb,mysql,netlify,nextjs,nodejs,npm,postgres,react,redux,replit,sass,supabase,tailwind,threejs,vercel,vite,vscode,yarn&perline=14"
      width={700}
      height={200}
      alt="Tech Stack"
      loading="lazy"
    />
  </TiltCard>
);

/* ─────────────────────────────────────────────
   GITHUB STATS CARD
───────────────────────────────────────────── */
const StatsCard = ({ src, alt, className }) => (
  <TiltCard className={clsx("p-4 overflow-hidden", className)}>
    <Image
      className="w-full h-auto"
      src={src}
      width={500}
      height={250}
      alt={alt}
      loading="lazy"
    />
  </TiltCard>
);

/* ─────────────────────────────────────────────
   MAIN ABOUT COMPONENT
───────────────────────────────────────────── */
const About = () => {
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: i * 0.15, ease: "easeOut" },
    }),
  };

  return (
    <section className="relative min-h-screen w-full overflow-x-hidden text-white z-0">
      {/* ── Ambient background glows ── */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full bg-indigo-700/20 blur-[120px]" />
        <div className="absolute top-1/2 right-0 h-[400px] w-[400px] rounded-full bg-cyan-600/15 blur-[100px]" />
        <div className="absolute bottom-0 left-1/3 h-[300px] w-[300px] rounded-full bg-purple-700/20 blur-[90px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">

        {/* ══════════════════════════════
            HERO ROW  —  Profile + Bio
        ══════════════════════════════ */}
        <div className="flex flex-col lg:flex-row items-center gap-10 mb-16">

          {/* ── Profile Card ── */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
            className="flex-shrink-0 w-full max-w-xs"
          >
            <TiltCard className="p-6 flex flex-col items-center text-center gap-4">
              {/* Avatar with ring */}
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-cyan-400 blur-sm scale-110 opacity-70" />
                <div className="relative h-36 w-36 rounded-full overflow-hidden border-2 border-white/20 ring-4 ring-indigo-500/40">
                  <Image
                    src={pi}
                    alt="Vidura Kavinda"
                    fill
                    className="object-cover"
                  />
                </div>
                {/* Online badge */}
                <span className="absolute bottom-1 right-1 h-4 w-4 rounded-full bg-emerald-400 border-2 border-[#050816] shadow-lg shadow-emerald-400/50" />
              </div>

              {/* Name & title */}
              <div>
                <h2 className="text-xl font-bold tracking-wide bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  VIDURA KAVINDA
                </h2>
                <span className="mt-1 inline-block rounded-full bg-indigo-500/20 px-3 py-0.5 text-xs font-medium text-indigo-300 border border-indigo-500/30">
                  BSc. Computer Science
                </span>
              </div>

              <p className="text-sm text-gray-400 leading-relaxed">
                Welcome to my portfolio, where design meets innovation.
              </p>

              {/* Social links */}
              <div className="flex gap-3 mt-1">
                {[
                  { icon: <FaFacebookF size={14} />, href: "#", color: "hover:bg-blue-600" },
                  { icon: <FaLinkedinIn size={14} />, href: "#", color: "hover:bg-sky-600" },
                  { icon: <FaGithub size={14} />, href: "https://github.com/Vidu1999", color: "hover:bg-gray-600" },
                ].map(({ icon, href, color }, i) => (
                  <motion.a
                    key={i}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.15, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={clsx(
                      "flex h-8 w-8 items-center justify-center rounded-full",
                      "bg-white/10 border border-white/15 text-white transition-colors duration-300",
                      color
                    )}
                  >
                    {icon}
                  </motion.a>
                ))}
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-2 w-full mt-2">
                <StatBadge value="6+" label="Years" />
                <StatBadge value="15+" label="Projects" />
                <StatBadge value="15+" label="Clients" />
              </div>
            </TiltCard>
          </motion.div>

          {/* ── Bio Card ── */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="flex-1 w-full"
          >
            <TiltCard className="p-8 h-full flex flex-col justify-between gap-6">
              {/* Greeting */}
              <div>
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-sm font-semibold tracking-[0.3em] text-emerald-400 uppercase mb-2"
                >
                  👋 Hello! I Am
                </motion.p>

                <h1 className="text-4xl sm:text-5xl font-extrabold mb-3 bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  VIDURA KAVINDA
                </h1>

                <div className="flex items-center gap-3 text-lg text-gray-300 mb-4">
                  <span>I&apos;m a</span>
                  <span className="text-cyan-400 font-semibold text-xl">
                    <Animation about={"1"} />
                  </span>
                </div>

                <p className="text-gray-400 leading-7 text-base max-w-xl">
                  I&apos;m a{" "}
                  <span className="text-white font-medium">Full Stack Developer</span>{" "}
                  with <span className="text-indigo-300 font-medium">6+ years</span> of experience. I
                  specialize in creating{" "}
                  <span className="text-white font-medium">scalable, secure web applications</span>{" "}
                  using modern technologies — from pixel-perfect UIs to robust backend
                  architectures.
                </p>
              </div>

              {/* Skill tags */}
              <div className="flex flex-wrap gap-2">
                {["React", "Next.js", "Node.js", "TypeScript", "MongoDB", "Docker", "AWS"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-xs font-medium
                                 bg-indigo-500/15 border border-indigo-500/30 text-indigo-200
                                 hover:bg-indigo-500/30 transition-colors duration-200 cursor-default"
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>

              {/* CTA buttons */}
              <div className="flex flex-wrap gap-4">
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    href="/resume.pdf"
                    target="_blank"
                    download="ViduraKavinda_CV.pdf"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm
                               bg-gradient-to-r from-indigo-500 to-purple-600
                               hover:from-indigo-400 hover:to-purple-500
                               shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50
                               transition-all duration-300"
                  >
                    <Download className="h-4 w-4 animate-bounce" strokeWidth={2} />
                    Download CV
                  </Link>
                </motion.div>

                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    href="../contact"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm
                               border border-white/20 bg-white/5 hover:bg-white/10
                               transition-all duration-300"
                  >
                    Hire Me →
                  </Link>
                </motion.div>
              </div>
            </TiltCard>
          </motion.div>
        </div>

        {/* ══════════════════════════════
            GITHUB STATS ROW
        ══════════════════════════════ */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
          className="mb-8"
        >
          <p className="text-xs uppercase tracking-widest text-indigo-400 font-semibold mb-4">
            GitHub Stats
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <StatsCard
              src="https://github-readme-stats-eight-theta.vercel.app/api?username=Vidu1999&theme=transparent&hide_border=true&title_color=818CF8&text_color=FFFFFF&text_size=22&icon_color=818CF8&text_bold=false&bg_color=00000000"
              alt="GitHub Stats"
            />
            <StatsCard
              src="https://github-profile-summary-cards.vercel.app/api/cards/repos-per-language?username=Vidu1999&theme=transparent"
              alt="Repos per Language"
            />
            <StatsCard
              src="https://streak-stats.demolab.com/?user=Vidu1999&theme=dark&hide_border=true&background=EB545400&ring=818CF8&currStreakLabel=818CF8"
              alt="GitHub Streak"
            />
          </div>
        </motion.div>

        {/* ══════════════════════════════
            TECH STACK ROW
        ══════════════════════════════ */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={1}
        >
          <SkillsCard />
        </motion.div>
      </div>
    </section>
  );
};

export default About;
