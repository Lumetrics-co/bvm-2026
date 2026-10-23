"use client";

import type { ReactNode } from "react";
import { AccessibilityProvider } from "./AccessibilityProvider";
import { CookieConsentProvider } from "./CookieConsentProvider";
import { ModalProvider } from "./ModalProvider";

export default function AppProviders({ children }: { children: ReactNode }) {
  return (
    <AccessibilityProvider>
      <CookieConsentProvider>
        <ModalProvider>{children}</ModalProvider>
      </CookieConsentProvider>
    </AccessibilityProvider>
  );
}
