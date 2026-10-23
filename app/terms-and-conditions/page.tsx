import type { Metadata } from "next";
import LegalDocument, { type LegalSection } from "@/components/legal/LegalDocument";
import PageShell from "@/components/layout/PageShell";
import { t, tRaw } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Terms & Conditions | Bharatiya Vyapar Mahotsav 2026",
  description: "Terms governing use of the Bharatiya Vyapar Mahotsav 2026 website and participation in the event.",
};

export default function TermsPage() {
  return (
    <PageShell title={t("TermsAndConditions.title")} subtitle={t("TermsAndConditions.subtitle")}>
      <LegalDocument sections={tRaw<LegalSection[]>("TermsAndConditions.sections")} />
    </PageShell>
  );
}
