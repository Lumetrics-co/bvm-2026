import { t } from "@/lib/i18n";
import OrbitDot from "@/components/ui/OrbitDot";
import ZoneCard from "@/components/ui/ZoneCard";
import { cn } from "@/lib/cn";

const ZONES = [
  { img: "/images/zones/zone1.png", color: "#c2185b" },
  { img: "/images/zones/zone3.png", color: "#c2185b" },
  { img: "/images/zones/zone4.png", color: "#7b1fa2" },
  { img: "/images/zones/zone5.png", color: "#EF7B20" },
  { img: "/images/zones/zone6.png", color: "#c2185b" },
  { img: "/images/zones/zone7.png", color: "#EF7B20" },
  { img: "/images/zones/zone8.png", color: "#c2185b" },
  { img: "/images/zones/zone9.jpeg", color: "#EF7B20" },
];

export default function Zones() {
  return (
    <section id="zones" aria-label={t("FocusedBusinessZonesSection.ariaLabel")} className="relative overflow-hidden border-t border-gray-100" style={{ background: '#ffffff', paddingTop: '80px', paddingBottom: '80px' }}>
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
      <div className="absolute top-0 left-0 right-0 pointer-events-none z-10" style={{ height: '2px', background: 'linear-gradient(90deg, transparent 0%, #c2185b 30%, #EF7B20 70%, transparent 100%)', animation: 'orbit-line-glow 3s ease-in-out infinite' }} />
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none z-10" style={{ height: '2px', background: 'linear-gradient(90deg, transparent 0%, #EF7B20 30%, #c2185b 70%, transparent 100%)', animation: 'orbit-line-glow 3s ease-in-out infinite 1.5s' }} />
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 20px', position: 'relative', zIndex: '10' }}>
        <div className="text-center">
          <div className="anim-hidden anim-slide-up">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="h-px w-8" style={{ background: 'linear-gradient(to right, transparent, #c2185b)' }} />
              <span className="text-[10px] uppercase tracking-[0.35em] font-bold" style={{ color: '#e84393' }}>
                {t("FocusedBusinessZonesSection.badge")}
              </span>
              <div className="h-px w-8" style={{ background: 'linear-gradient(to left, transparent, #ef7b20)' }} />
            </div>
          </div>
          <div className="anim-hidden anim-slide-up anim-delay-1">
            <h2 className="font-bold leading-[1.05] tracking-tight text-4xl sm:text-5xl lg:text-6xl xl:text-[4.5rem]">
              <span style={{ color: '#1a0a02' }}>
                {t("FocusedBusinessZonesSection.headingLine1")}
              </span>
              <br />
              <span className="section-heading-shimmer">
                {t("FocusedBusinessZonesSection.headingLine2")}
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
          <p style={{ color: 'rgba(0,0,0,0.7)', fontSize: 'clamp(13px, 1.4vw, 15px)', maxWidth: '480px', margin: '-16px auto 48px', lineHeight: '1.6', textAlign: 'center' }}>
            {t("FocusedBusinessZonesSection.subheading")}
          </p>
        </div>
        <div className="relative grid grid-cols-1 sm:grid-cols-4 gap-3 sm:gap-4">
          {ZONES.map((zone, i) => (
            <div key={zone.img} className={cn("anim-hidden anim-slide-up", i > 0 && `anim-delay-${i}`)}>
              <ZoneCard
                img={zone.img}
                color={zone.color}
                number={i + 1}
                title={t(`FocusedBusinessZonesSection.zones.${i}.title`)}
                desc={t(`FocusedBusinessZonesSection.zones.${i}.desc`)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
