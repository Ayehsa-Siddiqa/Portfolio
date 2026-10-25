import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import Logo from "@/components/ui/Logo";

export default function Footer() {
  const { personalInfo } = portfolioData;

  return (
    <footer className="relative border-t border-white/10 pt-14 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start gap-3 text-center md:text-left">
            <Logo size={110} />
            <p className="text-gray-400 text-sm">Building fast websites, from the interface to the database.</p>
          </div>

          <div className="flex items-center gap-3">
            <a href={personalInfo.gitHub} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="p-3 rounded-full border border-white/10 text-gray-400 hover:text-white hover:border-violet-400/50 transition-colors">
              <Github size={18} />
            </a>
            <a href={personalInfo.linkedIn} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="p-3 rounded-full border border-white/10 text-gray-400 hover:text-white hover:border-blue-400/50 transition-colors">
              <Linkedin size={18} />
            </a>
            <a href={`mailto:${personalInfo.email}`} aria-label="Email" className="p-3 rounded-full border border-white/10 text-gray-400 hover:text-white hover:border-pink-400/50 transition-colors">
              <Mail size={18} />
            </a>
            <a href="#home" aria-label="Back to top" className="p-3 rounded-full bg-white text-black hover:bg-lime transition-colors">
              <ArrowUp size={18} />
            </a>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-2 text-gray-500 text-xs">
          <p>© {new Date().getFullYear()} Ayesha Siddiqa. All rights reserved.</p>
          <p className="font-mono">Built with Next.js · Tailwind · Framer Motion</p>
        </div>
      </div>

      {/* Oversized signature */}
      <div aria-hidden className="mt-6 select-none pointer-events-none text-center font-heading font-black tracking-tighter leading-[0.8] text-[18vw] bg-linear-to-b from-white/[0.08] to-transparent bg-clip-text text-transparent translate-y-[12%]">
        AYESHA
      </div>
    </footer>
  );
}
