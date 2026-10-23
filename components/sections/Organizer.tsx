import Image from "next/image";
import { t } from "@/lib/i18n";
import OrbitDot from "@/components/ui/OrbitDot";

const SPEAKER_IMAGES = [
  "/images/speakers/smriti-irani-new.png",
  "/images/speakers/praveen-khandelwal-new.png",
  "/images/speakers/bc-bhartia-new.png",
  "/images/speakers/brajmohan-agarwal-new.png",
];

const BOARD = [
  { name: "Dr. Ram Gopal Goyal", role: "Chairman", image: "/images/speakers/ram-gopal-goyal.png" },
  { name: "Shri. Satyabhushan Jain", role: "Working Chairman", image: "/images/speakers/satyabhushan-Jain.png" },
  { name: "Mr. Naresh Rawat", role: "Vice Chairman", image: "/images/speakers/naresh-rawat.png" },
  { name: "Dr. Gian Aggarwal", role: "Vice Chairman", image: "/images/speakers/gyan-agrawal.png" },
];

export default function Organizer() {
  return (
    <section id="cait" className="relative overflow-hidden border-t border-gray-100" style={{ background: '#ffffff' }}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="absolute rounded-full" style={{ width: '700px', height: '700px', top: '-200px', right: '-150px', background: 'radial-gradient(circle, rgba(194,24,91,0.1) 0%, transparent 65%)', animation: 'orbit-glow-pulse 5s ease-in-out infinite' }} />
        <div className="absolute rounded-full" style={{ width: '600px', height: '600px', bottom: '-150px', left: '-100px', background: 'radial-gradient(circle, rgba(239,123,32,0.1) 0%, transparent 65%)', animation: 'orbit-glow-pulse 6s ease-in-out infinite 1.5s' }} />
        <div className="absolute rounded-full" style={{ width: '500px', height: '500px', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'radial-gradient(circle, rgba(123,31,162,0.06) 0%, transparent 65%)', animation: 'orbit-glow-pulse 7s ease-in-out infinite 0.8s' }} />
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
        <div className="absolute rounded-full hidden lg:block" style={{ width: '14px', height: '14px', top: '30%', left: '6%', background: '#c2185b', boxShadow: '0 0 20px #c2185b, 0 0 40px #c2185b88', animation: 'orbit-float 4s ease-in-out infinite' }} />
        <div className="absolute rounded-full hidden lg:block" style={{ width: '10px', height: '10px', top: '65%', left: '10%', background: '#ef7b20', boxShadow: '0 0 16px #ef7b20, 0 0 32px #ef7b2088', animation: 'orbit-float 5.5s ease-in-out infinite 1s' }} />
        <div className="absolute rounded-full hidden lg:block" style={{ width: '8px', height: '8px', top: '50%', left: '4%', background: '#c2185b', boxShadow: '0 0 14px #c2185b, 0 0 28px #c2185b88', animation: 'orbit-float 6s ease-in-out infinite 2s' }} />
      </div>
      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 pt-14 sm:pt-20 pb-10 sm:pb-14">
        <div className="text-center">
          <div className="text-center">
            <div className="anim-hidden anim-slide-up">
              <div className="inline-flex items-center gap-2 mb-4">
                <div className="h-px w-8" style={{ background: 'linear-gradient(to right, transparent, #c2185b)' }} />
                <span className="text-[10px] uppercase tracking-[0.35em] font-bold" style={{ color: '#e84393' }}>
                  {t("AboutOrganiserSection.badge")}
                </span>
                <div className="h-px w-8" style={{ background: 'linear-gradient(to left, transparent, #ef7b20)' }} />
              </div>
            </div>
            <div className="anim-hidden anim-slide-up anim-delay-1">
              <h2 className="font-bold leading-[1.05] tracking-tight text-4xl sm:text-5xl lg:text-6xl xl:text-[4.5rem]">
                <span style={{ color: '#1a0a02' }}>
                  {t("AboutOrganiserSection.headingLine1")}
                </span>
                <br />
                <span className="section-heading-shimmer">
                  {t("AboutOrganiserSection.headingLine2")}
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
        </div>
        <div className="anim-hidden anim-slide-left anim-delay-2">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16 mb-14 sm:mb-20">
            <div className="flex-1 text-left">
              <h3 className="text-xl sm:text-2xl font-bold mb-4" style={{ color: '#1a0a02' }}>
                {t("AboutOrganiserSection.itpoTitle")}
              </h3>
              <p className="text-base leading-relaxed mb-4" style={{ color: 'rgba(0,0,0,0.65)' }}>
                {t("AboutOrganiserSection.itpoP1")}
              </p>
              <p className="text-base leading-relaxed mb-4" style={{ color: 'rgba(0,0,0,0.65)' }}>
                {t("AboutOrganiserSection.itpoP2")}
              </p>
              <p className="text-sm" style={{ color: 'rgba(0,0,0,0.5)' }}>
                {t("AboutOrganiserSection.moreInfo")}{" "}
                <a href="https://www.itpo.gov.in/" target="_blank" rel="noopener noreferrer" className="font-semibold" style={{ color: '#c2185b' }}>
                  {t("AboutOrganiserSection.itpoLinkText")}
                </a>
              </p>
            </div>
            <img src="/images/ITPO-logo.png" alt={t("AboutOrganiserSection.itpoAlt")} className="shrink-0 w-52 sm:w-64 lg:w-72 h-auto object-contain" />
          </div>
        </div>
        <div className="h-px w-full mb-14 sm:mb-20" style={{ background: 'linear-gradient(to right, transparent, rgba(194,24,91,0.35), rgba(239,123,32,0.35), transparent)' }} />
        <div className="anim-hidden anim-slide-right anim-delay-1">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            <img src="/images/CAIT-logo.png" alt={t("AboutOrganiserSection.caitAlt")} className="shrink-0 w-40 sm:w-48 lg:w-56 h-auto object-contain order-first" />
            <div className="flex-1 text-left">
              <h3 className="text-xl sm:text-2xl font-bold mb-4" style={{ color: '#1a0a02' }}>
                {t("AboutOrganiserSection.caitTitle")}
              </h3>
              <p className="text-base leading-relaxed mb-4" style={{ color: 'rgba(0,0,0,0.65)' }}>
                {t("AboutOrganiserSection.caitP1")}
              </p>
              <p className="text-base leading-relaxed mb-4" style={{ color: 'rgba(0,0,0,0.65)' }}>
                {t("AboutOrganiserSection.caitP2")}
              </p>
              <p className="text-sm" style={{ color: 'rgba(0,0,0,0.5)' }}>
                {t("AboutOrganiserSection.moreInfo")}{" "}
                <a href="https://cait.in/" target="_blank" rel="noopener noreferrer" className="font-semibold" style={{ color: '#c2185b' }}>
                  {t("AboutOrganiserSection.caitLinkText")}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-10 lg:px-8 pb-14 sm:pb-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
          {SPEAKER_IMAGES.map((src, i) => (
            <div key={src} className={`anim-hidden anim-slide-up anim-delay-${i + 1}`}>
              <div className="flex flex-col items-center gap-3">
                <div className="relative w-full rounded-2xl overflow-hidden" style={{ boxShadow: "0 0 0 2px #c2185b, 0 0 20px rgba(194,24,91,0.2)" }}>
                  <Image src={src} alt={t(`AboutOrganiserSection.speakers.${i}.name`)} width={280} height={320} className="w-full h-auto object-cover object-top" />
                  <div className="absolute bottom-0 left-0 right-0 h-1/3" style={{ background: "linear-gradient(to top, rgba(194,24,91,0.5), transparent)" }} />
                </div>
                <div className="text-center">
                  <p className="font-bold text-sm sm:text-base" style={{ color: "#1a0a02" }}>
                    {t(`AboutOrganiserSection.speakers.${i}.name`)}
                  </p>
                  <p className="text-xs sm:text-sm mt-0.5" style={{ color: "rgba(0,0,0,0.85)" }}>
                    {t(`AboutOrganiserSection.speakers.${i}.role`)}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: "rgba(0,0,0,0.85)" }}>
                    {t(`AboutOrganiserSection.speakers.${i}.location`)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-10 lg:px-8 pb-14 sm:pb-20">
        <div className="h-px w-full mb-10" style={{ background: 'linear-gradient(to right, transparent, rgba(194,24,91,0.35), rgba(239,123,32,0.35), transparent)' }} />
        <h2 className="text-xl sm:text-2xl font-bold text-center mb-10" style={{ color: '#1a0a02' }}>
          BVM Board
        </h2>
        <div className="flex flex-wrap justify-center gap-10">
          {BOARD.map((member, i) => (
            <div key={member.name} className={`anim-hidden anim-slide-up anim-delay-${i + 1}`}>
              <div className="flex flex-col items-center gap-3" style={{ width: "242px" }}>
                <div className="relative w-full rounded-2xl overflow-hidden" style={{ height: "257px", boxShadow: "0 0 0 2px #c2185b, 0 0 20px rgba(194,24,91,0.2)" }}>
                  <Image src={member.image} alt={member.name} fill sizes="242px" className="object-cover object-top" />
                  <div className="absolute bottom-0 left-0 right-0 h-1/3" style={{ background: "linear-gradient(to top, rgba(194,24,91,0.5), transparent)" }} />
                </div>
                <div className="text-center">
                  <p className="font-bold text-sm sm:text-base" style={{ color: "#1a0a02" }}>
                    {member.name}
                  </p>
                  <p className="text-xs sm:text-sm mt-0.5" style={{ color: "rgba(0,0,0,0.85)" }}>
                    {member.role}
                  </p>
                  <p className="text-xs sm:text-sm mt-0.5" style={{ color: "rgba(0,0,0,0.85)" }}>
                    Bharatiya Vyapar Mahotsav 2026
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none" style={{ background: 'linear-gradient(to bottom, transparent, rgba(255,248,236,0.6))' }} />
    </section>
  );
}
