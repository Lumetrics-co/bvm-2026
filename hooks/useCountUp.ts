"use client";

import { useEffect, useRef, useState } from "react";

/** Eases a number from 0 up to `target` once `start` becomes true. */
export function useCountUp({ target, duration = 2000, start = false }: { target: number; duration?: number; start?: boolean }) {
  const [value, setValue] = useState(0);
  const ran = useRef(false);

  useEffect(() => {
    if (!start || ran.current) return;
    ran.current = true;
    const begin = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - begin) / duration, 1);
      setValue(Math.floor((1 - Math.pow(1 - progress, 3)) * target));
      if (progress < 1) requestAnimationFrame(tick);
      else setValue(target);
    };
    requestAnimationFrame(tick);
  }, [start, target, duration]);

  return value;
}
