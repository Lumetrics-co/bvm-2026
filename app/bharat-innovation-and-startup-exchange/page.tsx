import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/layout/PageShell";
import { t } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Bharat Innovation and Startup Exchange | Bharatiya Vyapar Mahotsav 2026",
};

export default function BisePage() {
  return (
    <PageShell title={t("Footer.bharatInnovationStartupExchange")} subtitle="Bharatiya Vyapar Mahotsav 2026">
      <div className="text-center max-w-2xl mx-auto">
        <p className="text-[15px] leading-relaxed text-gray-700">
          Content for the Bharat Innovation and Startup Exchange (BISE) page was not part of the saved site this project was
          rebuilt from. Add it in <code className="rounded bg-gray-100 px-1.5 py-0.5 text-sm">app/bharat-innovation-and-startup-exchange/page.tsx</code>.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 mt-8 px-6 py-2.5 rounded-full bg-linear-to-r from-magenta to-[#EF7B20] text-white text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          Back to home
        </Link>
      </div>
    </PageShell>
  );
}
