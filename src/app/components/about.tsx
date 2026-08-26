import { useId, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useCursor } from "./cursor";
import profileImg from "../../imports/image.png";

const BIO =
  "I'm Ashen — a software engineering undergraduate at the University of Moratuwa, Sri Lanka. I build full-stack applications with a focus on backend systems, developer tooling, and interfaces that feel considered. When I'm not coding, I'm photographing moments, designing graphics, or leading community initiatives through Rotaract.";

type Trait = { label: string; desc: string };
const TRAITS: Trait[] = [
  { label: "Detail-oriented", desc: "I sweat the small stuff — naming, edge cases, spacing." },
  { label: "Systems thinker", desc: "I see how pieces connect before I start building." },
  { label: "Curious by default", desc: "If I don't know something, I figure it out." },
  { label: "Community-driven", desc: "Building things is better when done with others." },
  { label: "Problem solver", desc: "I break hard problems into small, solvable pieces." },
];

const BEYOND = [
  "Team leadership",
  "Event coordination",
  "Public speaking",
  "Community building",
  "Technical writing",
  "Photography",
  "Graphic design",
];

const CURRENTLY = [
  { text: "Building full-stack applications", c: "var(--lime)" },
  { text: "Exploring DevOps & containerization", c: "var(--blue)" },
  { text: "Leading Rotaract international service", c: "var(--violet)" },
  { text: "Experimenting with computer graphics", c: "var(--amber)" },
];

const TERMINAL = [
  { t: "$ whoami", color: "lime" },
  { t: "  Ashen Randira", color: "fg" },
  { t: "$ cat profile.json", color: "lime", gap: true },
  { t: "  {", color: "muted" },
  { t: '    "role"     : "SE Undergraduate",', color: "blue" },
  { t: '    "uni"      : "University of Moratuwa",', color: "blue" },
  { t: '    "location" : "Sri Lanka \u{1F1F1}\u{1F1F0}",', color: "blue" },
  { t: '    "status"   : "open to opportunities"', color: "blue" },
  { t: "  }", color: "muted" },
  { t: "$ ls interests/", color: "lime", gap: true },
  { t: "  photography/ design/ rotaract/ opensrc/", color: "muted" },
];

const STATS = [
  { label: "University", value: "UoM '27" },
  { label: "Location", value: "Sri Lanka" },
  { label: "Focus", value: "Full-Stack" },
  { label: "Also into", value: "Photography" },
];

function termColor(c: string) {
  if (c === "lime") return "var(--lime)";
  if (c === "blue") return "var(--blue)";
  if (c === "fg") return "var(--foreground)";
  return "var(--muted-foreground)";
}

/* Trait button as its own component so hooks are called at component level */
function TraitChip({
  trait,
  reduced,
}: {
  trait: Trait;
  reduced: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const { set, reset } = useCursor();
  const tooltipId = useId();

  const showTooltip = () => {
    setHovered(true);
    set({ variant: "button" });
  };

  const hideTooltip = () => {
    setHovered(false);
    reset();
  };

  return (
    <div className="relative">
      <button
        type="button"
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onFocus={showTooltip}
        onBlur={hideTooltip}
        aria-describedby={hovered ? tooltipId : undefined}
        className="rounded-full border px-4 py-2 transition-colors duration-300"
        style={{
          borderColor: hovered ? "var(--lime)" : "var(--border)",
          color: hovered ? "var(--lime)" : "var(--foreground)",
        }}
      >
        <span className="font-mono text-[11px] tracking-[0.06em]">{trait.label}</span>
      </button>

      {hovered && (
        <motion.div
          id={tooltipId}
          role="tooltip"
          initial={reduced ? false : { opacity: 0, y: 6, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="absolute bottom-full left-0 z-30 mb-2 w-52 rounded-lg border bg-card px-3 py-2"
          style={{ borderColor: "var(--lime)" }}
        >
          <p className="font-mono text-[11px] leading-relaxed text-muted-foreground">
            {trait.desc}
          </p>
        </motion.div>
      )}
    </div>
  );
}

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const reduced = useReducedMotion();

  const STATEMENT =
    "I enjoy turning complicated ideas into experiences people can actually use.";

  return (
    <section id="about" ref={ref} className="relative scroll-mt-28 px-6 py-20 md:px-10 md:py-24">
      <div className="mx-auto max-w-[1400px]">
        <p className="mb-4 font-mono text-[13px] tracking-[0.24em] text-muted-foreground">
          (02) — ABOUT ME
        </p>
        <h2
          className="mb-14 font-display"
          style={{
            fontSize: "clamp(2rem, 5vw, 3.6rem)",
            fontWeight: 700,
            lineHeight: 1,
            letterSpacing: "-0.03em",
          }}
        >
          Who is <span style={{ color: "var(--lime)" }}>Ashen</span>?
        </h2>

        <div className="grid gap-16 lg:grid-cols-[1fr_380px] xl:gap-28">
          {/* ── Left column ────────────────────────────────────────── */}
          <div>
            {/* Statement with word-reveal */}
            <h2
              className="font-display"
              style={{
                fontSize: "clamp(2rem,5vw,4.2rem)",
                fontWeight: 700,
                lineHeight: 1.06,
                letterSpacing: "-0.03em",
              }}
            >
              {STATEMENT.split(" ").map((word, i) => (
                <span key={i} className="mr-[0.26ch] inline-block overflow-hidden">
                  <motion.span
                    className="inline-block"
                    initial={{ y: "110%" }}
                    animate={inView ? { y: 0 } : {}}
                    transition={{
                      duration: 0.7,
                      delay: i * 0.04,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    style={
                      ["experiences", "use."].includes(word)
                        ? { color: "var(--lime)" }
                        : undefined
                    }
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </h2>

            {/* Bio paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.65 }}
              className="mt-8 max-w-xl text-[17px] leading-relaxed text-muted-foreground"
            >
              {BIO}
            </motion.p>

            {/* Trait chips */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="mt-10 flex flex-wrap gap-2"
            >
              {TRAITS.map((trait) => (
                <TraitChip key={trait.label} trait={trait} reduced={!!reduced} />
              ))}
            </motion.div>

            {/* Currently */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="mt-12"
            >
              <p className="mb-5 font-mono text-[13px] tracking-[0.2em] text-muted-foreground">
                — CURRENTLY
              </p>
              <div className="space-y-4">
                {CURRENTLY.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 1.2 + i * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <span
                      className="h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{
                        background: item.c,
                        boxShadow: `0 0 8px ${item.c}`,
                      }}
                    />
                    <span className="text-[17px] text-foreground/90">{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Beyond the tech stack */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.3 }}
              className="mt-12"
            >
              <p className="mb-5 font-mono text-[13px] tracking-[0.2em] text-muted-foreground">
                — BEYOND THE TECH STACK
              </p>
              <p className="mb-5 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
                Tech is only half of it — I also lead teams, run community events, and tell stories
                through photography and design.
              </p>
              <div className="flex flex-wrap gap-2.5">
                {BEYOND.map((skill, i) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: 1.4 + i * 0.06 }}
                    className="rounded-full border px-4 py-2 font-mono text-[12px] tracking-[0.06em] text-foreground/75 transition-colors duration-300 hover:text-foreground"
                    style={{ borderColor: "var(--border)" }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── Right column: Photo + Terminal + stats ──────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="self-start"
          >
            {/* Profile photo */}
            <div
              className="mb-5 overflow-hidden rounded-2xl border"
              style={{ borderColor: "rgba(255,255,255,0.1)", aspectRatio: "4/3" }}
            >
              <img
                src={profileImg}
                alt="Ashen Randira"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>

            {/* Terminal card */}
            <div
              className="overflow-hidden rounded-xl border bg-card/60 backdrop-blur-sm"
              style={{ borderColor: "rgba(255,255,255,0.1)" }}
            >
              {/* Window chrome */}
              <div
                className="flex items-center gap-1.5 border-b px-4 py-3"
                style={{ borderColor: "rgba(255,255,255,0.07)" }}
              >
                <span className="h-3 w-3 rounded-full" style={{ background: "#ff5470" }} />
                <span className="h-3 w-3 rounded-full" style={{ background: "var(--amber)" }} />
                <span className="h-3 w-3 rounded-full" style={{ background: "var(--lime)" }} />
                <span className="ml-4 font-mono text-[11px] text-muted-foreground">
                  ashen@portfolio:~
                </span>
              </div>

              {/* Terminal lines */}
              <div className="space-y-0.5 p-5 pb-6">
                {TERMINAL.map((line, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.3, delay: 0.75 + i * 0.09 }}
                    className="font-mono text-[12px] leading-relaxed"
                    style={{
                      color: termColor(line.color),
                      marginTop: line.gap ? "10px" : undefined,
                    }}
                  >
                    {line.t}
                  </motion.p>
                ))}

                {/* Blinking cursor */}
                <div className="flex items-center pt-3">
                  <span
                    className="font-mono text-[12px]"
                    style={{ color: "var(--lime)" }}
                  >
                    ${" "}
                  </span>
                  <motion.span
                    className="ml-1 inline-block h-4 w-2"
                    style={{ background: "var(--lime)" }}
                    animate={reduced ? {} : { opacity: [1, 0, 1] }}
                    transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
                  />
                </div>
              </div>
            </div>

            {/* Stats grid */}
            <div className="mt-5 grid grid-cols-2 gap-3">
              {STATS.map((s) => (
                <div
                  key={s.label}
                  className="rounded-lg border p-3"
                  style={{ borderColor: "var(--border)" }}
                >
                  <p className="font-mono text-[10px] tracking-widest text-muted-foreground">
                    {s.label.toUpperCase()}
                  </p>
                  <p className="mt-0.5 text-[13px] font-medium text-foreground">{s.value}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
