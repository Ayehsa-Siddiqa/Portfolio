"use client";

import { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

// Organic blob that frames the illustration (viewBox 0 0 520 520)
const BLOB =
  "M78 128C150 62 336 40 430 72c62 21 60 105 40 196-26 118-70 186-150 204-76 17-150-30-204-112C60 278 20 182 78 128Z";

// Optional photo shown in the blob (with the sketch revealed under a hover lens).
// Leave null to show only the illustration; set to e.g. "/ayesha.jpg" after adding that file to public/.
const PHOTO: string | null = null;
const LENS = 82;

const INK = "#2b2540";
const SKIN = "#f4cba8";
const HAIR = "#3b2a3f";

// Hand-drawn style illustration of a developer at her laptop, framed in a gradient blob
export default function HeroPortrait() {
  // Fixed SVG ids: the portrait renders once, and stable ids avoid server/client hydration mismatches
  const id = "hero-portrait";
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [6, -6]), { stiffness: 150, damping: 18 });
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-8, 8]), { stiffness: 150, damping: 18 });
  // The accent circle drifts against the tilt for a little depth
  const orbX = useSpring(useTransform(px, [-0.5, 0.5], [14, -14]), { stiffness: 120, damping: 16 });
  const orbY = useSpring(useTransform(py, [-0.5, 0.5], [14, -14]), { stiffness: 120, damping: 16 });

  const [hasPhoto, setHasPhoto] = useState(PHOTO !== null);
  const [view, setView] = useState<"photo" | "sketch">("photo");
  const [lens, setLens] = useState<{ x: number; y: number } | null>(null);
  const showPhoto = hasPhoto && view === "photo";

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width - 0.5);
    py.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  // Lens position in SVG viewBox units, so the sketch peeks through under the pointer
  const handleLens = (e: React.PointerEvent<SVGSVGElement>) => {
    if (e.pointerType !== "mouse") return;
    const rect = e.currentTarget.getBoundingClientRect();
    setLens({ x: ((e.clientX - rect.left) / rect.width) * 520, y: ((e.clientY - rect.top) / rect.height) * 520 });
  };

  const stroke = { stroke: INK, strokeWidth: 3, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

  return (
    <motion.div
      onMouseMove={handleMove}
      onMouseLeave={() => {
        px.set(0);
        py.set(0);
        setLens(null);
      }}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className="relative w-full max-w-[560px] mx-auto"
    >
      <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
        <svg
          viewBox="0 0 520 520"
          className={`w-full h-auto overflow-visible ${showPhoto ? "cursor-none" : ""}`}
          role="img"
          aria-labelledby={`${id}-title`}
          onPointerMove={handleLens}
          onPointerLeave={() => setLens(null)}
        >
          <title id={`${id}-title`}>{showPhoto ? "Photo of Ayesha Siddiqa" : "Illustration of Ayesha coding on her laptop"}</title>
          <defs>
            <clipPath id={`${id}-clip`}>
              <path d={BLOB} />
            </clipPath>
            {/* Photo is hidden inside the lens circle, revealing the sketch beneath */}
            <mask id={`${id}-lens`} maskUnits="userSpaceOnUse" x="0" y="0" width="520" height="520">
              <rect width="520" height="520" fill="#fff" />
              <motion.circle
                cx={lens?.x ?? 260}
                cy={lens?.y ?? 260}
                fill="#000"
                initial={false}
                animate={{ r: lens ? LENS : 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
              />
            </mask>
            <linearGradient id={`${id}-ring`} x1="80" y1="60" x2="440" y2="480" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#8b5cf6" stopOpacity="0" />
              <stop offset=".35" stopColor="#8b5cf6" />
              <stop offset=".7" stopColor="#3b82f6" />
              <stop offset="1" stopColor="#c6f432" />
            </linearGradient>
            <linearGradient id={`${id}-orb`} x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="#c6f432" />
              <stop offset="1" stopColor="#3b82f6" />
            </linearGradient>
            {/* Slight wobble so the lines read as hand-drawn */}
            <filter id={`${id}-sketch`} x="-5%" y="-5%" width="110%" height="110%">
              <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="7" />
              <feDisplacementMap in="SourceGraphic" scale="2.5" />
            </filter>
          </defs>

          {/* Gradient outline, slightly larger than the blob and fading out at the top */}
          <g transform="translate(260 270) scale(1.06) translate(-260 -270)">
            <motion.path
              d={BLOB}
              fill="none"
              stroke={`url(#${id}-ring)`}
              strokeWidth="7"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.6, ease: "easeInOut", delay: 0.3 }}
            />
          </g>

          <g clipPath={`url(#${id}-clip)`}>
            <rect width="520" height="520" fill="#f6f0e7" />

            <g filter={`url(#${id}-sketch)`}>
              {/* Window */}
              <rect x="130" y="118" width="84" height="66" rx="6" fill="#dbeafe" {...stroke} />
              <path d="M172 118v66M130 151h84" {...stroke} />

              {/* Floating code braces and a sparkle */}
              <motion.text
                x="392"
                y="158"
                fontFamily="monospace"
                fontSize="30"
                fontWeight="700"
                fill="#8b5cf6"
                animate={{ y: [158, 150, 158] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                {"{ }"}
              </motion.text>
              <motion.path
                d="M372 204l4 10 10 4-10 4-4 10-4-10-10-4 10-4Z"
                fill="#c6f432"
                {...stroke}
                strokeWidth={2}
                animate={{ scale: [1, 1.25, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2.4, repeat: Infinity }}
                style={{ transformOrigin: "372px 218px", transformBox: "view-box" }}
              />

              {/* Girl: hair bun, hair, body */}
              <circle cx="300" cy="124" r="20" fill={HAIR} {...stroke} />
              <path d="M234 214c-6-52 26-86 66-86s70 32 66 84c-2 30 6 62 18 84-30 14-140 14-168 0 14-24 20-54 18-82Z" fill={HAIR} {...stroke} />
              <path d="M204 392c0-62 34-96 96-96s96 34 96 96Z" fill="#a78bfa" {...stroke} />
              <path d="M276 300c8 12 40 12 48 0" fill="none" {...stroke} strokeWidth={2.5} />
              <rect x="286" y="250" width="28" height="48" rx="10" fill={SKIN} {...stroke} />

              {/* Head gently tilts while she thinks */}
              <motion.g
                animate={{ rotate: [-2.5, 2.5, -2.5] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                style={{ transformOrigin: "300px 256px", transformBox: "view-box" }}
              >
                <ellipse cx="300" cy="214" rx="40" ry="46" fill={SKIN} {...stroke} />
                <path d="M260 196c10-34 40-48 70-40 18 5 28 18 30 36-22-6-40-18-50-34-12 20-30 32-50 38Z" fill={HAIR} {...stroke} />
                {/* Glasses and eyes looking down at the screen */}
                <circle cx="284" cy="219" r="13" fill="#fff" fillOpacity=".35" {...stroke} strokeWidth={2.5} />
                <circle cx="316" cy="219" r="13" fill="#fff" fillOpacity=".35" {...stroke} strokeWidth={2.5} />
                <path d="M297 219h6" {...stroke} strokeWidth={2.5} />
                <path d="M278 221q6 5 12 0M310 221q6 5 12 0" fill="none" {...stroke} strokeWidth={2.5} />
                <circle cx="274" cy="240" r="6" fill="#f9a8a8" opacity=".7" />
                <circle cx="326" cy="240" r="6" fill="#f9a8a8" opacity=".7" />
                <path d="M292 246q8 7 16 0" fill="none" {...stroke} strokeWidth={2.5} />
              </motion.g>

              {/* Desk */}
              <rect x="0" y="392" width="520" height="140" fill="#e8d9c4" />
              <path d="M0 392h520" {...stroke} />

              {/* Laptop seen from behind, with a glowing logo */}
              <rect x="214" y="288" width="172" height="104" rx="10" fill={INK} {...stroke} />
              <motion.text
                x="300"
                y="348"
                textAnchor="middle"
                fontFamily="monospace"
                fontSize="24"
                fontWeight="700"
                fill="#c6f432"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                {"</>"}
              </motion.text>
              <path d="M200 392h200l10 10H190Z" fill="#c7c9d1" {...stroke} />

              {/* Coffee with rising steam */}
              <path d="M168 356h30v28a8 8 0 0 1-8 8h-14a8 8 0 0 1-8-8Z" fill="#fda4af" {...stroke} />
              <path d="M198 364a8 8 0 0 1 0 16" fill="none" {...stroke} />
              {[176, 190].map((x, i) => (
                <motion.path
                  key={x}
                  d={`M${x} 346c-6-8 6-14 0-22`}
                  fill="none"
                  {...stroke}
                  strokeWidth={2.5}
                  animate={{ opacity: [0, 1, 0], y: [6, -6, -14] }}
                  transition={{ duration: 2.6, repeat: Infinity, delay: i * 0.8, ease: "easeOut" }}
                />
              ))}

              {/* Plant */}
              <path d="M410 366c-10-12-12-26-4-36 8 10 8 24 4 36Z" fill="#86efac" {...stroke} strokeWidth={2.5} />
              <path d="M410 366c4-14 14-22 24-22-2 12-12 20-24 22Z" fill="#86efac" {...stroke} strokeWidth={2.5} />
              <path d="M410 366c-6-10-16-14-24-12 4 8 14 12 24 12Z" fill="#86efac" {...stroke} strokeWidth={2.5} />
              <path d="M398 366h24l-4 26h-16Z" fill="#fdba74" {...stroke} />
            </g>

            {hasPhoto && (
              <motion.image
                href={PHOTO ?? undefined}
                x="30"
                y="40"
                width="460"
                height="460"
                preserveAspectRatio="xMidYMid slice"
                mask={`url(#${id}-lens)`}
                onError={() => setHasPhoto(false)}
                initial={false}
                animate={{ opacity: showPhoto ? 1 : 0 }}
                transition={{ duration: 0.5 }}
              />
            )}
          </g>

          {/* Lens ring that follows the pointer */}
          {showPhoto && lens && (
            <circle cx={lens.x} cy={lens.y} r={LENS} fill="none" stroke="#c6f432" strokeWidth="3" strokeDasharray="6 8" pointerEvents="none" />
          )}

          {/* Accent orb sitting on the outline */}
          <motion.circle cx="112" cy="414" r="46" fill={`url(#${id}-orb)`} style={{ x: orbX, y: orbY }} />
        </svg>
      </motion.div>

      {/* Photo / sketch switch */}
      {hasPhoto && (
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1 p-1 rounded-full glass text-xs">
          {(["photo", "sketch"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              aria-pressed={view === v}
              className={`relative px-3 py-1 rounded-full capitalize transition-colors ${view === v ? "text-black" : "text-gray-300 hover:text-white"}`}
            >
              {view === v && <motion.span layoutId="portrait-view" className="absolute inset-0 rounded-full bg-lime" transition={{ type: "spring", stiffness: 400, damping: 30 }} />}
              <span className="relative">{v === "photo" ? "Me" : "Sketch"}</span>
            </button>
          ))}
          {view === "photo" && <span className="hidden sm:inline px-2 text-gray-400">hover to peek ✏️</span>}
        </div>
      )}

      {/* Floating chips */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-4 -right-2 sm:right-0 px-3 py-1.5 rounded-full bg-lime text-black text-xs font-bold shadow-lg"
      >
        4+ yrs exp
      </motion.div>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 -right-2 sm:right-0 px-3 py-1.5 rounded-full glass text-xs font-medium text-white shadow-lg"
      >
        ⚡ 300+ projects shipped
      </motion.div>
    </motion.div>
  );
}
