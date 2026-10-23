import { t } from "@/lib/i18n";
import { ChartNoAxesColumn, FileText, Globe, Landmark, Lightbulb, Network, Sparkles, TrendingUp, Users, type LucideIcon } from "lucide-react";

const GROUPS: { labelKey: string; cardsKey: string; icons: LucideIcon[] }[] = [
  { labelKey: "forExhibitors", cardsKey: "exhibitorCards", icons: [Globe, Landmark, Lightbulb] },
  { labelKey: "forDelegates", cardsKey: "delegateCards", icons: [Users, FileText, TrendingUp] },
  { labelKey: "forVisitors", cardsKey: "visitorCards", icons: [Network, ChartNoAxesColumn, Sparkles] },
];

export default function WhyBvm() {
  return (
    <section id="why-bvm" aria-label={t("WhyAttendSection.ariaLabel")} className="relative overflow-hidden bg-gray-50 py-16 sm:py-20 lg:py-24 border-t border-gray-100">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="why-circle why-circle-1" />
        <div className="why-circle why-circle-2" />
        <div className="why-circle why-circle-3" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="text-center">
          <div className="anim-hidden anim-slide-up">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="h-px w-8" style={{ background: 'linear-gradient(to right, transparent, #c2185b)' }} />
              <span className="text-[10px] uppercase tracking-[0.35em] font-bold" style={{ color: '#e84393' }}>
                {t("WhyAttendSection.badge")}{" "}
              </span>
              <div className="h-px w-8" style={{ background: 'linear-gradient(to left, transparent, #ef7b20)' }} />
            </div>
          </div>
          <div className="anim-hidden anim-slide-up anim-delay-1">
            <h2 className="font-bold leading-[1.05] tracking-tight text-4xl sm:text-5xl lg:text-6xl xl:text-[4.5rem]">
              <span style={{ color: '#1a0a02' }}>
                {t("WhyAttendSection.headingLine1")}
              </span>
              <br />
              <span className="section-heading-shimmer">
                {t("WhyAttendSection.headingLine2")}
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
        {GROUPS.map(({ labelKey, cardsKey, icons }, group) => (
          <div key={labelKey}>
            <div
              className={`anim-hidden anim-slide-up flex items-center justify-center gap-3 mb-10 ${
                group === 0 ? "mt-6" : "mt-14 sm:mt-16"
              }`}
            >
              <div className="h-px w-16 sm:w-24" style={{ background: "linear-gradient(to right, transparent, #c2185b)" }} />
              <span className="text-[11px] uppercase tracking-[0.35em] font-bold whitespace-nowrap" style={{ color: "#e84393" }}>
                {t(`WhyAttendSection.${labelKey}`)}
              </span>
              <div className="h-px w-16 sm:w-24" style={{ background: "linear-gradient(to left, transparent, #ef7b20)" }} />
            </div>
            <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6${group < GROUPS.length - 1 ? " mb-14 sm:mb-16" : ""}`}>
              {icons.map((Icon, i) => (
                <div
                  key={i}
                  className={`why-card rounded-xl anim-hidden anim-slide-up${i === 1 ? " why-card-active" : ""}`}
                  style={{ transitionDelay: `${i * 130}ms`, animationDelay: `${i * 130}ms` }}
                >
                  <div className="flex justify-center mb-5">
                    <Icon className="why-card-icon" />
                  </div>
                  <h3 className="why-card-title text-base sm:text-lg font-bold mb-3 text-center">
                    {t(`WhyAttendSection.${cardsKey}.${i}.title`)}
                  </h3>
                  <p className="why-card-text text-sm leading-relaxed text-center">
                    {t(`WhyAttendSection.${cardsKey}.${i}.description`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
