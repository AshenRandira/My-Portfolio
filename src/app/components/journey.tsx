import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import { Code2, Server, Database, Wrench, Palette } from "lucide-react";

type Node = { name: string; note: string; level: number };
type Category = {
  title: string;
  accent: string;
  Icon: typeof Code2;
  blurb: string;
  nodes: Node[];
};

/* Skills grouped by discipline, each with a proficiency level (1–5). */
const CATEGORIES: Category[] = [
  {
    title: "Frontend",
    accent: "var(--blue)",
    Icon: Code2,
    blurb: "Interfaces that feel fast and considered.",
    nodes: [
      { name: "React", note: "Component-driven UIs & state management", level: 5 },
      { name: "TypeScript", note: "Type-safe, scalable codebases", level: 4 },
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
      { name: "Spring Boot", note: "Enterprise REST APIs & auth", level: 4 },
      { name: "Node.js", note: "Event-driven server-side JS", level: 4 },
      { name: "Express.js", note: "Minimal routing & middleware", level: 4 },
      { name: "Python", note: "Scripting, data & prototypes", level: 3 },
    ],
  },
  {
    title: "Databases",
    accent: "var(--violet)",
    Icon: Database,
    blurb: "Modeling data so it scales cleanly.",
    nodes: [
      { name: "MongoDB", note: "Flexible document modeling", level: 4 },
      { name: "MySQL", note: "Relational schema design & queries", level: 4 },
      { name: "Firebase", note: "Auth, Firestore & hosting", level: 3 },
    ],
  },
  {
    title: "DevOps & Tools",
    accent: "var(--amber)",
    Icon: Wrench,
    blurb: "Shipping and automating with confidence.",
    nodes: [
      { name: "Docker", note: "Containerisation & orchestration", level: 4 },
      { name: "Git & GitHub", note: "Version control & code review", level: 5 },
      { name: "CI/CD", note: "Automated build & deploy pipelines", level: 3 },
      { name: "Linux", note: "Shell scripting & system ops", level: 4 },
      { name: "Postman", note: "API testing & debugging", level: 4 },
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
  { value: "20+", label: "Technologies" },
  { value: "6", label: "Shipped projects" },
];

/* A single skill tile inside the detail panel. */
function SkillTile({ node, accent, index }: { node: Node; accent: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      className="group rounded-2xl border bg-card/40 p-5 transition-colors duration-300"
      style={{ borderColor: "rgba(255,255,255,0.08)" }}
    >
      <div className="mb-2 flex items-center justify-between gap-3">
        <span
          className="text-[16px] transition-colors duration-200 group-hover:[color:var(--tile-accent)]"
          style={{ ["--tile-accent" as string]: accent }}
        >
          {node.name}
        </span>
        <span className="flex shrink-0 gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: i < node.level ? accent : "rgba(255,255,255,0.14)" }}
            />
          ))}
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
            (03) — TECH STACK
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
