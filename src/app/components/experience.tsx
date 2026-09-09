import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

type Role = {
  org: string;
  title: string;
  period: string;
  note?: string;
  c: string;
  tag: string;
};

const ROLES: Role[] = [
  {
    org: "Rotaract Club - University of Moratuwa",
    title: "Co-Director, International Service Avenue",
    period: "2025",
    note: "Led initiatives connecting the club with global community and humanitarian causes.",
    c: "var(--violet)",
    tag: "LEADERSHIP",
  },
  {
    org: "Rotaract Club — University of Moratuwa",
    title: "Co-Chairperson, SLRMUN '25",
    period: "2025",
    note: "Co-led a Model United Nations conference, overseeing logistics and delegate engagement.",
    c: "var(--violet)",
    tag: "LEADERSHIP",
  },
  {
    org: "Rotaract Club — University of Moratuwa",
    title: "Co-Chairperson, UN Days '24",
    period: "2024",
    note: "Co-organized events promoting awareness of the UN Sustainable Development Goals.",
    c: "var(--violet)",
    tag: "LEADERSHIP",
  },
  {
    org: "Sasnaka Sansada Foundation",
    title: "Social Media (LinkedIn) Administrator - Profiling & Corporate Affairs",
    period: "2025 - Present",
    c: "var(--lime)",
    tag: "LEADERSHIP",
  },
  {
    org: "Sasnaka Sansada Foundation",
    title: "Project Coordinator & Mathematics Teacher",
    period: "2023 - Present",
    c: "var(--lime)",
    tag: "VOLUNTEER",
  },
  {
    org: "IEEE IES Student Branch — UoM",
    title: "Design Committee Member, FINNC '25",
    period: "2025",
    c: "var(--blue)",
    tag: "COMMITTEE",
  },
  {
    org: "Disaster Management Centre Sri Lanka",
    title: "Call Centre & Data Entry Volunteer",
    period: "2025",
    note: "Handled emergency calls from survivors during Cyclone Ditwah relief and entered data to coordinate the response.",
    c: "var(--amber)",
    tag: "VOLUNTEER",
  },
  {
    org: "People's Bank — Rikillagaskada Branch",
    title: "Banking Trainee Intern",
    period: "2023",
    note: "Assisted with day-to-day banking operations, customer service, and administrative tasks.",
    c: "var(--blue)",
    tag: "INTERNSHIP",
  },
  {
    org: "Poramadulla Central College",
    title: "Senior Prefect",
    period: "2019 - 2021",
    c: "var(--amber)",
    tag: "LEADERSHIP",
  },
];

export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const reduced = useReducedMotion();

  return (
    <section id="experience" ref={ref} className="relative scroll-mt-28 px-6 py-20 md:px-10 md:py-24">
      <div className="mx-auto max-w-[1100px]">
        {/* Centred header */}
        <div className="mb-24 text-center">
          <p className="mb-5 font-mono text-[13px] tracking-[0.24em] text-muted-foreground">
            (04) - THE LEADERSHIP TRAIL
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
            Beyond the code.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-muted-foreground">
            A trail of the roles, communities, and teams I&apos;ve helped lead and grow.
          </p>
        </div>

        {/* Centred timeline */}
        <div className="relative">
          {/* static vertical trail line */}
          <div
            className="absolute bottom-0 left-4 top-0 w-px md:left-1/2 md:-translate-x-1/2"
            style={{ background: "linear-gradient(to top, rgba(77,159,255,0.35), rgba(108,92,255,0.35), rgba(230,255,92,0.35))" }}
          />

          {/* traveling glow that runs up the static trail on a loop */}
          {!reduced && (
            <div className="pointer-events-none absolute bottom-0 left-4 top-0 md:left-1/2 md:-translate-x-1/2">
              <motion.div
                className="absolute -left-[6px] h-28 w-3 rounded-full"
                style={{
                  background:
                    "linear-gradient(to top, transparent, var(--lime), rgba(230,255,92,0.2), transparent)",
                  filter: "blur(2px)",
                }}
                initial={{ top: "100%" }}
                animate={{ top: ["105%", "-20%"] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "linear" }}
              />
            </div>
          )}

          <div className="flex flex-col gap-14 md:gap-20">
            {ROLES.map((r, i) => {
              const left = i % 2 === 0;
              return (
                <motion.div
                  key={r.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.14, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative md:grid md:grid-cols-2 md:items-center md:gap-0"
                >
                  {/* node on the line */}
                  <span
                    className="absolute left-4 top-1 z-10 h-3.5 w-3.5 -translate-x-1/2 rounded-full transition-transform duration-300 group-hover:scale-150 md:left-1/2 md:top-1/2 md:-translate-y-1/2"
                    style={{ background: r.c, boxShadow: `0 0 16px ${r.c}` }}
                  />

                  {/* card */}
                  <div
                    className={
                      left
                        ? "ml-10 md:col-start-1 md:mr-12 md:ml-0 md:text-right"
                        : "ml-10 md:col-start-2 md:ml-12"
                    }
                  >
                    <div
                      className="rounded-2xl border bg-card/40 p-6 backdrop-blur-sm transition-colors duration-300"
                      style={{ borderColor: "rgba(255,255,255,0.08)", borderTop: `2px solid ${r.c}` }}
                    >
                      <div className={`mb-2 flex items-center gap-3 ${left ? "md:justify-end" : ""}`}>
                        <span
                          className="inline-block rounded-full border px-2.5 py-0.5 font-mono text-[9px] tracking-[0.12em]"
                          style={{ borderColor: r.c, color: r.c }}
                        >
                          {r.tag}
                        </span>
                        <span className="font-mono text-[11px] tracking-[0.08em] text-muted-foreground">
                          {r.period}
                        </span>
                      </div>
                      <h3 style={{ fontSize: "clamp(1.25rem,2.4vw,1.65rem)", fontWeight: 600, letterSpacing: "-0.01em" }}>
                        {r.title}
                      </h3>
                      <p className="mt-1.5 text-[15px] text-foreground/75">{r.org}</p>
                      {r.note && (
                        <p className="mt-2.5 text-[14px] leading-relaxed text-muted-foreground">
                          {r.note}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
