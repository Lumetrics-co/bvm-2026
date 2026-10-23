import Image from "next/image";
import Link from "next/link";
import { t } from "@/lib/i18n";
import { ChevronRight, Mail, MapPin, Phone } from "lucide-react";
import { CONTACT } from "@/lib/site";
import CookiePreferencesButton from "@/components/layout/CookiePreferencesButton";

export default function Footer() {
  return (
    <div>
      <footer className="relative bg-[#050530] border-t border-white/5 overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 opacity-30 pointer-events-none anim-float">
          <Image src="/images/banner-three-start2.webp" alt="" fill sizes="100vw" className="object-contain" />
        </div>
        <div className="absolute bottom-12 left-0 w-24 h-24 opacity-30 pointer-events-none anim-float-delayed">
          <Image src="/images/start-shape-three-4.webp" alt="" fill sizes="100vw" className="object-contain" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-12 sm:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_1.5fr] gap-8 lg:gap-12">
            <div>
              <div className="relative w-40 h-32 mb-4 -mt-8">
                <Image src="/images/Bharat-Vyapar-Mahotsav.png" alt={t("Footer.logoAlt")} fill sizes="100vw" className="object-contain object-left" />
              </div>
            </div>
            <div>
              <h4 className="text-white font-bold text-lg mb-5">
                {t("Footer.importantResources")}
              </h4>
              <ul className="space-y-3">
                <li>
                  <a className="flex items-center gap-2 text-sm text-gray-300 hover:text-saffron transition-colors" href="/images/Rate-Card-BVM.pdf" target="_blank" rel="noopener noreferrer">
                    <ChevronRight className="w-3 h-3 text-saffron" />
                    {t("Footer.viewStallPricing")}
                  </a>
                </li>
                <li>
                  <Link className="flex items-center gap-2 text-sm text-gray-300 hover:text-saffron transition-colors" href="/bharat-innovation-and-startup-exchange">
                    <ChevronRight className="w-3 h-3 text-saffron" />
                    {t("Footer.bharatInnovationStartupExchange")}
                  </Link>
                </li>
                <li>
                  <Link className="flex items-center gap-2 text-sm text-gray-300 hover:text-saffron transition-colors" href="/virtual-expo">
                    <ChevronRight className="w-3 h-3 text-saffron" />
                    {t("Footer.virtualExpo")}
                  </Link>
                </li>
                <li>
                  <a className="flex items-center gap-2 text-sm text-gray-300 hover:text-saffron transition-colors" href="https://www.easemytrip.com/collab/bvm/hotels.html?user=bvm" target="_blank" rel="noopener noreferrer">
                    <ChevronRight className="w-3 h-3 text-saffron" />
                    {t("Footer.bookFlightsAndHotels")}
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <div className="flex items-center justify-between mb-5">
                <h4 className="text-white font-bold text-lg">
                  {t("Footer.contactBvm")}
                </h4>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <MapPin className="w-5 h-5 shrink-0 text-white/85" />
                  <span className="font-semibold text-white">
                    {t("Footer.address")}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <Mail className="w-4 h-4 shrink-0 text-white/85" />
                  <a href={`mailto:${CONTACT.email}`} className="hover:text-white transition-colors">
                    {CONTACT.email}
                  </a>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <Phone className="w-4 h-4 shrink-0 text-white/85" />
                  <span>
                    {CONTACT.phone} / {CONTACT.phone2}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-white/5 py-4">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-xs text-gray-300">
              {t("Footer.copyright")}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <Link className="text-xs text-gray-300 hover:text-white transition-colors" href="/privacy-policy">
                {t("Footer.privacyPolicy")}
              </Link>
              <span className="text-gray-400 text-xs" aria-hidden="true">
                |
              </span>
              <Link className="text-xs text-gray-300 hover:text-white transition-colors" href="/terms-and-conditions">
                {t("Footer.termsConditions")}
              </Link>
              <span className="text-gray-400 text-xs" aria-hidden="true">
                |
              </span>
              <Link className="text-xs text-gray-300 hover:text-white transition-colors" href="/screen-reader-access">
                {t("Footer.screenReaderAccess")}
              </Link>
              <span className="text-gray-400 text-xs" aria-hidden="true">
                |
              </span>
              <CookiePreferencesButton />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
