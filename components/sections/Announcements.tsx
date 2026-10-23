"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { t, tRaw } from "@/lib/i18n";
import { NEWS_ITEMS } from "@/lib/data/news";
import SectionHeading from "@/components/ui/SectionHeading";
import { useAccessibility } from "@/components/providers/AccessibilityProvider";

interface Article {
  date: string;
  source: string;
  title: string;
  description: string;
}

const GAP = 24;
const AUTOPLAY_MS = 3800;
const MANUAL_PAUSE_MS = 5000;
const WRAP_DELAY_MS = 580;
const COUNT = NEWS_ITEMS.length;

const NAV_BUTTON = {
  width: "44px",
  height: "44px",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "all 0.2s ease",
} as const;

export default function Announcements() {
  const articles = tRaw<Article[]>("NewsArticlesSection.articles").map((article, i) => ({ ...article, ...NEWS_ITEMS[i] }));
  // The first three cards are repeated at the end so the strip can wrap seamlessly.
  const slides = [...articles, ...articles.slice(0, 3)];

  const [index, setIndex] = useState(0);
  const [instant, setInstant] = useState(false);
  const [visible, setVisible] = useState(3);
  const [step, setStep] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const indexRef = useRef(0);
  const paused = useRef(false);
  const wrapTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const { reduceMotion } = useAccessibility();

  useEffect(() => {
    const update = () => setVisible(window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : 3);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const measure = () => {
      const width = viewport.current?.offsetWidth ?? 0;
      if (!width) return;
      const card = (width - GAP * (visible - 1)) / visible;
      setCardWidth(card);
      setStep(card + GAP);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [visible]);

  const goTo = (next: number) => {
    indexRef.current = next;
    setIndex(next);
  };

  const advance = () => {
    const next = indexRef.current + 1;
    goTo(next);
    if (next >= COUNT) {
      if (wrapTimer.current) clearTimeout(wrapTimer.current);
      wrapTimer.current = setTimeout(() => {
        indexRef.current = 0;
        setInstant(true);
        setIndex(0);
        requestAnimationFrame(() => requestAnimationFrame(() => setInstant(false)));
      }, WRAP_DELAY_MS);
    }
  };

  useEffect(() => {
    if (reduceMotion) return;
    const id = setInterval(() => {
      if (!paused.current) advance();
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduceMotion]);

  const pauseTemporarily = () => {
    paused.current = true;
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => {
      paused.current = false;
    }, MANUAL_PAUSE_MS);
  };

  const activeDot = index % COUNT;

  return (
    <section
      id="announcements"
      aria-label={t("NewsArticlesSection.ariaLabel")}
      style={{
        padding: "96px 0 88px",
        background: "linear-gradient(160deg, #fafbff 0%, #f3f4ff 50%, #fff8f3 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "-80px",
          right: "-80px",
          width: "420px",
          height: "420px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(194,24,91,0.07) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-60px",
          left: "-60px",
          width: "380px",
          height: "380px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(239,123,32,0.08) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 clamp(16px, 4vw, 48px)", position: "relative" }}>
        <div style={{ position: "relative", marginBottom: "52px" }}>
          <SectionHeading
            badge={t("NewsArticlesSection.badge")}
            line1={t("NewsArticlesSection.headingLine1")}
            line2={t("NewsArticlesSection.headingLine2")}
          />
          <div style={{ position: "absolute", top: 0, right: 0, display: "flex", gap: "10px", flexShrink: 0, paddingBottom: "6px" }}>
            <button
              onClick={() => {
                pauseTemporarily();
                goTo(Math.max(0, indexRef.current - 1));
              }}
              disabled={index === 0}
              aria-label={t("NewsArticlesSection.previous")}
              className="hover:!border-[#c2185b] hover:!text-[#c2185b]"
              style={{
                ...NAV_BUTTON,
                border: "1.5px solid #e5e7eb",
                background: "#fff",
                cursor: index === 0 ? "not-allowed" : "pointer",
                opacity: index === 0 ? 0.4 : 1,
                color: "#374151",
              }}
            >
              <ChevronLeft size={20} strokeWidth={2} />
            </button>
            <button
              onClick={() => {
                pauseTemporarily();
                advance();
              }}
              aria-label={t("NewsArticlesSection.next")}
              className="hover:opacity-85"
              style={{
                ...NAV_BUTTON,
                border: "none",
                background: "linear-gradient(135deg, #c2185b, #EF7B20)",
                cursor: "pointer",
                color: "#fff",
                boxShadow: "0 4px 16px rgba(194,24,91,0.35)",
              }}
            >
              <ChevronRight size={20} strokeWidth={2} />
            </button>
          </div>
        </div>

        <div className="anim-hidden anim-slide-up anim-delay-1">
          <div
            ref={viewport}
            style={{ overflow: "hidden" }}
            onMouseEnter={() => {
              paused.current = true;
            }}
            onMouseLeave={() => {
              paused.current = false;
            }}
          >
            <div
              style={{
                display: "flex",
                gap: `${GAP}px`,
                transform: `translateX(-${index * step}px)`,
                transition: instant ? "none" : "transform 0.55s cubic-bezier(0.4, 0, 0.2, 1)",
                willChange: "transform",
              }}
            >
              {slides.map((article, i) => (
                <div
                  key={i}
                  className="hover:-translate-y-1.5 hover:shadow-[0_16px_48px_rgba(0,0,0,0.14)]"
                  style={{
                    flex: `0 0 ${cardWidth}px`,
                    background: "#fff",
                    borderRadius: "18px",
                    overflow: "hidden",
                    boxShadow: "0 2px 20px rgba(0,0,0,0.07)",
                    border: "1px solid rgba(0,0,0,0.05)",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div style={{ position: "relative", height: "210px", flexShrink: 0, overflow: "hidden" }}>
                    { }
                    <img src={article.img} alt={article.title} loading="eager" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 55%)" }} />
                    <span
                      style={{
                        position: "absolute",
                        top: "14px",
                        left: "14px",
                        background: "linear-gradient(135deg, #c2185b, #EF7B20)",
                        color: "#fff",
                        fontSize: "10px",
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        padding: "5px 12px",
                        borderRadius: "100px",
                      }}
                    >
                      {article.source}
                    </span>
                    <span
                      style={{
                        position: "absolute",
                        bottom: "12px",
                        left: "14px",
                        color: "rgba(255,255,255,0.85)",
                        fontSize: "11px",
                        fontWeight: 600,
                        letterSpacing: "0.04em",
                      }}
                    >
                      {article.date}
                    </span>
                  </div>
                  <div style={{ padding: "22px 22px 20px", display: "flex", flexDirection: "column", flexGrow: 1 }}>
                    <h3
                      style={{
                        color: "#111827",
                        fontSize: "16px",
                        fontWeight: 700,
                        lineHeight: 1.4,
                        margin: "0 0 10px 0",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {article.title}
                    </h3>
                    <p
                      style={{
                        color: "#6b7280",
                        fontSize: "13px",
                        lineHeight: 1.65,
                        margin: "0 0 auto 0",
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {article.description}
                    </p>
                    <a
                      href={article.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="gap-1.5 hover:gap-2.5"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        marginTop: "18px",
                        paddingTop: "16px",
                        borderTop: "1px solid #f3f4f6",
                        color: "#c2185b",
                        fontSize: "13px",
                        fontWeight: 600,
                        textDecoration: "none",
                        transition: "gap 0.2s ease",
                      }}
                    >
                      {article.cta ?? t("NewsArticlesSection.readFullArticle")}
                      <ArrowUpRight size={15} strokeWidth={2.5} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "8px", marginTop: "40px" }}>
          {Array.from({ length: COUNT }).map((_, i) => (
            <button
              key={i}
              onClick={() => {
                pauseTemporarily();
                goTo(i);
              }}
              aria-label={t("NewsArticlesSection.goToSlide", { n: i + 1 })}
              style={{
                border: "none",
                cursor: "pointer",
                padding: 0,
                borderRadius: "100px",
                width: i === activeDot ? "28px" : "8px",
                height: "8px",
                background: i === activeDot ? "linear-gradient(90deg, #c2185b, #EF7B20)" : "#d1d5db",
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
