"use client";

import { useEffect, useState } from "react";
import { ArrowUp, Phone, X } from "lucide-react";
import { t } from "@/lib/i18n";
import { CALL_NUMBERS, WHATSAPP_URL } from "@/lib/site";
import { cn } from "@/lib/cn";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";

const FAB_BASE =
  "fixed z-50 w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-500";

export default function FloatingButtons() {
  const [visible, setVisible] = useState(false);
  const [callOpen, setCallOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const state = visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none";

  return (
    <>
      {callOpen && (
        <div className="fixed inset-0 z-60 flex items-end sm:items-end justify-start pointer-events-none">
          <div
            className="pointer-events-auto mb-24 ml-6 bg-white rounded-2xl shadow-2xl border border-gray-100 w-64 overflow-hidden"
            style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.18)" }}
          >
            <div className="flex items-center justify-between px-4 py-3 bg-linear-to-r from-magenta to-[#EF7B20]">
              <span className="text-white text-sm font-semibold flex items-center gap-2">
                <Phone className="w-4 h-4" /> {t("FloatingButtons.callUsHeader")}
              </span>
              <button
                onClick={() => setCallOpen(false)}
                className="text-white/80 hover:text-white transition-colors"
                aria-label={t("FloatingButtons.close")}
              >
                <X className="w-4 h-4 cursor-pointer" />
              </button>
            </div>
            <div className="px-4 py-3 space-y-2">
              {CALL_NUMBERS.map((n) => (
                <a
                  key={n.tel}
                  href={`tel:${n.tel}`}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-gray-50 hover:bg-magenta/5 border border-gray-100 hover:border-magenta/20 transition-colors group"
                >
                  <span className="w-8 h-8 rounded-full bg-linear-to-r from-magenta to-[#EF7B20] flex items-center justify-center shrink-0">
                    <Phone className="w-3.5 h-3.5 text-white" />
                  </span>
                  <span className="text-sm font-semibold text-gray-800 group-hover:text-magenta transition-colors">
                    {n.display}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setCallOpen((v) => !v)}
        className={cn(
          FAB_BASE,
          "bottom-24 left-6 bg-linear-to-r from-magenta to-[#EF7B20] shadow-magenta/30 cursor-pointer",
          state,
        )}
        aria-label={t("FloatingButtons.callUs")}
      >
        <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
      </button>

      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(FAB_BASE, "bottom-6 left-6 bg-[#25D366] shadow-[#25D366]/30 cursor-pointer", state)}
        aria-label={t("FloatingButtons.chatOnWhatsapp")}
      >
        <WhatsAppIcon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
      </a>

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={cn(FAB_BASE, "bottom-6 right-6 bg-linear-to-r from-magenta to-[#EF7B20] shadow-magenta/30", state)}
        aria-label={t("FloatingButtons.scrollToTop")}
      >
        <ArrowUp className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
      </button>
    </>
  );
}
