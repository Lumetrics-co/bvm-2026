import type { Metadata } from "next";
import ExpoHall from "@/components/expo/ExpoHall";
import ExpoShell from "@/components/expo/ExpoShell";
import { EXPO_EVENT } from "@/lib/expo/data";

export const metadata: Metadata = {
  title: "Virtual Expo | Bharatiya Vyapar Mahotsav 2026",
  description: "Walk through a 3D exhibition hall, step into virtual shops, browse products and chat with each brand's bot.",
};

export default function VirtualExpoPage() {
  return (
    <ExpoShell
      title={EXPO_EVENT.name}
      subtitle={EXPO_EVENT.tagline}
      crumbs={[{ label: "Home", href: "/" }, { label: "Virtual Expo" }]}
    >
      <ExpoHall kind="map" />
    </ExpoShell>
  );
}
