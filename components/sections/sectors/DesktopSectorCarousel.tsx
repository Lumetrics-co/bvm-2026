"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { t } from "@/lib/i18n";
import { sectorsFromKeys } from "@/lib/data/sectors";
import { useAccessibility } from "@/components/providers/AccessibilityProvider";

const STEP_DEG = 36;
const SPIN_DEG_PER_TICK = 0.35;
const TICK_MS = 30;
const RESUME_AFTER_MS = 3000;

const ARROW =
  "absolute top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center text-black/40 hover:text-black hover:bg-black/5 border border-gray-200 bg-white transition-all cursor-pointer z-20";

export default function DesktopSectorCarousel({ sectorKeys }: { sectorKeys: string[] }) {
  const sectors = sectorsFromKeys(sectorKeys);
  const [angle, setAngle] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [autoplay, setAutoplay] = useState(true);
  const [radius, setRadius] = useState(380);
  const [cardWidth, setCardWidth] = useState(170);
  const drag = useRef({ x: 0, angle: 0 });
  const { reduceMotion } = useAccessibility();

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth < 1024) {
        setRadius(320);
        setCardWidth(160);
      } else {
        setRadius(380);
        setCardWidth(170);
      }
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (!autoplay || dragging || reduceMotion) return;
    const id = setInterval(() => setAngle((a) => a - SPIN_DEG_PER_TICK), TICK_MS);
    return () => clearInterval(id);
  }, [autoplay, dragging, reduceMotion]);

  return (
    <div className="relative mx-auto max-w-5xl mb-16">
      <div
        className="relative mx-auto h-80 md:h-95 cursor-grab active:cursor-grabbing overflow-hidden"
        style={{ perspective: "1000px", touchAction: "none" }}
        onPointerDown={(e) => {
          setDragging(true);
          setAutoplay(false);
          drag.current = { x: e.clientX, angle };
          e.currentTarget.setPointerCapture(e.pointerId);
        }}
        onPointerMove={(e) => {
          if (dragging) setAngle(drag.current.angle + (e.clientX - drag.current.x) * 0.3);
        }}
        onPointerUp={() => {
          setDragging(false);
          setTimeout(() => setAutoplay(true), RESUME_AFTER_MS);
        }}
        onPointerCancel={() => {
          setDragging(false);
          setTimeout(() => setAutoplay(true), RESUME_AFTER_MS);
        }}
      >
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateY(${angle}deg)`,
            transition: dragging ? "none" : "transform 0.08s linear",
          }}
        >
          {sectors.map(({ key, icon: Icon, color }, i) => (
            <div
              key={key}
              className="absolute flex items-center justify-center"
              style={{
                transformStyle: "preserve-3d",
                transform: `rotateY(${STEP_DEG * i}deg) translateZ(${radius}px)`,
                width: `${cardWidth + 10}px`,
              }}
            >
              <div
                className="relative rounded-2xl overflow-hidden select-none"
                style={{
                  width: `${cardWidth}px`,
                  background: "#050530",
                  border: `1px solid ${color}40`,
                  boxShadow: `0 6px 24px rgba(0,0,0,0.35), 0 0 20px ${color}20`,
                }}
              >
                <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }} />
                <div className="px-4 py-5 text-center flex flex-col items-center justify-center" style={{ height: "120px" }}>
                  <div
                    className="w-14 h-14 rounded-xl mx-auto mb-3 flex items-center justify-center shrink-0"
                    style={{ background: `linear-gradient(135deg, ${color}30, ${color}15)`, border: `1px solid ${color}40` }}
                  >
                    <Icon size={26} strokeWidth={1.5} aria-hidden="true" style={{ color }} />
                  </div>
                  <h3 className="font-bold text-[13px] text-white/90 leading-tight">{t(`SectorsUnderOneRoofSection.sectors.${key}`)}</h3>
                </div>
                <div className="h-0.5 w-2/3 mx-auto mb-3 rounded-full" style={{ background: `${color}40` }} />
              </div>
            </div>
          ))}
        </div>
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="w-48 h-48 rounded-full bg-saffron/3 blur-[60px]" />
        </div>
      </div>

      <button className={`${ARROW} left-2 md:left-4`} onClick={() => setAngle((a) => a + STEP_DEG)} aria-label={t("SectorsUnderOneRoofSection.previous")}>
        <ChevronLeft size={22} />
      </button>
      <button className={`${ARROW} right-2 md:right-4`} onClick={() => setAngle((a) => a - STEP_DEG)} aria-label={t("SectorsUnderOneRoofSection.next")}>
        <ChevronRight size={22} />
      </button>
    </div>
  );
}
