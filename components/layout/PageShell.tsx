import type { ReactNode } from "react";
import FloatingButtons from "./FloatingButtons";
import Footer from "./Footer";
import Header from "./Header";

interface PageShellProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

/** Chrome shared by the secondary (non-landing) pages: fixed header, title band, content, footer. */
export default function PageShell({ title, subtitle, children }: PageShellProps) {
  return (
    <>
      <FloatingButtons />
      <Header />
      <main id="main-content">
        <section className="relative overflow-hidden bg-navy pt-36 pb-14 sm:pt-44 sm:pb-16">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at 20% 0%, rgba(194,24,91,0.35), transparent 55%), radial-gradient(ellipse at 90% 100%, rgba(239,123,32,0.25), transparent 50%)" }}
          />
          <div className="relative max-w-4xl mx-auto px-6 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-white">{title}</h1>
            {subtitle && <p className="mt-3 text-sm sm:text-base uppercase tracking-[0.25em] font-semibold text-saffron">{subtitle}</p>}
          </div>
        </section>
        <section className="bg-white text-gray-800">
          <div className="max-w-4xl mx-auto px-6 py-12 sm:py-16">{children}</div>
        </section>
      </main>
      <Footer />
    </>
  );
}
