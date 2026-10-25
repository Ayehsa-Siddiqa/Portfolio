"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "@/components/ui/Logo";

const WORDS = ["Design", "Build", "Ship"];
const INTRO_EVENT = "intro-done";
let introDone = false;

// Lets sections replay their entrance once the intro curtain lifts
export function useIntroDone() {
  return useSyncExternalStore(
    (cb) => {
      window.addEventListener(INTRO_EVENT, cb);
      return () => window.removeEventListener(INTRO_EVENT, cb);
    },
    () => introDone,
    () => false
  );
}

// Intro screen: counter + rotating words, then a curtain wipe reveals the site
export default function Preloader() {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Already seen this session: skip straight to the site
    let seen = false;
    try {
      seen = sessionStorage.getItem("intro-seen") === "1";
      sessionStorage.setItem("intro-seen", "1");
    } catch {}
    if (seen) {
      const skip = setTimeout(() => setDone(true), 0);
      return () => clearTimeout(skip);
    }

    let value = 0;
    const id = setInterval(() => {
      value = Math.min(100, value + Math.ceil(Math.random() * 9));
      setCount(value);
      if (value >= 100) {
        clearInterval(id);
        setTimeout(() => setDone(true), 350);
      }
    }, 45);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = done ? "" : "hidden";
    if (done) {
      introDone = true;
      window.dispatchEvent(new Event(INTRO_EVENT));
    }
  }, [done]);

  const word = WORDS[Math.min(WORDS.length - 1, Math.floor(count / 34))];

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          style={{ clipPath: "inset(0 0 0% 0)" }}
          className="fixed inset-0 z-[200] bg-[#07060b] flex flex-col items-center justify-center"
        >
          <motion.div initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 200, damping: 15 }}>
            <Logo size={150} />
          </motion.div>

          <div className="h-10 mt-8 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p
                key={word}
                initial={{ y: 40 }}
                animate={{ y: 0 }}
                exit={{ y: -40 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="font-heading font-bold text-3xl text-white"
              >
                {word}<span className="text-lime">.</span>
              </motion.p>
            </AnimatePresence>
          </div>

          <div className="absolute bottom-10 left-6 right-6 sm:left-12 sm:right-12 flex items-end justify-between">
            <span className="font-mono text-xs text-gray-500 uppercase tracking-[0.25em]">Ayesha Siddiqa · Portfolio</span>
            <span className="font-heading font-black text-6xl sm:text-8xl text-white/90 tabular-nums leading-none">{count}</span>
          </div>
          <motion.div className="absolute bottom-0 left-0 h-1 bg-linear-to-r from-violet-500 via-blue-500 to-lime" style={{ width: `${count}%` }} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
