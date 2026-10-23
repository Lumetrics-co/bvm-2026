import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import LegalDocument, { type LegalSection } from "@/components/legal/LegalDocument";
import PageShell from "@/components/layout/PageShell";
import { CONTACT } from "@/lib/site";
import { t, tRaw } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Screen Reader Access | Bharatiya Vyapar Mahotsav 2026",
  description: "Screen readers compatible with the Bharatiya Vyapar Mahotsav 2026 website.",
};

const SCREEN_READERS = [
  { name: "NVDA", vendor: "NV Access", platform: "Windows", free: true, url: "https://www.nvaccess.org/" },
  { name: "JAWS", vendor: "Freedom Scientific", platform: "Windows", free: false, url: "https://www.freedomscientific.com/products/software/jaws/" },
  { name: "Narrator", vendor: "Microsoft", platform: "Windows", free: true, url: "https://support.microsoft.com/windows/complete-guide-to-narrator" },
  { name: "VoiceOver", vendor: "Apple", platform: "macOS / iOS", free: true, url: "https://www.apple.com/accessibility/vision/" },
  { name: "TalkBack", vendor: "Google", platform: "Android", free: true, url: "https://support.google.com/accessibility/android/answer/6283677" },
  { name: "Orca", vendor: "GNOME Project", platform: "Linux", free: true, url: "https://orca.gnome.org/" },
] as const;

export default function ScreenReaderAccessPage() {
  return (
    <PageShell title={t("ScreenReaderAccess.title")} subtitle={t("ScreenReaderAccess.subtitle")}>
      <LegalDocument
        sections={tRaw<{ title: string; body: string[] }[]>("ScreenReaderAccess.sections").map<LegalSection>((s) => ({
          title: s.title,
          content: s.body,
        }))}
      />

      <section className="mt-12">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">{t("ScreenReaderAccess.compatibleScreenReaders")}</h2>
        <p className="text-[15px] leading-relaxed text-gray-700 mb-5">{t("ScreenReaderAccess.compatibleIntro")}</p>
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full text-left text-sm">
            <caption className="sr-only">{t("ScreenReaderAccess.tableCaption")}</caption>
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                {(["screenReader", "vendor", "platform", "cost"] as const).map((key) => (
                  <th key={key} scope="col" className="px-4 py-3 font-semibold">
                    {t(`ScreenReaderAccess.tableHeaders.${key}`)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {SCREEN_READERS.map((reader) => (
                <tr key={reader.name}>
                  <th scope="row" className="px-4 py-3 font-semibold">
                    <a href={reader.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-magenta hover:underline">
                      {reader.name}
                      <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                      <span className="sr-only">{t("ScreenReaderAccess.opensInNewTab")}</span>
                    </a>
                  </th>
                  <td className="px-4 py-3">{reader.vendor}</td>
                  <td className="px-4 py-3">{reader.platform}</td>
                  <td className="px-4 py-3">{reader.free ? t("ScreenReaderAccess.costFree") : t("ScreenReaderAccess.costCommercial")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-gray-500">{t("ScreenReaderAccess.disclaimer")}</p>
      </section>

      <section className="mt-12 rounded-xl border border-amber-200 bg-amber-50 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-2">{t("ScreenReaderAccess.needHelpHeading")}</h2>
        <p className="text-[15px] leading-relaxed text-gray-700">
          {t("ScreenReaderAccess.needHelpBodyPrefix")}
          <a href={`mailto:${t("ScreenReaderAccess.needHelpEmail")}`} className="font-semibold text-magenta hover:underline">
            {t("ScreenReaderAccess.needHelpEmail")}
          </a>
          {t("ScreenReaderAccess.needHelpBodySuffix")}
        </p>
        <p className="mt-2 text-sm text-gray-600">
          <a href={`mailto:${CONTACT.email}`} className="hover:underline">
            {CONTACT.email}
          </a>
        </p>
      </section>
    </PageShell>
  );
}
