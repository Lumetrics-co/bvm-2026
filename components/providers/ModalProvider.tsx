"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { RegisterRole } from "@/lib/site";

type ActiveModal = "register" | "media" | "sponsor" | null;

interface ModalContextValue {
  activeModal: ActiveModal;
  defaultRole: RegisterRole;
  openRegister: (role?: RegisterRole) => void;
  openMedia: () => void;
  openSponsor: () => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextValue | null>(null);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [activeModal, setActiveModal] = useState<ActiveModal>(null);
  const [defaultRole, setDefaultRole] = useState<RegisterRole>("DELEGATE");

  const value = useMemo<ModalContextValue>(
    () => ({
      activeModal,
      defaultRole,
      openRegister: (role = "DELEGATE") => {
        setDefaultRole(role);
        setActiveModal("register");
      },
      openMedia: () => setActiveModal("media"),
      openSponsor: () => setActiveModal("sponsor"),
      closeModal: () => setActiveModal(null),
    }),
    [activeModal, defaultRole],
  );

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
}

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModal must be used within ModalProvider");
  return ctx;
}
