"use client";

import { useEffect, useRef, useState } from "react";
import { jod, num } from "@/lib/utils";

export function CountUp({ value, kind }: { value: number; kind: "num" | "jod" }) {
  const format = kind === "jod" ? jod : num;
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setShown(value);
      return;
    }
    let frame = 0;
    const start = () => {
      const began = performance.now();
      const step = (now: number) => {
        const progress = Math.min(1, (now - began) / 900);
        const eased = 1 - (1 - progress) ** 3;
        setShown(Math.round(value * eased));
        if (progress < 1) frame = requestAnimationFrame(step);
      };
      frame = requestAnimationFrame(step);
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        start();
        observer.disconnect();
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [value]);

  return <span ref={ref}>{format(shown)}</span>;
}
