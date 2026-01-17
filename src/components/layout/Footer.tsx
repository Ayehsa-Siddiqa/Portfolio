import { Github, Linkedin, Mail } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import logo from "public/logo.png"
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-black/40 border-t border-white/10 py-12 mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center sm:items-start gap-3 text-center md:text-left">
             <Image src={logo} alt="Ayesha Dev Logo"
              width={150}
              />
            <p className="text-gray-400 text-sm">Building digital experiences with code and creativity.</p>
          </div>
          
          <div className="flex items-center space-x-6">
            <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors transform hover:scale-110">
              <Github size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors transform hover:scale-110">
              <Linkedin size={20} />
            </a>
            <a href={`mailto:${portfolioData.personalInfo.email}`} className="text-gray-400 hover:text-pink-400 transition-colors transform hover:scale-110">
              <Mail size={20} />
            </a>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-white/5 text-center text-gray-500 text-xs">
          <p>© {new Date().getFullYear()} Ayesha Siddiqa. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
