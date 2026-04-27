"use client";
import React, { useEffect, useId, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Me } from "./models/Me";
import { Mini } from "./models/Mini";
import RenderModels from "/src/app/compenents/RenderModels";
import Link from 'next/link'
import { projectsData, testimonials } from "@/app/data";

const tabs = [
  { key: "all", label: "All" },
  { key: "uiux", label: "UI/UX Design" },
  { key: "3d", label: "3D Art" },
  { key: "web", label: "Web Design" },
  { key: "game", label: "Game" },
  { key: "advanced-system", label: "Advanced System" },
];

const projectItems = projectsData.map((project, index) => {
  const cats = [];
  const title = project.title;

  // UI/UX Design
  if (title === "Portfolio") {
    cats.push("uiux");
  }

  // 3D Art
  if (title === "Advance Portfolio") {
    cats.push("3d");
  }

  // Web Design
  if (title === "E-Commerce Site" || (title === "Portfolio")) {
    cats.push("web");
  }

  // Game
  if (title === "Cricket Game" || title === "Multiplayer Game") {
    cats.push("game");
  }

  // Advanced System
  if (title === "Arduino Car" || title === "Student Attendance System" ||
    title === "Language Identification System" || title === "Maintenance App") {
    cats.push("advanced-system");
  }

  // Add "all" if no category assigned
  if (cats.length === 0) {
    cats.push("all");
  } else {
    cats.push("all");
  }

  return {
    key: project.id.toString(),
    id: project.id,
    cats: cats,
    title: project.title,
    note: project.description,
    type: ["dashboard", "astronaut", "mobile"][index % 3],
    image: project.image,
    link: project.link,
  };
});

const socialLinks = [
  {
    label: "f",
    href: "https://facebook.com/vidura.kavinda.5",
    title: "Facebook",
    external: true,
  },
  {
    label: "x",
    href: "https://x.com/Vidura1999",
    title: "X / Twitter",
    external: true,
  },
  {
    label: "in",
    href: "https://www.linkedin.com/in/vidura-kavinda-a76b34204/",
    title: "LinkedIn",
    external: true,
  },
  {
    label: "📞",
    href: "tel:+94762303781",
    title: "Call",
  },
];

function cls(...parts) {
  return parts.filter(Boolean).join(" ");
}

function Preview({ type }) {
  if (type === "dashboard") {
    return (
      <div className="preview dashboard h-28 rounded-2xl relative overflow-hidden border border-white/15 shadow-[inset_0_1px_0_rgba(255,255,255,.24)] bg-[radial-gradient(120px_40px_at_50%_0%,rgba(255,255,255,.28),transparent_65%),linear-gradient(180deg,#223761,#101c39)]">
        <div className="hud absolute inset-3 rounded-xl bg-[rgba(8,16,34,.55)] border border-[rgba(118,230,255,.18)]" />
        <div className="chart absolute left-4 right-4 bottom-4 top-[34px] grid grid-cols-[1.1fr_.9fr] gap-2.5">
          <div className="panel-a rounded-[10px] bg-white/[.12] border border-white/[.16] relative" />
          <div className="panel-b rounded-[10px] bg-white/[.12] border border-white/[.16] relative" />
        </div>
      </div>
    );
  }

  if (type === "astronaut") {
    return (
      <div className="preview astronaut h-28 rounded-2xl relative overflow-hidden border border-white/15 shadow-[inset_0_1px_0_rgba(255,255,255,.24)] bg-[radial-gradient(120px_80px_at_50%_5%,rgba(255,255,255,.22),transparent_55%),linear-gradient(180deg,#264061,#101c39)]">
        <div className="planet absolute w-40 h-[26px] left-1/2 bottom-2 -translate-x-1/2 bg-[radial-gradient(closest-side,rgba(118,230,255,.35),transparent_72%)] blur-[4px]" />
        <div className="astro absolute left-1/2 top-4 -translate-x-1/2 w-[72px] h-[82px]">
          <div className="helmet absolute w-[52px] h-[52px] left-1/2 top-0 -translate-x-1/2 rounded-full bg-[linear-gradient(180deg,#ffffff,#d5ecff)] shadow-[0_0_0_4px_rgba(255,255,255,.18),0_0_0_1px_rgba(37,71,97,.25)_inset]" />
          <div className="visor absolute w-[30px] h-6 left-1/2 top-[13px] -translate-x-1/2 rounded-[14px_14px_10px_10px] bg-[linear-gradient(180deg,#324f75,#162540)] shadow-[inset_0_0_0_1px_rgba(118,230,255,.16)]" />
          <div className="bodyy absolute w-[42px] h-8 left-1/2 top-11 -translate-x-1/2 rounded-[18px_18px_12px_12px] bg-[linear-gradient(180deg,#ffffff,#dbeeff)]" />
          <div className="arm left absolute w-2.5 h-[26px] left-3 top-[50px] rotate-[28deg] rounded-[10px] bg-[#dbeeff]" />
          <div className="arm right absolute w-2.5 h-[26px] right-3 top-[50px] rotate-[-28deg] rounded-[10px] bg-[#dbeeff]" />
          <div className="leg left absolute w-2.5 h-6 left-6 top-[62px] rounded-[10px] bg-[#dbeeff]" />
          <div className="leg right absolute w-2.5 h-6 right-6 top-[62px] rounded-[10px] bg-[#dbeeff]" />
        </div>
      </div>
    );
  }

  return (
    <div className="preview mobile h-28 rounded-2xl relative overflow-hidden border border-white/15 shadow-[inset_0_1px_0_rgba(255,255,255,.24)] bg-[radial-gradient(100px_56px_at_50%_0%,rgba(255,255,255,.28),transparent_55%),linear-gradient(180deg,#27416d,#0f1a38)]">
      <div className="phone absolute left-1/2 top-2.5 -translate-x-1/2 w-16 h-[92px] rounded-[18px] bg-[linear-gradient(180deg,#0d1732,#16284e)] border-2 border-white/15 shadow-[0_0_0_2px_rgba(118,230,255,.15)] p-2.5 grid grid-cols-2 auto-rows-fr gap-1.5">
        <div className="app-tile t1 rounded-lg bg-[#ff7b8a]" />
        <div className="app-tile t2 rounded-lg bg-[#7be6ff]" />
        <div className="app-tile t3 rounded-lg bg-[#ffd96a]" />
        <div className="app-tile t4 rounded-lg bg-[#7df0c8]" />
      </div>
      <div className="cta-bar absolute left-1/2 bottom-2.5 -translate-x-1/2 w-[86px] h-1.5 rounded-full bg-[rgba(118,230,255,.52)] shadow-[0_0_12px_rgba(118,230,255,.4)]" />
    </div>
  );
}

function FloatingCube({ className, small = false }) {
  const z = small ? "translateZ(9px)" : "translateZ(15px)";
  return (
    <div className={cls("float-cube absolute pointer-events-none [transform-style:preserve-3d] [animation:drift_8s_ease-in-out_infinite] [filter:drop-shadow(0_10px_16px_rgba(0,0,0,.22))]", className)}>
      <span className="face front absolute inset-0 rounded-md border border-white/25 bg-[linear-gradient(180deg,rgba(255,255,255,.30),rgba(118,230,255,.16))] shadow-[inset_0_1px_0_rgba(255,255,255,.30),0_0_16px_rgba(118,230,255,.10)]" style={{ transform: z }} />
      <span className="face back absolute inset-0 rounded-md border border-white/25 bg-[linear-gradient(180deg,rgba(255,255,255,.30),rgba(118,230,255,.16))] shadow-[inset_0_1px_0_rgba(255,255,255,.30),0_0_16px_rgba(118,230,255,.10)]" style={{ transform: `rotateY(180deg) ${z}` }} />
      <span className="face left absolute inset-0 rounded-md border border-white/25 bg-[linear-gradient(180deg,rgba(255,255,255,.30),rgba(118,230,255,.16))] shadow-[inset_0_1px_0_rgba(255,255,255,.30),0_0_16px_rgba(118,230,255,.10)]" style={{ transform: `rotateY(-90deg) ${z}` }} />
      <span className="face right absolute inset-0 rounded-md border border-white/25 bg-[linear-gradient(180deg,rgba(255,255,255,.30),rgba(118,230,255,.16))] shadow-[inset_0_1px_0_rgba(255,255,255,.30),0_0_16px_rgba(118,230,255,.10)]" style={{ transform: `rotateY(90deg) ${z}` }} />
      <span className="face top absolute inset-0 rounded-md border border-white/25 bg-[linear-gradient(180deg,rgba(255,255,255,.30),rgba(118,230,255,.16))] shadow-[inset_0_1px_0_rgba(255,255,255,.30),0_0_16px_rgba(118,230,255,.10)]" style={{ transform: `rotateX(90deg) ${z}` }} />
      <span className="face bottom absolute inset-0 rounded-md border border-white/25 bg-[linear-gradient(180deg,rgba(255,255,255,.30),rgba(118,230,255,.16))] shadow-[inset_0_1px_0_rgba(255,255,255,.30),0_0_16px_rgba(118,230,255,.10)]" style={{ transform: `rotateX(-90deg) ${z}` }} />
    </div>
  );
}

function ElectricPanelBorder({ active }) {
  const filterId = useId().replace(/:/g, "");

  return (
    <div
      className={cls(
        "panel-electric-frame absolute inset-0 pointer-events-none",
        active && "is-active"
      )}
      aria-hidden="true"
    >
      <svg className="panel-electric-svg absolute h-0 w-0">
        <defs>
          <filter
            id={filterId}
            colorInterpolationFilters="sRGB"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
          >
            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise1" seed="1" />
            <feOffset in="noise1" dx="0" dy="0" result="offsetNoise1">
              <animate attributeName="dy" values="700; 0" dur="6s" repeatCount="indefinite" calcMode="linear" />
            </feOffset>

            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise2" seed="1" />
            <feOffset in="noise2" dx="0" dy="0" result="offsetNoise2">
              <animate attributeName="dy" values="0; -700" dur="6s" repeatCount="indefinite" calcMode="linear" />
            </feOffset>

            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise3" seed="2" />
            <feOffset in="noise3" dx="0" dy="0" result="offsetNoise3">
              <animate attributeName="dx" values="490; 0" dur="6s" repeatCount="indefinite" calcMode="linear" />
            </feOffset>

            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise4" seed="2" />
            <feOffset in="noise4" dx="0" dy="0" result="offsetNoise4">
              <animate attributeName="dx" values="0; -490" dur="6s" repeatCount="indefinite" calcMode="linear" />
            </feOffset>

            <feComposite in="offsetNoise1" in2="offsetNoise2" result="part1" />
            <feComposite in="offsetNoise3" in2="offsetNoise4" result="part2" />
            <feBlend in="part1" in2="part2" mode="color-dodge" result="combinedNoise" />
            <feDisplacementMap in="SourceGraphic" in2="combinedNoise" scale="30" xChannelSelector="R" yChannelSelector="B" />
          </filter>
        </defs>
      </svg>

      <div className="panel-electric-inner">
        <div className="panel-electric-border-outer">
          <div
            className="panel-electric-main"
            style={{ filter: `url(#${filterId})` }}
          />
        </div>
        <div className="panel-electric-glow-1" />
        <div className="panel-electric-glow-2" />
      </div>

      <div className="panel-electric-overlay-1" />
      <div className="panel-electric-overlay-2" />
      <div className="panel-electric-background" />
    </div>
  );
}

export default function PortfolioDeskReactTailwind() {
  const router = useRouter();
  const sceneRef = useRef(null);
  const worldRef = useRef(null);
  const frameRef = useRef(null);
  const toastTimerRef = useRef(null);
  const tiltRef = useRef({ targetX: 0, targetY: 0, currentX: 0, currentY: 0 });

  const [filter, setFilter] = useState("all");
  const [activeKey, setActiveKey] = useState("dashboard");
  const [toast, setToast] = useState({ show: false, text: "Portfolio system online ✨" });
  const [activePanel, setActivePanel] = useState("none");
  const [currentPage, setCurrentPage] = useState(0);
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0);

  useEffect(() => {
    const testimonialTimer = setInterval(() => {
      setActiveTestimonialIdx((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(testimonialTimer);
  }, []);

  const visibleProjects = useMemo(() => {
    return projectItems.filter((item) => filter === "all" || item.cats.includes(filter));
  }, [filter]);

  const paginatedProjects = useMemo(() => {
    const startIdx = currentPage * 3;
    return visibleProjects.slice(startIdx, startIdx + 3);
  }, [visibleProjects, currentPage]);

  const totalPages = Math.ceil(visibleProjects.length / 3);

  const activeProject = useMemo(() => {
    return projectItems.find((item) => item.key === activeKey) || visibleProjects[0] || projectItems[0];
  }, [activeKey, visibleProjects]);

  const latestWorkItems = useMemo(() => {
    return [...projectsData]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 2)
      .map((project, index) => ({
        target: project.id.toString(),
        title: project.title,
        meta: project.subtitle || project.tech,
        thumb: index % 2 === 0 ? "vr" : "shop",
        image: project.image,
      }));
  }, []);

  const workItems = latestWorkItems;

  const showToast = (message) => {
    setToast({ show: true, text: message });
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 2200);
  };

  const selectCard = (key) => {
    setActiveKey(key);
  };

  const goNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goPrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const applyFilter = (nextFilter) => {
    setFilter(nextFilter);
    setCurrentPage(0);
    const nextVisible = projectItems.filter(
      (item) => nextFilter === "all" || item.cats.includes(nextFilter)
    );
    if (nextVisible.length) {
      setActiveKey(nextVisible[0].key);
    }
  };

  const viewMore = () => {
    if (!visibleProjects.length) return;
    const index = Math.max(
      0,
      visibleProjects.findIndex((item) => item.key === activeKey)
    );
    const next = visibleProjects[(index + 1) % visibleProjects.length];
    setActiveKey(next.key);
    showToast(`Viewing: ${next.title}`);
  };

  // Bring panel to front helper
  const bringToFront = (panelId) => {
    setActivePanel(panelId);
  };

  const panelLayer = (panelId) => (activePanel === panelId ? "z-[80] is-active" : "z-10");

  useEffect(() => {
    showToast("3D portfolio loaded");
    return () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    };
  }, []);

  useEffect(() => {
    const animateTilt = () => {
      const t = tiltRef.current;
      t.currentX += (t.targetX - t.currentX) * 0.08;
      t.currentY += (t.targetY - t.currentY) * 0.08;

      if (worldRef.current) {
        if (typeof window !== "undefined" && window.innerWidth > 1080) {
          worldRef.current.style.transform = `rotateX(${t.currentY}deg) rotateY(${t.currentX}deg)`;
        } else {
          worldRef.current.style.transform = "none";
        }
      }

      frameRef.current = requestAnimationFrame(animateTilt);
    };

    frameRef.current = requestAnimationFrame(animateTilt);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const onPointerMove = (e) => {
    if (typeof window !== "undefined" && window.innerWidth <= 1080) return;
    const scene = sceneRef.current;
    if (!scene) return;
    const r = scene.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    tiltRef.current.targetX = px * 10;
    tiltRef.current.targetY = -py * 8;
  };

  const onPointerLeave = () => {
    tiltRef.current.targetX = 0;
    tiltRef.current.targetY = 0;
  };

  return (
    <>
      <style>{`
        :root{
          --bg-1:#0a1022;
          --bg-2:#101a33;
          --bg-3:#18274a;
          --panel:rgba(255,255,255,.12);
          --panel-2:rgba(255,255,255,.06);
          --line:rgba(255,255,255,.18);
          --white:#f5fbff;
          --text:#dfeeff;
          --muted:#9fb3d6;
          --cyan:#76e6ff;
          --cyan-2:#3eb7ff;
          --blue:#5f87ff;
          --shadow:0 28px 50px rgba(5,12,28,.45);
          --radius:28px;
          --soft:0 0 0 1px rgba(255,255,255,.08) inset, 0 12px 30px rgba(0,0,0,.24), 0 0 40px rgba(118,230,255,.08);
        }

        @keyframes shine{
          0%{transform:translateX(-120%) skewX(-18deg)}
          100%{transform:translateX(180%) skewX(-18deg)}
        }

        @keyframes meterIn{
          from{transform:scaleX(.1); opacity:.4}
          to{transform:scaleX(1); opacity:1}
        }

        @keyframes drift{
          0%,100%{translate:0 0}
          50%{translate:0 -14px}
        }

        @keyframes electricBorderPulse{
          0%,100%{
            opacity:.55;
          }
          50%{
            opacity:1;
          }
        }

        .bg-grid,
        .bg-grid::before,
        .bg-grid::after{
          position:fixed;
          inset:0;
          pointer-events:none;
        }

        .bg-grid{
          background-image:
            linear-gradient(rgba(255,255,255,.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.025) 1px, transparent 1px);
          background-size:40px 40px;
          -webkit-mask-image:radial-gradient(circle at 50% 45%, black 25%, transparent 80%);
          mask-image:radial-gradient(circle at 50% 45%, black 25%, transparent 80%);
          opacity:.35;
        }

        .bg-grid::before{
          content:"";
          background:
            radial-gradient(circle at 15% 30%, rgba(118,230,255,.7) 0 2px, transparent 3px),
            radial-gradient(circle at 82% 24%, rgba(118,230,255,.5) 0 2px, transparent 3px),
            radial-gradient(circle at 76% 72%, rgba(95,135,255,.5) 0 2px, transparent 3px),
            radial-gradient(circle at 28% 82%, rgba(118,230,255,.55) 0 2px, transparent 3px),
            radial-gradient(circle at 42% 18%, rgba(255,255,255,.55) 0 1.5px, transparent 2.5px);
          opacity:.8;
          filter:blur(.2px);
        }

        .bg-grid::after{
          content:"";
          background:
            radial-gradient(closest-side, rgba(118,230,255,.18), transparent 70%) 12% 22%/180px 180px no-repeat,
            radial-gradient(closest-side, rgba(95,135,255,.16), transparent 70%) 88% 18%/220px 220px no-repeat,
            radial-gradient(closest-side, rgba(118,230,255,.10), transparent 70%) 50% 88%/420px 140px no-repeat;
          filter:blur(20px);
          opacity:.85;
        }

        .panel{
          transform-style:preserve-3d;
          transition:transform .28s ease, box-shadow .28s ease, border-color .28s ease;
        }

        .panel > :not(.panel-electric-frame){
          position:relative;
          z-index:1;
        }

        .panel::before{
          content:"";
          position:absolute;
          inset:1px;
          border-radius:calc(28px - 1px);
          pointer-events:none;
          background:
            linear-gradient(140deg, rgba(255,255,255,.18), transparent 25%),
            linear-gradient(180deg, transparent 60%, rgba(118,230,255,.08));
          -webkit-mask:linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          mask:linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          padding:1px;
          -webkit-mask-composite:xor;
          mask-composite:exclude;
          opacity:.85;
          border-radius:inherit;
        }

        .panel::after{
          content:"";
          position:absolute;
          inset:auto -35% 72% -10%;
          height:36%;
          background:linear-gradient(110deg, transparent 20%, rgba(255,255,255,.28) 40%, transparent 60%);
          transform:skewX(-18deg);
          opacity:.45;
          pointer-events:none;
          animation:shine 9s linear infinite;
        }

        .panel:hover{
          border-color:rgba(118,230,255,.45)!important;
          box-shadow:
            0 0 0 1px rgba(118,230,255,.16) inset,
            0 18px 44px rgba(2,7,20,.46),
            0 0 44px rgba(118,230,255,.14)!important;
        }

        .panel.is-active {
          background: linear-gradient(180deg, rgba(2,15,5,.92), rgba(0,8,2,.98)) !important;
          border-color: rgba(0,255,65,.5) !important;
          box-shadow:
            0 0 0 1px rgba(0,255,65,.25) inset,
            0 18px 44px rgba(2,7,20,.65),
            0 0 54px rgba(0,255,65,.2) !important;
        }

        .panel.is-active::before {
          background:
            linear-gradient(140deg, rgba(0,255,65,.15), transparent 25%),
            linear-gradient(180deg, transparent 60%, rgba(0,255,65,.08)) !important;
        }

        .panel-electric-frame{
          --electric-border-color:#00ff41;
          --electric-light-color:rgba(0,255,65,.98);
          --electric-gradient-color:rgba(0,255,65,.2);
          z-index:0;
          opacity:0;
          transition:opacity .22s ease;
        }

        .panel-electric-svg{
          position:absolute;
        }

        .panel-electric-inner{
          position:absolute;
          inset:0;
        }

        .panel-electric-border-outer,
        .panel-electric-main,
        .panel-electric-glow-1,
        .panel-electric-glow-2,
        .panel-electric-overlay-1,
        .panel-electric-overlay-2,
        .panel-electric-background{
          position:absolute;
          inset:0;
          border-radius:inherit;
        }

        .panel-electric-border-outer{
          border:2px solid rgba(118,230,255,.35);
          transform:translate(3px,3px);
        }

        .panel-electric-main{
          border:2px solid var(--electric-border-color);
          transform:translate(-3px,-3px);
          background:transparent;
        }

        .panel-electric-glow-1{
          border:2px solid rgba(118,230,255,.55);
          filter:blur(1px);
        }

        .panel-electric-glow-2{
          border:2px solid var(--electric-light-color);
          filter:blur(4px);
        }

        .panel-electric-overlay-1,
        .panel-electric-overlay-2{
          transform:scale(1.04);
          filter:blur(14px);
          background:linear-gradient(-30deg, rgba(255,255,255,.9), transparent 30%, transparent 70%, rgba(255,255,255,.9));
          mix-blend-mode:screen;
        }

        .panel-electric-overlay-1{
          opacity:.55;
        }

        .panel-electric-overlay-2{
          opacity:.28;
        }

        .panel-electric-background{
          transform:scale(1.06);
          filter:blur(24px);
          opacity:.18;
          background:linear-gradient(-30deg, var(--electric-light-color), transparent, var(--electric-border-color));
        }

        .panel-electric-frame.is-active{
          opacity:1;
          animation:electricBorderPulse 1.3s ease-in-out infinite;
        }

        .platform::before,
        .platform::after{
          content:"";
          position:absolute;
          border-radius:inherit;
        }

        .platform::before{
          inset:12px;
          border-radius:38px;
          border:1px solid rgba(255,255,255,.12);
          background:linear-gradient(180deg, rgba(255,255,255,.12), rgba(255,255,255,.03) 20%, rgba(0,0,0,.15) 100%);
          box-shadow:inset 0 0 0 1px rgba(118,230,255,.08);
        }

        .platform::after{
          inset:28px 90px;
          border-radius:30px;
          box-shadow:inset 0 0 0 1px rgba(118,230,255,.18), 0 0 30px rgba(118,230,255,.12);
        }

        .preview.dashboard .hud::before{
          content:"";
          position:absolute;
          left:10px; right:10px; top:10px;
          height:10px;
          border-radius:8px;
          background:linear-gradient(90deg, #7ae4ff 0 28%, #7d8eff 28% 58%, #65f0c8 58% 100%);
          opacity:.8;
        }

        .preview.dashboard .panel-a::before{
          content:"";
          position:absolute;
          left:10px; right:10px; top:50%;
          height:2px;
          background:linear-gradient(90deg, rgba(118,230,255,.0), rgba(118,230,255,.75), rgba(118,230,255,0));
          transform:translateY(-50%);
          box-shadow:0 0 10px rgba(118,230,255,.3);
        }

        .preview.dashboard .panel-b::before{
          content:"";
          position:absolute;
          inset:12px 14px 14px;
          background:
            linear-gradient(180deg, transparent 0 60%, rgba(118,230,255,.26) 60% 62%, transparent 62% 100%),
            linear-gradient(90deg, #78e8ff 0 22%, transparent 22% 30%, #72f0cc 30% 52%, transparent 52% 60%, #79a2ff 60% 100%);
          border-radius:8px;
          opacity:.8;
        }

        .avatar-box::before{
          content:"";
          position:absolute;
          inset:0;
          background:
            linear-gradient(90deg, rgba(255,255,255,.08) 0 1px, transparent 1px 28px),
            linear-gradient(rgba(255,255,255,.06) 0 1px, transparent 1px 28px);
          background-size:28px 28px;
          opacity:.25;
        }

        .avatar .glasses::before,
        .avatar .glasses::after{
          content:"";
          position:absolute;
          width:30px;
          height:24px;
          top:0;
          border:3px solid #1f2739;
          border-radius:8px;
          background:rgba(118,230,255,.10);
        }
        .avatar .glasses::before{left:0}
        .avatar .glasses::after{right:0}

        .thumb.vr::before{
          content:"";
          position:absolute;
          inset:10px 16px 22px;
          border-radius:10px;
          background:linear-gradient(180deg, #5ae0ff, #6e8dff);
          opacity:.9;
        }

        .thumb.vr::after{
          content:"";
          position:absolute;
          width:44px;
          height:18px;
          left:21px;
          bottom:10px;
          border-radius:10px;
          background:#0c1732;
          box-shadow:0 0 0 2px rgba(255,255,255,.16);
        }

        .thumb.shop::before{
          content:"";
          position:absolute;
          inset:10px;
          border-radius:10px;
          background:
            linear-gradient(180deg, #7be6ff 0 18%, transparent 18% 100%),
            linear-gradient(90deg, rgba(255,255,255,.16) 0 48%, transparent 48% 52%, rgba(255,255,255,.16) 52% 100%);
        }

        .thumb.shop::after{
          content:"";
          position:absolute;
          left:14px;
          bottom:12px;
          width:56px;
          height:12px;
          border-radius:8px;
          background:linear-gradient(90deg, #ffd96b, #7ef0cb);
        }

        @media (max-width:1080px){
          body{overflow:auto!important}
        }
      `}</style>

      <div className="fixed inset-0 text-[#f5fbff] overflow-hidden max-[1080px]:overflow-y-auto max-[1080px]:static max-[1080px]:min-h-screen m-0 font-[Inter,ui-sans-serif,system-ui,-apple-system,Segoe_UI,Roboto,Arial,sans-serif] ">
        <div className="bg-grid" />

        <div className="min-h-screen grid place-items-center p-[18px] max-[1080px]:flex max-[1080px]:flex-col max-[1080px]:pt-[20px] max-[1080px]:h-auto">
          <div
            ref={sceneRef}
            onPointerMove={onPointerMove}
            onPointerLeave={onPointerLeave}
            className="relative w-[min(1220px,98vw)] h-[min(790px,96vh)] [perspective:1800px] [perspective-origin:50%_42%] max-[1080px]:h-auto max-[1080px]:min-h-[100svh] max-[1080px]:[perspective:none]"
          >
            <div
              className={cls(
                "absolute left-1/2 top-4 z-20 max-w-[min(90vw,520px)] -translate-x-1/2 rounded-full border border-[rgba(118,230,255,.24)] bg-[rgba(8,16,34,.7)] px-3.5 py-2.5 text-center text-xs font-bold tracking-[.01em] text-[#eff8ff] shadow-[0_16px_28px_rgba(0,0,0,.28),0_0_20px_rgba(118,230,255,.10)] [backdrop-filter:blur(14px)] pointer-events-none transition-all duration-200",
                toast.show ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2.5"
              )}
            >
              {toast.text}
            </div>

            <div
              ref={worldRef}
              className="relative h-full w-full [transform-style:preserve-3d] transition-transform duration-200 ease-out [filter:drop-shadow(0_18px_40px_rgba(0,0,0,.28))] max-[1080px]:grid max-[1080px]:h-auto max-[1080px]:grid-cols-12 max-[1080px]:gap-4 max-[1080px]:items-start max-[1080px]:px-0 max-[1080px]:pt-3 max-[1080px]:pb-[110px] max-[1080px]:[transform:none!important] max-[760px]:grid-cols-1"
            >
              <div className="platform-glow absolute left-1/2 bottom-8 h-[92px] w-[76%] -translate-x-1/2 [transform:translateX(-50%)_translateZ(-25px)] bg-[radial-gradient(closest-side,rgba(118,230,255,.28),rgba(95,135,255,.10)_52%,transparent_72%)] blur-[22px] pointer-events-none max-[1080px]:hidden" />

              <div className="platform absolute left-1/2 bottom-7 h-[165px] w-[min(980px,86%)] -translate-x-1/2 rounded-[48px] border border-white/20 bg-[linear-gradient(180deg,rgba(255,255,255,.3),rgba(255,255,255,.08)_28%,rgba(10,17,32,.9)_30%,rgba(13,22,40,.95)_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,.35),inset_0_-18px_32px_rgba(0,0,0,.35),0_20px_40px_rgba(0,0,0,.35),0_0_60px_rgba(118,230,255,.08)] [transform:translateX(-50%)_rotateX(71deg)_translateZ(-30px)] [transform-style:preserve-3d] max-[1080px]:hidden" />

              <div className="connector absolute left-[210px] top-[238px] h-0.5 w-[120px] rounded-full bg-[linear-gradient(90deg,transparent,rgba(118,230,255,.45),transparent)] opacity-80 [filter:blur(.2px)] [transform:rotate(8deg)_translateZ(20px)] pointer-events-none max-[1080px]:hidden" />
              <div className="connector absolute right-[220px] top-[235px] h-0.5 w-[130px] rounded-full bg-[linear-gradient(90deg,transparent,rgba(118,230,255,.45),transparent)] opacity-80 [filter:blur(.2px)] [transform:rotate(-10deg)_translateZ(20px)] pointer-events-none max-[1080px]:hidden" />
              <div className="connector absolute left-[355px] bottom-[212px] h-0.5 w-40 rounded-full bg-[linear-gradient(90deg,transparent,rgba(118,230,255,.45),transparent)] opacity-80 [filter:blur(.2px)] [transform:rotate(-7deg)_translateZ(25px)] pointer-events-none max-[1080px]:hidden" />
              <div className="connector absolute right-[280px] bottom-[186px] h-0.5 w-[140px] rounded-full bg-[linear-gradient(90deg,transparent,rgba(118,230,255,.45),transparent)] opacity-80 [filter:blur(.2px)] [transform:rotate(11deg)_translateZ(25px)] pointer-events-none max-[1080px]:hidden" />

              <FloatingCube className="cube-a left-2 top-[150px] h-[30px] w-[30px] [transform:translateZ(24px)_rotateX(-18deg)_rotateY(24deg)] [animation-delay:-1s] max-[1080px]:hidden" />
              <FloatingCube className="cube-b right-0.5 top-[148px] h-[34px] w-[34px] [transform:translateZ(34px)_rotateX(18deg)_rotateY(-28deg)] [animation-delay:-2.5s] max-[1080px]:hidden" />
              <FloatingCube small className="cube-c left-9 top-[240px] h-[18px] w-[18px] [transform:translateZ(42px)_rotateX(22deg)_rotateY(18deg)] [animation-delay:-3.4s] max-[1080px]:hidden" />
              <FloatingCube small className="cube-d right-[84px] top-[222px] h-[22px] w-[22px] [transform:translateZ(26px)_rotateX(-16deg)_rotateY(20deg)] [animation-delay:-1.7s] max-[1080px]:hidden" />

              {/* LEFT PROFILE PANEL */}
              <aside
                onClick={() => bringToFront("profile")}
                className={cls(
                  "panel absolute left-[18px] top-[52px] min-h-[460px] w-[220px] overflow-hidden rounded-[28px] border border-white/20 bg-[linear-gradient(180deg,rgba(255,255,255,.22),rgba(255,255,255,.08)_12%,rgba(255,255,255,.05)_18%,rgba(8,14,28,.42)_100%),linear-gradient(145deg,rgba(118,230,255,.10),rgba(95,135,255,.06))] p-4 shadow-[0_0_0_1px_rgba(255,255,255,.08)_inset,0_12px_30px_rgba(0,0,0,.24),0_0_40px_rgba(118,230,255,.08),0_28px_50px_rgba(5,12,28,.45)] [backdrop-filter:blur(18px)] [-webkit-backdrop-filter:blur(18px)] [transform:translateZ(60px)_rotateY(14deg)_rotateX(2deg)] cursor-pointer max-[1080px]:relative max-[1080px]:inset-auto max-[1080px]:col-span-4 max-[1080px]:min-h-0 max-[1080px]:w-auto max-[1080px]:[transform:none!important] max-[760px]:col-span-1",
                  panelLayer("profile")
                )}
              >
                <ElectricPanelBorder active={activePanel === "profile"} />
                <div className="avatar-box relative mb-3 h-[180px] overflow-hidden rounded-[22px] border border-white/25 bg-[radial-gradient(160px_120px_at_50%_15%,rgba(255,255,255,.5),transparent_45%),linear-gradient(180deg,rgba(150,195,255,.45),rgba(58,92,138,.35)_35%,rgba(24,39,73,.8)_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,.4),inset_0_-16px_24px_rgba(0,0,0,.28)]">
                  <div className="avatar absolute inset-0 [transform:translateZ(18px)]">
                    <RenderModels><Me /></RenderModels>
                  </div>
                </div>

                <h2 className="mb-0.5 text-[26px] font-extrabold leading-none tracking-[-.03em] max-[760px]:text-2xl">Vidura Kavinda</h2>
                <p className="mb-3.5 text-[13px] font-bold text-[#9fb3d6]">FULLSTACK DEVELOPER &amp; DEVOPS</p>

                <div className="my-3 grid grid-cols-3 gap-2">
                  {[
                    ["6+", "Years"],
                    ["15+", "Projects"],
                    ["24/7", "Creative"],
                  ].map(([num, label]) => (
                    <div key={label} className="rounded-2xl border border-white/10 bg-white/[.06] px-1.5 py-2.5 text-center shadow-[inset_0_1px_0_rgba(255,255,255,.08)]">
                      <strong className="mb-1 block text-[18px] leading-none">{num}</strong>
                      <span className="text-[11px] font-bold text-[#9fb3d6]">{label}</span>
                    </div>
                  ))}
                </div>

                <div className="grid gap-2.5">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      showToast(
                        "About Me: I design sleek product interfaces, 3D web experiences, and polished interactive systems."
                      );
                    }}
                    className="cursor-pointer rounded-full bg-[linear-gradient(180deg,#9beeff,#6ccfff)] px-4 py-2.5 text-sm font-extrabold text-[#173050] shadow-[0_12px_20px_rgba(118,230,255,.18)] transition duration-150 hover:-translate-y-0.5"
                  >
                    <Link href="/about">About Me</Link>
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      showToast("Contact panel ready on the right. Yes, it glows on purpose.");

                    }}
                    className="cursor-pointer rounded-full border border-white/15 bg-white/[.08] px-3.5 py-[9px] text-xs font-bold text-[#eff7ff] transition duration-150 hover:-translate-y-0.5"
                  >
                    <Link href="/contact">Contact Me </Link>
                  </button>
                </div>

                <div className="mt-3.5 flex items-center justify-between gap-2">
                  {socialLinks.map(({ label, href, title, external }) => (
                    <a
                      key={title}
                      href={href}
                      title={title}
                      aria-label={title}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noreferrer noopener" : undefined}
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      className="grid h-[34px] w-[34px] shrink-0 place-items-center rounded-xl border border-white/15 bg-white/[.08] text-[13px] font-extrabold text-[#eaf7ff] transition duration-150 hover:-translate-y-0.5 hover:bg-[rgba(118,230,255,.14)] hover:shadow-[0_0_20px_rgba(118,230,255,.12)]"
                    >
                      {title === "Call" ? "☎" : label}
                    </a>
                  ))}
                </div>

                <div className="mt-3.5 hidden gap-2">
                  {[
                    ["f", "Facebook placeholder"],
                    ["x", "X / Twitter placeholder"],
                    ["in", "LinkedIn placeholder"],
                    ["📞", "Call placeholder"],
                  ].map(([label, msg]) => (
                    <button
                      key={label}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        showToast(msg);
                      }}
                      className="grid h-[34px] w-[34px] place-items-center rounded-xl border border-white/15 bg-white/[.08] text-[13px] font-extrabold text-[#eaf7ff] transition duration-150 hover:-translate-y-0.5 hover:bg-[rgba(118,230,255,.14)] hover:shadow-[0_0_20px_rgba(118,230,255,.12)]"
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </aside>

              {/* CENTER PORTFOLIO PANEL */}
              <main
                onClick={() => bringToFront("portfolio")}
                className={cls(
                  "panel absolute left-1/2 top-7 min-h-[352px] w-[min(560px,50%)] -translate-x-1/2 overflow-hidden rounded-[28px] border border-white/20 bg-[linear-gradient(180deg,rgba(255,255,255,.22),rgba(255,255,255,.08)_12%,rgba(255,255,255,.05)_18%,rgba(8,14,28,.42)_100%),linear-gradient(145deg,rgba(118,230,255,.10),rgba(95,135,255,.06))] p-4 shadow-[0_0_0_1px_rgba(255,255,255,.08)_inset,0_12px_30px_rgba(0,0,0,.24),0_0_40px_rgba(118,230,255,.08),0_28px_50px_rgba(5,12,28,.45)] [backdrop-filter:blur(18px)] [-webkit-backdrop-filter:blur(18px)] [transform:translateX(-50%)_translateZ(76px)_rotateX(2deg)] cursor-pointer max-[1080px]:relative max-[1080px]:inset-auto max-[1080px]:col-span-8 max-[1080px]:min-h-0 max-[1080px]:w-auto max-[1080px]:translate-x-0 max-[1080px]:[transform:none!important] max-[760px]:col-span-1",
                  panelLayer("portfolio")
                )}
              >
                <ElectricPanelBorder active={activePanel === "portfolio"} />
                <div className="mb-2.5 flex items-center justify-between gap-3 max-[760px]:flex-col max-[760px]:items-start">
                  <div className="flex items-center gap-1.5 text-sm font-extrabold text-[#eff8ff]">
                    <span className="grid grid-cols-2 gap-1">
                      <i className="block h-2 w-2 rounded-[2px] bg-[#ff7b8a]" />
                      <i className="block h-2 w-2 rounded-[2px] bg-[#ffd66b]" />
                      <i className="block h-2 w-2 rounded-[2px] bg-[#70f0d1]" />
                      <i className="block h-2 w-2 rounded-[2px] bg-[#73afff]" />
                    </span>
                    <span>My Portfolio</span>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (activeProject && activeProject.id) {
                        router.push(`/projects?target=${activeProject.id}`);
                      } else {
                        router.push('/projects');
                      }
                    }}
                    className="cursor-pointer rounded-full border border-white/15 bg-white/[.08] px-3.5 py-[9px] text-xs font-bold text-[#eff7ff] transition duration-150 hover:-translate-y-0.5"
                  >
                    View More
                  </button>
                </div>

                <div className="mb-3.5 flex flex-wrap gap-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.key}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        applyFilter(tab.key);
                      }}
                      className={cls(
                        "cursor-pointer rounded-full border px-3 py-[7px] text-[11px] font-bold tracking-[.01em] transition duration-150 hover:-translate-y-0.5",
                        filter === tab.key
                          ? "border-transparent bg-[linear-gradient(180deg,rgba(255,255,255,.9),rgba(227,241,255,.85))] text-[#223052] shadow-[0_8px_18px_rgba(255,255,255,.16)]"
                          : "border-white/15 bg-white/[.07] text-[#d4e3ff]"
                      )}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-3 max-[760px]:grid-cols-1">
                  {paginatedProjects.map((project) => {
                    return (
                      <article
                        key={project.key}
                        onClick={(e) => {
                          e.stopPropagation();
                          selectCard(project.key);
                        }}
                        className={cls(
                          "min-w-0 cursor-pointer flex-col gap-[9px] rounded-[20px] border bg-white/[.14] p-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,.12)] transition duration-200",
                          "flex",
                          activeKey === project.key
                            ? "border-[rgba(118,230,255,.55)] bg-[linear-gradient(180deg,rgba(118,230,255,.11),rgba(255,255,255,.05))] shadow-[0_0_0_1px_rgba(118,230,255,.18)_inset,0_14px_30px_rgba(0,0,0,.28),0_0_24px_rgba(118,230,255,.18)]"
                            : "border-white/15 hover:-translate-y-[5px] hover:border-[rgba(118,230,255,.36)] hover:shadow-[0_16px_24px_rgba(0,0,0,.25),0_0_18px_rgba(118,230,255,.12)]"
                        )}
                      >
                        {project.image ? (
                          <div className="preview h-28 rounded-2xl relative overflow-hidden border border-white/15 shadow-[inset_0_1px_0_rgba(255,255,255,.24)]">
                            <img src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover" />
                          </div>
                        ) : (
                          <Preview type={project.type} />
                        )}
                        <div className="text-xs font-extrabold leading-[1.3] text-[#eef7ff]">{project.title}</div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (project && project.id) {
                              router.push(`/projects?target=${project.id}`);
                            } else {
                              router.push('/projects');
                            }
                          }}
                          className="inline-flex w-fit items-center justify-center self-start rounded-full bg-white/[.92] px-2.5 py-1.5 text-[10px] font-extrabold text-[#243252]"
                          aria-label={`View ${project.title} project`}
                        >
                          View Project
                        </button>
                      </article>
                    );
                  })}
                </div>

                {totalPages > 1 && (
                  <div className="mt-3.5 flex items-center justify-center gap-3">
                    <button
                      onClick={goPrevPage}
                      disabled={currentPage === 0}
                      className="px-4 py-2 rounded-lg bg-white/[.06] border border-white/15 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/[.12] transition"
                    >
                      ← Previous
                    </button>
                    <div className="text-sm text-white/60">
                      Page {currentPage + 1} of {totalPages}
                    </div>
                    <button
                      onClick={goNextPage}
                      disabled={currentPage === totalPages - 1}
                      className="px-4 py-2 rounded-lg bg-white/[.06] border border-white/15 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/[.12] transition"
                    >
                      Next →
                    </button>
                  </div>
                )}

                <div className="mt-3.5 flex items-center justify-between gap-3 rounded-[18px] border border-white/20 bg-white/[.14] px-3.5 py-3 max-[760px]:flex-col max-[760px]:items-start">
                  <div className="min-w-0">
                    <div className="mb-[3px] text-[11px] font-extrabold uppercase tracking-[.12em] text-[#76e6ff]">Selected Project</div>
                    <div className="truncate text-sm font-extrabold">{activeProject.title}</div>
                    <div className="truncate text-xs text-[#9fb3d6]">{activeProject.note}</div>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (activeProject && activeProject.link) {
                        window.open(activeProject.link, '_blank', 'noopener,noreferrer');
                      }
                    }}
                    className="cursor-pointer rounded-full bg-[linear-gradient(180deg,#9beeff,#6ccfff)] px-4 py-2.5 text-sm font-extrabold text-[#173050] shadow-[0_12px_20px_rgba(118,230,255,.18)] transition duration-150 hover:-translate-y-0.5"
                    aria-label="Open project repository in a new tab"
                  >
                    Open
                  </button>
                </div>
              </main>

              {/* RIGHT SKILLS PANEL */}
              <section
                onClick={() => bringToFront("skills")}
                className={cls(
                  "panel absolute right-[22px] top-14 min-h-[154px] w-[210px] overflow-hidden rounded-[28px] border border-white/20 bg-[linear-gradient(180deg,rgba(255,255,255,.22),rgba(255,255,255,.08)_12%,rgba(255,255,255,.05)_18%,rgba(8,14,28,.42)_100%),linear-gradient(145deg,rgba(118,230,255,.10),rgba(95,135,255,.06))] p-4 shadow-[0_0_0_1px_rgba(255,255,255,.08)_inset,0_12px_30px_rgba(0,0,0,.24),0_0_40px_rgba(118,230,255,.08),0_28px_50px_rgba(5,12,28,.45)] [backdrop-filter:blur(18px)] [-webkit-backdrop-filter:blur(18px)] [transform:translateZ(58px)_rotateY(-15deg)_rotateX(2deg)] cursor-pointer max-[1080px]:relative max-[1080px]:inset-auto max-[1080px]:col-span-4 max-[1080px]:min-h-0 max-[1080px]:w-auto max-[1080px]:[transform:none!important] max-[760px]:col-span-1",
                  panelLayer("skills")
                )}
              >
                <ElectricPanelBorder active={activePanel === "skills"} />
                <h3 className="mb-3 flex items-center gap-2 text-lg font-extrabold tracking-[.01em]">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#76e6ff] shadow-[0_0_14px_rgba(118,230,255,.95)]" />
                  Skills
                </h3>
                <div className="mt-2.5 grid gap-2.5">
                  {[
                    ["UI/UX Design", "93%", "93%"],
                    ["3D Modeling", "88%", "88%"],
                    ["Animation", "81%", "81%"],
                    ["Web Development", "90%", "90%"],
                  ].map(([name, score, width]) => (
                    <div key={name} className="grid grid-cols-[1fr_auto] items-center gap-x-2.5 gap-y-2">
                      <div className="text-xs font-bold text-[#eaf5ff]">{name}</div>
                      <div className="text-[11px] font-extrabold text-[#dbeeff]">{score}</div>
                      <div className="col-span-full h-2.5 overflow-hidden rounded-full border border-white/10 bg-white/[.08]">
                        <span
                          className="block h-full rounded-full bg-[linear-gradient(90deg,#7de9ff,#6cb1ff)] shadow-[0_0_12px_rgba(118,230,255,.4)] [animation:meterIn_1s_ease_both] origin-left"
                          style={{ width }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* RIGHT TESTIMONIALS PANEL */}
              <section
                onClick={() => bringToFront("testimonials")}
                className={cls(
                  "panel absolute right-1 top-[242px] min-h-[220px] w-[250px] overflow-hidden rounded-[28px] border border-white/20 bg-[linear-gradient(180deg,rgba(255,255,255,.22),rgba(255,255,255,.08)_12%,rgba(255,255,255,.05)_18%,rgba(8,14,28,.42)_100%),linear-gradient(145deg,rgba(118,230,255,.10),rgba(95,135,255,.06))] p-4 shadow-[0_0_0_1px_rgba(255,255,255,.08)_inset,0_12px_30px_rgba(0,0,0,.24),0_0_40px_rgba(118,230,255,.08),0_28px_50px_rgba(5,12,28,.45)] [backdrop-filter:blur(18px)] [-webkit-backdrop-filter:blur(18px)] [transform:translateZ(62px)_rotateY(-12deg)_rotateX(1deg)] cursor-pointer max-[1080px]:relative max-[1080px]:inset-auto max-[1080px]:col-span-4 max-[1080px]:min-h-0 max-[1080px]:w-auto max-[1080px]:[transform:none!important] max-[760px]:col-span-1",
                  panelLayer("testimonials")
                )}
              >
                <ElectricPanelBorder active={activePanel === "testimonials"} />
                <h3 className="mb-3 flex items-center gap-2 text-lg font-extrabold tracking-[.01em]">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#76e6ff] shadow-[0_0_14px_rgba(118,230,255,.95)]" />
                  Testimonials
                </h3>
                <div className="relative h-[90px] w-full">
                  {testimonials.map((testimonial, idx) => (
                    <div
                      key={idx}
                      className={cls(
                        "absolute inset-0 transition-opacity duration-500",
                        activeTestimonialIdx === idx ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                      )}
                    >
                      <div className="my-2 rounded-2xl border border-white/20 bg-white/[.14] px-3.5 py-3 text-[10px] leading-[1.5] text-[#edf8ff]">
                        "{testimonial.text}"
                      </div>
                      <div className="flex justify-end text-[9px] font-bold text-[#9fb3d6]">
                        {testimonial.name}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* BOTTOM LEFT LATEST WORKS PANEL */}
              <section
                onClick={() => bringToFront("works")}
                className={cls(
                  "panel absolute bottom-[86px] left-[286px] min-h-[158px] w-[394px] overflow-hidden rounded-[28px] border border-white/20 bg-[linear-gradient(180deg,rgba(255,255,255,.22),rgba(255,255,255,.08)_12%,rgba(255,255,255,.05)_18%,rgba(8,14,28,.42)_100%),linear-gradient(145deg,rgba(118,230,255,.10),rgba(95,135,255,.06))] p-4 shadow-[0_0_0_1px_rgba(255,255,255,.08)_inset,0_12px_30px_rgba(0,0,0,.24),0_0_40px_rgba(118,230,255,.08),0_28px_50px_rgba(5,12,28,.45)] [backdrop-filter:blur(18px)] [-webkit-backdrop-filter:blur(18px)] [transform:translateZ(55px)_rotateX(5deg)_rotateY(3deg)] cursor-pointer max-[1080px]:relative max-[1080px]:inset-auto max-[1080px]:col-span-8 max-[1080px]:min-h-0 max-[1080px]:w-auto max-[1080px]:[transform:none!important] max-[760px]:col-span-1",
                  panelLayer("works")
                )}
              >
                <ElectricPanelBorder active={activePanel === "works"} />
                <h3 className="mb-3 flex items-center gap-2 text-lg font-extrabold tracking-[.01em]">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#76e6ff] shadow-[0_0_14px_rgba(118,230,255,.95)]" />
                  Latest Works
                </h3>
                <div className="mt-2.5 grid grid-cols-2 gap-3 max-[780px]:grid-cols-1">
                  {latestWorkItems.map((work) => (
                    <div
                      key={work.title}
                      onClick={(e) => {
                        e.stopPropagation();
                        selectCard(work.target);
                        const target = projectItems.find((p) => p.key === work.target);
                        if (target) showToast(`Focused: ${target.title}`);
                      }}
                      className="flex cursor-pointer items-center gap-2.5 rounded-[18px] border border-white/20 bg-white/[.14] p-2.5 transition duration-150 hover:-translate-y-[3px] hover:border-[rgba(118,230,255,.35)] hover:bg-[rgba(118,230,255,.15)]"
                    >
                      {work.image ? (
                        <div className="relative h-[52px] w-[68px] shrink-0 overflow-hidden rounded-[12px] border border-white/15 shadow-[inset_0_1px_0_rgba(255,255,255,.24)]">
                          <img src={work.image} alt={work.title} className="absolute inset-0 w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div className={cls("thumb relative h-[52px] w-[68px] shrink-0 overflow-hidden rounded-[12px] border border-white/15 bg-[linear-gradient(180deg,#213764,#101c39)]", work.thumb)} />
                      )}
                      <div className="min-w-0 flex-1">
                        <div className="text-[11px] font-extrabold leading-[1.2] truncate" title={work.title}>{work.title}</div>
                        <div className="mt-1 text-[10px] text-[#9fb3d6] truncate" title={work.meta}>{work.meta}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* BOTTOM RIGHT MINI MODEL PANEL */}
              <section className="z-10 absolute bottom-[88px] right-[286px] min-h-[128px] w-[305px] overflow-hidden pointer-events-none max-lg:hidden">
                <div className="pointer-events-none w-full h-full"> {/* 👈 */}
                  <RenderModels>
                    <Mini />
                  </RenderModels>
                </div>
              </section>
              {/* BOTTOM RIGHT CONTACT PANEL */}
              <section
                onClick={() => bringToFront("contact")}
                className={cls(
                  "panel absolute bottom-[88px] right-11 max-h-[178px] lg:max-h-[158px] w-[305px] overflow-hidden rounded-[28px] border border-white/20 bg-[linear-gradient(180deg,rgba(255,255,255,.22),rgba(255,255,255,.08)_12%,rgba(255,255,255,.05)_18%,rgba(8,14,28,.42)_100%),linear-gradient(145deg,rgba(118,230,255,.10),rgba(95,135,255,.06))] p-4 shadow-[0_0_0_1px_rgba(255,255,255,.08)_inset,0_12px_30px_rgba(0,0,0,.24),0_0_40px_rgba(118,230,255,.08),0_28px_50px_rgba(5,12,28,.45)] [backdrop-filter:blur(18px)] [-webkit-backdrop-filter:blur(18px)] [transform:translateZ(60px)_rotateY(-10deg)_rotateX(4deg)] cursor-pointer max-[1080px]:relative max-[1080px]:inset-auto max-[1080px]:col-span-4 max-[1080px]:min-h-0 max-[1080px]:w-auto max-[1080px]:[transform:none!important] max-[760px]:col-span-1",
                  panelLayer("contact")
                )}
              >
                <ElectricPanelBorder active={activePanel === "contact"} />
                <h3 className="mb-3 flex items-center gap-2 text-lg font-extrabold tracking-[.01em]">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#76e6ff] shadow-[0_0_14px_rgba(118,230,255,.95)]" />
                  Get In Touch!
                </h3>
                <p className="text-xs leading-[1.4] text-[#9fb3d6]">
                  Available for freelance, full-time product design, and interactive 3D web projects.
                </p>
                <div className="mt-3 flex items-center justify-between gap-2.5 max-[760px]:flex-col max-[760px]:items-stretch">
                  <a
                    href="mailto:vidurakavindadev@gmail.com"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className="flex min-w-0 flex-1 items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap rounded-2xl border border-white/15 bg-white/[.08] px-3 py-2.5 text-xs font-bold text-[#eef7ff]"
                  >
                    <span>✉</span>
                    <span className="truncate">vidurakavindadev@gmail.com</span>
                  </a>
                  <a
                    href="mailto:vidurakavindadev@gmail.com"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className="cursor-pointer rounded-full bg-[linear-gradient(180deg,#9beeff,#6ccfff)] px-4 py-2.5 text-sm font-extrabold text-[#173050] shadow-[0_12px_20px_rgba(118,230,255,.18)] transition duration-150 hover:-translate-y-0.5"
                  >
                    Email Me
                  </a>
                </div>
                <div className="hidden mt-3 flex items-center justify-between gap-2.5 max-[760px]:flex-col max-[760px]:items-stretch">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      showToast("VKJ");
                    }}
                    className="flex min-w-0 flex-1 items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap rounded-2xl border border-white/15 bg-white/[.08] px-3 py-2.5 text-xs font-bold text-[#eef7ff]"
                  >
                    <span>✉</span>
                    <span className="truncate">vidurakavindadev@gmail.com</span>
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      showToast("Let's Talk — replace this with your email, LinkedIn, or booking link.");
                    }}
                    className="cursor-pointer rounded-full bg-[linear-gradient(180deg,#9beeff,#6ccfff)] px-4 py-2.5 text-sm font-extrabold text-[#173050] shadow-[0_12px_20px_rgba(118,230,255,.18)] transition duration-150 hover:-translate-y-0.5"
                  >
                    Let&apos;s Talk
                  </button>
                </div>
                <div className="pointer-events-none absolute -bottom-4 -right-4 h-[120px] w-[120px] bg-[radial-gradient(circle,rgba(118,230,255,.30),transparent_70%)] blur-[8px]" />
              </section>

              <div className="pointer-events-none absolute bottom-1.5 left-1/2 -translate-x-1/2 text-center text-xs uppercase tracking-[.12em] text-[rgba(230,244,255,.72)] [text-shadow:0_0_12px_rgba(118,230,255,.12)] max-[1080px]:relative max-[1080px]:left-auto max-[1080px]:bottom-auto max-[1080px]:col-span-full max-[1080px]:translate-x-0 max-[1080px]:pt-2 max-[760px]:col-span-1">
                Move mouse for <b className="text-[#76e6ff]">3D tilt</b> • Click panels to bring forward
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

