import type { ReactNode } from "react";
import Link from "next/link";
import FloatingButtons from "@/components/layout/FloatingButtons";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export interface Crumb {
  label: string;
  href?: string;
}

interface ExpoShellProps {
  title: string;
  subtitle?: string;
  icon?: string;
  crumbs: Crumb[];
  children: ReactNode;
}

/** Page chrome for the virtual expo: site header/footer, breadcrumbs, a title band and the content area. */
export default function ExpoShell({ title, subtitle, icon, crumbs, children }: ExpoShellProps) {
  return (
    <>
      <FloatingButtons />
      <Header />
      <main id="main-content">
        <section className="relative overflow-hidden bg-navy pt-32 pb-10 sm:pt-40">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at 15% 0%, rgba(194,24,91,0.35), transparent 55%), radial-gradient(ellipse at 90% 100%, rgba(239,123,32,0.22), transparent 50%)" }}
          />
          <div className="relative max-w-6xl mx-auto px-6">
            <nav aria-label="Breadcrumb" className="mb-4 text-sm text-white/70">
              <ol className="flex flex-wrap items-center gap-2">
                {crumbs.map((crumb, i) => (
                  <li key={crumb.label} className="flex items-center gap-2">
                    {i > 0 && <span aria-hidden="true">/</span>}
                    {crumb.href ? (
                      <Link href={crumb.href} className="hover:text-white underline-offset-2 hover:underline">
                        {crumb.label}
                      </Link>
                    ) : (
                      <span aria-current="page" className="font-semibold text-white">
                        {crumb.label}
                      </span>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
            <h1 className="flex items-center gap-3 text-3xl sm:text-5xl font-bold text-white">
              {icon && <span aria-hidden="true">{icon}</span>}
              {title}
            </h1>
            {subtitle && <p className="mt-3 max-w-2xl text-white/75">{subtitle}</p>}
          </div>
        </section>
        <section className="bg-gray-50 text-gray-900">
          <div className="max-w-6xl mx-auto px-6 py-10 sm:py-14">{children}</div>
        </section>
      </main>
      <Footer />
    </>
  );
}
