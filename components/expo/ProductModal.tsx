"use client";

import { useRef } from "react";
import { X } from "lucide-react";
import { useDialogA11y } from "@/hooks/useDialogA11y";
import type { ExpoProduct, ExpoSection, ExpoShop } from "@/lib/expo/data";

interface ProductModalProps {
  product: ExpoProduct | null;
  shop: ExpoShop;
  section: ExpoSection;
  onClose: () => void;
}

export default function ProductModal({ product, shop, section, onClose }: ProductModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  useDialogA11y(product !== null, onClose, dialogRef);
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-5" onClick={onClose} role="presentation">
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={product.name}
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[85vh] w-full max-w-md overflow-y-auto rounded-2xl bg-white p-7 text-gray-900 shadow-2xl"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3.5 top-3.5 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200"
        >
          <X className="h-4 w-4" />
        </button>
        <span className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl text-2xl text-white" style={{ background: shop.color }}>
          {section.icon}
        </span>
        <h2 className="text-2xl font-bold">{product.name}</h2>
        <p className="mb-3 font-bold text-magenta">{product.price}</p>
        <p className="mb-4 text-[15px] leading-relaxed text-gray-700">{product.description}</p>
        <dl className="border-t border-gray-200 pt-3 text-sm">
          {Object.entries(product.specs).map(([key, value]) => (
            <div key={key} className="flex justify-between border-b border-gray-200 py-1.5">
              <dt className="text-gray-500">{key}</dt>
              <dd className="font-semibold">{value}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-3.5 text-sm text-gray-500">
          From <strong>{shop.name}</strong>
        </p>
      </div>
    </div>
  );
}
