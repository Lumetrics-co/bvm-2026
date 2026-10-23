import { t } from "@/lib/i18n";
import { PARTNER_GROUPS, altFromSrc } from "@/lib/data/partners";
import SectionHeading from "@/components/ui/SectionHeading";
import LogoCard from "./partners/LogoCard";
import LogoCarousel from "./partners/LogoCarousel";

export default function Partners() {
  return (
    <section
      id="partners"
      aria-label={t("LogoTabsSection.ariaLabel")}
      style={{ background: "#f9fafb", padding: "72px 0 80px", position: "relative", overflow: "hidden" }}
    >
      <div style={{ padding: "0 24px", position: "relative" }}>
        <SectionHeading
          badge={t("LogoTabsSection.badge")}
          line1={t("LogoTabsSection.headingLine1")}
          line2={t("LogoTabsSection.headingLine2")}
        />
      </div>

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 clamp(40px, 5vw, 72px)", position: "relative" }}>
        {PARTNER_GROUPS.map((group, index) => {
          const Icon = group.icon;
          const isLast = index === PARTNER_GROUPS.length - 1;
          const alts = group.logos.map((src, i) =>
            group.altKeys?.[i] ? t(`LogoTabsSection.govtAlt.${group.altKeys[i]}`) : altFromSrc(src),
          );
          return (
            <div key={group.labelKey} style={isLast ? undefined : { marginBottom: "52px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "28px" }}>
                <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, transparent, rgba(194,24,91,0.35))" }} />
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <Icon size={16} aria-hidden="true" style={{ color: "#c2185b" }} />
                  <span
                    style={{
                      fontSize: "16px",
                      fontWeight: 700,
                      textTransform: "capitalize",
                      letterSpacing: "0.05em",
                      background: "linear-gradient(90deg, #c2185b, #ef7b20)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {t(`LogoTabsSection.${group.labelKey}`)}
                  </span>
                </div>
                <div style={{ flex: 1, height: "1px", background: "linear-gradient(to left, transparent, rgba(239,123,32,0.35))" }} />
              </div>

              {group.layout === "carousel" ? (
                <LogoCarousel
                  logos={group.logos}
                  alts={alts}
                  scrollLeftLabel={t("LogoTabsSection.scrollLeft")}
                  scrollRightLabel={t("LogoTabsSection.scrollRight")}
                />
              ) : (
                <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "16px", padding: "8px 0" }}>
                  {group.logos.map((src, i) => (
                    <LogoCard key={src} src={src} alt={alts[i]} size="large" />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
