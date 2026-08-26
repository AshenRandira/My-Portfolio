import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  ReactNode,
} from "react";
import { motion, useSpring, useMotionValue } from "motion/react";

/* ------------------------------------------------------------------ *
 * Cursor state shared across the app.
 * Any element can push a cursor "intent" (variant + label) on hover.
 * ------------------------------------------------------------------ */

export type CursorVariant = "default" | "link" | "button" | "project" | "text";

type CursorState = { variant: CursorVariant; label?: string };

type CursorCtx = {
  set: (state: CursorState) => void;
  reset: () => void;
};

const Ctx = createContext<CursorCtx>({ set: () => {}, reset: () => {} });

export const useCursor = () => useContext(Ctx);

/**
 * Convenience prop-spreader: attach hover handlers to any element to
 * drive the custom cursor. e.g. <a {...useHover({variant:"link"})}>
 */
export function useHover(state: CursorState) {
  const { set, reset } = useCursor();
  return {
    onMouseEnter: () => set(state),
    onMouseLeave: reset,
  };
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduced;
}

const ACCENT: Record<CursorVariant, string> = {
  default: "var(--lime)",
  link: "var(--blue)",
  button: "var(--lime)",
  project: "var(--violet)",
  text: "var(--amber)",
};

export function CursorProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<CursorState>({ variant: "default" });
  const reduced = usePrefersReducedMotion();
  const [enabled, setEnabled] = useState(false);

  // Raw pointer position.
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  // Springy ring that trails the dot.
  const ringX = useSpring(x, { stiffness: 380, damping: 30, mass: 0.4 });
  const ringY = useSpring(y, { stiffness: 380, damping: 30, mass: 0.4 });

  useEffect(() => {
    // Only enable the custom cursor for fine pointers (mouse/trackpad).
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  const ctx: CursorCtx = {
    set: setState,
    reset: () => setState({ variant: "default" }),
  };

  const isExpanded =
    state.variant === "button" ||
    state.variant === "project" ||
    (!!state.label && state.label.length > 0);

  const accent = ACCENT[state.variant];

  return (
    <Ctx.Provider value={ctx}>
      {children}
      {enabled && (
        <>
          {/* Galaxy stardust trail */}
          {!reduced && <Stardust accent={accent} hidden={!!state.label} />}

          {/* Trailing ring / expanding label puck */}
          <motion.div
            aria-hidden
            className="pointer-events-none fixed left-0 top-0 z-[70] flex items-center justify-center rounded-full"
            style={{
              x: reduced ? x : ringX,
              y: reduced ? y : ringY,
              translateX: "-50%",
              translateY: "-50%",
              border: `1px solid ${accent}`,
              boxShadow: `0 0 24px -6px ${accent}`,
            }}
            animate={{
              width: isExpanded ? 74 : 34,
              height: isExpanded ? 74 : 34,
              backgroundColor: isExpanded
                ? "rgba(255,255,255,0.04)"
                : "rgba(255,255,255,0)",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
          >
            {state.label && (
              <span
                className="font-mono select-none"
                style={{ fontSize: 10, letterSpacing: "0.14em", color: accent }}
              >
                {state.label}
              </span>
            )}
          </motion.div>

          {/* Precise glowing dot (follows pointer 1:1) */}
          <motion.div
            aria-hidden
            className="pointer-events-none fixed left-0 top-0 z-[71] rounded-full"
            style={{
              x,
              y,
              translateX: "-50%",
              translateY: "-50%",
              width: 7,
              height: 7,
              backgroundColor: accent,
              boxShadow: `0 0 14px 2px ${accent}`,
            }}
            animate={{ opacity: state.label ? 0 : 1 }}
          />
        </>
      )}
    </Ctx.Provider>
  );
}

/**
 * Canvas-based "stardust" comet trail. Tiny stars are emitted along the
 * pointer path, drift with a little turbulence, twinkle, and fade —
 * giving a soft galaxy tail rather than a chain of solid dots.
 */
type Star = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  max: number;
  size: number;
  hue: string;
};

function resolveColor(cssVar: string) {
  // Map our accent CSS vars to concrete rgb for canvas.
  const map: Record<string, string> = {
    "var(--lime)": "230,255,92",
    "var(--blue)": "77,159,255",
    "var(--violet)": "108,92,255",
    "var(--amber)": "255,180,84",
  };
  return map[cssVar] ?? "230,255,92";
}

function Stardust({ accent, hidden }: { accent: string; hidden: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stars = useRef<Star[]>([]);
  const pointer = useRef({ x: -100, y: -100, seen: false });
  const rgb = useRef(resolveColor(accent));
  const hiddenRef = useRef(hidden);

  useEffect(() => {
    rgb.current = resolveColor(accent);
  }, [accent]);

  useEffect(() => {
    hiddenRef.current = hidden;
  }, [hidden]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    let lastMove = 0;
    const onMove = (e: MouseEvent) => {
      pointer.current = { x: e.clientX, y: e.clientY, seen: true };
      lastMove = performance.now();
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    // Stop emitting when the pointer leaves the window.
    const onLeave = () => { lastMove = 0; };
    window.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseleave", onLeave);

    let raf = 0;
    let last = performance.now();
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      const dt = Math.min(48, now - last);
      last = now;

      // Emit new stars only while the pointer is actively moving.
      const moving = now - lastMove < 90;
      if (pointer.current.seen && moving && !hiddenRef.current) {
        const emit = 2;
        for (let i = 0; i < emit; i++) {
          const ang = Math.random() * Math.PI * 2;
          const spd = Math.random() * 0.35;
          stars.current.push({
            x: pointer.current.x + (Math.random() - 0.5) * 6,
            y: pointer.current.y + (Math.random() - 0.5) * 6,
            vx: Math.cos(ang) * spd,
            vy: Math.sin(ang) * spd - 0.05,
            life: 0,
            max: 550 + Math.random() * 650,
            size: 0.6 + Math.random() * 1.9,
            hue: rgb.current,
          });
        }
      }
      if (stars.current.length > 240) {
        stars.current.splice(0, stars.current.length - 240);
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = stars.current.length - 1; i >= 0; i--) {
        const s = stars.current[i];
        s.life += dt;
        if (s.life >= s.max) {
          stars.current.splice(i, 1);
          continue;
        }
        const p = s.life / s.max;
        s.x += s.vx * dt * 0.06;
        s.y += s.vy * dt * 0.06;
        const twinkle = 0.55 + 0.45 * Math.sin((s.life / s.max) * Math.PI);
        const alpha = (1 - p) * twinkle;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size * (1 - p * 0.4), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${s.hue},${alpha.toFixed(3)})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = `rgba(${s.hue},${(alpha * 0.8).toFixed(3)})`;
        ctx.fill();
      }
      ctx.shadowBlur = 0;
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[68]"
      style={{ width: "100vw", height: "100vh" }}
    />
  );
}
