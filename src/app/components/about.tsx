import { useEffect, useId, useRef, useState } from "react";
import { motion, AnimatePresence, useInView, useReducedMotion } from "motion/react";
import { 
  Terminal as TerminalIcon, 
  MapPin, 
  Sparkles, 
  Copy, 
  Check, 
  BookOpen 
} from "lucide-react";
import { useCursor } from "./cursor";
import profileImg from "../../imports/image.jpg";

const BIO =
  "A motivated undergraduate specializing in Full-Stack and Backend Development, with hands-on experience across React, Spring Boot, NestJS, and cloud-integrated platforms. Passionate about building scalable web applications and REST APIs, with a strong foundation in databases and system design. Proven ability to lead and collaborate through active roles in university clubs, hackathons, and community service. Committed to continuous learning and delivering practical, real-world software solutions.";

type Trait = { label: string; desc: string };
const TRAITS: Trait[] = [
  { label: "Detail-oriented", desc: "I sweat the small stuff — naming, edge cases, spacing." },
  { label: "Systems thinker", desc: "I see how pieces connect before I start building." },
  { label: "Curious by default", desc: "If I don't know something, I figure it out." },
  { label: "Community-driven", desc: "Led teams in Rotaract, Sasnaka & disaster response." },
  { label: "Problem solver", desc: "Top 30 in GenZipher, semi-finalist in Devthon & Codemania." },
];

const STATS = [
  { label: "University", value: "UoM '27" },
  { label: "Focus", value: "Full-Stack & Backend" },
  { label: "Location", value: "Colombo, LK" },
];

type TerminalTab = "whoami" | "stack" | "philosophy" | "now";
const TERMINAL_TABS: TerminalTab[] = ["whoami", "stack", "philosophy", "now"];

const TERMINAL_DATA: Record<TerminalTab, { file: string; lines: { text: string; color?: "lime" | "blue" | "amber" | "muted" | "fg"; gap?: boolean }[] }> = {
  whoami: {
    file: "ashen.config.ts",
    lines: [
      { text: "/** Ashen Randira — Developer Profile */", color: "muted" },
      { text: "export const developer = {", color: "fg" },
      { text: '  name: "Ashen Randira",', color: "lime" },
      { text: '  role: "Full-Stack & Backend Developer",', color: "blue" },
      { text: '  education: "B.Sc. (Hons) in IT @ Univ. of Moratuwa",', color: "blue" },
      { text: '  location: "Colombo, Sri Lanka",', color: "amber" },
      { text: '  status: "Open to High-Impact Opportunities",', color: "lime" },
      { text: '  passions: ["Distributed Systems", "Clean Architecture", "UI Polish"],', color: "blue" },
      { text: "};", color: "fg" },
    ],
  },
  stack: {
    file: "stack.env",
    lines: [
      { text: "# Production & Development Stack", color: "muted" },
      { text: "FRONTEND=React, Next.js, TypeScript, TailwindCSS, Motion", color: "lime" },
      { text: "BACKEND=Spring Boot, NestJS, Node.js, Express", color: "blue" },
      { text: "DATABASE=PostgreSQL, MySQL, MongoDB, Prisma", color: "amber" },
      { text: "INFRA=Docker, Git, CI/CD, Cloud Deployment", color: "fg" },
      { text: "TESTING_STANDARDS=Strict type safety, DRY architecture", color: "muted", gap: true },
    ],
  },
  philosophy: {
    file: "philosophy.md",
    lines: [
      { text: "# Engineering Tenets", color: "lime" },
      { text: "1. Clarity over cleverness. Maintainable code saves teams.", color: "fg" },
      { text: "2. Measure before optimizing. Understand bottlenecks first.", color: "blue" },
      { text: "3. UI is empathy. Micro-interactions make software feel human.", color: "amber" },
      { text: "4. Never stop debugging until root cause is crystal clear.", color: "muted", gap: true },
    ],
  },
  now: {
    file: "current_focus.sh",
    lines: [
      { text: "$ cat active_projects.log", color: "lime" },
      { text: "[ACTIVE] PulseDock: Self-hosted uptime & endpoint monitor", color: "lime" },
      { text: "[STUDY] Containerization patterns & Docker orchestration", color: "blue" },
      { text: "[COMMUNITY] Rotaract International Service initiatives", color: "amber" },
      { text: "[EDUCATION] Math coaching @ Sasnaka Sansada Foundation", color: "muted" },
    ],
  },
};

const BEYOND_PILLS = [
  "Team Leadership",
  "Event Coordination",
  "Public Speaking",
  "Community Building",
  "Technical Writing",
  "Photography",
  "Graphic Design",
  "Mathematics Tutoring",
  "Model United Nations",
];

function TraitChip({ trait, reduced }: { trait: Trait; reduced: boolean }) {
  const [hovered, setHovered] = useState(false);
  const { set, reset } = useCursor();
  const tooltipId = useId();

  return (
    <div className="relative">
      <button
        type="button"
        onMouseEnter={() => {
          setHovered(true);
          set({ variant: "button" });
        }}
        onMouseLeave={() => {
          setHovered(false);
          reset();
        }}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        aria-describedby={hovered ? tooltipId : undefined}
        className="rounded-full border px-4 py-2 transition-all duration-300 hover:scale-105"
        style={{
          borderColor: hovered ? "var(--lime)" : "rgba(255,255,255,0.1)",
          background: hovered ? "rgba(230,255,92,0.08)" : "rgba(255,255,255,0.02)",
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
          className="absolute bottom-full left-0 z-30 mb-2 w-56 rounded-xl border bg-card/95 p-3 shadow-2xl backdrop-blur-md"
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
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduced = useReducedMotion();
  const { set, reset } = useCursor();

  const [activeTermTab, setActiveTermTab] = useState<TerminalTab>("whoami");
  const [hasInteractedWithTerm, setHasInteractedWithTerm] = useState(false);
  const [copied, setCopied] = useState(false);

  /* 5-second automatic rotation for ashen@workspace until user clicks */
  useEffect(() => {
    if (hasInteractedWithTerm) return;
    const interval = setInterval(() => {
      setActiveTermTab((prev) => {
        const nextIdx = (TERMINAL_TABS.indexOf(prev) + 1) % TERMINAL_TABS.length;
        return TERMINAL_TABS[nextIdx];
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [hasInteractedWithTerm]);

  const handleSelectTermTab = (tab: TerminalTab) => {
    setHasInteractedWithTerm(true);
    setActiveTermTab(tab);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("randiraofficial@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  const STATEMENT = "I turn complicated ideas into clean, reliable experiences that people can actually use.";

  return (
    <section id="about" ref={ref} className="relative scroll-mt-28 px-6 py-20 md:px-10 md:py-28">
      {/* Subtle background ambient mesh */}
      <div 
        className="pointer-events-none absolute -top-40 right-1/4 h-[500px] w-[500px] rounded-full opacity-20 blur-[130px]"
        style={{ background: "radial-gradient(circle, var(--lime), transparent 70%)" }}
      />
      <div 
        className="pointer-events-none absolute bottom-10 left-10 h-[450px] w-[450px] rounded-full opacity-15 blur-[120px]"
        style={{ background: "radial-gradient(circle, var(--blue), transparent 70%)" }}
      />

      <div className="relative z-10 mx-auto max-w-[1400px]">
        {/* Section Header */}
        <div className="mb-14 md:mb-20">
          <div className="mb-3 flex items-center gap-3">
            <span 
              className="inline-block h-2 w-2 rounded-full" 
              style={{ background: "var(--lime)", boxShadow: "0 0 10px var(--lime)" }} 
            />
            <p className="font-mono text-[13px] tracking-[0.26em] text-muted-foreground">
              (02) — ABOUT ME
            </p>
          </div>

          <h2
            className="font-display max-w-4xl"
            style={{
              fontSize: "clamp(2.2rem, 5.5vw, 4.2rem)",
              fontWeight: 700,
              lineHeight: 1.04,
              letterSpacing: "-0.03em",
            }}
          >
            Engineering with intent.{" "}
            <span 
              className="relative inline-block"
              style={{ color: "var(--lime)" }}
            >
              Who is Ashen?
              <motion.span 
                className="absolute -bottom-1 left-0 h-[3px] w-full rounded-full"
                style={{ background: "var(--lime)", opacity: 0.6 }}
                initial={{ scaleX: 0 }}
                animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 0.9, delay: 0.4 }}
              />
            </span>
          </h2>

          {/* Animated Statement */}
          <p className="mt-6 max-w-3xl font-display text-[20px] font-normal leading-snug text-foreground/90 md:text-[25px]">
            {STATEMENT.split(" ").map((word, i) => (
              <span key={i} className="mr-[0.24ch] inline-block overflow-hidden">
                <motion.span
                  className="inline-block"
                  initial={{ y: "100%" }}
                  animate={inView ? { y: 0 } : {}}
                  transition={{
                    duration: 0.6,
                    delay: 0.15 + i * 0.03,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  style={["clean,", "reliable", "use."].includes(word) ? { color: "var(--lime)", fontWeight: 600 } : undefined}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </p>
        </div>

        {/* ── BENTO GRID ────────────────────────────────────────────── */}
        <div className="grid gap-6 lg:grid-cols-12">
          
          {/* Card 1: Identity & Profile Anchor (Col 1-5) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border bg-card/75 p-6 backdrop-blur-md transition-all duration-500 hover:border-[rgba(230,255,92,0.3)] lg:col-span-5 lg:p-8"
            style={{ borderColor: "rgba(255,255,255,0.08)" }}
          >
            {/* Top Identity Tag */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--lime)] opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--lime)]" />
                </span>
                <span className="font-mono text-[11px] font-medium tracking-wider text-foreground/90">
                  OPEN TO OPPORTUNITIES
                </span>
              </div>
            </div>

            {/* Profile Frame with Glow */}
            <div className="my-6 flex flex-col items-center sm:flex-row sm:items-center sm:gap-6">
              <div className="relative mb-4 h-32 w-32 shrink-0 overflow-hidden rounded-2xl border sm:mb-0 sm:h-36 sm:w-36 md:h-40 md:w-40"
                   style={{ borderColor: "rgba(230,255,92,0.3)", boxShadow: "0 0 35px -10px rgba(230,255,92,0.25)" }}>
                <img
                  src={profileImg}
                  alt="Ashen Randira"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>

              <div className="text-center sm:text-left">
                <h3 className="font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                  Ashen Randira
                </h3>
                <p className="mt-1 font-mono text-[13px] text-[var(--lime)]">
                  Full-Stack & Backend Engineer
                </p>
                
                <div className="mt-3 flex flex-col gap-1.5 font-mono text-[11px] text-muted-foreground">
                  <div className="flex items-center justify-center gap-1.5 sm:justify-start">
                    <MapPin className="h-3.5 w-3.5 text-[var(--blue)]" />
                    <span>Colombo, Sri Lanka</span>
                  </div>
                  <div className="flex items-center justify-center gap-1.5 sm:justify-start">
                    <BookOpen className="h-3.5 w-3.5 text-[var(--amber)]" />
                    <span>University of Moratuwa · IT &apos;27</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Quick Connect Action */}
            <div className="pt-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] text-muted-foreground">Let&apos;s build:</span>
                <span className="font-mono text-[12px] font-medium text-foreground">randiraofficial@gmail.com</span>
              </div>

              <button
                type="button"
                onClick={handleCopyEmail}
                onMouseEnter={() => set({ variant: "button" })}
                onMouseLeave={reset}
                className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono text-[11px] text-foreground transition-all duration-200 hover:border-[var(--lime)] hover:bg-[rgba(230,255,92,0.1)] hover:text-[var(--lime)]"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-[var(--lime)]" />
                    <span className="text-[var(--lime)]">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>Copy Email</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>

          {/* Card 2: Clean Bio & Narrative (Col 6-12) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col justify-between overflow-hidden rounded-3xl border bg-card/75 p-6 backdrop-blur-md transition-all duration-500 hover:border-white/20 lg:col-span-7 lg:p-8"
            style={{ borderColor: "rgba(255,255,255,0.08)" }}
          >
            <div>
              <p className="font-mono text-[12px] font-semibold tracking-wider text-[var(--lime)] uppercase">
                The Story Behind The Build
              </p>
              
              <p className="mt-4 text-[16px] leading-relaxed text-muted-foreground md:text-[17px]">
                {BIO}
              </p>

              {/* Trait Pills */}
              <div className="mt-6 flex flex-wrap gap-2">
                {TRAITS.map((trait) => (
                  <TraitChip key={trait.label} trait={trait} reduced={!!reduced} />
                ))}
              </div>

              {/* Stats row */}
              <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {STATS.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-2xl border border-white/5 bg-white/[0.02] p-4 transition-colors hover:border-white/15"
                  >
                    <p className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
                      {s.label}
                    </p>
                    <p className="mt-1 text-[14px] font-semibold text-foreground">
                      {s.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2 font-mono text-[11px] text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-[var(--lime)]" />
              <span>Full-Stack Development · System Design · Community Leadership</span>
            </div>
          </motion.div>

          {/* Card 3: Interactive Developer Terminal Deck (Col 1-12 full width) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-col overflow-hidden rounded-3xl border bg-[#0d0e14] transition-all duration-500 hover:border-white/20 lg:col-span-12"
            style={{ borderColor: "rgba(255,255,255,0.08)" }}
          >
            {/* Terminal Window Header */}
            <div className="flex flex-wrap items-center justify-between border-b border-white/10 bg-white/[0.02] px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-[#ff5470]/80" />
                <span className="h-3 w-3 rounded-full bg-[var(--amber)]/80" />
                <span className="h-3 w-3 rounded-full bg-[var(--lime)]/80" />
                <span className="ml-3 flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground">
                  <TerminalIcon className="h-3.5 w-3.5 text-[var(--lime)]" />
                  <span>ashen@workspace</span>
                </span>
              </div>

              {/* Terminal File Tabs */}
              <div className="mt-2 flex items-center gap-1 sm:mt-0">
                {TERMINAL_TABS.map((tabKey) => {
                  const isSelected = activeTermTab === tabKey;
                  return (
                    <button
                      key={tabKey}
                      type="button"
                      onClick={() => handleSelectTermTab(tabKey)}
                      onMouseEnter={() => set({ variant: "button" })}
                      onMouseLeave={reset}
                      className="rounded-md px-2.5 py-1 font-mono text-[11px] transition-all duration-200"
                      style={{
                        background: isSelected ? "rgba(255,255,255,0.08)" : "transparent",
                        color: isSelected ? "var(--lime)" : "var(--muted-foreground)",
                        border: `1px solid ${isSelected ? "rgba(230,255,92,0.3)" : "transparent"}`,
                      }}
                    >
                      {TERMINAL_DATA[tabKey].file}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Terminal Body */}
            <div className="flex-1 p-5 md:p-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTermTab}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-1.5"
                >
                  {TERMINAL_DATA[activeTermTab].lines.map((line, idx) => {
                    let colorCode = "var(--foreground)";
                    if (line.color === "lime") colorCode = "var(--lime)";
                    if (line.color === "blue") colorCode = "var(--blue)";
                    if (line.color === "amber") colorCode = "var(--amber)";
                    if (line.color === "muted") colorCode = "var(--muted-foreground)";

                    return (
                      <div
                        key={idx}
                        className="font-mono text-[13px] leading-relaxed"
                        style={{
                          color: colorCode,
                          marginTop: line.gap ? "12px" : undefined,
                        }}
                      >
                        {line.text}
                      </div>
                    );
                  })}

                  {/* Dynamic Blinking Input Prompt */}
                  <div className="flex items-center pt-3 font-mono text-[13px]">
                    <span style={{ color: "var(--lime)" }}>ashen:~$</span>
                    <motion.span
                      className="ml-2 inline-block h-4 w-2 rounded-xs"
                      style={{ background: "var(--lime)" }}
                      animate={reduced ? {} : { opacity: [1, 0, 1] }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Terminal Footer Bar */}
            <div className="border-t border-white/5 bg-white/[0.01] px-5 py-2.5 flex items-center justify-between font-mono text-[11px] text-muted-foreground">
              <span>UTF-8 · TypeScript/Bash · Active Shell</span>
              <span className="text-[var(--lime)]">
                {hasInteractedWithTerm ? "Manual Control" : "Auto-cycling (5s)"}
              </span>
            </div>
          </motion.div>

          {/* Card 4: Beyond the Terminal (Col 1-12) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex flex-col md:flex-row md:items-center justify-between gap-6 rounded-3xl border bg-card/50 p-6 backdrop-blur-md transition-all duration-500 hover:border-white/20 lg:col-span-12 lg:p-8"
            style={{ borderColor: "rgba(255,255,255,0.08)" }}
          >
            <div className="max-w-md">
              <span className="font-mono text-[11px] font-semibold tracking-wider text-[var(--amber)] uppercase">
                Beyond the Terminal
              </span>
              <h4 className="mt-1 font-display text-xl font-bold tracking-tight text-foreground">
                Life, Community & Creative Pursuits
              </h4>
              <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
                Software is richer when informed by real-world human dynamics. Outside engineering, I coordinate community initiatives, teach, capture moments, and craft designs.
              </p>
            </div>

            <div className="flex flex-1 flex-wrap gap-2.5 md:justify-end">
              {BEYOND_PILLS.map((pill, i) => (
                <span
                  key={i}
                  onMouseEnter={() => set({ variant: "button" })}
                  onMouseLeave={reset}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 font-mono text-[12px] tracking-wide text-foreground/85 transition-all duration-300 hover:scale-105 hover:border-[var(--lime)] hover:bg-[rgba(230,255,92,0.08)] hover:text-[var(--lime)]"
                >
                  {pill}
                </span>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

