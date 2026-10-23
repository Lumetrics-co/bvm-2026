import type { Metadata } from "next";
import LegalDocument, { type LegalSection } from "@/components/legal/LegalDocument";
import PageShell from "@/components/layout/PageShell";
import { t, tRaw } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Privacy Policy | Bharatiya Vyapar Mahotsav 2026",
  description: "How Bharatiya Vyapar Mahotsav 2026 collects, uses and protects personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <PageShell title={t("PrivacyPolicy.title")} subtitle={t("PrivacyPolicy.subtitle")}>
      <LegalDocument sections={tRaw<LegalSection[]>("PrivacyPolicy.sections")} />
    </PageShell>
  );
}
