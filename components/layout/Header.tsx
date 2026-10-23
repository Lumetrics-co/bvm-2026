"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { t } from "@/lib/i18n";
import { cn } from "@/lib/cn";
import { LINKS, NAV_ITEMS, REGISTER_OPTIONS } from "@/lib/site";
import { useModal } from "@/components/providers/ModalProvider";
import AccessibilityToolbar from "./AccessibilityToolbar";
import LanguageSwitcher from "./LanguageSwitcher";

const ACTIVE_GLOW = "0 0 18px rgba(194,24,91,0.55), 0 0 36px rgba(239,123,32,0.25)";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [regOpen, setRegOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState("");
  const navRef = useRef<HTMLElement>(null);
  const regRef = useRef<HTMLDivElement>(null);
  const { openRegister } = useModal();
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";

  const scrollToSection = useCallback(
    (id: string) => {
      const el = document.getElementById(id);
      if (!el) {
        router.push(`/#${id}`);
        return;
      }
      const offset = scrolled ? (navRef.current?.offsetHeight ?? 125) : 125;
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - offset, behavior: "smooth" });
    },
    [router, scrolled],
  );

  useEffect(() => {
    const onMouseDown = (e: MouseEvent) => {
      if (regRef.current && !regRef.current.contains(e.target as Node)) setRegOpen(false);
    };
    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const close = () => setMobileOpen(false);
    window.addEventListener("scroll", close, { passive: true, once: true });
    return () => window.removeEventListener("scroll", close);
  }, [mobileOpen]);

  useEffect(() => {
    if (!isHome) return;
    const update = () => {
      const navHeight = navRef.current?.offsetHeight ?? 80;
      const line = window.scrollY + navHeight + 40;
      let current = "";
      for (const { href } of NAV_ITEMS) {
        const el = document.getElementById(href);
        if (el && el.offsetTop <= line) current = href;
      }
      setActiveId(current);
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, [isHome]);

  const onLogoClick = (e: React.MouseEvent) => {
    if (isHome) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const logoSize = scrolled
    ? "w-14 h-10 sm:w-17.5 sm:h-12.5 lg:w-20 lg:h-14"
    : "w-18 h-13 sm:w-24 sm:h-18 lg:w-28 lg:h-20";
  const partnerLogoSize = scrolled ? "h-6 w-11 sm:h-8 sm:w-16" : "h-8 w-14 sm:h-11 sm:w-22";

  const pillLink =
    "inline-flex items-center gap-1.5 px-5 py-2.5 border border-white/40 text-white text-xs font-semibold rounded-full hover:bg-white/10 transition-colors tracking-wide uppercase";
  const drawerPill =
    "mx-4 mt-1 mb-1 text-center px-5 py-3 border border-white/30 text-white text-sm font-semibold rounded-full hover:bg-white/10 transition-colors tracking-wide uppercase";

  return (
    <nav
      ref={navRef}
      className={cn(
        "fixed top-0 left-0 right-0 z-40 px-4 sm:px-6 lg:px-10 transition-all duration-300",
        scrolled ? "py-1.5 bg-[#070b1e]/90 backdrop-blur-md shadow-lg shadow-black/20" : "py-2 sm:py-3",
      )}
    >
      <div className="max-w-[1400px] mx-auto flex items-center justify-between">
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          <Link
            href="/"
            onClick={onLogoClick}
            className={cn("relative block transition-all duration-300 shrink-0", logoSize)}
          >
            <Image
              src="/images/Bharat-Vyapar-Mahotsav.png"
              alt={t("Navbar.logoAlt")}
              fill
              sizes="(min-width: 1024px) 112px, 96px"
              className="object-contain object-top-left"
              priority
            />
          </Link>
          <div className="block w-px bg-white/20 self-stretch" />
          <div className="flex flex-col items-center shrink-0 gap-1">
            {!scrolled && (
              <span className="hidden sm:inline text-[8px] uppercase tracking-[0.15em] font-semibold text-white leading-none whitespace-nowrap">
                {t("Navbar.jointInitiative")}
              </span>
            )}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className={cn("relative transition-all duration-300", partnerLogoSize)}>
                <Image src="/images/ITPO-logo.png" alt={t("Navbar.itpoAlt")} fill sizes="88px" className="object-contain" />
              </div>
              <div className={cn("relative transition-all duration-300", partnerLogoSize)}>
                <Image src="/images/CAIT-logo.png" alt={t("Navbar.caitAlt")} fill sizes="88px" className="object-contain" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <div data-nav-desktop-links="true" className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map(({ key, href }) => {
              const active = activeId === href;
              return (
                <button
                  key={href}
                  onClick={() => scrollToSection(href)}
                  className={cn(
                    "relative px-3.5 py-1.5 text-sm font-semibold transition-all duration-300 whitespace-nowrap rounded-full cursor-pointer",
                    active
                      ? "text-white"
                      : "text-white/70 hover:text-white hover:bg-linear-to-br hover:from-magenta hover:to-[#EF7B20] hover:shadow-[0_0_18px_rgba(194,24,91,0.55),0_0_36px_rgba(239,123,32,0.25)]",
                  )}
                  style={
                    active
                      ? { background: "linear-gradient(135deg, #c2185b, #EF7B20)", boxShadow: ACTIVE_GLOW }
                      : undefined
                  }
                >
                  {t(`Navbar.links.${key}`)}
                </button>
              );
            })}
          </div>
          <LanguageSwitcher />
          <AccessibilityToolbar />
          <button
            data-nav-hamburger="true"
            onClick={() => setMobileOpen((v) => !v)}
            className="lg:hidden w-10 h-10 flex items-center justify-center text-white hover:text-saffron transition-colors"
            aria-label={t("Navbar.toggleMenu")}
          >
            {mobileOpen ? <X className="w-6 h-6" strokeWidth={1.5} /> : <Menu className="w-6 h-6" strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      <div
        data-nav-row2-divider="true"
        className="hidden lg:block h-px max-w-350 mx-auto mt-1.5 mb-1.5"
        style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.15), transparent)" }}
      />
      <div
        data-nav-row2="true"
        className="hidden lg:flex items-center justify-end gap-2 w-full max-w-350 mx-auto pt-1 pb-0.5"
      >
        <a href={LINKS.hotels} target="_blank" rel="noopener noreferrer" className={pillLink}>
          {t("Navbar.bookYourHotel")}
        </a>
        <a href={LINKS.exhibitorLogin} target="_blank" rel="noopener noreferrer" className={pillLink}>
          {t("Navbar.exhibitorLogin")}
        </a>
        <div className="relative" ref={regRef}>
          <button
            onClick={() => setRegOpen((v) => !v)}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-linear-to-r from-magenta to-[#EF7B20] text-white text-xs font-semibold rounded-full hover:opacity-90 transition-opacity tracking-wide uppercase"
          >
            {t("Navbar.registration.button")}
            <ChevronDown className={cn("w-3.5 h-3.5 transition-transform", regOpen && "rotate-180")} />
          </button>
          {regOpen && (
            <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden animate-slide-down z-50">
              {REGISTER_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => {
                    setRegOpen(false);
                    openRegister(opt.value);
                  }}
                  className="w-full text-left px-5 py-3 text-sm text-gray-700 hover:bg-linear-to-r hover:from-magenta/10 hover:to-[#EF7B20]/10 hover:text-magenta transition-colors font-medium"
                >
                  {t(`Navbar.registration.options.${opt.key}`)}
                </button>
              ))}
            </div>
          )}
        </div>
        <Link href="/bharat-innovation-and-startup-exchange" className={pillLink}>
          {t("Navbar.aboutBise")}
        </Link>
        <Link href="/virtual-expo" className={pillLink}>
          {t("Navbar.virtualExpo")}
        </Link>
      </div>

      {mobileOpen && (
        <div
          data-nav-mobile-drawer="true"
          className="lg:hidden mt-2 mx-auto max-w-350 rounded-2xl overflow-hidden bg-[#070b1e]/95 backdrop-blur-md border border-white/10 shadow-xl"
        >
          <div className="flex flex-col py-2">
            <a href={LINKS.hotels} target="_blank" rel="noopener noreferrer" className={cn(drawerPill, "mt-2")}>
              {t("Navbar.bookYourHotel")}
            </a>
            <a href={LINKS.exhibitorLogin} target="_blank" rel="noopener noreferrer" className={drawerPill}>
              {t("Navbar.exhibitorLogin")}
            </a>
            <Link href="/bharat-innovation-and-startup-exchange" onClick={() => setMobileOpen(false)} className={drawerPill}>
              {t("Navbar.aboutBise")}
            </Link>
            <Link href="/virtual-expo" onClick={() => setMobileOpen(false)} className={drawerPill}>
              {t("Navbar.virtualExpo")}
            </Link>
            {NAV_ITEMS.map(({ key, href }) => {
              const active = activeId === href;
              return (
                <button
                  key={href}
                  onClick={() => {
                    setMobileOpen(false);
                    setTimeout(() => scrollToSection(href), 100);
                  }}
                  className="w-full text-left px-6 py-3.5 text-sm font-medium transition-all flex items-center gap-2 text-white"
                  style={{
                    background: "linear-gradient(135deg, rgba(194,24,91,0.35), rgba(239,123,32,0.35))",
                    borderLeft: active ? "3px solid #EF7B20" : "3px solid transparent",
                  }}
                >
                  {active && <span className="w-1.5 h-1.5 rounded-full bg-saffron shrink-0" />}
                  {t(`Navbar.links.${key}`)}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
