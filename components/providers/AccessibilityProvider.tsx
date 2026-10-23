"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type TextSize = "md" | "lg" | "xl";
export type Contrast = "normal" | "high" | "light";
export type CursorMode = "normal" | "big";
export type FontMode = "default" | "dyslexic";

export interface A11yPrefs {
  textSize: TextSize;
  contrast: Contrast;
  cursor: CursorMode;
  font: FontMode;
  highlightLinks: boolean;
  reduceMotion: boolean;
}

const DEFAULTS: A11yPrefs = {
  textSize: "md",
  contrast: "normal",
  cursor: "normal",
  font: "default",
  highlightLinks: false,
  reduceMotion: false,
};

const STORAGE_KEY = "bvm-a11y-prefs";

function applyToDocument(prefs: A11yPrefs) {
  const root = document.documentElement;
  root.dataset.a11yText = prefs.textSize;
  root.dataset.a11yContrast = prefs.contrast;
  root.dataset.a11yCursor = prefs.cursor;
  root.dataset.a11yFont = prefs.font;
  root.dataset.a11yLinks = prefs.highlightLinks ? "highlight" : "normal";
  root.dataset.a11yMotion = prefs.reduceMotion ? "reduce" : "normal";
}

interface A11yContextValue extends A11yPrefs {
  setTextSize: (v: TextSize) => void;
  setContrast: (v: Contrast) => void;
  setCursor: (v: CursorMode) => void;
  setFont: (v: FontMode) => void;
  toggleHighlightLinks: () => void;
  toggleReduceMotion: () => void;
  reset: () => void;
}

const A11yContext = createContext<A11yContextValue | null>(null);

function readInitialPrefs(): A11yPrefs {
  if (typeof window === "undefined") return DEFAULTS;
  const initial = { ...DEFAULTS };
  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) initial.reduceMotion = true;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return { ...initial, ...JSON.parse(stored) } as A11yPrefs;
  } catch {}
  return initial;
}

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [prefs, setPrefs] = useState<A11yPrefs>(readInitialPrefs);

  // Keep the <html data-a11y-*> attributes (which drive the CSS) in sync with state.
  useEffect(() => {
    applyToDocument(prefs);
  }, [prefs]);

  const commit = useCallback((next: A11yPrefs) => {
    setPrefs(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {}
  }, []);

  const value = useMemo<A11yContextValue>(
    () => ({
      ...prefs,
      setTextSize: (textSize) => commit({ ...prefs, textSize }),
      setContrast: (contrast) => commit({ ...prefs, contrast }),
      setCursor: (cursor) => commit({ ...prefs, cursor }),
      setFont: (font) => commit({ ...prefs, font }),
      toggleHighlightLinks: () => commit({ ...prefs, highlightLinks: !prefs.highlightLinks }),
      toggleReduceMotion: () => commit({ ...prefs, reduceMotion: !prefs.reduceMotion }),
      reset: () => commit({ ...DEFAULTS }),
    }),
    [prefs, commit],
  );

  return <A11yContext.Provider value={value}>{children}</A11yContext.Provider>;
}

export function useAccessibility() {
  const ctx = useContext(A11yContext);
  if (!ctx) throw new Error("useAccessibility must be used within an AccessibilityProvider");
  return ctx;
}
