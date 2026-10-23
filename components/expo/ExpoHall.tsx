"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import {
  EXPO_SECTIONS,
  getSection,
  getShop,
  shopsInSection,
} from "@/lib/expo/data";
import type { WorldItem } from "./ExpoWorld";
import ProductModal from "./ProductModal";
import ShopChatbot from "./ShopChatbot";

const ExpoWorld = dynamic(() => import("./ExpoWorld"), {
  ssr: false,
  loading: () => <div className="h-[360px] w-full animate-pulse rounded-2xl bg-gray-200 md:h-[480px]" aria-hidden="true" />,
});

type HallProps = { kind: "map" } | { kind: "section"; sectionId: string } | { kind: "shop"; shopId: string };

export default function ExpoHall(props: HallProps) {
  const router = useRouter();
  const kind = props.kind;
  const id = props.kind === "section" ? props.sectionId : props.kind === "shop" ? props.shopId : "";
  const [productId, setProductId] = useState<string | null>(null);

  const shop = kind === "shop" ? getShop(id) : undefined;
  const section = kind === "section" ? getSection(id) : shop ? getSection(shop.sectionId) : undefined;
  const product = shop?.products.find((p) => p.id === productId) ?? null;

  // Deep-link to a product via #product-id (also follows back/forward navigation)
  useEffect(() => {
    if (kind !== "shop") return;
    const sync = () => setProductId(window.location.hash.slice(1) || null);
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, [kind]);

  const { items, hint, onEnter } = useMemo(() => {
    if (kind === "map") {
      return {
        items: EXPO_SECTIONS.map<WorldItem>((s) => ({ id: s.id, name: s.name, icon: s.icon, color: s.color, enterLabel: "enter" })),
        hint: "Drag to look around · WASD or the pad to walk · tap Enter near a hall",
        onEnter: (sectionId: string) => router.push(`/virtual-expo/${sectionId}`),
      };
    }
    if (kind === "section") {
      return {
        items: shopsInSection(id).map<WorldItem>((s) => ({
          id: s.id,
          name: s.name,
          icon: s.icon,
          color: s.color,
          sub: s.tagline,
          enterLabel: "enter",
        })),
        hint: "Drag to look around · WASD or the pad to walk · tap Enter near a shop",
        onEnter: (shopId: string) => router.push(`/virtual-expo/${id}/${shopId}`),
      };
    }
    const current = getShop(id);
    const icon = current ? (getSection(current.sectionId)?.icon ?? "") : "";
    return {
      items: (current?.products ?? []).map<WorldItem>((p) => ({
        id: p.id,
        name: p.name,
        icon,
        color: current?.color ?? "#4f46e5",
        sub: p.price,
        enterLabel: "view",
      })),
      hint: "Drag to look around · WASD or the pad to walk · tap View near a pedestal",
      onEnter: (productKey: string) => {
        setProductId(productKey);
        window.history.replaceState(null, "", `#${productKey}`);
      },
    };
  }, [kind, id, router]);

  const closeProduct = () => {
    setProductId(null);
    window.history.replaceState(null, "", window.location.pathname);
  };

  return (
    <div className="space-y-6">
      <ExpoWorld items={items} onEnter={onEnter} hint={hint} />

      {kind === "section" && section && (
        <p className="text-center text-sm text-gray-500">Walk up to a shop and press E (or tap Enter) to step inside.</p>
      )}
      {kind === "map" && (
        <p className="text-center text-sm text-gray-500">Walk up to a hall and press E (or tap Enter) to step inside.</p>
      )}

      {shop && section && (
        <>
          <div className="max-w-md">
            <ShopChatbot shop={shop} />
          </div>
          <ProductModal product={product} shop={shop} section={section} onClose={closeProduct} />
        </>
      )}
    </div>
  );
}
