import { t } from "@/lib/i18n";

/**
 * Only English content is available in this build; the Hindi toggle is rendered
 * for parity with the original site but disabled until messages/hi.json exists.
 */
export default function LanguageSwitcher() {
  return (
    <div
      className="inline-flex items-center rounded-full border border-white/20 bg-white/5 backdrop-blur-md p-0.5 text-xs font-semibold"
      role="group"
      aria-label={t("LanguageSwitcher.label")}
    >
      <button
        type="button"
        aria-pressed="true"
        className="px-2.5 py-1 rounded-full transition-colors bg-gradient-to-r from-magenta to-[#EF7B20] text-white"
      >
        {t("LanguageSwitcher.english")}
      </button>
      <button
        type="button"
        aria-pressed="false"
        disabled
        title="Hindi translation coming soon"
        className="px-2.5 py-1 rounded-full transition-colors text-white/40 cursor-not-allowed"
      >
        {t("LanguageSwitcher.hindi")}
      </button>
    </div>
  );
}
