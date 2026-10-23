"use client";

import { useRef } from "react";
import { X } from "lucide-react";
import { t } from "@/lib/i18n";
import { useModal } from "@/components/providers/ModalProvider";
import { useDialogA11y } from "@/hooks/useDialogA11y";
import RegistrationClosed from "@/components/ui/RegistrationClosed";

/**
 * Registrations are closed (see REGISTRATION_OPEN in lib/site.ts), so every modal
 * variant renders the same "Registration Closed" notice, matching the source site.
 */
export default function RegistrationModal() {
  const { activeModal, closeModal } = useModal();
  const dialogRef = useRef<HTMLDivElement>(null);
  const isOpen = activeModal !== null;

  useDialogA11y(isOpen, closeModal, dialogRef);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" role="presentation">
      <button
        type="button"
        aria-label={t("RegistrationModal.closeAria")}
        onClick={closeModal}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-default"
        tabIndex={-1}
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden animate-scale-in p-8"
      >
        <button
          type="button"
          onClick={closeModal}
          aria-label={t("RegistrationModal.closeAria")}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" aria-hidden="true" />
        </button>
        <RegistrationClosed />
      </div>
    </div>
  );
}
