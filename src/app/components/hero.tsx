import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useSpring, useReducedMotion } from "motion/react";
import { useHover } from "./cursor";
import {
  SiReact,
  SiTypescript,
  SiNextdotjs,
  SiNodedotjs,
  SiSpringboot,
  SiDocker,
  SiMongodb,
  SiPython,
  SiFigma,
  SiFirebase,
  SiGithub,
} from "react-icons/si";
import { FaJava } from "react-icons/fa6";
import type { IconType } from "react-icons";
import profileImg from "../../imports/image.jpg";

const ROTATING = [
  "Full-stack developer",
  "Software engineer",
  "Frontend developer",
  "Backend developer",
  "Problem solver",
  "DevOps enthusiast",
  "Curious builder",
];

type OrbitItem = {
  id: string;
  label: string;
  Icon: IconType;
  color: string;
  tag: string;
};

type OrbitRing = {
  radius: number;
  duration: number;
  reverse?: boolean;
  items: OrbitItem[];
};

const ORBIT_RINGS: OrbitRing[] = [
  {
    radius: 160,
    duration: 36,
    reverse: false,
    items: [
      { id: "react", label: "React", Icon: SiReact, color: "var(--blue)", tag: "Frontend" },
      { id: "typescript", label: "TypeScript", Icon: SiTypescript, color: "var(--blue)", tag: "Language" },
      { id: "nodejs", label: "Node.js", Icon: SiNodedotjs, color: "var(--lime)", tag: "Backend" },
    ],
  },
  {
    radius: 230,
    duration: 52,
    reverse: true,
    items: [
      { id: "docker", label: "Docker", Icon: SiDocker, color: "var(--blue)", tag: "DevOps" },
      { id: "java", label: "Java", Icon: FaJava, color: "var(--amber)", tag: "Language" },
      { id: "springboot", label: "Spring Boot", Icon: SiSpringboot, color: "var(--lime)", tag: "Backend" },
      { id: "mongodb", label: "MongoDB", Icon: SiMongodb, color: "var(--violet)", tag: "Database" },
    ],
  },
  {
    radius: 300,
    duration: 70,
    reverse: false,
    items: [
      { id: "figma", label: "Figma", Icon: SiFigma, color: "var(--violet)", tag: "Design" },
      { id: "git", label: "Git", Icon: SiGithub, color: "var(--amber)", tag: "Tooling" },
      { id: "python", label: "Python", Icon: SiPython, color: "var(--lime)", tag: "Language" },
      { id: "firebase", label: "Firebase", Icon: SiFirebase, color: "var(--blue)", tag: "Cloud" },
      { id: "nextjs", label: "Next.js", Icon: SiNextdotjs, color: "var(--blue)", tag: "Framework" },
    ],
  },
];

/** ── Floating Orbital Tech Cosmos (Always Upright Badges) ────────── */
function SkillOrbit({ reduced }: { reduced: boolean }) {
  const [hoveredItem, setHoveredItem] = useState<OrbitItem | null>(null);

  return (
    <div className="relative flex h-[650px] w-[650px] items-center justify-center">
      {/* Dynamic Keyframes for counter-rotating orbits so labels NEVER invert */}
      <style>{`
        ${ORBIT_RINGS.map((ring, ringIdx) =>
        ring.items
          .map((item, itemIdx) => {
            const startAngle = (itemIdx / ring.items.length) * 360;
            const dir = ring.reverse ? -1 : 1;
            const endAngle = startAngle + dir * 360;
            return `
                @keyframes orbit-anim-${ringIdx}-${itemIdx} {
                  0% {
                    transform: rotate(${startAngle}deg) translateX(${ring.radius}px) rotate(-${startAngle}deg) translate(-50%, -50%);
                  }
                  100% {
                    transform: rotate(${endAngle}deg) translateX(${ring.radius}px) rotate(-${endAngle}deg) translate(-50%, -50%);
                  }
                }
              `;
          })
          .join("\n")
      ).join("\n")}
      `}</style>

      {/* Orbit Track Rings */}
      {ORBIT_RINGS.map((ring, idx) => (
        <div
          key={`path-${ring.radius}`}
          className="pointer-events-none absolute rounded-full border transition-opacity duration-300"
          style={{
            width: ring.radius * 2,
            height: ring.radius * 2,
            borderColor: idx === 0 ? "rgba(132, 204, 22, 0.15)" : "rgba(255, 255, 255, 0.08)",
            borderStyle: idx === 1 ? "dashed" : "solid",
            boxShadow: idx === 0 ? "0 0 20px -8px rgba(132, 204, 22, 0.2)" : "none",
          }}
        />
      ))}

      {/* Central Circular Profile Photo Frame — Even Bigger & Commanding */}
      <div
        className="group relative z-20 flex h-44 w-44 md:h-52 md:w-52 items-center justify-center rounded-full border-2 transition-transform duration-300 hover:scale-105"
        style={{
          borderColor: "var(--lime)",
          boxShadow: "0 0 65px -4px var(--lime), 0 0 32px -2px rgba(230,255,92,0.45), inset 0 0 24px rgba(230,255,92,0.25)",
        }}
      >
        {/* Pulsing outer aura ring */}
        <div
          className="pointer-events-none absolute -inset-3.5 animate-ping rounded-full border border-[var(--lime)] opacity-25"
          style={{ animationDuration: "3.5s" }}
        />

        {/* Circular image mask */}
        <div className="relative h-full w-full overflow-hidden rounded-full bg-[#0e1016]">
          <img
            src={profileImg}
            alt="Ashen Randira"
            className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
          />
          {/* Subtle glowing vignette overlay */}
          <div
            className="pointer-events-none absolute inset-0 rounded-full"
            style={{
              boxShadow: "inset 0 0 24px rgba(0,0,0,0.5), inset 0 0 10px rgba(230,255,92,0.25)",
            }}
          />
        </div>
      </div>

      {/* Orbiting Tech Pills (Always Strictly Upright & Horizontal) */}
      {ORBIT_RINGS.map((ring, ringIdx) =>
        ring.items.map((item, itemIdx) => {
          const isHovered = hoveredItem?.id === item.id;

          return (
            <div
              key={item.id}
              className="absolute left-1/2 top-1/2 cursor-pointer"
              style={{
                animationName: reduced ? "none" : `orbit-anim-${ringIdx}-${itemIdx}`,
                animationDuration: `${ring.duration}s`,
                animationTimingFunction: "linear",
                animationIterationCount: "infinite",
                animationPlayState: hoveredItem ? "paused" : "running",
                zIndex: isHovered ? 40 : 15,
              }}
              onMouseEnter={() => setHoveredItem(item)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div
                className="group flex items-center gap-2 rounded-full border px-3.5 py-1.5 font-mono text-[11px] font-medium tracking-wide backdrop-blur-md transition-all duration-300"
                style={{
                  borderColor: item.color,
                  background: isHovered
                    ? "rgba(16, 18, 26, 0.95)"
                    : "rgba(11, 12, 16, 0.82)",
                  color: item.color,
                  boxShadow: isHovered
                    ? `0 0 24px -1px ${item.color}, 0 0 12px ${item.color}, inset 0 0 10px ${item.color}35`
                    : `0 0 16px -5px ${item.color}, inset 0 0 8px -3px ${item.color}25`,
                  transform: isHovered ? "scale(1.15)" : "scale(1)",
                }}
              >
                <item.Icon
                  size={14}
                  style={{
                    color: item.color,
                    filter: `drop-shadow(0 0 6px ${item.color})`,
                  }}
                />
                <span className="whitespace-nowrap">{item.label}</span>
              </div>
            </div>
          );
        })
      )}

      {/* Floating Status / Inspection Badge below the core */}
      <div className="pointer-events-none absolute -bottom-4 flex h-7 items-center justify-center font-mono text-[11px]">
        <AnimatePresence mode="wait">
          {hoveredItem ? (
            <motion.div
              key={hoveredItem.id}
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -3 }}
              transition={{ duration: 0.18 }}
              className="flex items-center gap-2 rounded-full border px-3 py-0.5"
              style={{
                borderColor: `${hoveredItem.color}60`,
                background: "rgba(14, 16, 22, 0.85)",
                boxShadow: `0 0 16px -4px ${hoveredItem.color}35`,
              }}
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: hoveredItem.color }} />
              <span className="font-semibold text-foreground">{hoveredItem.label}</span>
              <span className="text-muted-foreground">· {hoveredItem.tag} Stack</span>
            </motion.div>
          ) : (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2 text-[11px] text-muted-foreground/75"
            >
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--lime)]" />
              <span>ACTIVE TECH STACK</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
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
      className="relative flex min-h-screen items-center overflow-hidden px-6 pt-28 pb-16 md:px-10 md:pt-36 lg:pt-40"
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

      {/* Floating Orbiting Tech Cosmos — right side */}
      <div className="absolute right-[4%] top-[53%] hidden -translate-y-1/2 lg:block xl:right-[6%]">
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

      {/* Content — Well-balanced across left and center */}
      <div className="relative z-10 max-w-3xl lg:max-w-[780px] xl:max-w-[860px]">
        {/* Hero Headline */}
        <TypeName reduced={!!reduced} />

        {/* Rich Sentences bridging Left & Center */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="mt-4 text-[17px] leading-relaxed text-foreground/90 md:text-[19px]"
          style={{ lineHeight: 1.55 }}
        >
          Full-stack engineer crafting dependable web architectures, distributed backend services, and high-performance, human-centered digital tools.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.75 }}
          className="mt-2.5 max-w-2xl text-[14px] leading-relaxed text-muted-foreground md:text-[15px]"
        >
          Undergraduate at the University of Moratuwa — fusing strict type-safety, containerized microservices, and creative interface design to transform complex real-world challenges into fluid, production-ready software.
        </motion.p>

        {/* Key Engineering Pillars / Focus Chips */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.85 }}
          className="mt-4 flex flex-wrap items-center gap-2 font-mono text-[11px] text-muted-foreground"
        >
          <span className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1">
            <span className="text-[var(--lime)]">⚡</span> Full-Stack Systems
          </span>
          <span className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1">
            <span className="text-[var(--blue)]">☁</span> Cloud &amp; Docker
          </span>
          <span className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1">
            <span className="text-[var(--amber)]">🎯</span> Algorithmic Logic
          </span>
          <span className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1">
            <span className="text-[var(--violet)]">🎨</span> UI / UX Precision
          </span>
        </motion.div>

        {/* Rotating role line */}
        <div
          className="mt-4 flex h-6 items-center font-mono text-[13px]"
          style={{ lineHeight: 1.35 }}
        >
          <span className="sr-only">Full-stack developer</span>
          <div aria-hidden="true" className="flex items-center">
            <span className="mr-3 text-muted-foreground">{"›"}</span>
            <div className="relative h-6 w-[24ch] overflow-hidden">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={ROTATING[idx]}
                  className="absolute inset-0 block whitespace-nowrap font-medium"
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

        {/* Prominent Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.95 }}
          className="mt-5 flex flex-wrap items-center gap-3.5"
        >
          <a
            href="#work"
            {...useHover({ variant: "button", label: "VIEW" })}
            className="inline-flex min-h-12 items-center gap-2 rounded-full px-7 font-mono text-[12px] font-bold tracking-[0.1em] shadow-[0_4px_24px_rgba(230,255,92,0.35)] transition-all duration-300 hover:scale-105 hover:shadow-[0_6px_30px_rgba(230,255,92,0.5)] active:scale-95"
            style={{ background: "var(--lime)", color: "#0b0c10" }}
          >
            <span>View selected projects</span>
            <span>→</span>
          </a>

          <a
            href="#contact"
            {...useHover({ variant: "link", label: "TALK" })}
            className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/20 bg-white/[0.05] px-6 font-mono text-[12px] font-medium tracking-[0.1em] text-foreground backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-[var(--lime)] hover:text-[var(--lime)] active:scale-95"
          >
            <span>Let&apos;s talk</span>
            <span>↗</span>
          </a>

          <a
            href={`${import.meta.env.BASE_URL}Ashen_Randira_Resume.pdf`}
            download="Ashen_Randira_Resume.pdf"
            {...useHover({ variant: "button", label: "CV" })}
            className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-5 font-mono text-[12px] text-muted-foreground transition-all duration-300 hover:border-white/30 hover:text-foreground active:scale-95"
          >
            <span>Resume</span>
            <span>↓</span>
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.a
          href="#work"
          {...useHover({ variant: "button", label: "SCROLL" })}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.1 }}
          className="group mt-6 inline-flex items-center gap-3 font-mono text-[11px] tracking-[0.12em] text-muted-foreground transition-colors hover:text-foreground"
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
