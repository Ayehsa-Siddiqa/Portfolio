const COLORS = ["#8b5cf6", "#3b82f6", "#f472b6", "#c6f432", "#ffffff"];

// Lightweight canvas confetti burst; cleans itself up when the pieces settle
export function fireConfetti(originX = window.innerWidth / 2, originY = window.innerHeight / 3) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const canvas = document.createElement("canvas");
  canvas.style.cssText = "position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:100";
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d")!;

  const pieces = Array.from({ length: 140 }, () => {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 9 + 4;
    return {
      x: originX,
      y: originY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 6,
      w: Math.random() * 8 + 4,
      h: Math.random() * 5 + 3,
      rot: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.3,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    };
  });

  let ticks = 0;
  const step = () => {
    ticks++;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const p of pieces) {
      p.vy += 0.25;
      p.vx *= 0.99;
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vr;
      ctx.save();
      ctx.globalAlpha = Math.max(0, 1 - ticks / 160);
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    }
    if (ticks < 160) requestAnimationFrame(step);
    else canvas.remove();
  };
  requestAnimationFrame(step);
}
