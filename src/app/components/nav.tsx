import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useHover } from "./cursor";
import resumeUrl from "../../imports/Profile__2_.pdf";

const ITEMS = [
  { label: "Work", href: "#work", accent: "var(--blue)" },
  { label: "About", href: "#about", accent: "var(--violet)" },
  { label: "Skills", href: "#journey", accent: "var(--lime)" },
  { label: "Path", href: "#experience", accent: "var(--amber)" },
  { label: "Contact", href: "#contact", accent: "var(--blue)" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("work");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: highlight whichever section is currently in view.
  useEffect(() => {
    const ids = ITEMS.map((i) => i.href.replace("#", ""));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div className="mx-auto max-w-[1200px] px-4 pt-3 md:px-6 md:pt-4">
      <div
        className="flex items-center justify-between rounded-full px-5 py-3 transition-all duration-500 md:px-6"
        style={{
          backgroundColor: scrolled ? "rgba(14,15,20,0.85)" : "rgba(14,15,20,0.45)",
          backdropFilter: "blur(14px)",
          border: "1px solid var(--border)",
          boxShadow: scrolled ? "0 12px 44px -22px rgba(0,0,0,0.9)" : "none",
        }}
      >
        {/* Wordmark */}
        <a
          href="#top"
          {...useHover({ variant: "link" })}
          className="flex items-center gap-2 font-mono tracking-[0.18em] text-foreground"
          style={{ fontSize: "15px" }}
        >
          <span
            className="flex h-7 w-7 items-center justify-center rounded-full text-[13px]"
            style={{ background: "var(--lime)", color: "#0b0c10" }}
          >
            A
          </span>
          <span className="hidden sm:inline">ASHEN<span style={{ color: "var(--lime)" }}>.</span></span>
        </a>

        {/* Center links */}
        <nav className="hidden items-center gap-6 md:flex lg:gap-8">
          {ITEMS.map((item) => (
            <NavLink key={item.label} {...item} active={active === item.href.replace("#", "")} />
          ))}
        </nav>

        {/* Availability + resume */}
        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-2 lg:flex">
            <span className="relative flex h-2 w-2">
              <span
                className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-70"
                style={{ backgroundColor: "var(--lime)" }}
              />
              <span
                className="relative inline-flex h-2 w-2 rounded-full"
                style={{ backgroundColor: "var(--lime)" }}
              />
            </span>
            <span className="font-mono text-[11px] tracking-[0.14em] text-muted-foreground">
              Available
            </span>
          </div>

          <a
            href={resumeUrl}
            download
            {...useHover({ variant: "button", label: "OPEN" })}
            className="rounded-full px-4 py-2 font-mono text-[11px] tracking-[0.12em] transition-transform duration-300 hover:scale-105"
            style={{ background: "var(--lime)", color: "#0b0c10" }}
          >
            Résumé ↓
          </a>
        </div>
      </div>

      {/* Mobile links */}
      <nav className="mt-2 flex items-center justify-center gap-5 md:hidden">
        {ITEMS.map((item) => (
          <NavLink key={item.label} {...item} active={active === item.href.replace("#", "")} />
        ))}
      </nav>
      </div>
    </motion.header>
  );
}

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
      className="group relative flex items-center gap-1.5 py-1 font-mono text-[12px] tracking-[0.1em] transition-colors duration-300"
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
        style={{ letterSpacing: lit ? "0.24em" : "0.1em" }}
      >
        {label}
      </span>
      {/* Sliding colored beam */}
      <motion.span
        className="absolute -bottom-0.5 left-0 h-px w-full origin-left"
        style={{ backgroundColor: accent }}
        initial={false}
        animate={{ scaleX: lit ? 1 : 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      />
    </a>
  );
}
