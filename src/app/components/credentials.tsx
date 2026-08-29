import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { useHover } from "./cursor";

const EDUCATION = [
  {
    school: "University of Moratuwa",
    degree: "B.Sc. (Hons) in Information Technology",
    period: "2024 — 2027",
    note: "CGPA: 3.58 / 4.00",
    c: "var(--lime)",
  },
  {
    school: "Poramadulla Central College",
    degree: "G.C.E. Advanced Level — Physical Science Stream",
    period: "2019 — 2022",
    note: "Z-Score: 1.6076",
    c: "var(--blue)",
  },
];

const ACHIEVEMENTS = [
  "Spirit of Service Award — Premio Formalita '25, Rotaract Club UoM",
  "Active Membership Award — Premio Formalita '25, Rotaract Club UoM",
  "Semi-Finalists — Devthon 3.0, 2026 (National web dev competition, Leo Club UoM)",
  "Semi-Finalists — Codemania, 2026 (Island-wide inter-university datathon, IEEE SLTC)",
  "Top 30 — GenZipher 1.0, 2026 (CTF & Hackathon, UCSC)",
  "Best Performing Photography Pillar Member — FIT Moments · Mora Lenz",
];

const CERTS = [
  "Network Technician Career Path — Cisco Networking Academy",
  "Introduction to Agent Skills — Anthropic",
  "Getting Started with Docker — Simplilearn",
  "Web Development — SoloLearn",
];

const VOLUNTEER = [
  "Co-Director, International Service Avenue — Rotaract Club UoM (2025)",
  "Co-Chairperson, SLRMUN '25 — Rotaract Club UoM",
  "Co-Chairperson, UN Days '24 — Rotaract Club UoM",
  "Social Media Admin — Sasnaka Sansada Foundation, Profiling & Corporate Affairs (2025–Present)",
  "Project Coordinator & Mathematics Teacher — Sasnaka Sansada Foundation (2023–Present)",
  "Design Committee — FINNC '25, IEEE IES Student Branch Chapter UoM (2025)",
  "Call Centre & Data Entry Volunteer — Disaster Management Centre Sri Lanka, Cyclone Ditwah (2025)",
  "Senior Prefect — Poramadulla Central College (2019–2021)",
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
        {index} — {eyebrow}
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

/* ── Education ─────────────────────────────────────────────────────── */
function Education() {
  const { ref, inView } = useReveal();
  return (
    <section ref={ref} className="relative px-6 py-24 md:px-10">
      <div className="mx-auto max-w-[1400px]">
        <SectionHeading index="(05)" eyebrow="EDUCATION" title="Where I learn." />
        <div className="grid gap-6 md:grid-cols-2">
          {EDUCATION.map((e, i) => (
            <motion.div
              key={e.school}
              {...useHover({ variant: "text" })}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-2xl border bg-card/40 p-8"
              style={{ borderColor: "var(--border)", borderTop: `2px solid ${e.c}` }}
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

/* ── Achievements ──────────────────────────────────────────────────── */
function Achievements() {
  const { ref, inView } = useReveal();
  return (
    <section ref={ref} className="relative px-6 py-24 md:px-10">
      <div className="mx-auto max-w-[1400px]">
        <SectionHeading index="(06)" eyebrow="ACHIEVEMENTS" title="Achievements." />
        <div className="grid gap-4 sm:grid-cols-2">
          {ACHIEVEMENTS.map((a, i) => (
            <motion.div
              key={a}
              {...useHover({ variant: "text" })}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex items-start gap-3 rounded-xl border bg-card/40 p-6"
              style={{ borderColor: "var(--border)" }}
            >
              <span className="text-lg" style={{ color: "var(--amber)" }}>✦</span>
              <p className="text-[15px] leading-snug text-foreground/85">{a}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Certifications ────────────────────────────────────────────────── */
function Certifications() {
  const { ref, inView } = useReveal();
  return (
    <section ref={ref} className="relative px-6 py-24 md:px-10">
      <div className="mx-auto max-w-[1400px]">
        <SectionHeading index="(07)" eyebrow="CERTIFICATIONS" title="Certifications." />
        <div className="flex flex-wrap justify-center gap-3">
          {CERTS.map((c, i) => (
            <motion.div
              key={c}
              {...useHover({ variant: "text" })}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="flex items-center gap-2.5 rounded-full border px-5 py-3"
              style={{ borderColor: "var(--border)" }}
            >
              <span style={{ color: "var(--violet)" }}>▹</span>
              <span className="text-[15px] text-foreground/85">{c}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Volunteering ──────────────────────────────────────────────────── */
function Volunteering() {
  const { ref, inView } = useReveal();
  return (
    <section ref={ref} className="relative px-6 py-24 md:px-10">
      <div className="mx-auto max-w-[1400px]">
        <SectionHeading index="(08)" eyebrow="VOLUNTEERING & SERVICE" title="Giving back." />
        <div className="grid gap-4 md:grid-cols-2">
          {VOLUNTEER.map((v, i) => (
            <motion.div
              key={v}
              {...useHover({ variant: "text" })}
              initial={{ opacity: 0, x: -16 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex items-center gap-3 rounded-xl border bg-card/40 p-6"
              style={{ borderColor: "var(--border)" }}
            >
              <span
                className="h-2 w-2 shrink-0 rounded-full"
                style={{ background: "var(--blue)", boxShadow: "0 0 10px var(--blue)" }}
              />
              <p className="text-[15px] text-foreground/85">{v}</p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mx-auto mt-10 max-w-2xl text-center text-[16px] leading-relaxed text-muted-foreground"
        >
          Three+ years contributing to community and university initiatives — from coordinating
          educational outreach to chairing model UN conferences and documenting campus life
          through photography.
        </motion.p>

        {/* Résumé download */}
        <motion.a
          href={`${import.meta.env.BASE_URL}Ashen_Randira_Resume.pdf`}
          download="Ashen_Randira_Resume.pdf"
          {...useHover({ variant: "button", label: "OPEN" })}
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mx-auto mt-10 flex w-fit items-center gap-3 rounded-full px-6 py-3.5 font-mono text-[13px] tracking-[0.12em] transition-transform duration-300 hover:scale-105"
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
      <Certifications />
      <Volunteering />
    </>
  );
}
