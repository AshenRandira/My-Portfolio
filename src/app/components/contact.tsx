import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Mail, Linkedin, Github, ArrowUpRight } from "lucide-react";
import { useHover } from "./cursor";

const LINKS = [
  {
    label: "Email",
    value: "ashenrandira22al@gmail.com",
    href: "mailto:ashenrandira22al@gmail.com",
    c: "var(--amber)",
    Icon: Mail,
  },
  {
    label: "LinkedIn",
    value: "/in/ashenrandira",
    href: "https://www.linkedin.com/in/ashen-randira-11626a30a/",
    c: "var(--blue)",
    Icon: Linkedin,
  },
  {
    label: "GitHub",
    value: "@ashenrandira",
    href: "https://github.com/ashenrandira",
    c: "var(--violet)",
    Icon: Github,
  },
];

export function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });

  const toTop = () =>
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });

  return (
    <section
      id="contact"
      ref={ref}
      className="relative flex min-h-[42rem] scroll-mt-28 flex-col justify-between overflow-hidden px-6 py-20 md:px-10 md:py-24"
    >
      {/* ambient glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 h-[60vh] w-[60vh] -translate-x-1/2 rounded-full opacity-40 blur-[100px]"
        style={{ background: "radial-gradient(circle, var(--violet), transparent 70%)" }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-1 flex-col justify-center">
        <p className="mb-8 font-mono text-[12px] tracking-[0.24em] text-muted-foreground">
          (09) — LET&apos;S TALK
        </p>

        <h2
          className="font-display max-w-5xl"
          style={{
            fontSize: "clamp(2.6rem, 9vw, 8rem)",
            fontWeight: 800,
            lineHeight: 0.92,
            letterSpacing: "-0.04em",
          }}
        >
          {["Have an idea", "worth building?"].map((line, i) => (
            <span key={i} className="block overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: "110%" }}
                animate={inView ? { y: 0 } : {}}
                transition={{ duration: 0.9, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                style={i === 1 ? { color: "transparent", WebkitTextStroke: "1.5px var(--foreground)" } : undefined}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h2>

        <div className="mt-16 grid gap-4 md:grid-cols-3">
          {LINKS.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              {...useHover({ variant: "button", label: "OPEN" })}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="group relative overflow-hidden rounded-2xl border bg-card/40 p-7 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1"
              style={{ borderColor: "var(--border)" }}
            >
              {/* glow wash on hover */}
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: `radial-gradient(circle at 20% 0%, ${link.c}22, transparent 60%)` }}
              />
              <div className="relative flex items-start justify-between">
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-xl border transition-colors duration-300"
                  style={{ borderColor: link.c, background: `${link.c}14` }}
                >
                  <link.Icon size={22} style={{ color: link.c }} />
                </span>
                <ArrowUpRight
                  size={20}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  style={{ color: link.c }}
                />
              </div>
              <p className="relative mt-6 font-mono text-[11px] tracking-[0.16em] text-muted-foreground">
                {link.label.toUpperCase()}
              </p>
              <p className="relative mt-1.5 text-[16px]" style={{ color: "var(--foreground)" }}>
                {link.value}
              </p>
            </motion.a>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 mx-auto mt-16 flex w-full max-w-[1400px] items-center justify-between border-t pt-6" style={{ borderColor: "var(--border)" }}>
        <p className="font-mono text-[11px] tracking-[0.1em] text-muted-foreground">
          Designed and built by Ashen Randira.
        </p>
        <button
          type="button"
          onClick={toTop}
          {...useHover({ variant: "link" })}
          className="group flex items-center gap-2 font-mono text-[11px] tracking-[0.1em] text-muted-foreground transition-colors hover:text-foreground"
        >
          <span className="transition-transform duration-300 group-hover:-translate-y-1" style={{ color: "var(--lime)" }}>
            ↑
          </span>
          Back to top
        </button>
      </div>
    </section>
  );
}
