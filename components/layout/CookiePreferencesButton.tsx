"use client";

import { t } from "@/lib/i18n";
import { useCookieConsent } from "@/components/providers/CookieConsentProvider";

export default function CookiePreferencesButton() {
  const { reopen } = useCookieConsent();
  return (
    <button
      type="button"
      onClick={reopen}
      className="text-xs text-gray-300 hover:text-white transition-colors bg-transparent border-0 p-0 cursor-pointer"
    >
      {t("Footer.cookiePreferences")}
    </button>
  );
}
