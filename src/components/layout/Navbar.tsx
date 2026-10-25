"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Command } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import Logo from "@/components/ui/Logo";
import { openCommandPalette } from "@/components/layout/CommandPalette";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Highlight the link for the section currently in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    navLinks.forEach((link) => {
      const el = document.querySelector(link.href);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="fixed top-0 inset-x-0 z-50 pt-3 sm:pt-4">
      {/* Same container as the page sections, so the bar's edges line up with the content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div
        className="rounded-2xl border border-white/10 bg-[#0d0b14]/60 backdrop-blur-[400px] shadow-[0px_0px_50px_0px_#2563EB4D] transition-colors duration-300"
      >
        <div className="flex items-center justify-between h-14 sm:h-16 px-4 sm:px-6">
          <Link href="#home" aria-label="Ayesha Siddiqa, home" className="shrink-0">
            <Logo size={56} />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1 rounded-full bg-white/[0.03] border border-white/10 p-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`relative px-4 py-1.5 text-sm font-medium rounded-full transition-colors ${
                  active === link.href ? "text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                {active === link.href && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-white/10 border border-white/10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative">{link.name}</span>
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-2">
          <button
            onClick={openCommandPalette}
            aria-label="Open command palette"
            className="flex items-center gap-1.5 px-3 py-2 rounded-full border border-white/10 text-gray-400 hover:text-white hover:border-white/25 font-mono text-xs transition-colors"
          >
            <Command size={13} /> K
          </button>
          <a
            href={`mailto:${portfolioData.personalInfo.email}`}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white text-black text-sm font-semibold rounded-full hover:bg-lime transition-colors"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-600"></span>
            </span>
            Hire Me
          </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-1">
          <button
            onClick={openCommandPalette}
            aria-label="Open command palette"
            className="p-2 text-gray-400 hover:text-white"
          >
            <Command size={18} />
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            className="text-gray-300 hover:text-white focus:outline-none p-1"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden overflow-hidden border-t border-white/10"
            >
              <div className="px-3 py-3 space-y-1">
                {navLinks.map((link, i) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-baseline gap-3 px-3 py-2.5 text-base font-heading font-semibold text-gray-200 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                  >
                    <span className="font-mono text-xs text-violet-400">0{i + 1}</span>
                    {link.name}
                  </Link>
                ))}
                <a
                  href={`mailto:${portfolioData.personalInfo.email}`}
                  className="block mt-2 text-center px-4 py-2 bg-white text-black text-sm font-semibold rounded-full hover:bg-lime transition-colors"
                >
                  Hire Me
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      </div>
    </nav>
  );
}
