import { t } from "@/lib/i18n";
import OrbitDot from "@/components/ui/OrbitDot";
import { FEATURED_KEYS, MARQUEE_ROW_ONE_KEYS, MARQUEE_ROW_TWO_KEYS } from "@/lib/data/sectors";
import MobileSectorCarousel from "./sectors/MobileSectorCarousel";
import DesktopSectorCarousel from "./sectors/DesktopSectorCarousel";
import SectorConveyor from "./sectors/SectorConveyor";

export default function Sectors() {
  return (
    <section id="sectors" aria-label={t("SectorsUnderOneRoofSection.ariaLabel")} className="relative overflow-hidden bg-white border-t border-gray-100">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full blur-[150px]" style={{ background: 'rgba(194,24,91,0.05)' }} />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[300px] rounded-full blur-[120px]" style={{ background: 'rgba(239,123,32,0.05)' }} />
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full blur-[120px]" style={{ background: 'rgba(194,24,91,0.04)' }} />
        <div className="absolute inset-0 origin-bottom-left scale-[0.6] sm:scale-100">
          <div className="absolute rounded-full" style={{ width: '380px', height: '380px', bottom: '0px', left: '-60px', border: '1px solid rgba(239,123,32,0.25)' }} />
          <div className="absolute rounded-full" style={{ width: '260px', height: '260px', bottom: '60px', left: '0px', border: '1px dashed rgba(194,24,91,0.22)' }} />
          <OrbitDot spec={{ r: 190, size: 9, color: "#ef7b20", dur: 9, deg: 0 }} anchor={{ bottom: "190px", left: "130px" }} reverse />
          <OrbitDot spec={{ r: 190, size: 7, color: "#c2185b", dur: 9, deg: 120 }} anchor={{ bottom: "190px", left: "130px" }} reverse />
          <OrbitDot spec={{ r: 190, size: 8, color: "#ef7b20", dur: 9, deg: 240 }} anchor={{ bottom: "190px", left: "130px" }} reverse />
          <OrbitDot spec={{ r: 130, size: 6, color: "#c2185b", dur: 13, deg: 60 }} anchor={{ bottom: "190px", left: "130px" }} reverse />
          <OrbitDot spec={{ r: 130, size: 7, color: "#ef7b20", dur: 13, deg: 180 }} anchor={{ bottom: "190px", left: "130px" }} reverse />
          <OrbitDot spec={{ r: 130, size: 5, color: "#c2185b", dur: 13, deg: 300 }} anchor={{ bottom: "190px", left: "130px" }} reverse />
        </div>
        <div className="absolute inset-0 origin-top-right scale-[0.6] sm:scale-100">
          <div className="absolute rounded-full" style={{ width: '380px', height: '380px', top: '0px', right: '-60px', border: '1px solid rgba(194,24,91,0.25)' }} />
          <div className="absolute rounded-full" style={{ width: '260px', height: '260px', top: '60px', right: '0px', border: '1px dashed rgba(239,123,32,0.22)' }} />
          <OrbitDot spec={{ r: 190, size: 9, color: "#c2185b", dur: 8, deg: 0 }} anchor={{ top: "190px", right: "130px" }} />
          <OrbitDot spec={{ r: 190, size: 7, color: "#ef7b20", dur: 8, deg: 120 }} anchor={{ top: "190px", right: "130px" }} />
          <OrbitDot spec={{ r: 190, size: 8, color: "#c2185b", dur: 8, deg: 240 }} anchor={{ top: "190px", right: "130px" }} />
          <OrbitDot spec={{ r: 130, size: 6, color: "#ef7b20", dur: 12, deg: 60 }} anchor={{ top: "190px", right: "130px" }} />
          <OrbitDot spec={{ r: 130, size: 7, color: "#c2185b", dur: 12, deg: 180 }} anchor={{ top: "190px", right: "130px" }} />
          <OrbitDot spec={{ r: 130, size: 5, color: "#ef7b20", dur: 12, deg: 300 }} anchor={{ top: "190px", right: "130px" }} />
        </div>
        <div className="absolute rounded-full hidden lg:block" style={{ width: '14px', height: '14px', top: '38%', left: '5%', background: '#c2185b', boxShadow: '0 0 20px #c2185b, 0 0 40px #c2185b88', animation: 'orbit-float 4s ease-in-out infinite' }} />
        <div className="absolute rounded-full hidden lg:block" style={{ width: '10px', height: '10px', top: '72%', left: '10%', background: '#ef7b20', boxShadow: '0 0 16px #ef7b20, 0 0 32px #ef7b2088', animation: 'orbit-float 5.5s ease-in-out infinite 1s' }} />
        <div className="absolute rounded-full hidden lg:block" style={{ width: '8px', height: '8px', top: '55%', left: '3%', background: '#c2185b', boxShadow: '0 0 14px #c2185b, 0 0 28px #c2185b88', animation: 'orbit-float 6s ease-in-out infinite 2s' }} />
      </div>
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 pt-20 lg:pt-28 pb-8 lg:pb-12">
        <div className="text-center">
          <div className="anim-hidden anim-slide-up">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="h-px w-8" style={{ background: 'linear-gradient(to right, transparent, #c2185b)' }} />
              <span className="text-[10px] uppercase tracking-[0.35em] font-bold" style={{ color: '#e84393' }}>
                {t("SectorsUnderOneRoofSection.badge")}
              </span>
              <div className="h-px w-8" style={{ background: 'linear-gradient(to left, transparent, #ef7b20)' }} />
            </div>
          </div>
          <div className="anim-hidden anim-slide-up anim-delay-1">
            <h2 className="font-bold leading-[1.05] tracking-tight text-4xl sm:text-5xl lg:text-6xl xl:text-[4.5rem]">
              <span style={{ color: '#1a0a02' }}>
                {t("SectorsUnderOneRoofSection.headingLine1")}
              </span>
              <br />
              <span className="section-heading-shimmer">
                {t("SectorsUnderOneRoofSection.headingLine2")}
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
        <div className="anim-hidden anim-slide-up anim-delay-2">
          <p className="text-base md:text-lg max-w-2xl leading-relaxed mx-auto text-black/70 text-center -mt-4 mb-10 md:mb-16 lg:mb-20">
            {t("SectorsUnderOneRoofSection.subheading")}
          </p>
        </div>
        <div className="block md:hidden">
          <div className="anim-hidden anim-slide-up anim-delay-1">
            <MobileSectorCarousel sectorKeys={FEATURED_KEYS} />
          </div>
        </div>
        <div className="hidden md:block">
          <DesktopSectorCarousel sectorKeys={FEATURED_KEYS} />
        </div>
        <div className="relative">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="h-px w-8" style={{ background: "linear-gradient(to right, transparent, #c2185b)" }} />
            <span className="text-[16px] uppercase tracking-[0.35em] font-bold section-heading-shimmer">
              {t("SectorsUnderOneRoofSection.allSectors")}
            </span>
            <div className="h-px w-8" style={{ background: "linear-gradient(to left, transparent, #ef7b20)" }} />
          </div>
          <div className="absolute left-0 top-0 bottom-0 w-20 md:w-40 z-10 pointer-events-none" style={{ background: "linear-gradient(to right, #ffffff, transparent)" }} />
          <div className="absolute right-0 top-0 bottom-0 w-20 md:w-40 z-10 pointer-events-none" style={{ background: "linear-gradient(to left, #ffffff, transparent)" }} />
          <SectorConveyor sectorKeys={MARQUEE_ROW_ONE_KEYS} direction="left" speed={0.6} className="mb-3" />
          <SectorConveyor sectorKeys={MARQUEE_ROW_TWO_KEYS} direction="right" speed={0.5} className="pb-4" />
        </div>
      </div>
    </section>
  );
}
