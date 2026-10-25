"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Projects() {
  const { featuredProjects, projects } = portfolioData;
  const categories = ["All", ...Array.from(new Set(featuredProjects.map((p) => p.category)))];
  const [filter, setFilter] = useState("All");
  const visible = featuredProjects.filter((p) => filter === "All" || p.category === filter);

  return (
    <section id="projects" className="section-y relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="My Projects"
          description="AI platforms, ecommerce, internal tools and storefronts, live in production."
        />

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-6 sm:mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              aria-pressed={filter === cat}
              className={`relative px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-colors ${
                filter === cat ? "text-black" : "text-gray-400 hover:text-white border border-white/10"
              }`}
            >
              {filter === cat && (
                <motion.span layoutId="project-filter" className="absolute inset-0 rounded-full bg-white" transition={{ type: "spring", stiffness: 380, damping: 30 }} />
              )}
              <span className="relative">{cat}</span>
            </button>
          ))}
        </div>

        {/* Even grid of project cards */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {visible.map((project, index) => (
              <motion.a
                key={project.name}
                layout
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="Visit"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                whileHover={{ y: -6 }}
                className="group flex flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-3 hover:border-white/25 hover:bg-white/[0.04] transition-colors"
              >
                {/* Screenshot */}
                <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-white/5">
                  <Image
                    src={project.image}
                    alt={`${project.name} website`}
                    fill
                    sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-black text-sm font-semibold translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      Visit site <ArrowUpRight size={15} />
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="flex flex-col grow px-2 pt-4 pb-2">
                  <p className="text-xs font-medium text-violet-300">{project.kind}</p>
                  <h3 className="mt-1 font-heading font-bold text-xl text-white">{project.name}</h3>
                  <p className="mt-2 text-sm text-gray-400 leading-relaxed line-clamp-2">{project.description}</p>
                  <div className="mt-auto pt-4 flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="px-2.5 py-1 rounded-md bg-white/5 text-xs text-gray-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.a>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Other live sites */}
        <div className="mt-20">
          <div className="flex flex-wrap items-baseline justify-between gap-2 mb-4">
            <h3 className="font-heading font-bold text-2xl text-white">More live sites</h3>
            <p className="text-sm text-gray-500">Part of 300+ sites delivered</p>
          </div>
          <ul className="grid sm:grid-cols-2 sm:gap-x-10 border-t border-white/10">
            {projects.map((project) => (
              <li key={project.name} className="border-b border-white/10">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 py-3.5 min-w-0"
                >
                  <span className="shrink-0 font-medium text-gray-200 group-hover:text-white group-hover:translate-x-1 transition-all">{project.name}</span>
                  <span className="min-w-0 flex-1 text-sm text-gray-500 truncate">{project.note}</span>
                  <ArrowUpRight size={16} className="ml-auto shrink-0 text-gray-500 group-hover:text-lime group-hover:rotate-45 transition-all" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
