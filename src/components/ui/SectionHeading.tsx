"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type Props = {
  title: string;
  description?: string;
};

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.035 } },
};

const letter = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 260, damping: 18 } },
};

// Letters rise in on scroll, bounce on hover, and the underline stretches while the heading is hovered
export default function SectionHeading({ title, description }: Props) {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="mb-8 sm:mb-12 max-w-3xl">
      <motion.h2
        aria-label={title}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={container}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl tracking-tight text-white cursor-default select-none"
      >
        {title.split(" ").map((word, w) => (
          <span key={w} aria-hidden className="inline-block whitespace-nowrap mr-[0.25em]">
            {word.split("").map((char, i) => (
              <motion.span
                key={i}
                variants={letter}
                whileHover={{ y: -8, color: "#c6f432", transition: { type: "spring", stiffness: 500, damping: 12 } }}
                className="inline-block"
              >
                {char}
              </motion.span>
            ))}
          </span>
        ))}
      </motion.h2>

      <motion.span
        aria-hidden
        initial={{ width: 0 }}
        whileInView={{ width: 56 }}
        animate={{ width: hovered ? 140 : 56 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 200, damping: 20, delay: hovered ? 0 : 0.3 }}
        className="block h-1 mt-4 rounded-full bg-linear-to-r from-lime to-violet-500"
      />

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-4 text-muted text-sm sm:text-lg max-w-2xl"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
