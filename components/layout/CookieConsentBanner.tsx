"use client";

import Link from "next/link";
import { Cookie } from "lucide-react";
import { t } from "@/lib/i18n";
import { useCookieConsent } from "@/components/providers/CookieConsentProvider";

export default function CookieConsentBanner() {
  const { status, hydrated, accept, reject } = useCookieConsent();
  if (!hydrated || status !== "pending") return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label={t("CookieConsentBanner.dialogLabel")}
      className="fixed bottom-0 left-0 right-0 z-[90] px-3 sm:px-4 pb-3 sm:pb-4 a11y-preserve"
    >
      <div className="max-w-5xl mx-auto bg-[#070b1e] text-white rounded-2xl shadow-2xl border border-white/10 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
        <div className="shrink-0 w-10 h-10 rounded-full bg-linear-to-r from-magenta to-[#EF7B20] flex items-center justify-center">
          <Cookie className="w-5 h-5" aria-hidden="true" />
        </div>
        <p className="flex-1 text-sm leading-relaxed text-white/90">
          {t("CookieConsentBanner.message")}
          <Link
            href="/privacy-policy"
            className="font-semibold text-white underline underline-offset-2 hover:text-saffron"
          >
            {t("CookieConsentBanner.privacyPolicy")}
          </Link>
          {t("CookieConsentBanner.messageEnd")}
        </p>
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={reject}
            className="px-4 py-2 rounded-full text-sm font-semibold border border-white/30 text-white hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-saffron"
          >
            {t("CookieConsentBanner.reject")}
          </button>
          <button
            type="button"
            onClick={accept}
            className="px-4 py-2 rounded-full text-sm font-semibold bg-linear-to-r from-magenta to-[#EF7B20] text-white hover:opacity-90 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-saffron"
          >
            {t("CookieConsentBanner.accept")}
          </button>
        </div>
      </div>
    </div>
  );
}
