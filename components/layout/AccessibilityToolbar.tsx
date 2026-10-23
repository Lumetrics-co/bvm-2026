"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { Accessibility, BookOpen, Contrast, Link2, MousePointer2, RotateCcw, Type, Zap } from "lucide-react";
import { t } from "@/lib/i18n";
import { cn } from "@/lib/cn";
import { useAccessibility, type Contrast as ContrastMode, type TextSize } from "@/components/providers/AccessibilityProvider";

const TEXT_SIZES: { value: TextSize; label: string }[] = [
  { value: "md", label: "A" },
  { value: "lg", label: "A+" },
  { value: "xl", label: "A++" },
];

const CONTRAST_MODES: { value: ContrastMode; key: "normal" | "high" | "light" }[] = [
  { value: "normal", key: "normal" },
  { value: "high", key: "high" },
  { value: "light", key: "light" },
];

const OPTION_ON = "border-magenta bg-magenta/10 text-magenta";
const OPTION_OFF = "border-gray-200 hover:border-magenta/40 hover:bg-magenta/5";

function SectionLabel({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <div className="flex items-center gap-1.5 mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-gray-500">
      {icon}
      <span>{children}</span>
    </div>
  );
}

function Toggle({
  icon,
  label,
  checked,
  onChange,
}: {
  icon: ReactNode;
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg border border-gray-200 hover:border-magenta/40 hover:bg-magenta/5 transition-colors"
    >
      <span className="flex items-center gap-2 text-sm font-medium text-gray-700">
        <span className="text-gray-500">{icon}</span>
        {label}
      </span>
      <span className={cn("relative w-9 h-5 rounded-full transition-colors", checked ? "bg-magenta" : "bg-gray-300")}>
        <span
          className={cn(
            "absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform",
            checked ? "translate-x-4" : "translate-x-0",
          )}
        />
      </span>
    </button>
  );
}

export default function AccessibilityToolbar() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const a11y = useAccessibility();

  useEffect(() => {
    if (!open) return;
    const onMouseDown = (e: MouseEvent) => {
      const target = e.target as Node;
      if (panelRef.current && !panelRef.current.contains(target) && buttonRef.current && !buttonRef.current.contains(target)) {
        setOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={t("AccessibilityToolbar.buttonAria")}
        aria-expanded={open}
        aria-haspopup="dialog"
        className="w-10 h-10 flex items-center justify-center rounded-full text-white/80 hover:text-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-saffron transition-colors"
      >
        <Accessibility className="w-5 h-5" strokeWidth={1.75} aria-hidden="true" />
      </button>

      {open && (
        <div
          ref={panelRef}
          role="dialog"
          aria-label={t("AccessibilityToolbar.dialogLabel")}
          className="absolute right-0 mt-2 w-72 sm:w-80 rounded-2xl bg-white text-gray-800 shadow-2xl border border-gray-100 z-50 animate-slide-down overflow-hidden a11y-preserve"
        >
          <div className="px-4 py-2 bg-linear-to-r from-magenta to-[#EF7B20] text-white">
            <div className="flex items-center gap-2">
              <Accessibility className="w-4 h-4" strokeWidth={2} />
              <span className="text-xs font-semibold uppercase tracking-wide">{t("AccessibilityToolbar.headerLabel")}</span>
            </div>
          </div>

          <div className="p-3 space-y-3 max-h-[70vh] overflow-y-auto">
            <section>
              <SectionLabel icon={<Type className="w-3.5 h-3.5" />}>{t("AccessibilityToolbar.textSize")}</SectionLabel>
              <div className="grid grid-cols-3 gap-1.5">
                {TEXT_SIZES.map((s) => (
                  <button
                    key={s.value}
                    type="button"
                    onClick={() => a11y.setTextSize(s.value)}
                    aria-pressed={a11y.textSize === s.value}
                    className={cn(
                      "py-1.5 rounded-lg border text-sm font-semibold transition-colors",
                      a11y.textSize === s.value ? OPTION_ON : OPTION_OFF,
                    )}
                    style={{ fontSize: s.value === "md" ? "0.95rem" : s.value === "lg" ? "1.05rem" : "1.15rem" }}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </section>

            <section>
              <SectionLabel icon={<Contrast className="w-3.5 h-3.5" />}>{t("AccessibilityToolbar.contrast")}</SectionLabel>
              <div className="grid grid-cols-3 gap-1.5">
                {CONTRAST_MODES.map((c) => (
                  <button
                    key={c.value}
                    type="button"
                    onClick={() => a11y.setContrast(c.value)}
                    aria-pressed={a11y.contrast === c.value}
                    title={t(`AccessibilityToolbar.contrastModes.${c.key}Hint`)}
                    className={cn(
                      "py-1.5 px-1 rounded-lg border text-xs font-medium transition-colors",
                      a11y.contrast === c.value ? OPTION_ON : OPTION_OFF,
                    )}
                  >
                    {t(`AccessibilityToolbar.contrastModes.${c.key}Label`)}
                  </button>
                ))}
              </div>
            </section>

            <section>
              <SectionLabel icon={<MousePointer2 className="w-3.5 h-3.5" />}>{t("AccessibilityToolbar.cursor")}</SectionLabel>
              <div className="grid grid-cols-2 gap-1.5">
                {(["normal", "big"] as const).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => a11y.setCursor(mode)}
                    aria-pressed={a11y.cursor === mode}
                    className={cn(
                      "py-1.5 rounded-lg border text-sm font-medium transition-colors",
                      a11y.cursor === mode ? OPTION_ON : OPTION_OFF,
                    )}
                  >
                    {mode === "normal" ? t("AccessibilityToolbar.default") : t("AccessibilityToolbar.bigCursor")}
                  </button>
                ))}
              </div>
            </section>

            <section>
              <SectionLabel icon={<BookOpen className="w-3.5 h-3.5" />}>{t("AccessibilityToolbar.readingFont")}</SectionLabel>
              <div className="grid grid-cols-2 gap-1.5">
                {(["default", "dyslexic"] as const).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => a11y.setFont(mode)}
                    aria-pressed={a11y.font === mode}
                    className={cn(
                      "py-1.5 rounded-lg border text-sm font-medium transition-colors",
                      a11y.font === mode ? OPTION_ON : OPTION_OFF,
                    )}
                  >
                    {mode === "default" ? t("AccessibilityToolbar.default") : t("AccessibilityToolbar.dyslexia")}
                  </button>
                ))}
              </div>
            </section>

            <section className="space-y-1">
              <Toggle
                icon={<Link2 className="w-3.5 h-3.5" />}
                label={t("AccessibilityToolbar.highlightLinks")}
                checked={a11y.highlightLinks}
                onChange={a11y.toggleHighlightLinks}
              />
              <Toggle
                icon={<Zap className="w-3.5 h-3.5" />}
                label={t("AccessibilityToolbar.reduceMotion")}
                checked={a11y.reduceMotion}
                onChange={a11y.toggleReduceMotion}
              />
            </section>

            <button
              type="button"
              onClick={a11y.reset}
              className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              {t("AccessibilityToolbar.resetDefaults")}
            </button>
          </div>

          <div className="border-t border-gray-100 bg-gray-50/60 px-3 py-2">
            <Link
              href="/screen-reader-access"
              onClick={() => setOpen(false)}
              className="block text-center text-xs font-medium text-gray-600 hover:text-magenta hover:underline underline-offset-2"
            >
              {t("AccessibilityToolbar.screenReaderAccess")}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
