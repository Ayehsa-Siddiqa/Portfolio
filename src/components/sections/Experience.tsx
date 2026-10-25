"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Briefcase, Calendar, MapPin, ChevronDown } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import SectionHeading from "@/components/ui/SectionHeading";

type Job = (typeof portfolioData.experience)[number];

function JobCard({ exp, index }: { exp: Job; index: number }) {
  const [open, setOpen] = useState(false);
  const current = "current" in exp && exp.current;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group relative pl-8 md:pl-12"
    >
      {/* Dot on timeline */}
      <span className="absolute -left-[9px] top-7 flex w-[18px] h-[18px] items-center justify-center">
        {current && <span className="absolute inset-0 rounded-full bg-lime/40 animate-ping" />}
        <span
          className={`relative w-3.5 h-3.5 rounded-full border-2 border-[#07060b] ring-4 transition-all ${
            current ? "bg-lime ring-lime/20" : "bg-purple-500 ring-purple-500/20 group-hover:ring-purple-500/40"
          }`}
        />
      </span>

      <motion.div
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
        className="glass-card p-6 rounded-xl border border-white/10 hover:border-purple-500/40 transition-colors"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-xl font-bold text-white">{exp.role}</h3>
              {current && (
                <span className="px-2 py-0.5 rounded-full bg-lime/15 text-lime text-[11px] font-semibold">Current</span>
              )}
            </div>
            <p className="mt-1 flex items-center gap-1.5 text-purple-300 font-medium">
              <Briefcase size={15} /> {exp.company}
            </p>
          </div>
          <div className="flex flex-wrap sm:flex-col sm:items-end gap-2 text-xs text-gray-400">
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 whitespace-nowrap">
              <Calendar size={13} /> {exp.period}
            </span>
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 whitespace-nowrap">
              <MapPin size={13} /> {exp.location}
            </span>
          </div>
        </div>

        <p className="text-gray-300 leading-relaxed">{exp.description}</p>

        {/* Expandable highlights */}
        <button
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-purple-300 hover:text-white transition-colors"
        >
          {open ? "Hide highlights" : "Show highlights"}
          <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
            <ChevronDown size={16} />
          </motion.span>
        </button>
        <AnimatePresence initial={false}>
          {open && (
            <motion.ul
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="pt-3 space-y-2">
                {exp.highlights.map((point) => (
                  <li key={point} className="flex gap-2.5 text-sm text-gray-300 leading-relaxed">
                    <span className="mt-2 w-1.5 h-1.5 shrink-0 rounded-full bg-lime" />
                    {point}
                  </li>
                ))}
              </div>
            </motion.ul>
          )}
        </AnimatePresence>

        <div className="mt-5 flex flex-wrap gap-2">
          {exp.technologies.map((tech) => (
            <span key={tech} className="px-3 py-1 bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs rounded-full">
              {tech}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Experience() {
  const listRef = useRef<HTMLDivElement>(null);
  // Timeline fills from top to bottom as the section scrolls through the viewport
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 75%", "end 60%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });

  return (
    <section id="experience" className="section-y relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Work Experience" />

        <div ref={listRef} className="relative ml-4 md:ml-6 space-y-10">
          <span aria-hidden className="absolute left-0 top-0 bottom-0 w-px bg-gray-800" />
          <motion.span
            aria-hidden
            style={{ scaleY: fill }}
            className="absolute left-0 top-0 bottom-0 w-px origin-top bg-linear-to-b from-purple-500 via-violet-400 to-lime"
          />
          {portfolioData.experience.map((exp, index) => (
            <JobCard key={exp.hash} exp={exp} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
