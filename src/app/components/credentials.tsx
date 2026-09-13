import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { useHover } from "./cursor";

const EDUCATION = [
  {
    school: "University of Moratuwa",
    degree: "B.Sc. (Hons) in Information Technology",
    period: "2024 - Present",
    c: "var(--lime)",
  },
  {
    school: "Poramadulla Central College",
    degree: "G.C.E. Advanced Level - Physical Science Stream",
    period: "2019 - 2022",
    note: "Z-Score: 1.6076",
    c: "var(--blue)",
  },
];

type Achievement = {
  title: string;
  placement: string;
  year: string;
  organizer: string;
  desc: string;
  icon: string;
  color: string;
};

const ACHIEVEMENTS: Achievement[] = [
  {
    title: "CodeRally 7.0",
    placement: "Finalist",
    year: "2026",
    organizer: "IEEE Computer Society Student Branch · Dept. of IT",
    desc: "24-hour national hackathon engineering high-impact tech solutions under intense competitive timeframes.",
    icon: "🏆",
    color: "var(--amber)",
  },
  {
    title: "Premio Formalita '25",
    placement: "Spirit of Service Award",
    year: "2025",
    organizer: "Rotaract Club — University of Moratuwa",
    desc: "Recognized for exceptional commitment, ethical leadership, and impactful humanitarian service.",
    icon: "🎖️",
    color: "var(--violet)",
  },
  {
    title: "Premio Formalita '25",
    placement: "Active Membership Award",
    year: "2025",
    organizer: "Rotaract Club — University of Moratuwa",
    desc: "Awarded for dedicated active contributions across community avenues throughout the year.",
    icon: "🌟",
    color: "var(--blue)",
  },
  {
    title: "Devthon 3.0",
    placement: "Semi-Finalist",
    year: "2026",
    organizer: "Leo Club — University of Moratuwa",
    desc: "National full-stack web development competition engineering scalable software architectures.",
    icon: "⚡",
    color: "var(--lime)",
  },
  {
    title: "Codemania Datathon",
    placement: "Semi-Finalist",
    year: "2026",
    organizer: "IEEE Student Branch — SLTC",
    desc: "Island-wide inter-university data science and algorithmic problem-solving datathon.",
    icon: "📊",
    color: "var(--blue)",
  },
  {
    title: "GenZipher 1.0",
    placement: "Top 30",
    year: "2026",
    organizer: "University of Colombo School of Computing (UCSC)",
    desc: "National Capture-the-Flag (CTF) cybersecurity challenge and rapid prototype hackathon.",
    icon: "🛡️",
    color: "var(--violet)",
  },
  {
    title: "Mora Lenz · FIT Moments",
    placement: "Best Performing Pillar Member",
    year: "2025",
    organizer: "Faculty of Information Technology Media",
    desc: "Celebrated for visual storytelling, creative direction, and campus photography documentation.",
    icon: "📸",
    color: "var(--amber)",
  },
];

const CERTS = [
  "Network Technician Career Path - Cisco Networking Academy",
  "Introduction to Agent Skills - Anthropic",
  "Getting Started with Docker - Simplilearn",
  "Web Development - SoloLearn",
];

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  return { ref, inView };
}

function SectionHeading({
  index,
  eyebrow,
  title,
}: {
  index: string;
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="mb-14 text-center">
      <p className="mb-5 font-mono text-[13px] tracking-[0.24em] text-muted-foreground">
        {index} - {eyebrow}
      </p>
      <h2
        className="mx-auto font-display"
        style={{
          fontSize: "clamp(2.2rem, 6vw, 5rem)",
          fontWeight: 700,
          lineHeight: 0.98,
          letterSpacing: "-0.03em",
        }}
      >
        {title}
      </h2>
    </div>
  );
}

/* ── Education (05) ─────────────────────────────────────────────────── */
function Education() {
  const { ref, inView } = useReveal();
  return (
    <section id="education" ref={ref} className="relative px-6 py-24 md:px-10">
      <div className="mx-auto max-w-[1400px]">
        <SectionHeading index="(05)" eyebrow="EDUCATION" title="Education." />
        <div className="grid gap-6 md:grid-cols-2">
          {EDUCATION.map((e, i) => (
            <motion.div
              key={e.school}
              {...useHover({ variant: "card" })}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.15 }}
              className="group rounded-2xl border bg-card/40 p-8 backdrop-blur-sm transition-all duration-300 hover:bg-card/70 hover:shadow-xl"
              style={{ 
                borderLeftColor: "var(--border)",
                borderRightColor: "var(--border)",
                borderBottomColor: "var(--border)",
                borderTopColor: e.c,
                borderTopWidth: "2px",
              }}
            >
              <span
                className="mb-4 inline-block h-2.5 w-2.5 rounded-full"
                style={{ background: e.c, boxShadow: `0 0 12px ${e.c}` }}
              />
              <h3 style={{ fontSize: "clamp(1.3rem,2.2vw,1.9rem)", fontWeight: 600 }}>{e.school}</h3>
              <p className="mt-2 text-[16px] text-foreground/75">{e.degree}</p>
              <p className="mt-2 font-mono text-[12px] tracking-[0.08em] text-muted-foreground">
                {e.period}
              </p>
              {e.note && (
                <p className="mt-2 font-mono text-[11px] tracking-[0.08em]" style={{ color: e.c }}>
                  {e.note}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Achievements (06): Creative Trophy & Hackathon Showcase ───────── */
function Achievements() {
  const { ref, inView } = useReveal();
  return (
    <section id="achievements" ref={ref} className="relative px-6 py-24 md:px-10">
      <div className="mx-auto max-w-[1400px]">
        <SectionHeading index="(06)" eyebrow="ACHIEVEMENTS" title="Achievements." />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ACHIEVEMENTS.map((a, i) => (
            <motion.div
              key={a.title + a.placement}
              {...useHover({ variant: "card" })}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative flex flex-col justify-between rounded-2xl border bg-card/40 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-card/70 hover:shadow-2xl"
              style={{
                borderLeftColor: "rgba(255,255,255,0.08)",
                borderRightColor: "rgba(255,255,255,0.08)",
                borderBottomColor: "rgba(255,255,255,0.08)",
                borderTopColor: a.color,
                borderTopWidth: "2px",
              }}
            >
              <div>
                {/* Header row: Icon & Status Badge */}
                <div className="mb-4 flex items-center justify-between">
                  <span
                    className="flex h-11 w-11 items-center justify-center rounded-xl text-xl transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: `${a.color}15`,
                      border: `1px solid ${a.color}35`,
                    }}
                  >
                    {a.icon}
                  </span>
                  <div className="flex items-center gap-2">
                    <span
                      className="rounded-full border px-2.5 py-0.5 font-mono text-[10px] font-semibold tracking-wider"
                      style={{ borderColor: a.color, color: a.color }}
                    >
                      {a.placement}
                    </span>
                    <span className="font-mono text-[11px] text-muted-foreground">
                      {a.year}
                    </span>
                  </div>
                </div>

                {/* Competition / Event Title */}
                <h3 className="text-[17px] font-bold tracking-tight text-foreground transition-colors group-hover:text-foreground">
                  {a.title}
                </h3>
                <p className="mt-1 font-mono text-[11px] text-muted-foreground/80">
                  {a.organizer}
                </p>

                {/* Narrative Description */}
                <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">
                  {a.desc}
                </p>
              </div>

              {/* Bottom decorative subtle indicator */}
              <div className="mt-4 flex items-center gap-1.5 border-t border-white/[0.06] pt-3 text-[11px] font-mono text-muted-foreground/60">
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: a.color }} />
                <span>Verified Recognition</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Certifications & Résumé (07) ───────────────────────────────────── */
function CertificationsAndResume() {
  const { ref, inView } = useReveal();
  return (
    <section id="credentials" ref={ref} className="relative px-6 py-24 md:px-10">
      <div className="mx-auto max-w-[1400px]">
        <SectionHeading index="(07)" eyebrow="CREDENTIALS" title="Certifications & Résumé." />

        {/* Certifications Pills */}
        <div className="flex flex-wrap justify-center gap-3">
          {CERTS.map((c, i) => (
            <motion.div
              key={c}
              {...useHover({ variant: "text" })}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="flex items-center gap-2.5 rounded-full border px-5 py-3 transition-colors hover:border-violet-500/50 hover:bg-violet-500/5"
              style={{ borderColor: "var(--border)" }}
            >
              <span style={{ color: "var(--violet)" }}>▹</span>
              <span className="text-[15px] text-foreground/85">{c}</span>
            </motion.div>
          ))}
        </div>

        {/* Bottom narrative */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mx-auto mt-12 max-w-2xl text-center text-[16px] leading-relaxed text-muted-foreground"
        >
          Continuous learning in full-stack architectures, systems administration, and cloud deployment.
          Download my complete CV for in-depth project history and references.
        </motion.p>

        {/* Résumé download CTA */}
        <motion.a
          href={`${import.meta.env.BASE_URL}Ashen_Randira_Resume.pdf`}
          download="Ashen_Randira_Resume.pdf"
          {...useHover({ variant: "button", label: "OPEN" })}
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mx-auto mt-8 flex w-fit items-center gap-3 rounded-full px-7 py-3.5 font-mono text-[13px] font-medium tracking-[0.12em] shadow-lg transition-transform duration-300 hover:scale-105"
          style={{ background: "var(--lime)", color: "#0b0c10" }}
        >
          Download full résumé <span>↓</span>
        </motion.a>
      </div>
    </section>
  );
}

export function Credentials() {
  return (
    <>
      <Education />
      <Achievements />
      <CertificationsAndResume />
    </>
  );
}

