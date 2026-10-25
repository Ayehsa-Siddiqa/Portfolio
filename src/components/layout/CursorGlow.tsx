"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useScroll } from "framer-motion";

// Soft spotlight, a trailing cursor ring and a scroll progress bar
export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [pressed, setPressed] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 350, damping: 30, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 350, damping: 30, mass: 0.5 });

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const glow = glowRef.current;
    if (glow) glow.style.opacity = "1";

    let frame = 0;
    const handleMove = (e: PointerEvent) => {
      setEnabled(true);
      x.set(e.clientX);
      y.set(e.clientY);
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (glow) glow.style.background = `radial-gradient(600px circle at ${e.clientX}px ${e.clientY}px, rgba(139, 92, 246, 0.10), transparent 45%)`;
      });
      const target = (e.target as HTMLElement).closest<HTMLElement>("a, button, input, textarea, [data-cursor]");
      setHovering(!!target);
      setLabel(target?.dataset.cursor ?? null);
    };
    const down = () => setPressed(true);
    const up = () => setPressed(false);

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
    };
  }, [x, y]);

  const ringSize = label ? 76 : hovering ? 48 : 30;

  return (
    <>
      <motion.div
        aria-hidden
        style={{ scaleX: progress }}
        className="fixed top-0 left-0 right-0 h-[3px] z-[60] origin-left bg-linear-to-r from-violet-500 via-blue-500 to-pink-500"
      />
      <div ref={glowRef} aria-hidden className="pointer-events-none fixed inset-0 z-[-1] opacity-0 transition-opacity duration-500" />
      {enabled && (
        <>
          <motion.div
            aria-hidden
            style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
            animate={{ width: ringSize, height: ringSize, scale: pressed ? 0.8 : 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            className={`pointer-events-none fixed top-0 left-0 z-[70] rounded-full flex items-center justify-center ${
              label ? "bg-lime text-black" : "border border-violet-300/70 bg-violet-400/5"
            } ${hovering && !label ? "backdrop-invert-[.08]" : ""}`}
          >
            {label && <span className="text-[11px] font-bold uppercase tracking-wider">{label}</span>}
          </motion.div>
          <motion.div
            aria-hidden
            style={{ x, y, translateX: "-50%", translateY: "-50%" }}
            className="pointer-events-none fixed top-0 left-0 z-[70] w-1.5 h-1.5 rounded-full bg-white"
          />
        </>
      )}
    </>
  );
}
