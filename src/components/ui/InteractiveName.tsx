"use client";

import { motion } from "framer-motion";

const COLORS = ["#a78bfa", "#60a5fa", "#f472b6", "#c6f432"];

// Each letter springs up and picks up a colour when hovered or tapped
export default function InteractiveName({ text, outline = false, delay = 0 }: { text: string; outline?: boolean; delay?: number }) {
  return (
    <span className="block" aria-label={text}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          aria-hidden
          initial={{ opacity: 0, y: 40, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ delay: delay + i * 0.05, type: "spring", stiffness: 200, damping: 14 }}
          whileHover={{ y: -14, scale: 1.12, color: COLORS[i % COLORS.length], transition: { type: "spring", stiffness: 500, damping: 10 } }}
          whileTap={{ scale: 0.85, rotate: -8 }}
          className={`inline-block cursor-default select-none ${outline ? "text-outline hover:[-webkit-text-stroke:0px]" : ""}`}
        >
          {char === " " ? " " : char}
        </motion.span>
      ))}
    </span>
  );
}
