import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";

/**
 * Site-wide galaxy backdrop rendered behind all content.
 * A slowly drifting, twinkling starfield on canvas + softly moving nebula
 * gradients so the whole page feels alive rather than a flat black sheet.
 */
type Star = { x: number; y: number; r: number; base: number; tw: number; ph: number; vx: number; vy: number; hue: string };

const HUES = ["255,255,255", "108,92,255", "77,159,255", "230,255,92"];

export function Galaxy() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let stars: Star[] = [];
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const build = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(230, Math.round((w * h) / 8500));
      stars = Array.from({ length: count }, () => {
        const bright = Math.random();
        const ang = Math.random() * Math.PI * 2;
        const spd = 0.02 + Math.random() * 0.06;
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          r: bright > 0.92 ? 1.4 + Math.random() * 1.2 : 0.4 + Math.random() * 1,
          base: 0.15 + Math.random() * 0.5,
          tw: 0.4 + Math.random() * 0.9,
          ph: Math.random() * Math.PI * 2,
          vx: Math.cos(ang) * spd,
          vy: Math.sin(ang) * spd,
          hue: Math.random() > 0.78 ? HUES[1 + Math.floor(Math.random() * 3)] : HUES[0],
        };
      });
    };
    let raf = 0;
    let last = performance.now();
    const draw = (t: number) => {
      const dt = Math.min(50, t - last);
      last = t;
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        if (!reduced) {
          s.x += s.vx * dt;
          s.y += s.vy * dt;
          if (s.x < -2) s.x = w + 2;
          else if (s.x > w + 2) s.x = -2;
          if (s.y < -2) s.y = h + 2;
          else if (s.y > h + 2) s.y = -2;
        }
        const twinkle = reduced ? s.base : s.base + Math.sin(t * 0.001 * s.tw + s.ph) * 0.35;
        const a = Math.max(0.04, Math.min(0.9, twinkle));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${s.hue},${a.toFixed(3)})`;
        if (s.r > 1.3) {
          ctx.shadowBlur = 6;
          ctx.shadowColor = `rgba(${s.hue},${(a * 0.7).toFixed(3)})`;
        } else {
          ctx.shadowBlur = 0;
        }
        ctx.fill();
      }
      ctx.shadowBlur = 0;
      if (!reduced) raf = requestAnimationFrame(draw);
    };

    const rebuild = () => {
      build();
      if (reduced) draw(performance.now());
    };

    rebuild();
    window.addEventListener("resize", rebuild);
    if (!reduced) raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", rebuild);
    };
  }, [reduced]);

  const nebula = (className: string, color: string, dur: number, path: { x: number[]; y: number[] }) => (
    <motion.div
      className={`absolute rounded-full blur-[120px] ${className}`}
      style={{ background: `radial-gradient(circle, ${color}, transparent 70%)` }}
      animate={reduced ? {} : { x: path.x, y: path.y }}
      transition={{ duration: dur, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
    />
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      {nebula("-left-[10%] top-[6%] h-[70vh] w-[70vh] opacity-40", "rgba(108,92,255,0.35)", 26, {
        x: [0, 120, -40, 0],
        y: [0, 80, 40, 0],
      })}
      {nebula("right-[-8%] top-[38%] h-[60vh] w-[60vh] opacity-35", "rgba(77,159,255,0.3)", 32, {
        x: [0, -100, 60, 0],
        y: [0, 60, -60, 0],
      })}
      {nebula("bottom-[-6%] left-[30%] h-[55vh] w-[55vh] opacity-25", "rgba(230,255,92,0.18)", 38, {
        x: [0, 80, -80, 0],
        y: [0, -60, 40, 0],
      })}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
