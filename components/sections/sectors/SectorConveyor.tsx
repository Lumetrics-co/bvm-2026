"use client";

import { useEffect, useRef } from "react";
import { t } from "@/lib/i18n";
import { cn } from "@/lib/cn";
import { sectorsFromKeys, type Sector } from "@/lib/data/sectors";

interface Props {
  sectorKeys: string[];
  direction: "left" | "right";
  /** px advanced per animation frame */
  speed?: number;
  copies?: number;
  className?: string;
}

function Chip({ sector }: { sector: Sector }) {
  const Icon = sector.icon;
  return (
    <div
      className="flex-shrink-0 flex items-center gap-2.5 px-4 py-2.5 rounded-xl group hover:scale-105 transition-transform duration-300"
      style={{ background: "#ffffff", border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}
    >
      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${sector.color}18` }}>
        <Icon size={16} aria-hidden="true" style={{ color: sector.color }} />
      </div>
      <span className="font-semibold text-xs text-gray-600 whitespace-nowrap group-hover:text-gray-900 transition-colors">
        {t(`SectorsUnderOneRoofSection.sectors.${sector.key}`)}
      </span>
    </div>
  );
}

/** Auto-scrolling, draggable, seamlessly looping row of sector chips. */
export default function SectorConveyor({ sectorKeys, direction, speed = 0.55, copies = 3, className }: Props) {
  const sectors = sectorsFromKeys(sectorKeys);
  const track = useRef<HTMLDivElement>(null);
  const offset = useRef(0);
  const loopWidth = useRef(0);
  const hovered = useRef(false);
  const dragging = useRef(false);
  const dragStart = useRef({ x: 0, offset: 0 });
  const frame = useRef(0);

  const wrap = (value: number) => {
    const width = loopWidth.current;
    if (!width) return value;
    let v = value;
    if (direction === "left") {
      if (v <= -width) v += width;
      if (v > 0) v -= width;
    } else {
      if (v >= 0) v -= width;
      if (v < -width) v += width;
    }
    return v;
  };

  const apply = () => {
    if (track.current) track.current.style.transform = `translateX(${offset.current}px)`;
  };

  useEffect(() => {
    if (!track.current) return;
    loopWidth.current = track.current.scrollWidth / copies;
    if (direction === "right") {
      offset.current = -loopWidth.current;
      apply();
    }
     
  }, [copies, direction]);

  useEffect(() => {
    const tick = () => {
      if (!hovered.current && !dragging.current && loopWidth.current) {
        offset.current = wrap(offset.current + (direction === "left" ? -speed : speed));
        apply();
      }
      frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [direction, speed]);

  return (
    <div
      className={cn("overflow-hidden cursor-grab active:cursor-grabbing select-none", className)}
      style={{ touchAction: "none" }}
      onMouseEnter={() => {
        hovered.current = true;
      }}
      onMouseLeave={() => {
        hovered.current = false;
      }}
      onPointerDown={(e) => {
        dragging.current = true;
        dragStart.current = { x: e.clientX, offset: offset.current };
        e.currentTarget.setPointerCapture(e.pointerId);
      }}
      onPointerMove={(e) => {
        if (!dragging.current) return;
        offset.current = wrap(dragStart.current.offset + (e.clientX - dragStart.current.x));
        apply();
      }}
      onPointerUp={() => {
        dragging.current = false;
      }}
      onPointerCancel={() => {
        dragging.current = false;
      }}
    >
      <div ref={track} className="flex gap-3" style={{ willChange: "transform" }}>
        {Array.from({ length: copies }).flatMap((_, copy) =>
          sectors.map((sector) => <Chip key={`${copy}-${sector.key}`} sector={sector} />),
        )}
      </div>
    </div>
  );
}
