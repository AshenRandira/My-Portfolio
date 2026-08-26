import { useRef, useState, useEffect, type KeyboardEvent } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { useCursor } from "./cursor";
import {
  ServeSyncMock,
  CineScopeMock,
  PulseDockMock,
  SeasonsMock,
  EcommerceMock,
  AgroSenseMock,
} from "./mockups";

type Project = {
  num: string;
  title: string;
  subtitle: string;
  outcome: string;
  role: string;
  tech: string[];
  caseStudy: {
    problem: string;
    approach: string;
    highlights: string[];
  };
  accent: string;
  Mock: (p: { accent: string }) => JSX.Element;
};

const PROJECTS: Project[] = [
  {
    num: "01",
    title: "ServeSync",
    subtitle: "Restaurant service management platform",
    outcome:
      "Backend development: authentication, role-based access control, and auditing.",
    role: "Backend Engineer",
    tech: ["Spring Boot", "Java", "MongoDB"],
    caseStudy: {
      problem: "Restaurant teams need controlled access and a reliable record of important operational changes.",
      approach: "Built the backend around authenticated workflows, clearly scoped roles, and an audit trail for accountability.",
      highlights: ["Authentication", "Role-based access", "Audit logging"],
    },
    accent: "var(--blue)",
    Mock: ServeSyncMock,
  },
  {
    num: "02",
    title: "CineScope",
    subtitle: "A cinematic movie & TV discovery platform",
    outcome:
      "A polished discovery experience built around film, collections, and personal watchlists.",
    role: "Full-stack Developer",
    tech: ["React", "TypeScript", "Tailwind", "Firebase", "TMDB"],
    caseStudy: {
      problem: "Movie discovery often feels like an endless catalogue instead of a focused, personal experience.",
      approach: "Designed and built an artwork-led discovery interface around film collections, watchlists, and TMDB-powered content.",
      highlights: ["Discovery design", "TMDB integration", "Personal watchlists"],
    },
    accent: "var(--violet)",
    Mock: CineScopeMock,
  },
  {
    num: "03",
    title: "PulseDock",
    subtitle: "Real-time container monitoring dashboard",
    outcome:
      "Live metrics, health checks, and log streaming for Dockerized services in one console.",
    role: "Full-stack Developer",
    tech: ["React", "Node.js", "Docker", "WebSockets"],
    caseStudy: {
      problem: "Containerised services are difficult to monitor when metrics, health checks, and logs live in separate places.",
      approach: "Created a real-time dashboard that brings operational signals together in one focused console.",
      highlights: ["Live metrics", "Health checks", "Log streaming"],
    },
    accent: "var(--lime)",
    Mock: PulseDockMock,
  },
  {
    num: "04",
    title: "Four Seasons Tree",
    subtitle: "Interactive computer graphics experience",
    outcome:
      "A C++ OpenGL project that brings four changing seasons into one living scene.",
    role: "Graphics Developer",
    tech: ["C++", "OpenGL", "FreeGLUT"],
    caseStudy: {
      problem: "A graphics assignment needed to demonstrate interaction, environmental change, and real-time rendering in one scene.",
      approach: "Built a living OpenGL environment that transitions through four seasonal states.",
      highlights: ["Interactive scene", "Season transitions", "Real-time rendering"],
    },
    accent: "var(--amber)",
    Mock: SeasonsMock,
  },
  {
    num: "05",
    title: "Dockerized E-commerce Store",
    subtitle: "Containerized storefront with CI/CD",
    outcome:
      "A full storefront packaged into Docker containers with an automated build & deploy pipeline.",
    role: "Full-stack / DevOps",
    tech: ["React", "Node.js", "Docker", "MongoDB"],
    caseStudy: {
      problem: "A complete storefront needs both application features and a dependable path from development to deployment.",
      approach: "Packaged the storefront into Docker services and paired it with an automated build and deployment workflow.",
      highlights: ["Dockerised services", "Storefront flows", "CI/CD pipeline"],
    },
    accent: "var(--blue)",
    Mock: EcommerceMock,
  },
  {
    num: "06",
    title: "AgroSense AI",
    subtitle: "AI-assisted smart agriculture monitoring",
    outcome:
      "Reads soil & climate sensors and surfaces AI-driven crop recommendations to farmers.",
    role: "Full-stack / ML",
    tech: ["React", "Python", "IoT", "TensorFlow"],
    caseStudy: {
      problem: "Farm data is more useful when sensor readings can be translated into practical crop decisions.",
      approach: "Combined an interactive monitoring interface with IoT inputs and AI-assisted recommendations.",
      highlights: ["Sensor monitoring", "AI recommendations", "Agriculture workflows"],
    },
    accent: "var(--lime)",
    Mock: AgroSenseMock,
  },
];

function getCircularOffset(
  index: number,
  activeIndex: number,
  total: number,
): number {
  let offset = index - activeIndex;
  const midpoint = total / 2;

  if (offset > midpoint) {
    offset -= total;
  }

  if (offset < -midpoint) {
    offset += total;
  }

  return offset;
}

export function Work() {
  const [active, setActive] = useState(0);
  const [cardW, setCardW] = useState(420);
  const [spacing, setSpacing] = useState(220);
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { set, reset } = useCursor();

  /* Responsive card + spacing ----------------------------------------- */
  useEffect(() => {
    const compute = () => {
      if (!containerRef.current) return;
      const vw = containerRef.current.offsetWidth;
      setCardW(Math.min(420, Math.round(vw * 0.64)));
      setSpacing(Math.min(220, Math.round(vw * 0.25)));
    };
    compute();
    const ro = new ResizeObserver(compute);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  /* Looping navigation ------------------------------------------------- */
  const nav = (dir: 1 | -1) =>
    setActive((a) => (a + dir + PROJECTS.length) % PROJECTS.length);

  const handleCarouselKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) return;

    if (event.key === "ArrowRight") {
      event.preventDefault();
      nav(1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      nav(-1);
    }
  };

  const p = PROJECTS[active];

  return (
    <section id="work" className="relative scroll-mt-28 py-20 md:py-24">
      {/* ── Header ─────────────────────────────────────────────────── */}
      <div className="mx-auto mb-6 max-w-[1400px] px-6 md:px-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-5 font-mono text-[12px] tracking-[0.24em] text-muted-foreground">
              (01) — ALL PROJECTS · DRAG OR PRESS ← → TO NAVIGATE
            </p>
            <h2
              className="font-display"
              style={{
                fontSize: "clamp(2.25rem, 5vw, 4.75rem)",
                fontWeight: 700,
                lineHeight: 0.98,
                letterSpacing: "-0.03em",
              }}
            >
              Things I&apos;ve brought to life.
            </h2>
          </div>

        </div>
      </div>

      {/* ── Coverflow stage ─────────────────────────────────────────── */}
      <div
        ref={containerRef}
        className="relative overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--lime)]"
        style={{ height: 250, perspective: "1400px" }}
        onMouseEnter={() => set({ variant: "project", label: "DRAG" })}
        onMouseLeave={reset}
        onKeyDown={handleCarouselKeyDown}
        tabIndex={0}
        role="region"
        aria-roledescription="carousel"
        aria-label="Selected projects"
      >
        {PROJECTS.map((proj, i) => {
          const diff = getCircularOffset(
            i,
            active,
            PROJECTS.length,
          );
          const abs = Math.abs(diff);
          if (abs > 2) return null;

          const scale = Math.max(0.72, 1 - abs * 0.14);
          const opacity = Math.max(0.2, 1 - abs * 0.4);
          const rotateY = reduced ? 0 : -diff * 14;
          const zIndex = abs === 0 ? 10 : abs === 1 ? 7 : 4;

          return (
            <motion.div
              key={proj.num}
              className="absolute overflow-hidden rounded-xl"
              style={{
                width: cardW,
                top: "50%",
                left: "50%",
                marginLeft: -cardW / 2,
                border: `1px solid ${diff === 0 ? proj.accent : "rgba(255,255,255,0.08)"}`,
              }}
              initial={{ x: diff * spacing, y: "-50%", scale, rotateY, opacity, zIndex }}
              animate={{ x: diff * spacing, y: "-50%", scale, rotateY, opacity, zIndex }}
              transition={{ type: "spring", stiffness: 280, damping: 32 }}
            >
              {/* Mock visual */}
              <div className="relative" style={{ aspectRatio: "16/9" }}>
                <proj.Mock accent={proj.accent} />

                {/* Accent glow on active */}
                {diff === 0 && (
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background: `radial-gradient(ellipse at 50% 110%, ${proj.accent}22, transparent 65%)`,
                    }}
                  />
                )}

              </div>
            </motion.div>
          );
        })}

        {/* Transparent drag layer — real swipe on desktop & touch */}
        <motion.div
          className="absolute inset-0 z-20"
          style={{ touchAction: "pan-y" }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.18}
          dragSnapToOrigin
          onDragEnd={(_, info) => {
            if (info.offset.x < -50 || info.velocity.x < -400) nav(1);
            else if (info.offset.x > 50 || info.velocity.x > 400) nav(-1);
          }}
        />

        <button
          onClick={() => nav(-1)}
          onMouseEnter={() => set({ variant: "button", label: "PREV" })}
          onMouseLeave={reset}
          className="absolute left-4 top-1/2 z-30 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border bg-[rgba(11,12,16,0.82)] text-lg transition-transform duration-300 hover:scale-110 md:left-[calc(50%-17rem)]"
          style={{ borderColor: "var(--border)", color: "var(--lime)" }}
          aria-label="Previous project"
          type="button"
        >
          ←
        </button>

        <button
          onClick={() => nav(1)}
          onMouseEnter={() => set({ variant: "button", label: "NEXT" })}
          onMouseLeave={reset}
          className="absolute right-4 top-1/2 z-30 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border bg-[rgba(11,12,16,0.82)] text-lg transition-transform duration-300 hover:scale-110 md:right-[calc(50%-17rem)]"
          style={{ borderColor: "var(--border)", color: "var(--lime)" }}
          aria-label="Next project"
          type="button"
        >
          →
        </button>
      </div>

      {/* ── Active project info ─────────────────────────────────────── */}
      <div className="mx-auto mt-6 max-w-[1400px] px-6 md:px-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            aria-live="polite"
            className="flex flex-col gap-8"
          >
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div className="min-w-0">
                <div className="mb-3 flex items-baseline gap-4">
                  <span
                    className="h-3 w-3 shrink-0 rounded-full"
                    style={{ background: p.accent, boxShadow: `0 0 14px ${p.accent}` }}
                  />
                  <h3
                    className="font-display"
                    style={{
                      fontSize: "clamp(2rem,4vw,3.2rem)",
                      fontWeight: 700,
                      letterSpacing: "-0.02em",
                      lineHeight: 1,
                    }}
                  >
                    {p.title}
                  </h3>
                </div>
                <p className="mb-2.5 text-[17px] text-foreground/80">{p.subtitle}</p>
                <p className="max-w-lg text-[15px] leading-relaxed text-muted-foreground">
                  {p.outcome}
                </p>
              </div>

              <div className="flex shrink-0 flex-col items-start gap-3 md:items-end">
                <span
                  className="rounded-full border px-3 py-1 font-mono text-[11px]"
                  style={{ borderColor: p.accent, color: p.accent }}
                >
                  {p.role}
                </span>
                <div className="flex flex-wrap gap-2">
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border px-2.5 py-0.5 font-mono text-[10px] text-muted-foreground"
                      style={{ borderColor: "var(--border)" }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 border-t pt-5" style={{ borderColor: "var(--border)" }}>
              <p className="font-mono text-[10px] tracking-[0.16em] text-muted-foreground">
                ENGINEERING FOCUS
              </p>
              {p.caseStudy.highlights.map((highlight) => (
                <span
                  key={highlight}
                  className="rounded-full border px-3 py-1 font-mono text-[10px] text-foreground/75"
                  style={{ borderColor: p.accent }}
                >
                  {highlight}
                </span>
              ))}
            </div>

            <details className="border" style={{ borderColor: "var(--border)" }}>
              <summary className="cursor-pointer list-none px-5 py-4 font-mono text-[11px] tracking-[0.14em] text-foreground/80 marker:hidden">
                <span className="mr-3" style={{ color: p.accent }}>+</span>
                OPEN PROJECT CASE STUDY
              </summary>
              <div className="grid gap-px border-t bg-[var(--border)] md:grid-cols-2" style={{ borderColor: "var(--border)" }}>
                <div className="bg-background p-5 sm:p-6">
                  <p className="font-mono text-[10px] tracking-[0.16em] text-muted-foreground">
                    THE PROBLEM
                  </p>
                  <p className="mt-3 text-[14px] leading-relaxed text-foreground/80">
                    {p.caseStudy.problem}
                  </p>
                </div>

                <div className="bg-background p-5 sm:p-6">
                  <p className="font-mono text-[10px] tracking-[0.16em] text-muted-foreground">
                    THE APPROACH
                  </p>
                  <p className="mt-3 text-[14px] leading-relaxed text-foreground/80">
                    {p.caseStudy.approach}
                  </p>
                </div>
              </div>
            </details>
          </motion.div>
        </AnimatePresence>

        {/* Circular carousel status + direct project selection */}
        <div className="mt-6 flex flex-col items-center gap-4">
          <p className="font-mono text-[10px] tracking-[0.16em] text-muted-foreground">
            DRAG, USE THE ARROWS, OR SELECT A PROJECT
          </p>

          {/* Dots */}
          <div className="flex items-center gap-2">
            {PROJECTS.map((proj, i) => (
              <button
                key={proj.title}
                onClick={() => setActive(i)}
                type="button"
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === active ? 28 : 8,
                  height: 8,
                  background: i === active ? p.accent : "rgba(255,255,255,0.12)",
                }}
                aria-label={`Go to ${proj.title}`}
                aria-pressed={i === active}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
