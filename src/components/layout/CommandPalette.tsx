"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Home, User, Wrench, Briefcase, FolderGit2, Send, Copy, Download, Github, Linkedin, MessageCircle, PartyPopper, CornerDownLeft, Check,
} from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { fireConfetti } from "@/lib/confetti";

type Action = { id: string; label: string; group: string; icon: React.ElementType; hint?: string; run: () => string | void };

const { personalInfo } = portfolioData;
const go = (id: string) => () => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

export const openCommandPalette = () => window.dispatchEvent(new Event("open-command-palette"));

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const actions: Action[] = useMemo(
    () => [
      { id: "home", label: "Go to top", group: "Navigate", icon: Home, run: go("home") },
      { id: "about", label: "About me", group: "Navigate", icon: User, run: go("about") },
      { id: "skills", label: "Skills & toolkit", group: "Navigate", icon: Wrench, run: go("skills") },
      { id: "experience", label: "Work experience", group: "Navigate", icon: Briefcase, run: go("experience") },
      { id: "projects", label: "Projects", group: "Navigate", icon: FolderGit2, run: go("projects") },
      { id: "contact", label: "Contact form", group: "Navigate", icon: Send, run: go("contact") },
      {
        id: "copy-email",
        label: "Copy email address",
        group: "Actions",
        icon: Copy,
        hint: personalInfo.email,
        run: () => {
          navigator.clipboard?.writeText(personalInfo.email);
          return "Email copied to clipboard";
        },
      },
      {
        id: "cv",
        label: "Download CV",
        group: "Actions",
        icon: Download,
        run: () => {
          window.open(personalInfo.resume, "_blank");
        },
      },
      { id: "whatsapp", label: "Message on WhatsApp", group: "Social", icon: MessageCircle, run: () => void window.open(personalInfo.whatsapp, "_blank") },
      { id: "github", label: "Open GitHub", group: "Social", icon: Github, run: () => void window.open(personalInfo.gitHub, "_blank") },
      { id: "linkedin", label: "Open LinkedIn", group: "Social", icon: Linkedin, run: () => void window.open(personalInfo.linkedIn, "_blank") },
      {
        id: "party",
        label: "Celebrate 🎉",
        group: "Fun",
        icon: PartyPopper,
        run: () => {
          fireConfetti();
          return "Thanks for stopping by!";
        },
      },
    ],
    []
  );

  const filtered = actions.filter((a) => `${a.label} ${a.group} ${a.hint ?? ""}`.toLowerCase().includes(query.trim().toLowerCase()));

  const close = () => {
    setOpen(false);
    setQuery("");
    setSelected(0);
  };

  const runAction = (action: Action) => {
    close();
    const message = action.run();
    if (message) {
      setToast(message);
      setTimeout(() => setToast(null), 2200);
    }
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    const handleOpen = () => setOpen(true);
    window.addEventListener("keydown", handleKey);
    window.addEventListener("open-command-palette", handleOpen);
    return () => {
      window.removeEventListener("keydown", handleKey);
      window.removeEventListener("open-command-palette", handleOpen);
    };
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  const handleListKeys = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelected((s) => (s + 1) % Math.max(filtered.length, 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelected((s) => (s - 1 + filtered.length) % Math.max(filtered.length, 1));
    } else if (e.key === "Enter" && filtered[selected]) {
      runAction(filtered[selected]);
    }
  };

  let lastGroup = "";

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm flex items-start justify-center px-4 pt-[14vh]"
            onClick={close}
          >
            <motion.div
              role="dialog"
              aria-label="Command palette"
              initial={{ opacity: 0, scale: 0.96, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -10 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="gradient-border w-full max-w-lg rounded-2xl bg-[#0f0c17]/95 shadow-2xl shadow-violet-950/50 overflow-hidden"
            >
              <div className="flex items-center gap-3 px-4 border-b border-white/10">
                <Search size={18} className="text-gray-500" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setSelected(0);
                  }}
                  onKeyDown={handleListKeys}
                  placeholder="Type a command or search…"
                  aria-label="Search commands"
                  className="flex-1 py-4 bg-transparent outline-none text-white placeholder:text-gray-500"
                />
                <kbd className="font-mono text-[10px] text-gray-500 border border-white/10 rounded px-1.5 py-0.5">ESC</kbd>
              </div>

              <div className="max-h-[50vh] overflow-y-auto p-2">
                {filtered.length === 0 && <p className="px-3 py-8 text-center text-sm text-gray-500">No results. Try “email” or “projects”.</p>}
                {filtered.map((action, i) => {
                  const header = action.group !== lastGroup ? action.group : null;
                  lastGroup = action.group;
                  const isSelected = i === selected;
                  return (
                    <div key={action.id}>
                      {header && <p className="px-3 pt-3 pb-1 font-mono text-[10px] uppercase tracking-widest text-gray-500">{header}</p>}
                      <button
                        onMouseEnter={() => setSelected(i)}
                        onClick={() => runAction(action)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-sm transition-colors ${
                          isSelected ? "bg-violet-500/20 text-white" : "text-gray-300"
                        }`}
                      >
                        <action.icon size={17} className={isSelected ? "text-lime" : "text-gray-500"} />
                        <span className="flex-1">{action.label}</span>
                        {action.hint && <span className="hidden sm:inline font-mono text-xs text-gray-500 truncate max-w-[180px]">{action.hint}</span>}
                        {isSelected && <CornerDownLeft size={14} className="text-gray-400" />}
                      </button>
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center gap-4 px-4 py-2.5 border-t border-white/10 font-mono text-[10px] text-gray-500">
                <span>↑↓ navigate</span>
                <span>↵ select</span>
                <span className="ml-auto">⌘K / Ctrl+K anywhere</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 20, x: "-50%" }}
            role="status"
            className="fixed bottom-6 left-1/2 z-[90] flex items-center gap-2 px-4 py-2.5 rounded-full bg-lime text-black text-sm font-semibold shadow-xl"
          >
            <Check size={16} /> {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
