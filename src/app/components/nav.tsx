import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "motion/react";
import { useHover } from "./cursor";
import { FiMenu, FiX, FiDownload } from "react-icons/fi";

const ITEMS = [
  { label: "Work", href: "#work", id: "work", accent: "var(--blue)" },
  { label: "About", href: "#about", id: "about", accent: "var(--violet)" },
  { label: "Skills", href: "#journey", id: "journey", accent: "var(--lime)" },
  { label: "Leadership", href: "#experience", id: "experience", accent: "var(--amber)" },
  { label: "Honors", href: "#achievements", id: "achievements", accent: "var(--amber)" },
  { label: "Contact", href: "#contact", id: "contact", accent: "var(--blue)" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("work");
  const [mobileOpen, setMobileOpen] = useState(false);

  // Global scroll progress indicator
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: highlight whichever section is currently in view
  useEffect(() => {
    const sections = ITEMS.map((i) => document.getElementById(i.id)).filter(
      (el): el is HTMLElement => !!el
    );

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setActive(e.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50 pointer-events-none"
    >
      <div className="mx-auto max-w-[1240px] px-4 pt-3 md:px-6 md:pt-4">
        {/* Main Floating Island */}
        <div
          className="pointer-events-auto relative flex items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500 md:px-5"
          style={{
            backgroundColor: scrolled ? "rgba(11, 13, 18, 0.88)" : "rgba(14, 16, 22, 0.6)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow: scrolled
              ? "0 16px 40px -15px rgba(0, 0, 0, 0.9), inset 0 1px 0 rgba(255, 255, 255, 0.12)"
              : "0 8px 32px -10px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.08)",
          }}
        >
          {/* Brand Wordmark */}
          <a
            href="#top"
            {...useHover({ variant: "link" })}
            className="group flex items-center gap-2.5 font-mono text-[12px] tracking-[0.16em] text-foreground transition-opacity hover:opacity-90"
          >
            <span
              className="flex h-7 w-7 items-center justify-center rounded-full font-display font-extrabold text-[12px] shadow-sm transition-transform duration-300 group-hover:scale-105"
              style={{
                background: "radial-gradient(circle at 35% 35%, var(--lime), #65a30d)",
                color: "#0b0c10",
                boxShadow: "0 0 12px rgba(132, 204, 22, 0.4)",
              }}
            >
              AR
            </span>
            <span className="hidden font-semibold tracking-wider sm:inline">
              ASHEN<span style={{ color: "var(--lime)" }}>.</span>
            </span>
          </a>

          {/* Desktop Center Navigation Links with Glowing Dot & Expanding Beam Transition */}
          <nav className="hidden items-center gap-4 md:flex lg:gap-6">
            {ITEMS.map((item) => (
              <NavLink
                key={item.id}
                label={item.label}
                href={item.href}
                accent={item.accent}
                active={active === item.id}
              />
            ))}
          </nav>

          {/* Right Area: Live Status & Actions */}
          <div className="flex items-center gap-3">
            {/* Live Availability Badge */}
            <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 lg:flex">
              <span className="relative flex h-2 w-2">
                <span
                  className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                  style={{ backgroundColor: "var(--lime)" }}
                />
                <span
                  className="relative inline-flex h-2 w-2 rounded-full"
                  style={{ backgroundColor: "var(--lime)" }}
                />
              </span>
              <span className="font-mono text-[10px] tracking-[0.14em] text-muted-foreground">
                Available
              </span>
            </div>

            {/* Resume Download CTA */}
            <a
              href={`${import.meta.env.BASE_URL}Ashen_Randira_Resume.pdf`}
              download="Ashen_Randira_Resume.pdf"
              {...useHover({ variant: "button", label: "CV" })}
              className="flex items-center gap-1.5 rounded-full px-4 py-1.5 font-mono text-[11px] font-semibold tracking-wider shadow-md transition-all duration-300 hover:scale-105 hover:shadow-[0_0_16px_rgba(132,204,22,0.45)] active:scale-95"
              style={{ background: "var(--lime)", color: "#0b0c10" }}
            >
              <span>CV</span>
              <FiDownload size={12} />
            </a>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileOpen((o) => !o)}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-foreground transition-colors hover:bg-white/10 md:hidden"
              aria-label="Toggle navigation menu"
            >
              {mobileOpen ? <FiX size={16} /> : <FiMenu size={16} />}
            </button>
          </div>

          {/* Reading Progress Bar along bottom of navbar */}
          <motion.div
            className="pointer-events-none absolute bottom-0 left-6 right-6 h-[1.5px] origin-left rounded-full"
            style={{
              scaleX,
              background: "linear-gradient(90deg, var(--lime) 0%, var(--blue) 50%, var(--violet) 100%)",
              boxShadow: "0 0 8px rgba(132, 204, 22, 0.6)",
            }}
          />
        </div>

        {/* Mobile Dropdown Menu Drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="pointer-events-auto mt-2 rounded-2xl border border-white/10 bg-[rgba(12,14,20,0.95)] p-4 shadow-2xl backdrop-blur-2xl md:hidden"
            >
              <nav className="flex flex-col gap-2">
                {ITEMS.map((item) => {
                  const isActive = active === item.id;
                  return (
                    <a
                      key={item.id}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-between rounded-xl px-4 py-2.5 font-mono text-[12px] font-medium tracking-wider transition-colors"
                      style={{
                        backgroundColor: isActive ? `${item.accent}15` : "transparent",
                        color: isActive ? item.accent : "var(--foreground)",
                      }}
                    >
                      <div className="flex items-center gap-2">
                        {isActive && (
                          <span
                            className="h-1.5 w-1.5 rounded-full"
                            style={{ backgroundColor: item.accent, boxShadow: `0 0 8px ${item.accent}` }}
                          />
                        )}
                        <span>{item.label}</span>
                      </div>
                      <span className="text-[10px] opacity-40">→</span>
                    </a>
                  );
                })}
              </nav>

              <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3 font-mono text-[11px]">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[var(--lime)] shadow-[0_0_8px_var(--lime)]" />
                  <span className="text-muted-foreground">Available for hire</span>
                </div>
                <span className="text-[10px] text-muted-foreground/60">University of Moratuwa</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}

/** ── Individual Nav Link with Glowing Dot, Expanded Kerning & Sliding Beam ── */
function NavLink({
  label,
  href,
  accent,
  active,
}: {
  label: string;
  href: string;
  accent: string;
  active: boolean;
}) {
  const [hover, setHover] = useState(false);
  const hoverIntent = useHover({ variant: "link" });
  const lit = hover || active;

  return (
    <a
      href={href}
      onMouseEnter={() => {
        setHover(true);
        hoverIntent.onMouseEnter();
      }}
      onMouseLeave={() => {
        setHover(false);
        hoverIntent.onMouseLeave();
      }}
      aria-current={active ? "page" : undefined}
      className="group relative flex items-center gap-1.5 py-1 font-mono text-[11px] tracking-[0.08em] transition-colors duration-300"
      style={{ color: lit ? accent : "var(--foreground)" }}
    >
      {active && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="h-1.5 w-1.5 rounded-full"
          style={{ backgroundColor: accent, boxShadow: `0 0 8px ${accent}` }}
        />
      )}
      <span
        className="inline-block transition-[letter-spacing] duration-300"
        style={{ letterSpacing: lit ? "0.22em" : "0.1em" }}
      >
        {label}
      </span>

      {/* Sliding colored underline beam */}
      <motion.span
        className="absolute -bottom-0.5 left-0 h-[2px] w-full origin-left rounded-full"
        style={{ backgroundColor: accent, boxShadow: lit ? `0 0 8px ${accent}` : "none" }}
        initial={false}
        animate={{ scaleX: lit ? 1 : 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      />
    </a>
  );
}
