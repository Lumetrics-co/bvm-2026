"use client";

import { useEffect, useRef, useState } from "react";
import { t } from "@/lib/i18n";

const IMAGES = [
  "/images/objectives/national-business-platform.png",
  "/images/objectives/supply-chain-strengthening.jpg",
  "/images/objectives/NRI-investment mobilisation.jpg",
  "/images/objectives/swadeshi-awareness-drive.jpg",
  "/images/objectives/celebrating-India-identity.png",
] as const;

const BUTTON_RESET = {
  background: "transparent",
  border: 0,
  padding: 0,
  font: "inherit",
  color: "inherit",
  textAlign: "left",
} as const;

export default function Objectives() {
  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const preload = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          IMAGES.forEach((src) => {
            new Image().src = src;
          });
          preload.disconnect();
        }
      },
      { rootMargin: "500px 0px" },
    );
    const reveal = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          reveal.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    preload.observe(el);
    reveal.observe(el);
    return () => {
      preload.disconnect();
      reveal.disconnect();
    };
  }, []);

  const revealClass = inView ? "obj-animate" : "obj-hidden";
  const stagger = (i: number) => (inView ? { animationDelay: `${90 * i}ms` } : {});

  return (
    <section ref={rootRef} id="objectives" aria-label={t("ObjectivesSection.ariaLabel")} style={{ background: '#ffffff', padding: '80px 0 96px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '-60px', left: '-40px', width: '480px', height: '480px', background: 'radial-gradient(circle, rgba(194,24,91,0.08) 0%, transparent 65%)', borderRadius: '50%', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-60px', right: '-40px', width: '440px', height: '440px', background: 'radial-gradient(circle, rgba(239,123,32,0.1) 0%, transparent 65%)', borderRadius: '50%', pointerEvents: 'none' }} />
      <div className={revealClass} style={{ padding: '0 24px', position: 'relative' }}>
        <div className="text-center">
          <div className="anim-hidden anim-slide-up">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="h-px w-8" style={{ background: 'linear-gradient(to right, transparent, #c2185b)' }} />
              <span className="text-[10px] uppercase tracking-[0.35em] font-bold" style={{ color: '#e84393' }}>
                {t("ObjectivesSection.badge")}
              </span>
              <div className="h-px w-8" style={{ background: 'linear-gradient(to left, transparent, #ef7b20)' }} />
            </div>
          </div>
          <div className="anim-hidden anim-slide-up anim-delay-1">
            <h2 className="font-bold leading-[1.05] tracking-tight text-4xl sm:text-5xl lg:text-6xl xl:text-[4.5rem]">
              <span style={{ color: '#1a0a02' }}>
                {t("ObjectivesSection.headingLine1")}
              </span>
              <br />
              <span className="section-heading-shimmer">
                {t("ObjectivesSection.headingLine2")}
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
        <p style={{ color: '#7a5c3a', fontSize: 'clamp(13px, 1.4vw, 15px)', lineHeight: '1.6', margin: '-16px auto 52px', maxWidth: '480px', textAlign: 'center', opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)', transition: 'opacity 0.65s ease 200ms, transform 0.65s cubic-bezier(0.16,1,0.3,1) 200ms' }}>
          {t("ObjectivesSection.subheading")}
        </p>
      </div>
      <div className="hidden md:flex" style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 clamp(16px, 4vw, 48px)", height: "clamp(340px, 45vw, 420px)", gap: "5px" }}>
        {IMAGES.map((src, i) => {
          const isActive = active === i;
          const number = t(`ObjectivesSection.objectives.${i}.number`);
          const title = t(`ObjectivesSection.objectives.${i}.title`);
          return (
            <button
              key={src}
              type="button"
              className={revealClass}
              aria-expanded={isActive}
              aria-label={`${number}. ${title}`}
              onMouseEnter={() => setActive(i)}
              onClick={() => setActive(i)}
              style={{
                flex: isActive ? "1 1 52%" : "0 0 clamp(90px, 10vw, 140px)",
                position: "relative",
                borderRadius: "10px",
                overflow: "hidden",
                cursor: "pointer",
                transition: "flex 0.55s cubic-bezier(0.4, 0, 0.2, 1)",
                minWidth: 0,
                ...BUTTON_RESET,
                ...stagger(i),
              }}
            >
              { }
              <img
                src={src}
                alt={title}
                loading="eager"
                fetchPriority="high"
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.55s ease", transform: isActive ? "scale(1.04)" : "scale(1)" }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: isActive
                    ? "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.18) 55%, rgba(0,0,0,0.22) 100%)"
                    : "rgba(10,5,2,0.62)",
                  transition: "background 0.45s ease",
                }}
              />
              {isActive ? (
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "clamp(20px, 3vw, 32px)" }}>
                  <span style={{ color: "#EF7B20", fontSize: "clamp(24px, 3vw, 34px)", fontWeight: 800, fontFamily: "Georgia, serif", display: "block", marginBottom: "8px", lineHeight: 1 }}>
                    {number}
                  </span>
                  <h3 style={{ color: "#fff", fontSize: "clamp(16px, 2vw, 22px)", fontWeight: 700, margin: "0 0 10px 0", lineHeight: 1.25 }}>{title}</h3>
                  <p style={{ color: "rgba(255,255,255,0.68)", fontSize: "clamp(12px, 1.2vw, 14px)", lineHeight: 1.65, margin: 0 }}>
                    {t(`ObjectivesSection.objectives.${i}.description`)}
                  </p>
                </div>
              ) : (
                <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", padding: "20px 0 24px" }}>
                  <span style={{ color: "#EF7B20", fontSize: "18px", fontWeight: 800, fontFamily: "Georgia, serif", lineHeight: 1 }}>{number}</span>
                  <div
                    style={{
                      marginTop: "auto",
                      writingMode: "vertical-rl",
                      transform: "rotate(180deg)",
                      color: "#fff",
                      fontSize: "13px",
                      fontWeight: 600,
                      letterSpacing: "0.04em",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      maxHeight: "75%",
                    }}
                  >
                    {title}
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>
      <div className="md:hidden flex flex-col" style={{ maxWidth: "600px", margin: "0 auto", padding: "0 16px", gap: "8px" }}>
        {IMAGES.map((src, i) => {
          const isActive = active === i;
          const number = t(`ObjectivesSection.objectives.${i}.number`);
          const title = t(`ObjectivesSection.objectives.${i}.title`);
          return (
            <button
              key={src}
              type="button"
              className={revealClass}
              aria-expanded={isActive}
              aria-label={`${number}. ${title}`}
              onClick={() => setActive(i)}
              style={{
                position: "relative",
                borderRadius: "12px",
                overflow: "hidden",
                cursor: "pointer",
                transition: "height 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                height: isActive ? "220px" : "64px",
                ...BUTTON_RESET,
                width: "100%",
                ...stagger(i),
              }}
            >
              { }
              <img
                src={src}
                alt={title}
                loading="eager"
                fetchPriority="high"
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s ease", transform: isActive ? "scale(1.03)" : "scale(1)" }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: isActive
                    ? "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.3) 100%)"
                    : "rgba(10,5,2,0.65)",
                  transition: "background 0.4s ease",
                }}
              />
              {isActive ? (
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "20px" }}>
                  <span style={{ color: "#EF7B20", fontSize: "28px", fontWeight: 800, fontFamily: "Georgia, serif", display: "block", marginBottom: "6px", lineHeight: 1 }}>
                    {number}
                  </span>
                  <h3 style={{ color: "#fff", fontSize: "18px", fontWeight: 700, margin: "0 0 8px 0", lineHeight: 1.25 }}>{title}</h3>
                  <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "13px", lineHeight: 1.6, margin: 0 }}>
                    {t(`ObjectivesSection.objectives.${i}.description`)}
                  </p>
                </div>
              ) : (
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", padding: "0 20px", gap: "14px" }}>
                  <span style={{ color: "#EF7B20", fontSize: "20px", fontWeight: 800, fontFamily: "Georgia, serif", lineHeight: 1, flexShrink: 0 }}>{number}</span>
                  <span style={{ color: "#fff", fontSize: "15px", fontWeight: 600, letterSpacing: "0.01em" }}>{title}</span>
                  <span style={{ marginLeft: "auto", color: "rgba(255,255,255,0.6)", fontSize: "20px", lineHeight: 1, flexShrink: 0 }}>+</span>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}
