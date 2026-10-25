"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutTemplate, Layers, Server, Database, ShoppingBag, Wand2, Network, KeyRound, Gauge, MonitorSmartphone, Sparkles,
} from "lucide-react";
import {
  SiReact, SiNextdotjs, SiVuedotjs, SiTypescript, SiJavascript, SiTailwindcss, SiBootstrap, SiHtml5, SiReactquery, SiRedux,
  SiNodedotjs, SiLaravel, SiSocketdotio, SiJsonwebtokens, SiMongodb, SiMysql, SiPostgresql, SiWordpress, SiWoocommerce,
  SiElementor, SiGithub,
} from "react-icons/si";
import { portfolioData } from "@/data/portfolio";
import SectionHeading from "@/components/ui/SectionHeading";

// Logo and brand colour for each skill name in the data file
const SKILL_ICONS: Record<string, { icon: React.ElementType; color: string }> = {
  "React.js": { icon: SiReact, color: "#61dafb" },
  "Next.js": { icon: SiNextdotjs, color: "#ffffff" },
  "Vue.js (Quasar)": { icon: SiVuedotjs, color: "#42b883" },
  TypeScript: { icon: SiTypescript, color: "#3178c6" },
  JavaScript: { icon: SiJavascript, color: "#f7df1e" },
  "Tailwind CSS": { icon: SiTailwindcss, color: "#38bdf8" },
  Bootstrap: { icon: SiBootstrap, color: "#7952b3" },
  "HTML / CSS": { icon: SiHtml5, color: "#e34f26" },
  "TanStack Query": { icon: SiReactquery, color: "#ff4154" },
  "Redux Toolkit": { icon: SiRedux, color: "#764abc" },
  "Pinia / Vuex": { icon: SiVuedotjs, color: "#ffd859" },
  "REST API Integration": { icon: Network, color: "#a78bfa" },
  "Node.js / Express.js": { icon: SiNodedotjs, color: "#5fa04e" },
  "Laravel / PHP": { icon: SiLaravel, color: "#ff2d20" },
  "Socket.io": { icon: SiSocketdotio, color: "#ffffff" },
  "JWT / RBAC": { icon: SiJsonwebtokens, color: "#d63aff" },
  "Social Login / OAuth": { icon: KeyRound, color: "#fbbf24" },
  MongoDB: { icon: SiMongodb, color: "#47a248" },
  MySQL: { icon: SiMysql, color: "#4479a1" },
  PostgreSQL: { icon: SiPostgresql, color: "#4169e1" },
  WordPress: { icon: SiWordpress, color: "#21759b" },
  WooCommerce: { icon: SiWoocommerce, color: "#96588a" },
  Elementor: { icon: SiElementor, color: "#e2498a" },
  "SEO & Performance": { icon: Gauge, color: "#c6f432" },
  "Responsive Design": { icon: MonitorSmartphone, color: "#60a5fa" },
  "AI Tool Integration": { icon: Sparkles, color: "#f472b6" },
  "Git / GitHub": { icon: SiGithub, color: "#ffffff" },
};

const GROUP_ICONS = [LayoutTemplate, Layers, Server, Database, ShoppingBag, Wand2];

export default function Skills() {
  const groups = portfolioData.skillGroups;
  const [active, setActive] = useState(0);
  const group = groups[active];

  return (
    <section id="skills" className="section-y relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="My Skills" />

        <div className="grid lg:grid-cols-[280px_1fr] gap-6">
          {/* Group list: vertical on desktop, scrollable tabs on mobile */}
          <div role="tablist" aria-label="Skill groups" className="flex lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0 -mx-4 px-4 lg:mx-0 lg:px-0">
            {groups.map((g, i) => {
              const Icon = GROUP_ICONS[i] ?? Layers;
              const isActive = i === active;
              return (
                <button
                  key={g.title}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="skills-panel"
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  className={`relative shrink-0 flex items-center gap-3 px-3 py-2.5 sm:px-4 sm:py-3 text-sm sm:text-base rounded-xl text-left transition-colors ${
                    isActive ? "text-white" : "text-gray-400 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="skills-active"
                      className="absolute inset-0 rounded-xl bg-white/[0.07] border border-white/10"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <Icon size={18} className={`relative shrink-0 ${isActive ? "text-lime" : ""}`} />
                  <span className="relative font-medium whitespace-nowrap">{g.title}</span>
                  <span className="relative ml-auto pl-3 font-mono text-xs text-gray-500">{g.items.length}</span>
                </button>
              );
            })}
          </div>

          {/* Selected group's skills */}
          <div id="skills-panel" role="tabpanel" className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-8 min-h-[320px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <h3 className="font-heading font-bold text-2xl text-white">{group.title}</h3>
                <p className="mt-1 text-sm text-gray-400">{group.blurb}</p>

                <ul className="mt-6 grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3">
                  {group.items.map((item, i) => {
                    const meta = SKILL_ICONS[item];
                    const Icon = meta?.icon ?? Sparkles;
                    return (
                      <motion.li
                        key={item}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.04, type: "spring", stiffness: 300, damping: 22 }}
                        whileHover={{ y: -4 }}
                        className="group flex flex-col items-center justify-center gap-3 p-4 sm:p-5 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/20 transition-colors text-center"
                      >
                        <Icon size={30} style={{ color: meta?.color ?? "#c6f432" }} className="transition-transform duration-300 group-hover:scale-110" />
                        <span className="text-sm text-gray-200 leading-tight">{item}</span>
                      </motion.li>
                    );
                  })}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
