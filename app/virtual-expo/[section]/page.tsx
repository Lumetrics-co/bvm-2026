import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ExpoHall from "@/components/expo/ExpoHall";
import ExpoShell from "@/components/expo/ExpoShell";
import { EXPO_SECTIONS, getSection } from "@/lib/expo/data";

export function generateStaticParams() {
  return EXPO_SECTIONS.map((section) => ({ section: section.id }));
}

export async function generateMetadata({ params }: PageProps<"/virtual-expo/[section]">): Promise<Metadata> {
  const { section: id } = await params;
  const section = getSection(id);
  return { title: section ? `${section.name} | Virtual Expo | Bharatiya Vyapar Mahotsav 2026` : "Virtual Expo" };
}

export default async function SectionPage({ params }: PageProps<"/virtual-expo/[section]">) {
  const { section: id } = await params;
  const section = getSection(id);
  if (!section) notFound();

  return (
    <ExpoShell
      title={section.name}
      icon={section.icon}
      subtitle={section.blurb}
      crumbs={[{ label: "Home", href: "/" }, { label: "Virtual Expo", href: "/virtual-expo" }, { label: section.name }]}
    >
      <ExpoHall kind="section" sectionId={section.id} />
    </ExpoShell>
  );
}
