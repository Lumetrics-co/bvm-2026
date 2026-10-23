"use client";

import { useCallback, useEffect, useRef, type CSSProperties } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import LogoCard, { CARD_WIDTH } from "./LogoCard";

interface LogoCarouselProps {
  logos: string[];
  alts: string[];
  scrollLeftLabel: string;
  scrollRightLabel: string;
}

const GAP = 16;
const SPEED = 0.8;
const ARROW_STYLE: CSSProperties = {
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  zIndex: 10,
  width: "36px",
  height: "36px",
  borderRadius: "50%",
  border: "1px solid rgba(194,24,91,0.25)",
  background: "#fff",
  color: "#c2185b",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  flexShrink: 0,
};

/** Auto-scrolling logo strip with prev/next buttons; pauses on hover. */
export default function LogoCarousel({ logos, alts, scrollLeftLabel, scrollRightLabel }: LogoCarouselProps) {
  const track = useRef<HTMLDivElement>(null);
  const offset = useRef(0);
  const hovered = useRef(false);
  const animating = useRef(false);
  const frame = useRef(0);

  const step = CARD_WIDTH.large + GAP;
  const loopWidth = logos.length * step;
  const tripled = [...logos, ...logos, ...logos];

  useEffect(() => {
    const tick = () => {
      if (!hovered.current && !animating.current) {
        offset.current += SPEED;
        if (offset.current >= loopWidth) offset.current -= loopWidth;
        if (track.current) track.current.style.transform = `translateX(-${offset.current}px)`;
      }
      frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame.current);
  }, [loopWidth]);

  const jump = useCallback(
    (direction: number) => {
      if (animating.current) return;
      animating.current = true;
      let next = offset.current + direction * step * 2;
      if (next < 0) next += loopWidth;
      if (next >= loopWidth) next -= loopWidth;
      offset.current = next;
      const el = track.current;
      if (el) {
        el.style.transition = "transform 0.45s cubic-bezier(0.4,0,0.2,1)";
        el.style.transform = `translateX(-${next}px)`;
      }
      setTimeout(() => {
        if (track.current) track.current.style.transition = "";
        animating.current = false;
      }, 460);
    },
    [step, loopWidth],
  );

  return (
    <div style={{ position: "relative" }}>
      <button onClick={() => jump(-1)} aria-label={scrollLeftLabel} style={{ ...ARROW_STYLE, left: "-18px" }}>
        <ChevronLeft size={18} strokeWidth={2} />
      </button>
      <button onClick={() => jump(1)} aria-label={scrollRightLabel} style={{ ...ARROW_STYLE, right: "-18px" }}>
        <ChevronRight size={18} strokeWidth={2} />
      </button>
      <div
        style={{ overflow: "hidden", padding: "8px 0", position: "relative" }}
        onMouseEnter={() => {
          hovered.current = true;
        }}
        onMouseLeave={() => {
          hovered.current = false;
        }}
      >
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "60px", zIndex: 2, pointerEvents: "none", background: "linear-gradient(to right, #f9fafb, transparent)" }} />
        <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "60px", zIndex: 2, pointerEvents: "none", background: "linear-gradient(to left, #f9fafb, transparent)" }} />
        <div ref={track} style={{ display: "flex", gap: `${GAP}px`, width: "max-content", willChange: "transform" }}>
          {tripled.map((src, i) => (
            <LogoCard key={i} src={src} alt={alts[i % logos.length]} size="large" decorative={i >= logos.length} />
          ))}
        </div>
      </div>
    </div>
  );
}
