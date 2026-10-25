"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Loader2, ArrowUpRight, Linkedin, Github } from "lucide-react";
import { collection, addDoc } from "firebase/firestore";
import { db, isFirebaseConfigured } from "@/lib/firebase";
import { portfolioData } from "@/data/portfolio";
import { sendEmail, isEmailConfigured } from "@/utility/emailjs"
import { FaWhatsapp } from "react-icons/fa";
import SectionHeading from "@/components/ui/SectionHeading";
import { fireConfetti } from "@/lib/confetti";

const { personalInfo } = portfolioData;

const channels = [
  { icon: Mail, label: "Email", value: personalInfo.email, href: `mailto:${personalInfo.email}`, color: "text-violet-300" },
  { icon: FaWhatsapp, label: "WhatsApp", value: personalInfo.phone, href: personalInfo.whatsapp, color: "text-green-400" },
  { icon: Phone, label: "Phone", value: personalInfo.phone, href: `tel:${personalInfo.phone.replace(/\s/g, "")}`, color: "text-blue-300" },
  { icon: Linkedin, label: "LinkedIn", value: "in/ayesha-siddiqaa", href: personalInfo.linkedIn, color: "text-sky-300" },
  { icon: Github, label: "GitHub", value: "Ayehsa-Siddiqa", href: personalInfo.gitHub, color: "text-gray-200" },
];

const inputClass =
  "peer w-full px-4 pt-6 pb-2 bg-white/[0.03] border border-white/10 rounded-xl focus:outline-none focus:border-violet-400 focus:bg-white/[0.05] text-white transition-colors placeholder-transparent";
const labelClass =
  "absolute left-4 top-2 text-xs text-gray-400 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs peer-focus:text-violet-300 pointer-events-none";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{type: 'success' | 'error' | null, message: string}>({ type: null, message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Opens the visitor's email app with the message pre-filled, addressed to me
  const openMailFallback = () => {
    const body = `${formData.message}

— ${formData.name} (${formData.email})`;
    window.location.href = `mailto:${personalInfo.email}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: null, message: '' });

    // No sending service set up yet: hand the message to the visitor's email app instead
    if (!isEmailConfigured && !isFirebaseConfigured) {
      openMailFallback();
      setStatus({ type: 'success', message: 'Your email app has opened with the message ready. Just press send!' });
      setIsSubmitting(false);
      return;
    }

    // Each configured channel is tried on its own, so one failing doesn't block the other
    let delivered = false;
    if (isFirebaseConfigured && db) {
      try {
        await addDoc(collection(db, "messages"), { ...formData, createdAt: new Date() });
        delivered = true;
      } catch (error) {
        console.error("Could not save message to Firestore:", error);
      }
    }
    if (isEmailConfigured) {
      try {
        await sendEmail(formData);
        delivered = true;
      } catch (error) {
        console.error("Could not send message with EmailJS:", error);
      }
    }

    if (delivered) {
      fireConfetti();
      setStatus({ type: 'success', message: 'Message sent successfully! I will get back to you soon.' });
      setFormData({ name: "", email: "", subject: "", message: "" });
    } else {
      setStatus({ type: 'error', message: `Couldn't send right now. Please email me directly at ${personalInfo.email}.` });
    }
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="section-y relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Contact Me"
          description="Open to full-time full-stack and front-end roles with teams in the USA, UAE and Pakistan, onsite or remote, plus freelance projects. Tell me what you're building and I'll get back to you soon."
        />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-8 lg:gap-12">
          {/* Channels */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-3"
          >
            {channels.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-4 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20 transition-all"
              >
                <div className={`p-3 rounded-xl bg-white/5 ${c.color}`}>
                  <c.icon size={22} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-wider text-gray-500">{c.label}</p>
                  <p className="text-white font-medium break-all sm:break-normal sm:truncate">{c.value}</p>
                </div>
                <ArrowUpRight size={18} className="ml-auto shrink-0 text-gray-500 group-hover:text-white group-hover:rotate-45 transition-all" />
              </a>
            ))}
            <div className="flex items-center gap-4 p-4">
              <div className="p-3 rounded-xl bg-white/5 text-pink-300">
                <MapPin size={22} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-gray-500">Location</p>
                <p className="text-white font-medium">{personalInfo.location} · PKT (UTC+5)</p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="gradient-border glass-card p-5 sm:p-8 rounded-3xl"
          >
            <div className="flex items-center gap-2 mb-6 font-mono text-xs text-gray-500">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" /> usually replies within a day
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className={inputClass} placeholder="Your name" />
                  <label htmlFor="name" className={labelClass}>Your name</label>
                </div>
                <div className="relative">
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className={inputClass} placeholder="Email" />
                  <label htmlFor="email" className={labelClass}>Email address</label>
                </div>
              </div>

              <div className="relative">
                <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} required className={inputClass} placeholder="Subject" />
                <label htmlFor="subject" className={labelClass}>Subject</label>
              </div>

              <div className="relative">
                <textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows={5} className={`${inputClass} resize-none`} placeholder="Message"></textarea>
                <label htmlFor="message" className={labelClass}>Tell me about your project…</label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="group w-full py-3 sm:py-4 text-sm sm:text-base bg-white text-black font-bold rounded-xl hover:bg-lime transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin" size={20} /> Sending...
                  </>
                ) : (
                  <>
                    Send Message <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </>
                )}
              </button>

              {status.message && (
                <div className={`p-4 rounded-xl text-sm ${status.type === 'success' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                  {status.message}
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
