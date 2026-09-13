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
import {
  SiSpringboot,
  SiReact,
  SiMysql,
  SiTypescript,
  SiFirebase,
  SiVitest,
  SiNestjs,
  SiNextdotjs,
  SiPostgresql,
  SiDocker,
  SiJsonwebtokens,
  SiCloudinary,
  SiCplusplus,
  SiOpengl,
  SiEspressif,
  SiGithub,
} from "react-icons/si";
import { FaJava } from "react-icons/fa6";
import { TbTestPipe } from "react-icons/tb";
import { FiExternalLink } from "react-icons/fi";
import type { IconType } from "react-icons";

const TECH_ICONS: Record<string, { Icon: IconType; color: string }> = {
  "Spring Boot":     { Icon: SiSpringboot,    color: "#6DB33F" },
  "Java":            { Icon: FaJava,           color: "#F89820" },
  "React":           { Icon: SiReact,          color: "#61DAFB" },
  "MySQL":           { Icon: SiMysql,          color: "#4479A1" },
  "TypeScript":      { Icon: SiTypescript,     color: "#3178C6" },
  "Firebase":        { Icon: SiFirebase,       color: "#FFCA28" },
  "Firestore":       { Icon: SiFirebase,       color: "#FFCA28" },
  "Vitest":          { Icon: SiVitest,         color: "#6E9F18" },
  "Playwright":      { Icon: TbTestPipe,       color: "#2EAD33" },
  "NestJS":          { Icon: SiNestjs,         color: "#E0234E" },
  "Next.js":         { Icon: SiNextdotjs,      color: "#ffffff" },
  "PostgreSQL":      { Icon: SiPostgresql,     color: "#4169E1" },
  "Docker":          { Icon: SiDocker,         color: "#2496ED" },
  "JWT":             { Icon: SiJsonwebtokens,  color: "#FB015B" },
  "Cloudinary":      { Icon: SiCloudinary,     color: "#3448C5" },
  "C++":             { Icon: SiCplusplus,      color: "#00599C" },
  "OpenGL":          { Icon: SiOpengl,         color: "#5586A4" },
  "ESP32":           { Icon: SiEspressif,      color: "#E7352C" },
};

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
  links?: { github?: string; live?: string };
};

const PROJECTS: Project[] = [
  {
    num: "01",
    title: "ServeSync",
    subtitle: "Full-stack restaurant management system",
    outcome:
      "JWT auth, role-based access control, branch management, audit logging, and a Spring Boot + React integration.",
    role: "Backend Engineer",
    tech: ["Spring Boot", "Java", "React", "MySQL"],
    caseStudy: {
      problem: "Restaurant teams need controlled access, branch management, and a reliable audit trail for all operational changes.",
      approach: "Built the full-stack system around JWT-authenticated workflows, clearly scoped RBAC roles, and an audit log for accountability.",
      highlights: ["JWT Authentication", "Role-based access", "Audit logging", "Branch management"],
    },
    accent: "var(--blue)",
    Mock: ServeSyncMock,
    links: { github: "https://github.com/Byte-knight-team", live: "https://cravehouse.netlify.app/" },
  },
  {
    num: "02",
    title: "CineScope",
    subtitle: "Full-stack movie & TV discovery platform",
    outcome:
      "Firebase-backed movie app with auth, Firestore data management, Cloud Functions, and automated tests using Vitest & Playwright.",
    role: "Full-stack Developer",
    tech: ["React", "TypeScript", "Firebase", "Firestore", "Vitest", "Playwright"],
    caseStudy: {
      problem: "Movie discovery often feels like an endless catalogue rather than a personal, focused experience.",
      approach: "Built a full-stack app with Firebase Authentication, Firestore data management, and Cloud Functions. Added end-to-end tests with Vitest, Testing Library, and Playwright.",
      highlights: ["Firebase Auth", "Cloud Functions", "E2E Testing", "Personal watchlists"],
    },
    accent: "var(--violet)",
    Mock: CineScopeMock,
    links: { github: "https://github.com/AshenRandira/cinescope", live: "https://cinescope-f361c.web.app/" },
  },
  {
    num: "03",
    title: "PulseDock",
    subtitle: "Self-hosted uptime monitoring platform",
    outcome:
      "Monitors website & API availability, response times, and historical uptime with Docker-based containerized deployment.",
    role: "Full-stack Developer",
    tech: ["NestJS", "Next.js", "PostgreSQL", "Docker"],
    caseStudy: {
      problem: "Teams running self-hosted services need a reliable, open-source way to monitor uptime and get alerted on downtime.",
      approach: "Building a NestJS + Next.js platform with PostgreSQL for uptime history, automated alerting, and Docker-compose deployment.",
      highlights: ["Uptime monitoring", "Alerting system", "Docker deployment", "Historical data"],
    },
    accent: "var(--lime)",
    Mock: PulseDockMock,
    links: { github: "https://github.com/AshenRandira/pulsedock" },
  },
  {
    num: "04",
    title: "AgroSense AI",
    subtitle: "Agricultural decision-support platform",
    outcome:
      "Weather-based crop risk engine with real-time scores, alerts, market prices, and REST APIs for Sri Lankan farmers.",
    role: "Full-stack Developer",
    tech: ["Spring Boot", "Java", "React", "MySQL", "JWT", "Cloudinary", "OpenWeatherMap API"],
    caseStudy: {
      problem: "Sri Lankan farmers lack actionable, real-time crop risk guidance that factors in weather and market conditions.",
      approach: "Built a weather-integrated risk engine with REST APIs for crop guides, fertilizer recommendations, and market prices using Spring Boot and React.",
      highlights: ["Weather risk engine", "Crop recommendations", "Market prices API", "Cloudinary media"],
    },
    accent: "var(--amber)",
    Mock: AgroSenseMock,
    links: { github: "https://github.com/Fourth-X-Born/agro-sense-frontend", live: "https://agrosense-web.netlify.app/" },
  },
  {
    num: "05",
    title: "Four Seasons Tree",
    subtitle: "Interactive computer graphics experience",
    outcome:
      "A C++ OpenGL project that brings four changing seasons into one living, interactive scene.",
    role: "Graphics Developer",
    tech: ["C++", "OpenGL", "FreeGLUT"],
    caseStudy: {
      problem: "A graphics assignment needed to demonstrate interaction, environmental change, and real-time rendering in one scene.",
      approach: "Built a living OpenGL environment that transitions through four seasonal states with interactive controls.",
      highlights: ["Interactive scene", "Season transitions", "Real-time rendering"],
    },
    accent: "var(--blue)",
    Mock: SeasonsMock,
  },
  {
    num: "06",
    title: "Bottle Filling System",
    subtitle: "Automated hardware automation project",
    outcome:
      "ESP32-controlled system coordinating sensors, motors, and actuators for automated bottle detection, filling, and capping.",
    role: "Embedded Systems",
    tech: ["ESP32", "C++", "IR Sensors", "Ultrasonic", "Flow Sensor", "L298N"],
    caseStudy: {
      problem: "Manual bottle filling and capping is error-prone and slow in small production environments.",
      approach: "Programmed an ESP32 control system integrating IR, ultrasonic, and flow sensors with motors and a solenoid valve for a fully automated pipeline.",
      highlights: ["ESP32 control", "Sensor fusion", "Solenoid valve", "Motor drivers"],
    },
    accent: "var(--lime)",
    Mock: EcommerceMock,
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
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
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
  const nav = (dir: 1 | -1, fromUser = false) => {
    if (fromUser) setHasUserInteracted(true);
    setActive((a) => (a + dir + PROJECTS.length) % PROJECTS.length);
  };

  /* Automatic rotation timer (every 5s until user clicks/interacts) */
  useEffect(() => {
    if (hasUserInteracted) return;
    const interval = setInterval(() => {
      setActive((a) => (a + 1) % PROJECTS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [hasUserInteracted]);

  const selectProject = (i: number) => {
    setHasUserInteracted(true);
    setActive(i);
  };

  const handleCarouselKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) return;

    if (event.key === "ArrowRight") {
      event.preventDefault();
      nav(1, true);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      nav(-1, true);
    }
  };

  const p = PROJECTS[active];

  return (
    <section 
      id="work" 
      className="relative scroll-mt-28 py-20 md:py-24"
    >
      {/* ── Header ─────────────────────────────────────────────────── */}
      <div className="mx-auto mb-6 max-w-[1400px] px-6 md:px-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-5 font-mono text-[12px] tracking-[0.24em] text-muted-foreground">
              (01) - ALL PROJECTS · DRAG OR PRESS ← → TO NAVIGATE
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
            if (info.offset.x < -50 || info.velocity.x < -400) nav(1, true);
            else if (info.offset.x > 50 || info.velocity.x > 400) nav(-1, true);
          }}
        />

        <button
          onClick={() => nav(-1, true)}
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
          onClick={() => nav(1, true)}
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
                {/* GitHub / Live Action Buttons */}
                {p.links && (
                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    {p.links.live && (
                      <a
                        href={p.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-2 rounded-full px-5 py-2.5 font-mono text-[12px] font-bold tracking-wider shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95"
                        style={{
                          background: p.accent,
                          color: "#0b0c10",
                          boxShadow: `0 4px 20px -4px ${p.accent}80`,
                        }}
                      >
                        <FiExternalLink size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        <span>Live Demo</span>
                      </a>
                    )}
                    {p.links.github && (
                      <a
                        href={p.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 font-mono text-[12px] font-semibold tracking-wider text-foreground backdrop-blur-md shadow-md transition-all duration-300 hover:scale-105 hover:border-white/40 hover:bg-white/20 active:scale-95"
                      >
                        <SiGithub size={14} className="transition-transform duration-300 group-hover:scale-110" />
                        <span>Source Code</span>
                      </a>
                    )}
                  </div>
                )}
              </div>

              <div className="flex shrink-0 flex-col items-start gap-3 md:items-end">
                <span
                  className="rounded-full border px-3 py-1 font-mono text-[11px]"
                  style={{ borderColor: p.accent, color: p.accent }}
                >
                  {p.role}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {p.tech.map((t) => {
                    const tech = TECH_ICONS[t];
                    return (
                      <span
                        key={t}
                        className="flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] text-muted-foreground transition-colors duration-200 hover:text-foreground"
                        style={{ borderColor: "var(--border)" }}
                      >
                        {tech && (
                          <tech.Icon
                            style={{ color: tech.color, flexShrink: 0 }}
                            size={12}
                          />
                        )}
                        {t}
                      </span>
                    );
                  })}
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
                onClick={() => selectProject(i)}
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
