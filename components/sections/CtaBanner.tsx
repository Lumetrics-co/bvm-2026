"use client";

import Image from "next/image";
import { t } from "@/lib/i18n";
import { ArrowUpRight } from "lucide-react";
import { useModal } from "@/components/providers/ModalProvider";

export default function CtaBanner() {
  const { openRegister } = useModal();

  return (
    <section aria-label={t("QuoteSection.ariaLabel")} className="bg-white py-12 sm:py-16 lg:py-20">
      <div className="anim-hidden anim-scale anim-slow max-w-6xl mx-auto px-4">
        <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-purple-accent/10">
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-magenta via-magenta to-magenta-dark z-20" />
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-magenta/100 to-[#EF7B20]/100" />
          </div>
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 p-10 sm:p-12 lg:p-16">
            <div>
              <p className="text-white text-sm sm:text-base lg:text-lg leading-relaxed mb-8">
                {t("QuoteSection.quote")}
              </p>
              <div className="flex flex-wrap gap-3">
                <button onClick={() => openRegister("DELEGATE")} className="inline-flex items-center gap-1.5 px-5 sm:px-6 py-2.5 border border-white/60 text-white text-xs sm:text-sm rounded-full hover:bg-white/10 hover:border-white transition-all hover:-translate-y-0.5">
                  {t("QuoteSection.buttons.delegateRegistration")}
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => openRegister("VISITOR")} className="inline-flex items-center gap-1.5 px-5 sm:px-6 py-2.5 border border-white/60 text-white text-xs sm:text-sm rounded-full hover:bg-white/10 hover:border-white transition-all hover:-translate-y-0.5">
                  {t("QuoteSection.buttons.visitorRegistration")}
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            <div className="flex flex-col items-center shrink-0">
              <div className="relative w-28 h-28 lg:w-36 lg:h-36 bg-white rounded-lg p-2 hover:shadow-lg transition-shadow">
                <Image src="/images/qrcode.png" alt={t("QuoteSection.qrAlt")} fill sizes="100vw" className="object-contain p-1" />
              </div>
              <p className="text-white text-xs text-center mt-2 leading-tight font-medium">
                {t("QuoteSection.qrCaption1")}
                <br />
                {t("QuoteSection.qrCaption2")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
