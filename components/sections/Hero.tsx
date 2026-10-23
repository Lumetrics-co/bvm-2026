"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Calendar, ChevronDown, Clock, MapPin } from "lucide-react";
import { t } from "@/lib/i18n";
import { cn } from "@/lib/cn";
import { EVENT_DATE, REGISTER_OPTIONS } from "@/lib/site";
import { useAccessibility } from "@/components/providers/AccessibilityProvider";
import { useModal } from "@/components/providers/ModalProvider";

const COUNTDOWN_UNITS = ["days", "hours", "minutes", "seconds"] as const;
type Unit = (typeof COUNTDOWN_UNITS)[number];

function remaining(target: Date): Record<Unit, number> {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / 864e5),
    hours: Math.floor((diff % 864e5) / 36e5),
    minutes: Math.floor((diff % 36e5) / 6e4),
    seconds: Math.floor((diff % 6e4) / 1e3),
  };
}

function useCountdown(target: Date) {
  const [value, setValue] = useState<Record<Unit, number>>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const tick = () => setValue(remaining(target));
    const first = setTimeout(tick, 0);
    const id = setInterval(tick, 1000);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, [target]);
  return value;
}

const RING_STYLE = {
  padding: "1.5px",
  background: "linear-gradient(to right, #C2185B, #EF7B20)",
  WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
  WebkitMaskComposite: "xor",
  maskComposite: "exclude",
} as const;

function DateIcon({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative w-7 h-7 shrink-0 flex items-center justify-center">
      { }
      <img src="/images/Ellipse2.svg" alt="" className="absolute inset-0 w-full h-full" />
      {children}
    </span>
  );
}

export default function Hero() {
  const countdown = useCountdown(EVENT_DATE);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [registerOpen, setRegisterOpen] = useState(false);
  const { openRegister } = useModal();
  const { reduceMotion } = useAccessibility();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (reduceMotion) video.pause();
    else video.play().catch(() => {});
  }, [reduceMotion]);

  return (
    <section aria-label={t("Hero.ariaLabel")} className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 anim-light-sweep">
        <div className="absolute inset-0 z-0">
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover object-center"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
            style={{ willChange: "transform" }}
          >
            <source src="/images/hero-video.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="absolute inset-0 bg-black/50 z-10" />
      </div>

      {[
        "top-[20%] left-[15%] w-4 h-4 opacity-40 anim-float",
        "top-[35%] right-[40%] w-3 h-3 opacity-30 anim-float-delayed",
        "bottom-[30%] left-[30%] w-3 h-3 opacity-20 anim-float",
      ].map((cls) => (
        <div key={cls} className={`absolute ${cls}`}>
          <Image src="/images/main-slider-star-1.png" alt="" fill sizes="16px" />
        </div>
      ))}

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 pt-22.5 sm:pt-27.5 lg:pt-32.5 pb-10 sm:pb-14">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 lg:gap-6">
          <div className="flex-1 w-full lg:max-w-[800px] text-center lg:text-left">
            <div className="inline-block mb-3 anim-hidden anim-slide-up">
              <p
                className="text-white font-semibold text-[15px] sm:text-[16px] lg:text-[18px] tracking-wide px-8 py-2 rounded-full"
                style={{ background: "linear-gradient(135deg, #c2185b, #ef7b20)", boxShadow: "0 4px 20px rgba(194,24,91,0.4)" }}
              >
                {t("Hero.usp")}
              </p>
            </div>

            <h1 className="mb-1 relative">
              <span className="block text-[2rem] sm:text-[3rem] lg:text-[4rem] xl:text-[4rem] font-bold text-white leading-[1.05] whitespace-nowrap anim-hidden anim-slide-up anim-delay-1 mb-3">
                {t("Hero.titleLine1")}
              </span>
              <span className="relative flex flex-col items-center lg:flex-row lg:items-center lg:justify-start text-[2rem] sm:text-[3rem] lg:text-[4rem] xl:text-[4rem] font-bold text-white leading-[1.05] anim-hidden anim-slide-up anim-delay-1 mb-3">
                <span className="whitespace-nowrap">{t("Hero.titleLine2")}</span>
                <span className="relative w-10 h-10 sm:w-12 sm:h-12 lg:w-18 lg:h-18 shrink-0 lg:ml-2 lg:mb-1 mt-1 lg:mt-0">
                  <Image
                    src="/images/celebrating_icon.png"
                    alt={t("Hero.celebratingIconAlt")}
                    fill
                    sizes="72px"
                    className="object-contain"
                  />
                </span>
              </span>
            </h1>

            <p className="text-base sm:text-lg text-gray-300 mt-4 mb-4 anim-hidden anim-slide-up anim-delay-2">
              {t("Hero.tagline")}
            </p>

            <div className="flex flex-col lg:flex-row items-center lg:items-center gap-3 lg:gap-5 text-sm sm:text-base text-white/90 anim-hidden anim-slide-up anim-delay-3 mb-8 sm:mb-8">
              <span className="flex items-center gap-2">
                <DateIcon>
                  <Calendar className="w-3.5 h-3.5 text-white relative z-10" />
                </DateIcon>
                12th Aug to 15th Aug 2026
              </span>
              <span className="flex items-center gap-2">
                <DateIcon>
                  <MapPin className="w-3.5 h-3.5 text-white relative z-10" />
                </DateIcon>
                {t("Hero.venue")}
              </span>
            </div>

            <p className="text-white font-bold text-sm sm:text-base mb-2.5 tracking-wide anim-hidden anim-slide-up anim-delay-4">
              {t("Hero.countdownHeading")}
            </p>

            <div className="flex flex-col lg:flex-row lg:items-center justify-center lg:justify-start gap-4 sm:gap-5 mb-8 sm:mb-10">
              <div className="flex justify-center lg:justify-start gap-2 sm:gap-2.5">
                {COUNTDOWN_UNITS.map((unit, i) => (
                  <div
                    key={unit}
                    className={cn(
                      "relative rounded-lg min-w-[58px] sm:min-w-[72px] px-2.5 sm:px-4 py-2 sm:py-3 text-center overflow-hidden anim-hidden anim-scale",
                      `anim-delay-${i + 5}`,
                    )}
                  >
                    <div className="absolute inset-0 rounded-lg pointer-events-none" style={RING_STYLE} />
                    <div className="relative z-10">
                      <div className="text-2xl sm:text-3xl lg:text-[2.5rem] font-black text-white leading-none tabular-nums">
                        {String(countdown[unit]).padStart(2, "0")}
                      </div>
                      <div className="text-[9px] sm:text-[10px] text-white/95 uppercase tracking-[0.15em] mt-1 font-semibold">
                        {t(`Hero.countdown.${unit}`)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="relative rounded-lg px-4 py-2.5 sm:py-3 bg-white/10 backdrop-blur-sm border border-white/20 mx-auto lg:mx-0 anim-hidden anim-scale anim-delay-8">
                <p className="flex items-center justify-center lg:justify-start gap-1.5 text-white font-bold text-sm sm:text-base mb-1.5 tracking-wide">
                  <Clock className="w-4 h-4 sm:w-4.5 sm:h-4.5 shrink-0" />
                  {t("Hero.eventTimings.heading")}
                </p>
                <div className="space-y-1 text-xs sm:text-sm text-white/90">
                  <div className="flex items-center gap-3 justify-between">
                    <span>{t("Hero.eventTimings.delegate")}</span>
                    <span className="font-semibold text-white whitespace-nowrap">{t("Hero.eventTimings.delegateHours")}</span>
                  </div>
                  <div className="flex items-center gap-3 justify-between">
                    <span>{t("Hero.eventTimings.visitor")}</span>
                    <span className="font-semibold text-white whitespace-nowrap">{t("Hero.eventTimings.visitorHours")}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex sm:hidden justify-center gap-3 mt-6">
              <div className="relative">
                <button
                  type="button"
                  aria-expanded={registerOpen}
                  aria-haspopup="menu"
                  aria-controls="hero-register-menu"
                  aria-label={t("Hero.registerMenuLabel")}
                  onClick={() => setRegisterOpen((v) => !v)}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-gradient-to-r from-magenta to-[#EF7B20] text-white text-xs font-semibold rounded-full hover:opacity-90 transition-opacity tracking-wide uppercase"
                >
                  {t("Hero.registrationFor")}
                  <ChevronDown className={cn("w-3.5 h-3.5 transition-transform", registerOpen && "rotate-180")} />
                </button>
                {registerOpen && (
                  <div
                    id="hero-register-menu"
                    role="menu"
                    className="absolute left-1/2 -translate-x-1/2 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50"
                  >
                    {REGISTER_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        role="menuitem"
                        onClick={() => {
                          setRegisterOpen(false);
                          openRegister(opt.value);
                        }}
                        className="w-full text-left px-5 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-magenta/10 hover:to-[#EF7B20]/10 hover:text-magenta transition-colors font-medium"
                      >
                        {t(`Hero.registerOptions.${opt.key}`)}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center shrink-0 w-[220px] sm:w-[260px] lg:w-[320px] xl:w-[380px] mx-auto lg:mx-0 anim-hidden anim-slide-right anim-delay-3">
            <div className="relative w-full">
              <div className="absolute inset-x-2 bottom-0 h-[75%] z-0">
                <Image src="/images/modiji-bg.png" alt="" fill sizes="380px" className="object-fill" />
              </div>
              <div className="relative w-full h-[260px] sm:h-[300px] lg:h-[360px] xl:h-[420px] z-10">
                <Image
                  src="/images/Modi_v2.png"
                  alt={t("Hero.pmPhotoAlt")}
                  fill
                  sizes="(min-width: 1280px) 380px, (min-width: 1024px) 320px, 260px"
                  className="object-contain object-bottom"
                  priority
                />
              </div>
            </div>
            <div className="text-center mt-3 relative z-10 anim-hidden anim-fade anim-delay-5">
              <p className="text-[10px] sm:text-[11px] xl:text-xs text-white/95 uppercase tracking-[0.15em] leading-relaxed font-semibold">
                {t("Hero.attribution.line1")}
                <br />
                {t("Hero.attribution.line2")}
              </p>
              <p className="text-2xl sm:text-3xl xl:text-4xl text-white mt-1.5 font-bold">{t("Hero.pmName")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
