"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type Props = {
  size?: number;
  className?: string;
};

// Trimmed, web-sized copy of public/dark-mood-logo.png (394 x 400, "AYESHA" is part of the artwork)
const SRC = "/logo-mark.png";
const RATIO = 394 / 400;

// Calligraphy reveals right to left, the way it is written, then a shine sweeps across on hover
export function LogoMark({ size = 36 }: { size?: number }) {
  const width = Math.round(size * RATIO);

  return (
    <motion.span
      initial={{ clipPath: "inset(0 0 0 100%)" }}
      animate={{ clipPath: "inset(0 0 0 0%)" }}
      transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1] }}
      className="relative block shrink-0"
      style={{ width, height: size }}
    >
      <Image src={SRC} alt="" width={width} height={size} priority className="w-full h-full object-contain" />
      <span
        aria-hidden
        className="logo-shine absolute inset-0"
        style={{
          WebkitMaskImage: `url(${SRC})`,
          maskImage: `url(${SRC})`,
          WebkitMaskSize: "contain",
          maskSize: "contain",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
        }}
      />
    </motion.span>
  );
}

export default function Logo({ size = 36, className = "" }: Props) {
  return (
    <span className={`group inline-flex items-center ${className}`} title="Ayesha Siddiqa">
      <LogoMark size={size} />
      <span className="sr-only">Ayesha Siddiqa</span>
    </span>
  );
}
