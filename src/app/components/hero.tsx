import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useSpring, useReducedMotion } from "motion/react";
import { useHover } from "./cursor";

const ROTATING = [
  "Full-stack developer",
  "Software engineer",
  "Frontend developer",
  "Backend developer",
  "Problem solver",
  "DevOps enthusiast",
  "Curious builder",
];

const ORBIT_RINGS: { radius: number; dur: number; items: { label: string; c: string }[] }[] = [
  {
    radius: 96,
    dur: 26,
    items: [
      { label: "React", c: "var(--blue)" },
      { label: "TypeScript", c: "var(--blue)" },
      { label: "Node.js", c: "var(--lime)" },
    ],
  },
  {
    radius: 158,
    dur: 38,
    items: [
      { label: "Java", c: "var(--amber)" },
      { label: "Spring Boot", c: "var(--lime)" },
      { label: "MongoDB", c: "var(--violet)" },
      { label: "Docker", c: "var(--blue)" },
    ],
  },
  {
    radius: 220,
    dur: 52,
    items: [
      { label: "Figma", c: "var(--violet)" },
      { label: "Git", c: "var(--amber)" },
      { label: "Python", c: "var(--lime)" },
      { label: "OpenGL", c: "var(--amber)" },
      { label: "Firebase", c: "var(--blue)" },
    ],
  },
];

/** Central monogram with skills orbiting around it. */
function SkillOrbit({ reduced }: { reduced: boolean }) {
  return (
    <div className="relative flex h-[520px] w-[520px] items-center justify-center">
      {/* faint orbit paths */}
      {ORBIT_RINGS.map((ring) => (
        <div
          key={`path-${ring.radius}`}
          className="absolute rounded-full border"
          style={{
            width: ring.radius * 2,
            height: ring.radius * 2,
            borderColor: "rgba(255,255,255,0.07)",
          }}
        />
      ))}

      {/* central node */}
      <div
        className="relative z-10 flex h-24 w-24 items-center justify-center rounded-full border"
        style={{
          borderColor: "var(--lime)",
          background: "radial-gradient(circle at 40% 35%, rgba(230,255,92,0.18), rgba(11,12,16,0.9))",
          boxShadow: "0 0 40px -8px var(--lime)",
        }}
      >
        <span className="font-display" style={{ fontSize: "1.9rem", fontWeight: 800 }}>
          A<span style={{ color: "var(--lime)" }}>R</span>
        </span>
      </div>

      {/* orbiting rings */}
      {ORBIT_RINGS.map((ring) => (
        <motion.div
          key={ring.radius}
          className="absolute"
          style={{ width: ring.radius * 2, height: ring.radius * 2 }}
          animate={reduced ? {} : { rotate: 360 }}
          transition={{ duration: ring.dur, repeat: Infinity, ease: "linear" }}
        >
          {ring.items.map((item, i) => {
            const angle = (i / ring.items.length) * 360;
            return (
              <div
                key={item.label}
                className="absolute left-1/2 top-1/2"
                style={{
                  transform: `rotate(${angle}deg) translateY(-${ring.radius}px)`,
                }}
              >
                <motion.div
                  animate={reduced ? {} : { rotate: -360 }}
                  transition={{ duration: ring.dur, repeat: Infinity, ease: "linear" }}
                  style={{ transform: `translate(-50%, -50%) rotate(-${angle}deg)` }}
                >
                  <span
                    className="whitespace-nowrap rounded-full border px-3 py-1.5 font-mono text-[11px] tracking-[0.06em]"
                    style={{
                      borderColor: item.c,
                      color: item.c,
                      background: "rgba(11,12,16,0.75)",
                      backdropFilter: "blur(4px)",
                      boxShadow: `0 0 16px -6px ${item.c}`,
                    }}
                  >
                    {item.label}
                  </span>
                </motion.div>
              </div>
            );
          })}
        </motion.div>
      ))}
    </div>
  );
}

/** Two-word name with a simple, calm reveal — each line slides up once. */
const NAME_LINES = ["ASHEN", "RANDIRA"];

function TypeName({ reduced }: { reduced: boolean }) {
  return (
    <h1
      className="font-display leading-[0.86]"
      style={{ fontSize: "clamp(3rem, 8vw, 8.5rem)", fontWeight: 800, letterSpacing: "-0.03em" }}
    >
      {NAME_LINES.map((line, li) => (
        <span
          key={line}
          className="block whitespace-nowrap"
        >
          <motion.span
            className="block"
            initial={reduced ? false : { opacity: 0, y: "108%" }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 + li * 0.14, ease: [0.16, 1, 0.3, 1] }}
            style={
              li === 1
                ? { color: "transparent", WebkitTextStroke: "1.5px var(--foreground)" }
                : undefined
            }
          >
            {line}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}

const CODE_FRAGMENTS = [
  { t: "const build = () => craft();", x: "59%", y: "24%", c: "var(--blue)" },
  { t: "await ship(idea)", x: "75%", y: "16%", c: "var(--violet)" },
  { t: "if (curious) learn()", x: "78%", y: "73%", c: "var(--lime)" },
  { t: "// thoughtful by default", x: "61%", y: "82%", c: "var(--amber)" },
  { t: "<Experience />", x: "64%", y: "47%", c: "var(--blue)" },
];

export function Hero() {
  const [idx, setIdx] = useState(0);
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  // Cursor-reactive parallax field.
  const px = useSpring(0, { stiffness: 60, damping: 18 });
  const py = useSpring(0, { stiffness: 60, damping: 18 });

  useEffect(() => {
    if (reduced) {
      setIdx(0);
      return;
    }

    const id = setInterval(() => setIdx((i) => (i + 1) % ROTATING.length), 2400);
    return () => clearInterval(id);
  }, [reduced]);

  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width - 0.5;
      const ny = (e.clientY - r.top) / r.height - 0.5;
      px.set(nx);
      py.set(ny);
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, [px, py, reduced]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-screen items-center overflow-hidden px-6 pt-28 md:px-10"
    >
      {/* Grid lines */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
          backgroundSize: "clamp(60px, 8vw, 120px) clamp(60px, 8vw, 120px)",
          maskImage:
            "radial-gradient(ellipse 90% 80% at 30% 40%, #000 30%, transparent 80%)",
        }}
      />

      {/* Abstract composition — glowing shapes */}
      <Parallax px={px} py={py} depth={40} reduced={!!reduced}>
        <div
          className="absolute right-[6%] top-[18%] h-[42vh] w-[42vh] rounded-full opacity-60 blur-[60px]"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, var(--violet), transparent 70%)",
          }}
        />
      </Parallax>
      <Parallax px={px} py={py} depth={70} reduced={!!reduced}>
        <div
          className="absolute right-[24%] top-[42%] h-[26vh] w-[26vh] rounded-full opacity-50 blur-[50px]"
          style={{
            background:
              "radial-gradient(circle at 60% 40%, var(--blue), transparent 70%)",
          }}
        />
      </Parallax>
      <Parallax px={px} py={py} depth={90} reduced={!!reduced}>
        <div
          className="absolute right-[40%] top-[12%] h-[16vh] w-[16vh] rounded-full opacity-40 blur-[40px]"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, var(--lime), transparent 70%)",
          }}
        />
      </Parallax>

      {/* Skill orbit — right side */}
      <div className="absolute right-[2%] top-1/2 hidden -translate-y-1/2 lg:block xl:right-[6%]">
        <SkillOrbit reduced={!!reduced} />
      </div>

      {/* Floating code fragments */}
      {CODE_FRAGMENTS.map((f, i) => (
        <Parallax key={i} px={px} py={py} depth={30 + i * 12} reduced={!!reduced}>
          <motion.span
            className="absolute hidden font-mono text-[11px] tracking-tight 2xl:block"
            style={{ left: f.x, top: f.y, color: f.c, opacity: 0.42 }}
            animate={reduced ? {} : { y: [0, -8, 0] }}
            transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
          >
            {f.t}
          </motion.span>
        </Parallax>
      ))}

      {/* Content */}
      <div className="relative z-10 max-w-3xl">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mb-6 font-mono text-[12px] tracking-[0.24em] text-muted-foreground"
        >
          SOFTWARE ENGINEER · PORTFOLIO ’26
        </motion.p>

        <TypeName reduced={!!reduced} />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-8 max-w-md text-[15px] leading-relaxed text-muted-foreground"
        >
          Full-stack developer building dependable web applications, developer tools, and deliberate interfaces.
        </motion.p>

        {/* Rotating role line */}
        <div className="mt-4 flex h-6 items-center font-mono text-[13px]">
          <span className="sr-only">Full-stack developer</span>
          <div aria-hidden="true" className="flex items-center">
            <span className="mr-2 text-muted-foreground">{"›"}</span>
            <div className="relative h-6 w-[20ch] overflow-hidden">
              <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={ROTATING[idx]}
                className="absolute inset-0 block whitespace-nowrap"
                style={{ color: "var(--lime)" }}
                initial={reduced ? false : { y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={reduced ? undefined : { y: "-100%", opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                {ROTATING[idx]}
              </motion.span>
              </AnimatePresence>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a
            href="#work"
            {...useHover({ variant: "button", label: "VIEW" })}
            className="inline-flex min-h-12 items-center rounded-full px-6 font-mono text-[12px] tracking-[0.12em] transition-transform duration-300 hover:scale-105"
            style={{ background: "var(--lime)", color: "#0b0c10" }}
          >
            View projects →
          </a>

          <a
            href="#contact"
            {...useHover({ variant: "link", label: "TALK" })}
            className="inline-flex min-h-12 items-center rounded-full border px-6 font-mono text-[12px] tracking-[0.12em] text-foreground transition-colors duration-300 hover:border-[var(--lime)] hover:text-[var(--lime)]"
            style={{ borderColor: "var(--border)" }}
          >
            Let&apos;s talk
          </a>
        </motion.div>

        <motion.a
          href="#work"
          {...useHover({ variant: "button", label: "SCROLL" })}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.1 }}
          className="group mt-8 inline-flex items-center gap-3 font-mono text-[11px] tracking-[0.12em] text-muted-foreground transition-colors hover:text-foreground"
        >
          <motion.span
            className="text-lg"
            style={{ color: "var(--lime)" }}
            animate={reduced ? {} : { y: [0, 4, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            ↓
          </motion.span>
          Scroll to explore selected work
        </motion.a>
      </div>
    </section>
  );
}

function Parallax({
  px,
  py,
  depth,
  reduced,
  children,
}: {
  px: ReturnType<typeof useSpring>;
  py: ReturnType<typeof useSpring>;
  depth: number;
  reduced: boolean;
  children: React.ReactNode;
}) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    if (reduced) return;
    const ux = px.on("change", (v) => setPos((p) => ({ ...p, x: v * depth })));
    const uy = py.on("change", (v) => setPos((p) => ({ ...p, y: v * depth })));
    return () => {
      ux();
      uy();
    };
  }, [px, py, depth, reduced]);
  return (
    <motion.div
      className="pointer-events-none absolute inset-0"
      style={{ x: pos.x, y: pos.y }}
    >
      {children}
    </motion.div>
  );
}
