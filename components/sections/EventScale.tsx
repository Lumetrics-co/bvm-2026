"use client";

import { useState } from "react";
import { t } from "@/lib/i18n";
import { cn } from "@/lib/cn";
import { useCountUp } from "@/hooks/useCountUp";
import { useInView } from "@/hooks/useInView";
import OrbitDot from "@/components/ui/OrbitDot";

interface Stat {
  target: number;
  suffix: string;
  /** Key under TradePlatformSection.stats */
  labelKey: string;
  icon: string;
}

const PINK_FILTER = "brightness(0) saturate(100%) invert(18%) sepia(86%) saturate(1490%) hue-rotate(315deg) brightness(0.9)";
const ORANGE_FILTER = "brightness(0) saturate(100%) invert(52%) sepia(78%) saturate(600%) hue-rotate(2deg) brightness(0.95)";
const CARD_SHADOW = "0 4px 24px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.04)";

const FEATURED: Stat = { target: 2, suffix: "L+", labelKey: "businessDelegatesFull", icon: "/images/noun-nri-personal-loan-3097844 1.svg" };
const PRIMARY: Stat[] = [
  { target: 500, suffix: "+", labelKey: "exhibitors", icon: "/images/noun-exhibitors-1996788 1.svg" },
  { target: 10, suffix: "L+", labelKey: "caitNetwork", icon: "/images/noun-outsourcing-6414391 1.svg" },
  { target: 10, suffix: "+", labelKey: "centralMinistries", icon: "/images/noun-bank-100648 1.svg" },
];
const SECONDARY: Stat[] = [
  { target: 10, suffix: "+", labelKey: "statesUTs", icon: "/images/noun-states-7938376 1.svg" },
  { target: 500, suffix: "+", labelKey: "associations", icon: "/images/noun-outsourcing-6414391 1.svg" },
  { target: 200, suffix: "+", labelKey: "media", icon: "/images/noun-media-5238861 1.svg" },
];

function Count({ target, suffix, started }: { target: number; suffix: string; started: boolean }) {
  const value = useCountUp({ target, duration: 2500, start: started });
  return <>{(target >= 100 ? value.toLocaleString("en-IN") : value) + suffix}</>;
}

function gradientText(from: string, to: string) {
  return {
    background: `linear-gradient(135deg, ${from}, ${to})`,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  } as const;
}

export default function EventScale() {
  const { ref, isInView } = useInView<HTMLElement>({ threshold: 0.08, triggerOnce: false });
  const [runKey, setRunKey] = useState(0);
  const [wasInView, setWasInView] = useState(false);

  // Restart the counters every time the section re-enters the viewport.
  if (isInView !== wasInView) {
    setWasInView(isInView);
    if (isInView) setRunKey((k) => k + 1);
  }

  const show = isInView && "anim-show";
  const label = (stat: Stat) => t(`TradePlatformSection.stats.${stat.labelKey}`);

  return (
    <section ref={ref} id="event-scale" aria-label={t("TradePlatformSection.ariaLabel")} className="relative overflow-hidden border-t border-gray-100" style={{ background: '#ffffff' }}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="absolute rounded-full" style={{ width: '700px', height: '700px', top: '-200px', left: '-150px', background: 'radial-gradient(circle, rgba(194,24,91,0.1) 0%, transparent 65%)', animation: 'orbit-glow-pulse 5s ease-in-out infinite' }} />
        <div className="absolute rounded-full" style={{ width: '600px', height: '600px', bottom: '-150px', right: '-100px', background: 'radial-gradient(circle, rgba(239,123,32,0.1) 0%, transparent 65%)', animation: 'orbit-glow-pulse 6s ease-in-out infinite 1.5s' }} />
        <div className="absolute rounded-full" style={{ width: '500px', height: '500px', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'radial-gradient(circle, rgba(123,31,162,0.06) 0%, transparent 65%)', animation: 'orbit-glow-pulse 7s ease-in-out infinite 0.8s' }} />
        <div className="absolute inset-0 origin-top-left scale-[0.6] sm:scale-100">
          <div className="absolute rounded-full" style={{ width: '380px', height: '380px', top: '0px', left: '-60px', border: '1px solid rgba(194,24,91,0.25)' }} />
          <div className="absolute rounded-full" style={{ width: '260px', height: '260px', top: '60px', left: '0px', border: '1px dashed rgba(239,123,32,0.22)' }} />
          <OrbitDot spec={{ r: 190, size: 9, color: "#c2185b", dur: 8, deg: 0 }} anchor={{ top: "190px", left: "130px" }} />
          <OrbitDot spec={{ r: 190, size: 7, color: "#ef7b20", dur: 8, deg: 120 }} anchor={{ top: "190px", left: "130px" }} />
          <OrbitDot spec={{ r: 190, size: 8, color: "#c2185b", dur: 8, deg: 240 }} anchor={{ top: "190px", left: "130px" }} />
          <OrbitDot spec={{ r: 130, size: 6, color: "#ef7b20", dur: 12, deg: 60 }} anchor={{ top: "190px", left: "130px" }} />
          <OrbitDot spec={{ r: 130, size: 7, color: "#c2185b", dur: 12, deg: 180 }} anchor={{ top: "190px", left: "130px" }} />
          <OrbitDot spec={{ r: 130, size: 5, color: "#ef7b20", dur: 12, deg: 300 }} anchor={{ top: "190px", left: "130px" }} />
        </div>
        <div className="absolute rounded-full hidden lg:block" style={{ width: '14px', height: '14px', top: '30%', right: '6%', background: '#c2185b', boxShadow: '0 0 20px #c2185b, 0 0 40px #c2185b88', animation: 'orbit-float 4s ease-in-out infinite' }} />
        <div className="absolute rounded-full hidden lg:block" style={{ width: '10px', height: '10px', top: '65%', right: '10%', background: '#ef7b20', boxShadow: '0 0 16px #ef7b20, 0 0 32px #ef7b2088', animation: 'orbit-float 5.5s ease-in-out infinite 1s' }} />
        <div className="absolute rounded-full hidden lg:block" style={{ width: '8px', height: '8px', top: '50%', right: '4%', background: '#c2185b', boxShadow: '0 0 14px #c2185b, 0 0 28px #c2185b88', animation: 'orbit-float 6s ease-in-out infinite 2s' }} />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 sm:pt-20 pb-14 sm:pb-20">
        <div className="text-center">
          <div className="anim-hidden anim-slide-up">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="h-px w-8" style={{ background: 'linear-gradient(to right, transparent, #c2185b)' }} />
              <span className="text-[10px] uppercase tracking-[0.35em] font-bold" style={{ color: '#e84393' }}>
                {t("TradePlatformSection.badge")}
              </span>
              <div className="h-px w-8" style={{ background: 'linear-gradient(to left, transparent, #ef7b20)' }} />
            </div>
          </div>
          <div className="anim-hidden anim-slide-up anim-delay-1">
            <h2 className="font-bold leading-[1.05] tracking-tight text-4xl sm:text-5xl lg:text-6xl xl:text-[4.5rem]">
              <span style={{ color: '#1a0a02' }}>
                {t("TradePlatformSection.headingLine1")}
              </span>
              <br />
              <span className="section-heading-shimmer">
                {t("TradePlatformSection.headingLine2")}
              </span>
            </h2>
          </div>
          <div className="anim-hidden anim-fade anim-delay-2">
            <div className="flex items-center justify-center gap-3 mt-5 mb-8">
              <div className="h-px w-24" style={{ background: 'linear-gradient(to right, transparent, rgba(194,24,91,0.7))' }} />
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#ef7b20', boxShadow: '0 0 8px #ef7b20' }} />
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#c2185b', boxShadow: '0 0 10px #c2185b' }} />
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#ef7b20', boxShadow: '0 0 8px #ef7b20' }} />
              <div className="h-px w-24" style={{ background: 'linear-gradient(to left, transparent, rgba(239,123,32,0.7))' }} />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 gap-4">
          <div className="lg:row-span-2">
            <div
              className={cn("relative h-full flex flex-col items-center justify-center text-center gap-3 py-8 sm:py-10 px-6 sm:px-8 bg-white rounded-2xl overflow-hidden anim-hidden anim-slide-up anim-delay-1", show)}
              style={{ border: "1px solid rgba(194,24,91,0.12)", boxShadow: CARD_SHADOW }}
            >
              <div className="absolute left-0 top-4 bottom-4 w-1 rounded-full" style={{ background: "linear-gradient(to bottom, #c2185b, #ef7b20)" }} />
              <div
                className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 flex items-center justify-center rounded-xl"
                style={{ background: "linear-gradient(135deg, rgba(194,24,91,0.10), rgba(239,123,32,0.10))", border: "1px solid rgba(194,24,91,0.15)" }}
              >
                { }
                <img src={FEATURED.icon} alt={label(FEATURED)} width={40} height={40} className="object-contain" style={{ filter: PINK_FILTER }} />
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-black tabular-nums leading-none" style={gradientText("#c2185b", "#ef7b20")}>
                  <Count key={runKey} target={FEATURED.target} suffix={FEATURED.suffix} started={isInView} />
                </div>
                <div className="text-xs sm:text-sm text-black/75 font-semibold mt-2 leading-snug max-w-60 mx-auto">{label(FEATURED)}</div>
              </div>
            </div>
          </div>

          {PRIMARY.map((stat, i) => (
            <div
              key={stat.labelKey}
              className={cn("relative flex items-center gap-4 py-7 sm:py-9 px-6 sm:px-7 bg-white rounded-2xl overflow-hidden anim-hidden anim-slide-up", show, `anim-delay-${i + 1}`)}
              style={{ border: "1px solid rgba(194,24,91,0.12)", boxShadow: CARD_SHADOW }}
            >
              <div className="absolute left-0 top-4 bottom-4 w-1 rounded-full" style={{ background: "linear-gradient(to bottom, #c2185b, #ef7b20)" }} />
              <div
                className="w-14 h-14 sm:w-16 sm:h-16 shrink-0 flex items-center justify-center rounded-xl"
                style={{ background: "linear-gradient(135deg, rgba(194,24,91,0.10), rgba(239,123,32,0.10))", border: "1px solid rgba(194,24,91,0.15)" }}
              >
                { }
                <img src={stat.icon} alt={label(stat)} width={34} height={34} className="object-contain" style={{ filter: PINK_FILTER }} />
              </div>
              <div className="min-w-0">
                <div className="text-2xl sm:text-3xl font-black tabular-nums leading-none" style={gradientText("#c2185b", "#ef7b20")}>
                  <Count key={runKey} target={stat.target} suffix={stat.suffix} started={isInView} />
                </div>
                <div className="text-[11px] sm:text-xs text-black/75 font-semibold mt-1.5 leading-snug">{label(stat)}</div>
              </div>
            </div>
          ))}

          {SECONDARY.map((stat, i) => (
            <div
              key={stat.labelKey}
              className={cn("relative flex items-center gap-4 py-6 sm:py-7 px-6 sm:px-7 bg-white rounded-2xl overflow-hidden anim-hidden anim-slide-up", show, `anim-delay-${i + 5}`)}
              style={{ border: "1px solid rgba(239,123,32,0.12)", boxShadow: CARD_SHADOW }}
            >
              <div className="absolute left-0 top-4 bottom-4 w-1 rounded-full" style={{ background: "linear-gradient(to bottom, #ef7b20, #c2185b)" }} />
              <div
                className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 flex items-center justify-center rounded-xl"
                style={{ background: "linear-gradient(135deg, rgba(239,123,32,0.10), rgba(194,24,91,0.10))", border: "1px solid rgba(239,123,32,0.15)" }}
              >
                { }
                <img src={stat.icon} alt={label(stat)} width={28} height={28} className="object-contain" style={{ filter: ORANGE_FILTER }} />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black tabular-nums leading-none" style={gradientText("#ef7b20", "#c2185b")}>
                  <Count key={runKey} target={stat.target} suffix={stat.suffix} started={isInView} />
                </div>
                <div className="text-[10px] sm:text-xs text-black/75 uppercase tracking-[0.14em] font-semibold mt-1.5">{label(stat)}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="h-0.5 mt-10 rounded-full mx-auto max-w-xs" style={{ background: "linear-gradient(to right, transparent, #c2185b 30%, #ef7b20 70%, transparent)" }} />
      </div>
    </section>
  );
}
