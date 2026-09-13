import { useState, useRef } from "react";
import { motion, useInView, useReducedMotion, AnimatePresence } from "motion/react";
import { FiChevronDown, FiInfo, FiAward } from "react-icons/fi";

export type Role = {
  org: string;
  title: string;
  shortTitle?: string;
  period: string;
  note?: string;
  isLeadership: boolean;
  tag: string;
};

/* ── Cohesive 2-Tone Color System (No confusing mixed colors) ────────── */
const COLOR_LEADERSHIP = "#f59e0b"; // Warm Executive Amber / Gold
const COLOR_SERVICE = "#38bdf8";    // Crisp Ice Cyan / Sky Blue

/* Order: Recent / Present (2025) on the Left ──→ Foundation / Prefect (2019) on the Right */
const ROLES: Role[] = [
  {
    org: "Rotaract Club - University of Moratuwa",
    title: "Co-Director, International Service Avenue",
    shortTitle: "Co-Director, Int. Service",
    period: "2025",
    note: "Led initiatives connecting the club with global community and humanitarian causes.",
    isLeadership: true,
    tag: "LEADERSHIP",
  },
  {
    org: "Rotaract Club — University of Moratuwa",
    title: "Co-Chairperson, SLRMUN '25",
    shortTitle: "Co-Chair, SLRMUN '25",
    period: "2025",
    note: "Co-led a Model United Nations conference, overseeing logistics and delegate engagement.",
    isLeadership: true,
    tag: "LEADERSHIP",
  },
  {
    org: "Rotaract Club — University of Moratuwa",
    title: "Co-Chairperson, UN Days '24",
    shortTitle: "Co-Chair, UN Days '24",
    period: "2024",
    note: "Co-organized events promoting awareness of the UN Sustainable Development Goals.",
    isLeadership: true,
    tag: "LEADERSHIP",
  },
  {
    org: "Sasnaka Sansada Foundation",
    title: "Social Media (LinkedIn) Administrator",
    shortTitle: "Social Media Admin",
    period: "2025 - Present",
    note: "Managing digital branding, corporate communications, and executive profiling across LinkedIn.",
    isLeadership: true,
    tag: "LEADERSHIP",
  },
  {
    org: "Sasnaka Sansada Foundation",
    title: "Project Coordinator & Mathematics Teacher",
    shortTitle: "Coordinator & Teacher",
    period: "2023 - Present",
    note: "Leading education development projects and conducting mathematics sessions for underprivileged youth.",
    isLeadership: false,
    tag: "VOLUNTEERING",
  },
  {
    org: "IEEE IES Student Branch — UoM",
    title: "Design Committee Member, FINNC '25",
    shortTitle: "Design Committee, FINNC",
    period: "2025",
    note: "Crafted visual branding, media materials, and design assets for the national student conference.",
    isLeadership: false,
    tag: "COMMITTEE",
  },
  {
    org: "Disaster Management Centre Sri Lanka",
    title: "Call Centre & Data Entry Volunteer",
    shortTitle: "Relief Volunteer",
    period: "2025",
    note: "Handled emergency calls from survivors during Cyclone Ditwah relief and entered data to coordinate the response.",
    isLeadership: false,
    tag: "RELIEF RESPONSE",
  },
  {
    org: "People's Bank — Rikillagaskada Branch",
    title: "Banking Trainee Intern",
    shortTitle: "Banking Intern",
    period: "2023",
    note: "Assisted with day-to-day banking operations, customer service, and administrative tasks.",
    isLeadership: false,
    tag: "INTERNSHIP",
  },
  {
    org: "Poramadulla Central College",
    title: "Senior Prefect",
    shortTitle: "Senior Prefect",
    period: "2019 - 2021",
    note: "Spearheaded student council initiatives, school discipline, and major inter-school assembly events.",
    isLeadership: true,
    tag: "LEADERSHIP",
  },
];

/* Points for the 1500 x 480 widescreen coordinate space */
const SVG_POINTS = [
  { x: 70, y: 180, isTop: true },
  { x: 240, y: 300, isTop: false },
  { x: 410, y: 180, isTop: true },
  { x: 580, y: 300, isTop: false },
  { x: 750, y: 180, isTop: true },
  { x: 920, y: 300, isTop: false },
  { x: 1090, y: 180, isTop: true },
  { x: 1260, y: 300, isTop: false },
  { x: 1430, y: 180, isTop: true },
];

/* Continuous smooth sinusoidal path across 1500px width */
const WAVE_PATH = `
  M 15 240
  C 42.5 240, 42.5 180, 70 180
  C 155 180, 155 300, 240 300
  C 325 300, 325 180, 410 180
  C 495 180, 495 300, 580 300
  C 665 300, 665 180, 750 180
  C 835 180, 835 300, 920 300
  C 1005 300, 1005 180, 1090 180
  C 1175 180, 1175 300, 1260 300
  C 1345 300, 1345 180, 1430 180
  C 1457.5 180, 1457.5 240, 1485 240
`;

/* Reversed wave path for light pulses traveling from Right (2019) to Left (2025) */
const WAVE_PATH_RTL = `
  M 1485 240
  C 1457.5 240, 1457.5 180, 1430 180
  C 1345 180, 1345 300, 1260 300
  C 1175 300, 1175 180, 1090 180
  C 1005 180, 1005 300, 920 300
  C 835 300, 835 180, 750 180
  C 665 180, 665 300, 580 300
  C 495 300, 495 180, 410 180
  C 325 180, 325 300, 240 300
  C 155 300, 155 180, 70 180
  C 42.5 180, 42.5 240, 15 240
`;

export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduced = useReducedMotion();
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [expandedMobileIdx, setExpandedMobileIdx] = useState<number | null>(null);
  const [filter, setFilter] = useState<"all" | "leadership" | "service">("all");

  const leadershipCount = ROLES.filter((r) => r.isLeadership).length;
  const serviceCount = ROLES.filter((r) => !r.isLeadership).length;

  return (
    <section id="experience" ref={ref} className="relative scroll-mt-28 py-20 md:py-28">
      <div className="mx-auto w-full max-w-[1620px] px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center">
          <p className="mb-4 font-mono text-[13px] tracking-[0.24em] text-muted-foreground">
            (04) - LEADERSHIP &amp; VOLUNTEERING
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
            Leadership through service.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-muted-foreground">
            A chronological trail of executive leadership, community initiatives, and impactful service across university and national organizations.
          </p>

          {/* Interactive Filter / Legend Controls */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setFilter("all")}
              className={`flex items-center gap-2 rounded-full px-4 py-2 font-mono text-[12px] font-medium transition-all duration-200 ${
                filter === "all"
                  ? "border-foreground/30 bg-foreground/10 text-foreground shadow-sm"
                  : "border-border/40 bg-card/30 text-muted-foreground hover:border-border hover:text-foreground"
              } border backdrop-blur-sm`}
            >
              <span>All Works</span>
            </button>

            <button
              onClick={() => setFilter("leadership")}
              className={`flex items-center gap-2 rounded-full px-4 py-2 font-mono text-[12px] font-medium transition-all duration-200 ${
                filter === "leadership"
                  ? "border-amber-400 bg-amber-500/20 text-amber-300 shadow-[0_0_16px_rgba(245,158,11,0.25)]"
                  : "border-border/40 bg-card/30 text-muted-foreground hover:border-amber-400/50 hover:text-amber-300"
              } border backdrop-blur-sm`}
            >
              <span className="h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b]" />
              <span>★ Leadership Roles</span>
            </button>

            <button
              onClick={() => setFilter("service")}
              className={`flex items-center gap-2 rounded-full px-4 py-2 font-mono text-[12px] font-medium transition-all duration-200 ${
                filter === "service"
                  ? "border-sky-400 bg-sky-500/20 text-sky-300 shadow-[0_0_16px_rgba(56,189,248,0.25)]"
                  : "border-border/40 bg-card/30 text-muted-foreground hover:border-sky-400/50 hover:text-sky-300"
              } border backdrop-blur-sm`}
            >
              <span className="h-2 w-2 rounded-full bg-sky-400 shadow-[0_0_8px_#38bdf8]" />
              <span>Volunteering &amp; Service</span>
            </button>
          </div>

          <div className="mt-4 hidden items-center justify-center gap-2 font-mono text-[12px] text-muted-foreground/75 lg:flex">
            <FiInfo size={14} className="text-amber-400" />
            <span>Hover over any milestone along the wave to explore details</span>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════
            DESKTOP: Widescreen Harmonic Wavy Trail with Moving Lights
           ══════════════════════════════════════════════════════════════ */}
        <div className="relative mt-12 hidden w-full lg:block">
          <div className="relative mx-auto h-[520px] w-full">
            {/* SVG Background Wave with Traveling Energy Pulses */}
            <svg
              viewBox="0 0 1500 480"
              preserveAspectRatio="none"
              className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
            >
              <defs>
                {/* Unified 2-tone gradient: Amber (Leadership) ──→ Sky Blue (Service) */}
                <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#f59e0b" />
                  <stop offset="50%" stopColor="#818cf8" stopOpacity="0.75" />
                  <stop offset="100%" stopColor="#38bdf8" />
                </linearGradient>

                <filter id="waveGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="6" result="glow" />
                  <feMerge>
                    <feMergeNode in="glow" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Ambient glow underlay */}
              <path
                d={WAVE_PATH}
                fill="none"
                stroke="url(#waveGradient)"
                strokeWidth="8"
                opacity="0.2"
                filter="url(#waveGlow)"
              />

              {/* Base track line */}
              <path
                d={WAVE_PATH}
                fill="none"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="4"
                strokeLinecap="round"
              />

              {/* Illuminated core wave line */}
              <motion.path
                d={WAVE_PATH}
                fill="none"
                stroke="url(#waveGradient)"
                strokeWidth="2.5"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={inView ? { pathLength: 1, opacity: 0.95 } : {}}
                transition={{ duration: 1.8, ease: "easeInOut" }}
              />

              {/* ──────────────────────────────────────────────────────────
                  MOVING LIGHT PARTICLES: Travel from Right to Left along the wave
                 ────────────────────────────────────────────────────────── */}
              {!reduced && (
                <>
                  {/* Light Particle 1 (Warm Gold) */}
                  <g>
                    <circle r="13" fill="#f59e0b" opacity="0.3" filter="url(#waveGlow)">
                      <animateMotion path={WAVE_PATH_RTL} dur="7s" repeatCount="indefinite" />
                    </circle>
                    <circle r="4.5" fill="#fef08a" filter="url(#waveGlow)">
                      <animateMotion path={WAVE_PATH_RTL} dur="7s" repeatCount="indefinite" />
                    </circle>
                  </g>

                  {/* Light Particle 2 (Cyan, staggered 3.5s) */}
                  <g>
                    <circle r="13" fill="#38bdf8" opacity="0.25" filter="url(#waveGlow)">
                      <animateMotion path={WAVE_PATH_RTL} dur="7s" begin="3.5s" repeatCount="indefinite" />
                    </circle>
                    <circle r="4.5" fill="#e0f2fe" filter="url(#waveGlow)">
                      <animateMotion path={WAVE_PATH_RTL} dur="7s" begin="3.5s" repeatCount="indefinite" />
                    </circle>
                  </g>
                </>
              )}

              {/* Connecting Stems from nodes to cards */}
              {SVG_POINTS.map((pt, i) => {
                const role = ROLES[i];
                const isHovered = hoveredIdx === i;
                const isDimmed =
                  (filter === "leadership" && !role.isLeadership) ||
                  (filter === "service" && role.isLeadership);
                const roleColor = role.isLeadership ? COLOR_LEADERSHIP : COLOR_SERVICE;
                const stemY2 = pt.isTop ? pt.y - 44 : pt.y + 44;

                return (
                  <line
                    key={`stem-${i}`}
                    x1={pt.x}
                    y1={pt.y}
                    x2={pt.x}
                    y2={stemY2}
                    stroke={roleColor}
                    strokeWidth={isHovered ? "2.5" : role.isLeadership ? "1.5" : "1"}
                    strokeDasharray={isHovered ? "none" : "3 3"}
                    opacity={isDimmed ? 0.15 : isHovered ? 1 : 0.45}
                    className="transition-all duration-300"
                  />
                );
              })}
            </svg>

            {/* Interactive HTML Nodes & Floating Cards */}
            {SVG_POINTS.map((pt, i) => {
              const r = ROLES[i];
              const isHovered = hoveredIdx === i;
              const anyHovered = hoveredIdx !== null;
              const isTop = pt.isTop;
              const isDimmed =
                (filter === "leadership" && !r.isLeadership) ||
                (filter === "service" && r.isLeadership);
              const roleColor = r.isLeadership ? COLOR_LEADERSHIP : COLOR_SERVICE;

              /* Percentage position inside the 1500x480 coordinate space */
              const leftPct = (pt.x / 1500) * 100;
              const topPct = (pt.y / 480) * 100;

              /* Center card directly over the stem and node */
              const cardAlignment = "left-1/2 -translate-x-1/2";

              return (
                <div
                  key={r.title}
                  className={`absolute transition-opacity duration-300 ${
                    isDimmed ? "opacity-25" : "opacity-100"
                  }`}
                  style={{
                    left: `${leftPct}%`,
                    top: `${topPct}%`,
                    transform: "translate(-50%, -50%)",
                    zIndex: isHovered ? 40 : r.isLeadership ? 20 : 10,
                  }}
                  onMouseEnter={() => setHoveredIdx(i)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  onFocus={() => setHoveredIdx(i)}
                  onBlur={() => setHoveredIdx(null)}
                  tabIndex={0}
                >
                  {/* Wave Node Dot */}
                  <div className="relative flex cursor-pointer items-center justify-center p-2">
                    {/* Pulsing halo ring for leadership or hover */}
                    <div
                      className="absolute h-9 w-9 rounded-full transition-all duration-300"
                      style={{
                        background: `${roleColor}25`,
                        border: `1px solid ${roleColor}70`,
                        transform: isHovered ? "scale(1.5)" : r.isLeadership ? "scale(1.15)" : "scale(1)",
                        boxShadow: isHovered
                          ? `0 0 24px ${roleColor}`
                          : r.isLeadership
                          ? `0 0 12px ${roleColor}60`
                          : "none",
                      }}
                    />
                    {/* Solid glowing center dot */}
                    <span
                      className="relative z-10 h-3.5 w-3.5 rounded-full transition-transform duration-300"
                      style={{
                        background: roleColor,
                        boxShadow: `0 0 14px ${roleColor}`,
                        transform: isHovered ? "scale(1.35)" : "scale(1)",
                      }}
                    />
                  </div>

                  {/* Card anchored to the node */}
                  <div
                    className={`pointer-events-auto absolute ${cardAlignment}`}
                    style={{
                      [isTop ? "bottom" : "top"]: "calc(100% + 14px)",
                    }}
                  >
                    <motion.div
                      layout
                      className="group relative cursor-pointer rounded-2xl border backdrop-blur-md transition-all duration-300"
                      style={{
                        width: isHovered ? "280px" : "155px",
                        borderLeftColor: isHovered
                          ? roleColor
                          : r.isLeadership
                          ? "rgba(245, 158, 11, 0.35)"
                          : "rgba(255, 255, 255, 0.09)",
                        borderRightColor: isHovered
                          ? roleColor
                          : r.isLeadership
                          ? "rgba(245, 158, 11, 0.35)"
                          : "rgba(255, 255, 255, 0.09)",
                        borderBottomColor: isHovered
                          ? roleColor
                          : r.isLeadership
                          ? "rgba(245, 158, 11, 0.35)"
                          : "rgba(255, 255, 255, 0.09)",
                        borderTopColor: r.isLeadership ? COLOR_LEADERSHIP : COLOR_SERVICE,
                        borderTopWidth: r.isLeadership ? "2.5px" : "2px",
                        background: isHovered
                          ? "rgba(18, 18, 24, 0.96)"
                          : anyHovered
                          ? "rgba(18, 18, 24, 0.4)"
                          : r.isLeadership
                          ? "rgba(24, 20, 16, 0.72)"
                          : "rgba(20, 22, 28, 0.65)",
                        boxShadow: isHovered
                          ? `0 14px 40px -10px ${roleColor}45, 0 0 24px -2px ${roleColor}35`
                          : r.isLeadership
                          ? "0 4px 20px -4px rgba(245, 158, 11, 0.15)"
                          : "0 4px 20px -4px rgba(0,0,0,0.4)",
                        transform: isHovered
                          ? isTop
                            ? "translateY(-6px)"
                            : "translateY(6px)"
                          : "translateY(0)",
                      }}
                    >
                      {/* Compact Default View */}
                      {!isHovered ? (
                        <div className="p-3 text-center">
                          {/* Role Tag */}
                          <div className="mb-1 flex items-center justify-center gap-1">
                            {r.isLeadership ? (
                              <span
                                className="inline-flex items-center gap-1 rounded-full border px-2 py-0.5 font-mono text-[9px] font-bold tracking-wider"
                                style={{
                                  borderColor: `${COLOR_LEADERSHIP}60`,
                                  background: `${COLOR_LEADERSHIP}15`,
                                  color: COLOR_LEADERSHIP,
                                }}
                              >
                                ★ LEADERSHIP
                              </span>
                            ) : (
                              <span
                                className="inline-block rounded-full border px-2 py-0.5 font-mono text-[9px] font-semibold tracking-wide"
                                style={{
                                  borderColor: `${COLOR_SERVICE}50`,
                                  background: `${COLOR_SERVICE}10`,
                                  color: COLOR_SERVICE,
                                }}
                              >
                                {r.tag}
                              </span>
                            )}
                          </div>

                          <span className="font-mono text-[10px] text-muted-foreground">
                            {r.period}
                          </span>

                          <h4 className="mt-1 text-[12px] font-semibold leading-snug text-foreground/90">
                            {r.shortTitle || r.title}
                          </h4>
                          <p className="mt-1 truncate font-mono text-[10px] text-muted-foreground/75">
                            {r.org.split("—")[0].split("-")[0]}
                          </p>
                        </div>
                      ) : (
                        /* Expanded Rich Hover View */
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.2 }}
                          className="p-4 text-left"
                        >
                          <div className="mb-2 flex items-center justify-between gap-2">
                            <span
                              className="rounded-full border px-2.5 py-0.5 font-mono text-[9px] font-bold tracking-[0.14em]"
                              style={{
                                borderColor: roleColor,
                                background: `${roleColor}15`,
                                color: roleColor,
                              }}
                            >
                              {r.isLeadership ? "★ LEADERSHIP" : r.tag}
                            </span>
                            <span className="font-mono text-[11px] font-medium text-muted-foreground">
                              {r.period}
                            </span>
                          </div>

                          <h3 className="text-[14px] font-bold leading-snug text-foreground">
                            {r.title}
                          </h3>
                          <p className="mt-1 text-[12px] font-medium text-foreground/80">
                            {r.org}
                          </p>

                          {r.note && (
                            <p className="mt-2.5 border-t border-white/10 pt-2.5 text-[12px] leading-relaxed text-muted-foreground">
                              {r.note}
                            </p>
                          )}
                        </motion.div>
                      )}
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════
            MOBILE & TABLET: Vertical Stream
           ══════════════════════════════════════════════════════════════ */}
        <div className="relative mt-12 block lg:hidden">
          {/* Vertical gradient trail line */}
          <div
            className="absolute bottom-0 left-6 top-0 w-[2px] -translate-x-1/2"
            style={{
              background: "linear-gradient(to bottom, #f59e0b 0%, #818cf8 50%, #38bdf8 100%)",
            }}
          />

          <div className="flex flex-col gap-5 pl-12">
            {ROLES.map((r, i) => {
              const isExpanded = expandedMobileIdx === i;
              const isDimmed =
                (filter === "leadership" && !r.isLeadership) ||
                (filter === "service" && r.isLeadership);
              const roleColor = r.isLeadership ? COLOR_LEADERSHIP : COLOR_SERVICE;

              return (
                <div
                  key={r.title}
                  className={`relative transition-opacity duration-300 ${
                    isDimmed ? "opacity-25" : "opacity-100"
                  }`}
                >
                  {/* Glowing Node on the vertical line */}
                  <span
                    className="absolute -left-12 top-5 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-background transition-transform duration-300"
                    style={{
                      background: roleColor,
                      boxShadow: `0 0 14px ${roleColor}`,
                      transform: isExpanded ? "scale(1.3)" : r.isLeadership ? "scale(1.15)" : "scale(1)",
                    }}
                  />

                  {/* Mobile Role Card */}
                  <div
                    onClick={() => setExpandedMobileIdx(isExpanded ? null : i)}
                    className="cursor-pointer rounded-2xl border p-5 backdrop-blur-md transition-all duration-300 active:scale-[0.99]"
                    style={{
                      borderColor: isExpanded
                        ? roleColor
                        : r.isLeadership
                        ? "rgba(245, 158, 11, 0.3)"
                        : "rgba(255,255,255,0.08)",
                      background: r.isLeadership ? "rgba(24, 20, 16, 0.7)" : "rgba(20, 22, 28, 0.6)",
                      borderLeft: `3px solid ${roleColor}`,
                    }}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span
                          className="rounded-full border px-2 py-0.5 font-mono text-[9px] font-bold tracking-wider"
                          style={{
                            borderColor: `${roleColor}70`,
                            background: `${roleColor}15`,
                            color: roleColor,
                          }}
                        >
                          {r.isLeadership ? "★ LEADERSHIP" : r.tag}
                        </span>
                        <span className="font-mono text-[11px] text-muted-foreground">
                          {r.period}
                        </span>
                      </div>
                      <FiChevronDown
                        size={16}
                        className={`text-muted-foreground transition-transform duration-300 ${
                          isExpanded ? "rotate-180 text-foreground" : ""
                        }`}
                      />
                    </div>

                    <h3 className="mt-2 text-[15px] font-semibold leading-tight text-foreground">
                      {r.title}
                    </h3>
                    <p className="mt-1 text-[13px] text-foreground/75">{r.org}</p>

                    <AnimatePresence>
                      {isExpanded && r.note && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-3 border-t border-white/10 pt-3 text-[13px] leading-relaxed text-muted-foreground"
                        >
                          {r.note}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
