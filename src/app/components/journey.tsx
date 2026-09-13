import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import { Code2, Server, Database, Wrench, Palette } from "lucide-react";
import {
  SiReact,
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiHtml5,
  SiSpringboot,
  SiNestjs,
  SiNodedotjs,
  SiCplusplus,
  SiPython,
  SiPhp,
  SiMysql,
  SiPostgresql,
  SiMongodb,
  SiFirebase,
  SiMicrosoftsqlserver,
  SiGithub,
  SiDocker,
  SiPostman,
  SiApachemaven,
  SiLinux,
  SiFigma,
  SiCanvas,
  SiOpengl,
  SiSqlite,
} from "react-icons/si";
import { FaJava } from "react-icons/fa6";
import type { IconType } from "react-icons";

type SkillIcon = { Icon: IconType; color: string };

const SKILL_ICONS: Record<string, SkillIcon> = {
  "React":              { Icon: SiReact,              color: "#61DAFB" },
  "TypeScript":         { Icon: SiTypescript,         color: "#3178C6" },
  "Next.js":            { Icon: SiNextdotjs,          color: "#ffffff" },
  "Tailwind CSS":       { Icon: SiTailwindcss,        color: "#06B6D4" },
  "HTML / CSS":         { Icon: SiHtml5,              color: "#E34F26" },
  "Java":               { Icon: FaJava,               color: "#F89820" },
  "Spring Boot":        { Icon: SiSpringboot,         color: "#6DB33F" },
  "NestJS":             { Icon: SiNestjs,             color: "#E0234E" },
  "Node.js":            { Icon: SiNodedotjs,          color: "#339933" },
  "C / C++":            { Icon: SiCplusplus,          color: "#00599C" },
  "Python":             { Icon: SiPython,             color: "#3776AB" },
  "PHP":                { Icon: SiPhp,                color: "#777BB4" },
  "MySQL":              { Icon: SiMysql,              color: "#4479A1" },
  "PostgreSQL":         { Icon: SiPostgresql,         color: "#4169E1" },
  "MongoDB":            { Icon: SiMongodb,            color: "#47A248" },
  "Firebase / Firestore": { Icon: SiFirebase,         color: "#FFCA28" },
  "MS SQL":             { Icon: SiSqlite,             color: "#003B57" },
  "Git & GitHub":       { Icon: SiGithub,             color: "#ffffff" },
  "Docker":             { Icon: SiDocker,             color: "#2496ED" },
  "Postman":            { Icon: SiPostman,            color: "#FF6C37" },
  "Maven":              { Icon: SiApachemaven,        color: "#C71A36" },
  "Linux":              { Icon: SiLinux,              color: "#FCC624" },
  "Figma":              { Icon: SiFigma,              color: "#F24E1E" },
  "Canva":              { Icon: SiCanvas,             color: "#00C4CC" },
  "C++ / OpenGL":       { Icon: SiOpengl,             color: "#5586A4" },
};

type Node = { name: string; note: string; level: number };
type Category = {
  title: string;
  accent: string;
  Icon: typeof Code2;
  blurb: string;
  nodes: Node[];
};

const CATEGORIES: Category[] = [
  {
    title: "Frontend",
    accent: "var(--blue)",
    Icon: Code2,
    blurb: "Interfaces that feel fast and considered.",
    nodes: [
      { name: "React", note: "Component-driven UIs & state management", level: 5 },
      { name: "TypeScript", note: "Type-safe, scalable codebases", level: 4 },
      { name: "Next.js", note: "Full-stack React with SSR & file routing", level: 3 },
      { name: "Tailwind CSS", note: "Utility-first rapid styling", level: 5 },
      { name: "HTML / CSS", note: "Semantic, accessible fundamentals", level: 5 },
    ],
  },
  {
    title: "Backend",
    accent: "var(--lime)",
    Icon: Server,
    blurb: "APIs, auth, and business logic that hold up.",
    nodes: [
      { name: "Java", note: "OOP, system design & algorithms", level: 4 },
      { name: "Spring Boot", note: "Enterprise REST APIs & JWT auth", level: 4 },
      { name: "NestJS", note: "Modular Node.js backend framework", level: 3 },
      { name: "Node.js", note: "Event-driven server-side JS", level: 3 },
      { name: "C / C++", note: "Systems, embedded & graphics programming", level: 3 },
      { name: "Python", note: "Scripting, data & prototypes", level: 3 },
      { name: "PHP", note: "Server-side web development", level: 2 },
    ],
  },
  {
    title: "Databases",
    accent: "var(--violet)",
    Icon: Database,
    blurb: "Modeling data so it scales cleanly.",
    nodes: [
      { name: "MySQL", note: "Relational schema design & queries", level: 5 },
      { name: "PostgreSQL", note: "Advanced relational & JSONB support", level: 3 },
      { name: "MongoDB", note: "Flexible document modeling", level: 4 },
      { name: "Firebase / Firestore", note: "Auth, Firestore & Cloud Functions", level: 4 },
      { name: "MS SQL", note: "Relational data and queries", level: 2 },
    ],
  },
  {
    title: "DevOps & Tools",
    accent: "var(--amber)",
    Icon: Wrench,
    blurb: "Shipping and automating with confidence.",
    nodes: [
      { name: "Git & GitHub", note: "Version control & code review", level: 5 },
      { name: "Docker", note: "Containerisation & compose orchestration", level: 4 },
      { name: "Postman", note: "API testing & debugging", level: 4 },
      { name: "Maven", note: "Java project build & dependency management", level: 4 },
      { name: "Linux", note: "Shell scripting & system ops", level: 3 },
    ],
  },
  {
    title: "Design & Creative",
    accent: "var(--blue)",
    Icon: Palette,
    blurb: "Bridging engineering and visual craft.",
    nodes: [
      { name: "Figma", note: "UI/UX prototyping & design systems", level: 4 },
      { name: "Canva", note: "Brand assets & visual comms", level: 5 },
      { name: "C++ / OpenGL", note: "Real-time computer graphics", level: 3 },
    ],
  },
];

const STATS = [
  { value: "5", label: "Disciplines" },
  { value: "22+", label: "Technologies" },
  { value: "5", label: "Shipped projects" },
];

/* A single skill tile inside the detail panel. */
function SkillTile({ node, accent, index }: { node: Node; accent: string; index: number }) {
  const skill = SKILL_ICONS[node.name];
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      className="group rounded-2xl border bg-card/40 p-5 transition-all duration-300 hover:bg-card/70"
      style={{ borderColor: "rgba(255,255,255,0.08)" }}
    >
      <div className="mb-3 flex items-center gap-3">
        {skill ? (
          <span
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
            style={{ background: `${skill.color}18`, border: `1px solid ${skill.color}30` }}
          >
            <skill.Icon size={22} style={{ color: skill.color }} />
          </span>
        ) : (
          <span
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-mono text-[11px] font-bold"
            style={{ background: `${accent}18`, border: `1px solid ${accent}30`, color: accent }}
          >
            {node.name.slice(0, 2).toUpperCase()}
          </span>
        )}
        <span
          className="text-[15px] font-medium transition-colors duration-200 group-hover:[color:var(--tile-accent)]"
          style={{ ["--tile-accent" as string]: accent }}
        >
          {node.name}
        </span>
      </div>
      <p className="font-mono text-[11px] leading-relaxed text-muted-foreground">{node.note}</p>
    </motion.div>
  );
}

export function Journey() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [active, setActive] = useState(0);
  const current = CATEGORIES[active];

  return (
    <section id="journey" ref={ref} className="relative scroll-mt-28 overflow-hidden px-6 py-20 md:px-10 md:py-24">
      <div className="relative z-10 mx-auto max-w-[1400px]">
        {/* Header — centred */}
        <div className="mb-14 text-center">
          <p className="mb-5 font-mono text-[13px] tracking-[0.24em] text-muted-foreground">
            (03) - TECH STACK
          </p>
          <h2
            className="mx-auto font-display"
            style={{
              fontSize: "clamp(2.25rem, 5vw, 4.75rem)",
              fontWeight: 700,
              lineHeight: 0.98,
              letterSpacing: "-0.03em",
            }}
          >
            The tech I build with.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-muted-foreground">
            A working toolkit built across full-stack projects, DevOps, and design — each rated by how
            deep I actually go with it.
          </p>
        </div>

        {/* Stat strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-14 flex max-w-2xl items-center justify-center gap-4 sm:gap-10"
        >
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <p
                className="font-display"
                style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 800, color: "var(--lime)", lineHeight: 1 }}
              >
                {s.value}
              </p>
              <p className="mt-1.5 font-mono text-[10px] tracking-[0.16em] text-muted-foreground sm:text-[11px]">
                {s.label.toUpperCase()}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Interactive selector + detail panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="grid gap-6 lg:grid-cols-[300px_1fr]"
        >
          {/* Discipline selector */}
          <div className="flex gap-3 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
            {CATEGORIES.map((cat, i) => {
              const { Icon } = cat;
              const isActive = i === active;
              return (
                <button
                  key={cat.title}
                  onClick={() => setActive(i)}
                  type="button"
                  aria-label={cat.title}
                  aria-pressed={isActive}
                  aria-controls="skills-detail-panel"
                  className="group flex shrink-0 items-center gap-3 rounded-2xl border px-4 py-4 text-left transition-all duration-300 lg:shrink"
                  style={{
                    borderColor: isActive ? cat.accent : "rgba(255,255,255,0.08)",
                    background: isActive ? `${cat.accent}14` : "transparent",
                  }}
                >
                  <span
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-transform duration-300 group-hover:scale-110"
                    style={{
                      borderColor: cat.accent,
                      background: `${cat.accent}16`,
                    }}
                  >
                    <Icon size={20} style={{ color: cat.accent }} />
                  </span>
                  <span className="hidden lg:block">
                    <span
                      className="block font-display"
                      style={{
                        fontSize: "1.05rem",
                        fontWeight: 700,
                        letterSpacing: "-0.01em",
                        color: isActive ? cat.accent : "var(--foreground)",
                      }}
                    >
                      {cat.title}
                    </span>
                    <span className="font-mono text-[10px] tracking-[0.14em] text-muted-foreground">
                      {cat.nodes.length} SKILLS
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Detail panel */}
          <div
            id="skills-detail-panel"
            aria-live="polite"
            className="min-h-[420px] rounded-3xl border bg-card/20 p-7 backdrop-blur-sm md:p-9"
            style={{ borderColor: "rgba(255,255,255,0.08)", borderTop: `2px solid ${current.accent}` }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={current.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
              >
                <div className="mb-6 flex items-center justify-between gap-4">
                  <div>
                    <h3
                      className="font-display"
                      style={{ fontSize: "clamp(1.6rem,3vw,2.2rem)", fontWeight: 700, letterSpacing: "-0.02em" }}
                    >
                      {current.title}
                    </h3>
                    <p className="mt-1 text-[14px] text-muted-foreground">{current.blurb}</p>
                  </div>
                  <span
                    className="hidden shrink-0 rounded-full border px-3 py-1 font-mono text-[10px] tracking-[0.14em] sm:block"
                    style={{ borderColor: current.accent, color: current.accent }}
                  >
                    {current.nodes.length} SKILLS
                  </span>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {current.nodes.map((node, i) => (
                    <SkillTile key={node.name} node={node} accent={current.accent} index={i} />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Always learning note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mx-auto mt-8 max-w-2xl rounded-3xl border p-8 text-center"
          style={{
            borderColor: "rgba(255,255,255,0.08)",
            background: "radial-gradient(circle at 50% 0%, rgba(230,255,92,0.08), transparent 70%)",
          }}
        >
          <p className="font-mono text-[11px] tracking-[0.2em]" style={{ color: "var(--lime)" }}>
            ALWAYS LEARNING
          </p>
          <p className="mx-auto mt-4 max-w-xl text-[16px] leading-relaxed text-foreground/80">
            This stack keeps growing with every project. Right now I&apos;m going deeper on
            containerization, cloud deployment, and system design.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
