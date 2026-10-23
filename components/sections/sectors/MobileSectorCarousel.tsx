"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { t } from "@/lib/i18n";
import { sectorsFromKeys } from "@/lib/data/sectors";
import { useAccessibility } from "@/components/providers/AccessibilityProvider";

const AUTOPLAY_MS = 2800;
const RESUME_AFTER_MS = 4000;
const SWIPE_THRESHOLD = 40;

const ARROW =
  "absolute top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-black/40 hover:text-black hover:bg-black/5 border border-gray-200 bg-white transition-all z-20";

export default function MobileSectorCarousel({ sectorKeys }: { sectorKeys: string[] }) {
  const sectors = sectorsFromKeys(sectorKeys);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const startX = useRef<number | null>(null);
  const { reduceMotion } = useAccessibility();
  const count = sectors.length;

  useEffect(() => {
    if (paused || reduceMotion) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % count), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, reduceMotion, count]);

  const go = (direction: number) => {
    setIndex((i) => (i + direction + count) % count);
    setPaused(true);
    setTimeout(() => setPaused(false), RESUME_AFTER_MS);
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (startX.current === null) return;
    const delta = e.clientX - startX.current;
    if (Math.abs(delta) > SWIPE_THRESHOLD) go(delta < 0 ? 1 : -1);
    startX.current = null;
  };

  const accent = sectors[index]?.color ?? "#FF9933";

  return (
    <div className="relative mx-auto max-w-sm mb-16 px-6">
      <div
        className="overflow-hidden cursor-grab active:cursor-grabbing"
        style={{ touchAction: "none" }}
        onPointerDown={(e) => {
          startX.current = e.clientX;
        }}
        onPointerUp={onPointerUp}
      >
        <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${index * 100}%)` }}>
          {sectors.map(({ key, icon: Icon, color }) => (
            <div key={key} className="w-full shrink-0 flex justify-center">
              <div className="relative w-full rounded-2xl">
                <div className="relative rounded-2xl overflow-hidden w-full" style={{ background: "#050530", border: `1px solid ${color}40` }}>
                  <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }} />
                  <div className="px-8 text-center flex flex-col items-center justify-center" style={{ height: "200px" }}>
                    <div
                      className="w-20 h-20 rounded-2xl mx-auto mb-5 flex items-center justify-center shrink-0"
                      style={{ background: `linear-gradient(135deg, ${color}25, ${color}10)`, border: `1px solid ${color}30` }}
                    >
                      <Icon size={36} strokeWidth={1.5} aria-hidden="true" style={{ color }} />
                    </div>
                    <h3 className="font-bold text-base text-white/90 leading-snug">{t(`SectorsUnderOneRoofSection.sectors.${key}`)}</h3>
                  </div>
                  <div className="h-0.5 w-2/3 mx-auto mb-4 rounded-full" style={{ background: `${color}30` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button className={`${ARROW} -left-1`} onClick={() => go(-1)} aria-label={t("SectorsUnderOneRoofSection.previous")}>
        <ChevronLeft size={20} />
      </button>
      <button className={`${ARROW} -right-1`} onClick={() => go(1)} aria-label={t("SectorsUnderOneRoofSection.next")}>
        <ChevronRight size={20} />
      </button>

      <div className="mt-6 flex items-center gap-3">
        <span className="text-black/65 text-xs tabular-nums shrink-0">{String(index + 1).padStart(2, "0")}</span>
        <div className="flex-1 h-0.5 bg-black/10 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ background: accent, width: `${((index + 1) / count) * 100}%` }}
          />
        </div>
        <span className="text-black/65 text-xs tabular-nums shrink-0">{count}</span>
      </div>
      <p className="text-center text-black/55 text-xs mt-3 select-none">{t("SectorsUnderOneRoofSection.swipeOrUseArrows")}</p>
    </div>
  );
}
