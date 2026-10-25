"use client";

import { useEffect, useRef, useState } from "react";
import { portfolioData } from "@/data/portfolio";

type Line = { kind: "in" | "out" | "err"; text: string };

const { personalInfo, skillGroups, featuredProjects, experience } = portfolioData;

const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

const COMMANDS: Record<string, { help: string; run: () => string[] }> = {
  help: {
    help: "list available commands",
    run: () => Object.entries(COMMANDS).map(([name, c]) => `${name.padEnd(10)} ${c.help}`),
  },
  whoami: {
    help: "a short intro",
    run: () => [`${personalInfo.name}, ${personalInfo.role}`, `${personalInfo.location} · 4+ years · 300+ projects`, personalInfo.tagline],
  },
  skills: {
    help: "my stack, grouped",
    run: () => skillGroups.map((g) => `${g.title.padEnd(15)} ${g.items.slice(0, 4).join(", ")}`),
  },
  projects: {
    help: "featured work (jumps to section)",
    run: () => {
      setTimeout(() => scrollTo("projects"), 600);
      return featuredProjects.map((p) => `↗ ${p.name.padEnd(14)} ${p.kind}`);
    },
  },
  experience: {
    help: "where I've worked",
    run: () => experience.map((e) => `${e.hash}  ${e.company.padEnd(30)} ${e.period}`),
  },
  contact: {
    help: "ways to reach me",
    run: () => [`email     ${personalInfo.email}`, `phone     ${personalInfo.phone}`, `linkedin  ${personalInfo.linkedIn.replace("https://www.", "")}`],
  },
  hire: {
    help: "start a conversation",
    run: () => {
      setTimeout(() => scrollTo("contact"), 600);
      return ["✓ great choice. opening the contact form…"];
    },
  },
  cv: {
    help: "download my resume",
    run: () => {
      window.open(personalInfo.resume, "_blank");
      return ["✓ opening Ayesha_Siddiqa_Resume.pdf"];
    },
  },
  clear: { help: "clear the screen", run: () => [] },
};

const SUGGESTIONS = ["whoami", "skills", "projects", "hire"];

export default function Terminal() {
  const [lines, setLines] = useState<Line[]>([
    { kind: "out", text: "Welcome! Type a command, or tap one below." },
    { kind: "out", text: "Try `help` to see everything." },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: "smooth" });
  }, [lines]);

  const execute = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;
    setHistory((h) => [cmd, ...h]);
    setHistoryIndex(-1);
    if (cmd === "clear") {
      setLines([]);
      return;
    }
    const command = COMMANDS[cmd];
    const output: Line[] = command
      ? command.run().map((text) => ({ kind: "out" as const, text }))
      : [{ kind: "err", text: `command not found: ${cmd}. try \`help\`` }];
    setLines((prev) => [...prev, { kind: "in", text: cmd }, ...output]);
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      execute(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(historyIndex + 1, history.length - 1);
      if (history[next]) {
        setHistoryIndex(next);
        setInput(history[next]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = historyIndex - 1;
      setHistoryIndex(Math.max(next, -1));
      setInput(next >= 0 ? history[next] : "");
    } else if (e.key === "Tab") {
      e.preventDefault();
      const match = Object.keys(COMMANDS).find((c) => c.startsWith(input.toLowerCase()));
      if (match && input) setInput(match);
    }
  };

  return (
    <div className="font-mono text-[12px] sm:text-[13px] leading-6" onClick={() => inputRef.current?.focus()}>
      <div ref={bodyRef} className="h-[252px] overflow-y-auto p-5 pb-2 text-gray-300 [scrollbar-width:thin]">
        {lines.map((line, i) => (
          <div key={i} className={`whitespace-pre-wrap break-words ${line.kind === "err" ? "text-pink-400" : ""}`}>
            {line.kind === "in" ? (
              <>
                <span className="text-lime">➜</span> <span className="text-sky-300">~</span> <span className="text-white">{line.text}</span>
              </>
            ) : (
              line.text
            )}
          </div>
        ))}
        <div className="flex items-center">
          <span className="text-lime">➜</span>
          <span className="text-sky-300 mx-2">~</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            aria-label="Terminal command"
            spellCheck={false}
            autoComplete="off"
            className="flex-1 min-w-0 bg-transparent outline-none text-white caret-violet-400"
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-1.5 px-5 pb-4 pt-2 border-t border-white/5">
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            onClick={(e) => {
              e.stopPropagation();
              execute(s);
            }}
            className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] text-gray-300 hover:bg-violet-500/20 hover:text-white transition-colors"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
