import { t } from "@/lib/i18n";
import OrbitDot, { type OrbitSpec } from "@/components/ui/OrbitDot";

const MARQUEE_ITEMS = [0, 1, 2];

const ORBITS: OrbitSpec[] = [
  { r: 190, size: 9, color: "#c2185b", dur: 8, deg: 0 },
  { r: 190, size: 7, color: "#ef7b20", dur: 8, deg: 120 },
  { r: 190, size: 8, color: "#c2185b", dur: 8, deg: 240 },
  { r: 130, size: 6, color: "#ef7b20", dur: 12, deg: 60 },
  { r: 130, size: 7, color: "#c2185b", dur: 12, deg: 180 },
  { r: 130, size: 5, color: "#ef7b20", dur: 12, deg: 300 },
];

export default function About() {
  return (
    <div id="about">
      <div className="relative overflow-hidden py-4 select-none" style={{ background: 'linear-gradient(90deg, #c2185b 0%, #d4426a 25%, #ef7b20 50%, #d4426a 75%, #c2185b 100%)' }}>
        <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none" style={{ background: 'linear-gradient(to right, #c2185b, transparent)' }} />
        <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none" style={{ background: 'linear-gradient(to left, #c2185b, transparent)' }} />
        <div className="flex whitespace-nowrap" style={{ animation: "marquee-scroll 28s linear infinite" }}>
          {Array.from({ length: 8 }).flatMap((_, copy) =>
            MARQUEE_ITEMS.map((i) => (
              <span key={`${copy}-${i}`} className="inline-flex items-center shrink-0">
                <span className="text-sm sm:text-base font-bold tracking-[0.15em] uppercase shrink-0" style={{ color: "rgba(255,255,255,0.95)" }}>
                  {t(`MarqueeBanner.items.${i}`)}
                </span>
                <span className="mx-6 inline-flex items-center gap-1.5 shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-saffron inline-block" />
                  <span className="w-1 h-1 rounded-full bg-white/40 inline-block" />
                  <span className="w-1.5 h-1.5 rounded-full bg-saffron inline-block" />
                </span>
              </span>
            )),
          )}
        </div>
      </div>
      <section aria-label={t("AboutSection.ariaLabel")} className="relative overflow-hidden" style={{ background: '#ffffff' }}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
          <div className="absolute rounded-full" style={{ width: '700px', height: '700px', top: '-200px', left: '-150px', background: 'radial-gradient(circle, rgba(194,24,91,0.1) 0%, transparent 65%)', animation: 'orbit-glow-pulse 5s ease-in-out infinite' }} />
          <div className="absolute rounded-full" style={{ width: '600px', height: '600px', bottom: '-150px', right: '-100px', background: 'radial-gradient(circle, rgba(239,123,32,0.1) 0%, transparent 65%)', animation: 'orbit-glow-pulse 6s ease-in-out infinite 1.5s' }} />
          <div className="absolute rounded-full" style={{ width: '500px', height: '500px', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'radial-gradient(circle, rgba(123,31,162,0.06) 0%, transparent 65%)', animation: 'orbit-glow-pulse 7s ease-in-out infinite 0.8s' }} />
          <div className="absolute inset-0 origin-right scale-[0.6] sm:scale-100">
            <div className="absolute rounded-full" style={{ width: "380px", height: "380px", top: "50%", right: "-60px", transform: "translateY(-50%)", border: "1px solid rgba(194,24,91,0.25)" }} />
            <div className="absolute rounded-full" style={{ width: "260px", height: "260px", top: "50%", right: "0px", transform: "translateY(-50%)", border: "1px dashed rgba(239,123,32,0.22)" }} />
            {ORBITS.map((spec, i) => (
              <OrbitDot key={i} spec={spec} anchor={{ top: "50%", right: "130px" }} />
            ))}
          </div>
          <div className="absolute rounded-full hidden lg:block" style={{ width: '14px', height: '14px', top: '22%', left: '8%', background: '#c2185b', boxShadow: '0 0 20px #c2185b, 0 0 40px #c2185b88', animation: 'orbit-float 4s ease-in-out infinite' }} />
          <div className="absolute rounded-full hidden lg:block" style={{ width: '10px', height: '10px', top: '68%', left: '12%', background: '#ef7b20', boxShadow: '0 0 16px #ef7b20, 0 0 32px #ef7b2088', animation: 'orbit-float 5.5s ease-in-out infinite 1s' }} />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-20 py-12 sm:py-16 text-center">
          <div className="anim-hidden anim-slide-up">
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="h-px w-8" style={{ background: 'linear-gradient(to right, transparent, #c2185b)' }} />
              <span className="text-[10px] uppercase tracking-[0.35em] font-bold" style={{ color: '#e84393' }}>
                {t("AboutSection.ariaLabel")}
              </span>
              <div className="h-px w-8" style={{ background: 'linear-gradient(to left, transparent, #ef7b20)' }} />
            </div>
          </div>
          <div className="anim-hidden anim-slide-up anim-delay-1">
            <h2 className="font-bold leading-[1.05] tracking-tight mb-6 text-4xl sm:text-5xl lg:text-6xl xl:text-[4.5rem]">
              <span style={{ color: '#1a0a02' }}>
                {t("AboutSection.headingLine1")}
              </span>
              <br />
              <span className="about-shimmer-text">
                {t("AboutSection.headingLine2")}
              </span>
            </h2>
          </div>
          <div className="anim-hidden anim-fade anim-delay-2">
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="h-px w-24" style={{ background: 'linear-gradient(to right, transparent, rgba(194,24,91,0.7))' }} />
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#ef7b20', boxShadow: '0 0 8px #ef7b20' }} />
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#c2185b', boxShadow: '0 0 10px #c2185b' }} />
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#ef7b20', boxShadow: '0 0 8px #ef7b20' }} />
              <div className="h-px w-24" style={{ background: 'linear-gradient(to left, transparent, rgba(239,123,32,0.7))' }} />
            </div>
          </div>
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10 lg:gap-16 text-center lg:text-left mb-14 lg:mb-20">
            <div className="anim-hidden anim-slide-up flex-1">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-5" style={{ color: '#1a0a02' }}>
                {t("AboutSection.pmMessageHeading")}
              </h3>
              <p className="text-base sm:text-lg leading-relaxed" style={{ color: 'rgba(0,0,0,0.7)' }}>
                “
                {t("AboutSection.pmMessageText")}
                ”
              </p>
              <a href="/PM-Message.pdf" target="_blank" rel="noopener noreferrer" className="inline-block mt-6 text-sm sm:text-base font-bold hover:underline" style={{ color: '#c2185b' }}>
                {t("AboutSection.pmMessageLink")}
              </a>
            </div>
            <div className="anim-hidden anim-slide-right anim-delay-1 w-full lg:w-auto lg:shrink-0">
              <div className="flex flex-col items-center">
                <div className="relative w-56 sm:w-64 lg:w-72 h-56 sm:h-64 lg:h-72 rounded-2xl overflow-hidden mx-auto mb-4" style={{ boxShadow: '0 0 0 2px #c2185b, 0 0 24px rgba(194,24,91,0.25)', background: 'linear-gradient(160deg, rgba(194,24,91,0.35), rgba(255,255,255,0) 70%)' }}>
                  <img src="/images/modi-new.png" alt={t("AboutSection.pmPhotoAlt")} className="w-full h-full object-contain object-bottom" />
                </div>
                <p className="text-lg sm:text-xl font-bold text-center leading-tight" style={{ color: '#1a0a02' }}>
                  {t("AboutSection.pmName")}
                </p>
                <p className="text-[11px] sm:text-xs text-center mt-1 leading-snug" style={{ color: 'rgba(0,0,0,0.7)' }}>
                  {t("AboutSection.pmDesignation")}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10 lg:gap-16 text-center lg:text-left mt-2">
            <div className="anim-hidden anim-slide-left anim-delay-2 w-full lg:w-auto lg:shrink-0">
              <div className="flex flex-col items-center">
                <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.35em] font-bold mb-3" style={{ background: 'linear-gradient(90deg, #c2185b, #ef7b20)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  {t("AboutSection.anchoredBy")}
                </span>
                <div className="relative w-56 sm:w-64 lg:w-80 rounded-2xl overflow-hidden mb-4" style={{ boxShadow: '0 0 0 2px #c2185b, 0 0 20px rgba(194,24,91,0.2)' }}>
                  <img src="/images/piyush-goyal.jpg" alt={t("AboutSection.ministerName")} className="w-full object-cover object-top" />
                  <div className="absolute bottom-0 left-0 right-0 h-1/3" style={{ background: 'linear-gradient(to top, rgba(194,24,91,0.5), transparent)' }} />
                </div>
                <p className="text-lg sm:text-xl font-bold text-center leading-tight" style={{ color: '#1a0a02' }}>
                  {t("AboutSection.ministerName")}
                </p>
                <p className="text-[11px] sm:text-xs text-center mt-1 leading-snug" style={{ color: 'rgba(0,0,0,0.7)' }}>
                  {t("AboutSection.ministerDesignation")}
                  <br />
                </p>
              </div>
            </div>
            <div className="flex-1 flex flex-col gap-6">
              <div className="anim-hidden anim-slide-up anim-delay-2">
                <p className="text-base sm:text-lg leading-relaxed" style={{ color: 'rgba(0,0,0,0.65)' }}>
                  {t("AboutSection.description1")}
                </p>
                <p className="text-sm sm:text-base leading-relaxed mt-3" style={{ color: 'rgba(0,0,0,0.7)' }}>
                  {t("AboutSection.description2")}
                </p>
              </div>
              <div className="anim-hidden anim-slide-up anim-delay-3">
                <div className="flex flex-wrap items-start gap-4 sm:gap-5 justify-center sm:justify-start">
                  <div className="flex flex-col items-center gap-1.5 w-[calc(50%-8px)] sm:w-36 shrink-0">
                    <span className="text-[9px] uppercase tracking-[0.3em] font-bold" style={{ background: 'linear-gradient(90deg,#c2185b,#ef7b20)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                      {t("AboutSection.supportedBy")}
                    </span>
                    <img src="/images/ministries/ministry-of-commerce.png" alt={t("AboutSection.ministryAlt")} className="h-10 sm:h-14 w-auto object-contain" />
                    <span className="text-[9px] text-center leading-snug" style={{ color: '#000' }}>
                      {t("AboutSection.ministryCaption")}
                    </span>
                  </div>
                  <div className="hidden sm:block w-px self-stretch" style={{ background: 'linear-gradient(to bottom, transparent, #c2185b, #ef7b20, transparent)' }} />
                  <div className="flex flex-col items-center gap-2 shrink-0">
                    <span className="text-[9px] uppercase tracking-[0.2em] font-bold whitespace-nowrap" style={{ background: 'linear-gradient(90deg,#c2185b,#ef7b20)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                      {t("AboutSection.jointInitiative")}
                    </span>
                    <div className="flex items-start gap-4 sm:gap-5">
                      <div className="flex flex-col items-center gap-1.5 w-[calc(50%-8px)] sm:w-36">
                        <img src="/images/ITPO-logo.png" alt={t("AboutSection.itpoAlt")} className="h-10 sm:h-12 w-auto object-contain" />
                        <span className="text-[9px] text-center leading-snug" style={{ color: '#000' }}>
                          {t("AboutSection.itpoCaption")}
                        </span>
                      </div>
                      <div className="flex flex-col items-center gap-1.5 w-[calc(50%-8px)] sm:w-36">
                        <img src="/images/CAIT-logo.png" alt={t("AboutSection.caitAlt")} className="h-10 sm:h-14 w-auto object-contain" />
                        <span className="text-[9px] text-center leading-snug" style={{ color: '#000' }}>
                          {t("AboutSection.caitCaption")}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="hidden sm:block w-px self-stretch" style={{ background: 'linear-gradient(to bottom, transparent, #c2185b, #ef7b20, transparent)' }} />
                  <div className="flex flex-col items-center gap-1.5 w-[calc(50%-8px)] sm:w-36 shrink-0">
                    <span className="text-[9px] uppercase tracking-[0.3em] font-bold" style={{ background: 'linear-gradient(90deg,#c2185b,#ef7b20)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                      {t("AboutSection.hostState")}
                    </span>
                    <img src="/images/ministries/delhi_nct.png" alt={t("AboutSection.nctDelhiAlt")} className="h-10 sm:h-14 w-auto object-contain" />
                    <span className="text-[9px] text-center leading-snug" style={{ color: '#000' }}>
                      {t("AboutSection.nctDelhiCaption")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none" style={{ background: 'linear-gradient(to bottom, transparent, rgba(255,248,236,0.6))' }} />
      </section>
    </div>
  );
}
