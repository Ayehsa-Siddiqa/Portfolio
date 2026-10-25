"use client";

import { useRef } from "react";
import {
  motion, useScroll, useVelocity, useSpring, useTransform, useMotionValue, useAnimationFrame, wrap,
} from "framer-motion";

// Giant outlined/filled text band whose speed and direction follow the scroll velocity
function VelocityRow({ text, baseVelocity, filled }: { text: string; baseVelocity: number; filled?: boolean }) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const factor = useTransform(velocity, [0, 1000], [0, 5], { clamp: false });
  const x = useTransform(baseX, (v) => `${wrap(-25, -50, v)}%`);
  const direction = useRef(1);

  useAnimationFrame((_, delta) => {
    let move = direction.current * baseVelocity * (delta / 1000);
    if (factor.get() < 0) direction.current = -1;
    else if (factor.get() > 0) direction.current = 1;
    move += direction.current * move * factor.get();
    baseX.set(baseX.get() + move);
  });

  return (
    <div className="overflow-hidden whitespace-nowrap flex">
      <motion.div style={{ x }} className="flex whitespace-nowrap">
        {Array.from({ length: 4 }).map((_, i) => (
          <span
            key={i}
            className={`block mr-10 font-heading font-black uppercase tracking-tight text-6xl sm:text-8xl lg:text-9xl leading-none ${
              filled ? "text-gradient" : "text-outline"
            }`}
          >
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function CtaMarquee() {
  return (
    <section aria-label="Let's work together" className="section-y space-y-2 sm:space-y-4 select-none overflow-hidden">
      <VelocityRow text="Let's build ✦ something great ✦" baseVelocity={-2} />
      <VelocityRow text="Open to work ✦ Full-stack ✦" baseVelocity={2} filled />
    </section>
  );
}
