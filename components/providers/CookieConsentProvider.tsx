"use client";

import { createContext, useCallback, useContext, useMemo, useSyncExternalStore, type ReactNode } from "react";

type Status = "pending" | "accepted" | "rejected";

interface CookieConsentValue {
  status: Status;
  hydrated: boolean;
  accept: () => void;
  reject: () => void;
  reopen: () => void;
}

const STORAGE_KEY = "bvm-cookie-consent";
const CookieConsentContext = createContext<CookieConsentValue | null>(null);

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

// A tiny external store over localStorage so the banner state can be read without effects.
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

function readStatus(): Status {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === "accepted" || stored === "rejected" ? stored : "pending";
  } catch {
    return "pending";
  }
}

function writeStatus(next: Status) {
  try {
    if (next === "pending") localStorage.removeItem(STORAGE_KEY);
    else localStorage.setItem(STORAGE_KEY, next);
  } catch {}
  listeners.forEach((listener) => listener());
}

const subscribeNever = () => () => {};

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const status = useSyncExternalStore(subscribe, readStatus, () => "pending" as Status);
  const hydrated = useSyncExternalStore(subscribeNever, () => true, () => false);

  const decide = useCallback((next: "accepted" | "rejected") => {
    writeStatus(next);
    const value = next === "accepted" ? "granted" : "denied";
    window.gtag?.("consent", "update", {
      ad_storage: value,
      ad_user_data: value,
      ad_personalization: value,
      analytics_storage: value,
    });
  }, []);

  const value = useMemo<CookieConsentValue>(
    () => ({
      status,
      hydrated,
      accept: () => decide("accepted"),
      reject: () => decide("rejected"),
      reopen: () => writeStatus("pending"),
    }),
    [status, hydrated, decide],
  );

  return <CookieConsentContext.Provider value={value}>{children}</CookieConsentContext.Provider>;
}

export function useCookieConsent() {
  const ctx = useContext(CookieConsentContext);
  if (!ctx) throw new Error("useCookieConsent must be used within a CookieConsentProvider");
  return ctx;
}
