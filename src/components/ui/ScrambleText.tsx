"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

const GLYPHS = "!<>-_\\/[]{}=+*^?#ABCDEFabcdef0123456789";

// Decodes text from random glyphs when scrolled into view, and again on hover
export default function ScrambleText({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [output, setOutput] = useState(text);
  const frameRef = useRef(0);

  const run = () => {
    cancelAnimationFrame(frameRef.current);
    let tick = 0;
    const total = text.length * 2 + 10;
    const step = () => {
      tick++;
      setOutput(
        text
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (tick > i * 2 + 6) return char;
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join("")
      );
      if (tick < total) frameRef.current = requestAnimationFrame(step);
    };
    frameRef.current = requestAnimationFrame(step);
  };

  useEffect(() => {
    if (inView) run();
    return () => cancelAnimationFrame(frameRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <span ref={ref} onMouseEnter={run} className={className} aria-label={text}>
      <span aria-hidden>{output}</span>
    </span>
  );
}
