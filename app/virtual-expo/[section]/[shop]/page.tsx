import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ExpoHall from "@/components/expo/ExpoHall";
import ExpoShell from "@/components/expo/ExpoShell";
import { EXPO_SHOPS, getSection, getShop } from "@/lib/expo/data";

export function generateStaticParams() {
  return EXPO_SHOPS.map((shop) => ({ section: shop.sectionId, shop: shop.id }));
}

export async function generateMetadata({ params }: PageProps<"/virtual-expo/[section]/[shop]">): Promise<Metadata> {
  const { shop: shopId } = await params;
  const shop = getShop(shopId);
  return { title: shop ? `${shop.name} | Virtual Expo | Bharatiya Vyapar Mahotsav 2026` : "Virtual Expo" };
}

export default async function ShopPage({ params }: PageProps<"/virtual-expo/[section]/[shop]">) {
  const { section: sectionId, shop: shopId } = await params;
  const shop = getShop(shopId);
  const section = getSection(sectionId);
  if (!shop || !section || shop.sectionId !== section.id) notFound();

  return (
    <ExpoShell
      title={shop.name}
      icon={shop.icon}
      subtitle={`${shop.tagline} — ${shop.about}`}
      crumbs={[
        { label: "Home", href: "/" },
        { label: "Virtual Expo", href: "/virtual-expo" },
        { label: section.name, href: `/virtual-expo/${section.id}` },
        { label: shop.name },
      ]}
    >
      <p className="mb-6 text-sm text-gray-500">
        Founded {shop.founded} · {shop.hq}
      </p>
      <ExpoHall kind="shop" shopId={shop.id} />
    </ExpoShell>
  );
}
