"use client";

import { useRef, type CSSProperties } from "react";

interface ZoneCardProps {
  img: string;
  color: string;
  number: number;
  title: string;
  desc: string;
}

export default function ZoneCard({ img, color, number, title, desc }: ZoneCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    el.style.transform = `perspective(900px) rotateX(${(0.5 - y) * 10}deg) rotateY(${(x - 0.5) * 14}deg) translateY(-6px) scale(1.03)`;
    const shine = el.querySelector<HTMLElement>(".zc-shine");
    if (shine) shine.style.background = `radial-gradient(circle at ${100 * x}% ${100 * y}%, rgba(255,255,255,0.18) 0%, transparent 65%)`;
  };

  const onMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)";
    const shine = el.querySelector<HTMLElement>(".zc-shine");
    if (shine) shine.style.background = "transparent";
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="zc-wrap group relative rounded-2xl overflow-hidden cursor-pointer select-none"
      style={
        {
          height: "210px",
          transition: "transform 0.18s ease, box-shadow 0.3s ease",
          boxShadow: "0 6px 24px rgba(0,0,0,0.35)",
          willChange: "transform",
          transformStyle: "preserve-3d",
          "--zc-glow": `${color}55`,
        } as CSSProperties
      }
    >
      <div className="absolute inset-0">
        { }
        <img src={img} alt={title} className="w-full h-full object-cover" style={{ transition: "transform 0.55s ease" }} />
      </div>
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.05) 100%)" }}
      />
      <div
        className="zc-hover-grad absolute inset-0"
        style={{
          background: `linear-gradient(to top, ${color}f0 0%, ${color}90 40%, transparent 100%)`,
          opacity: 0,
          transition: "opacity 0.45s ease",
        }}
      />
      <div className="zc-shine absolute inset-0 pointer-events-none" style={{ transition: "background 0.1s ease" }} />
      <div
        className="absolute top-3 left-3 z-20 w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold"
        style={{ background: "linear-gradient(135deg, #c2185b, #EF7B20)", boxShadow: "0 2px 10px rgba(194,24,91,0.55)" }}
      >
        {number}
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-3 z-20">
        <h3
          className="zc-title text-white font-bold text-base leading-tight"
          style={{ transition: "transform 0.4s cubic-bezier(0.23,1,0.32,1)" }}
        >
          {title}
        </h3>
        <p
          className="zc-desc text-white/85 text-xs leading-snug"
          style={{
            maxHeight: "0",
            overflow: "hidden",
            marginTop: "0",
            opacity: 0,
            transform: "translateY(8px)",
            transition: "opacity 0.38s ease 0.06s, transform 0.38s ease 0.06s, max-height 0.38s ease 0.06s, margin-top 0.38s ease 0.06s",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
          }}
        >
          {desc}
        </p>
      </div>
    </div>
  );
}
