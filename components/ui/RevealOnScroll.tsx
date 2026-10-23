"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Adds `anim-show` to every `.anim-hidden` element once it scrolls into view.
 * The CSS (see globals.css) owns the actual transition; this only flips the state,
 * and keeps watching for nodes mounted later (tabs, carousels, route changes).
 */
export default function RevealOnScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("anim-show");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" },
    );

    const watch = (root: ParentNode) => {
      root.querySelectorAll<HTMLElement>(".anim-hidden:not(.anim-show)").forEach((el) => observer.observe(el));
    };
    watch(document);

    const mutations = new MutationObserver((records) => {
      for (const record of records) {
        record.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) {
            if (node.classList.contains("anim-hidden")) observer.observe(node);
            watch(node);
          }
        });
      }
    });
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutations.disconnect();
    };
  }, [pathname]);

  return null;
}
