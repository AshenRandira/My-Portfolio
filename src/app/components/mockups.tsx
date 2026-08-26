/* Hand-built abstract product-UI previews — one per project.
   Each looks like a real interface screen rather than a stock photo. */

function Bar({ w, c, o = 1 }: { w: string; c?: string; o?: number }) {
  return (
    <div
      className="h-2 rounded-full"
      style={{ width: w, background: c ?? "var(--muted-foreground)", opacity: o }}
    />
  );
}

/* 01 — ServeSync: backend / admin dashboard with audit rows */
export function ServeSyncMock({ accent }: { accent: string }) {
  return (
    <div className="flex h-full w-full gap-3 bg-[#0e0f15] p-4 font-mono">
      <div className="flex w-1/4 flex-col gap-2 border-r border-white/5 pr-3">
        <div className="mb-1 h-3 w-3 rounded" style={{ background: accent }} />
        {["Orders", "Staff", "Roles", "Audit", "Menu"].map((s, i) => (
          <div
            key={s}
            className="rounded px-1.5 py-1 text-[8px]"
            style={{
              color: i === 3 ? accent : "var(--muted-foreground)",
              background: i === 3 ? "rgba(255,255,255,0.05)" : "transparent",
            }}
          >
            {s}
          </div>
        ))}
      </div>
      <div className="flex flex-1 flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <Bar w="40%" c={accent} />
          <div className="flex gap-1.5">
            <span className="rounded px-1.5 py-0.5 text-[7px]" style={{ color: accent, border: `1px solid ${accent}` }}>ADMIN</span>
          </div>
        </div>
        {[92, 78, 84, 66, 88, 71].map((w, i) => (
          <div key={i} className="flex items-center gap-2 rounded bg-white/[0.03] px-2 py-1.5">
            <div className="h-1.5 w-1.5 rounded-full" style={{ background: i % 2 ? "var(--muted-foreground)" : accent }} />
            <Bar w={`${w * 0.5}%`} o={0.5} />
            <span className="ml-auto text-[7px] text-muted-foreground">2:0{i}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* 02 — CineScope: cinematic discovery grid + hero poster */
export function CineScopeMock({ accent }: { accent: string }) {
  return (
    <div className="flex h-full w-full flex-col gap-3 bg-[#0d0b14] p-4">
      <div
        className="relative h-1/2 w-full overflow-hidden rounded-lg"
        style={{ background: `linear-gradient(120deg, ${accent}, transparent 70%), #17141f` }}
      >
        <div className="absolute bottom-2 left-3 space-y-1.5">
          <Bar w="90px" c="#fff" o={0.9} />
          <Bar w="60px" o={0.4} />
        </div>
        <span className="absolute right-3 top-3 rounded-full px-2 py-0.5 font-mono text-[7px]" style={{ background: accent, color: "#0b0c10" }}>▶ WATCH</span>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <div
            key={i}
            className="aspect-[2/3] rounded-md"
            style={{
              background: i === 2 ? accent : "#1b1826",
              opacity: i === 2 ? 0.8 : 1,
              border: "1px solid rgba(255,255,255,0.04)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* 03 — Project Management Tool: kanban board */
export function KanbanMock({ accent }: { accent: string }) {
  const cols = [
    { t: "To do", n: 3 },
    { t: "In progress", n: 2 },
    { t: "Done", n: 4 },
  ];
  return (
    <div className="flex h-full w-full gap-2.5 bg-[#0c110d] p-4 font-mono">
      {cols.map((col, ci) => (
        <div key={col.t} className="flex flex-1 flex-col gap-2">
          <div className="flex items-center gap-1.5">
            <div className="h-1.5 w-1.5 rounded-full" style={{ background: ci === 1 ? accent : "var(--muted-foreground)" }} />
            <span className="text-[8px] text-muted-foreground">{col.t}</span>
          </div>
          {Array.from({ length: col.n }).map((_, i) => (
            <div
              key={i}
              className="space-y-1.5 rounded-md bg-white/[0.04] p-2"
              style={{ borderLeft: `2px solid ${ci === 1 && i === 0 ? accent : "transparent"}` }}
            >
              <Bar w={`${60 + i * 8}%`} o={0.6} />
              <div className="flex items-center gap-1">
                <div className="h-3 w-3 rounded-full" style={{ background: accent, opacity: 0.4 }} />
                <Bar w="30%" o={0.3} />
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

/* PulseDock: container monitoring dashboard with live sparkline */
export function PulseDockMock({ accent }: { accent: string }) {
  const pts = [12, 20, 14, 26, 18, 30, 22, 34, 28, 40, 30, 46];
  const path = pts
    .map((p, i) => `${(i / (pts.length - 1)) * 100},${50 - p}`)
    .join(" ");
  return (
    <div className="flex h-full w-full flex-col gap-3 bg-[#0a0f14] p-4 font-mono">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-2.5 w-2.5 rounded-sm" style={{ background: accent }} />
          <span className="text-[9px] text-foreground/80">pulsedock · monitor</span>
        </div>
        <span className="text-[7px]" style={{ color: accent }}>● LIVE</span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {[["CPU", "38%"], ["MEM", "1.2G"], ["NET", "44ms"]].map(([k, v]) => (
          <div key={k} className="rounded bg-white/[0.03] p-2">
            <p className="text-[7px] text-muted-foreground">{k}</p>
            <p className="text-[11px]" style={{ color: accent }}>{v}</p>
          </div>
        ))}
      </div>
      <div className="relative flex-1 rounded bg-white/[0.02] p-2">
        <svg viewBox="0 0 100 50" preserveAspectRatio="none" className="h-full w-full">
          <polyline points={path} fill="none" stroke={accent} strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>
      <div className="space-y-1.5">
        {["api-gateway", "worker-01"].map((c, i) => (
          <div key={c} className="flex items-center gap-2 rounded bg-white/[0.03] px-2 py-1">
            <div className="h-1.5 w-1.5 rounded-full" style={{ background: i ? "var(--amber)" : accent }} />
            <span className="text-[8px] text-foreground/70">{c}</span>
            <span className="ml-auto text-[7px] text-muted-foreground">{i ? "restarting" : "healthy"}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Dockerized Ecommerce Store: storefront grid + cart */
export function EcommerceMock({ accent }: { accent: string }) {
  return (
    <div className="flex h-full w-full flex-col gap-3 bg-[#0a0e14] p-4">
      <div className="flex items-center justify-between">
        <Bar w="70px" c={accent} />
        <div className="relative">
          <div className="h-5 w-5 rounded-md border" style={{ borderColor: "var(--border)" }} />
          <span className="absolute -right-1 -top-1 flex h-3 w-3 items-center justify-center rounded-full font-mono text-[6px]" style={{ background: accent, color: "#0b0c10" }}>3</span>
        </div>
      </div>
      <div className="grid flex-1 grid-cols-3 gap-2">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex flex-col gap-1.5 rounded-lg bg-white/[0.03] p-2">
            <div className="aspect-square w-full rounded-md" style={{ background: i === 1 ? accent : "#161b24", opacity: i === 1 ? 0.7 : 1 }} />
            <Bar w="80%" o={0.4} />
            <span className="font-mono text-[8px]" style={{ color: accent }}>${(i + 1) * 12}.00</span>
          </div>
        ))}
      </div>
      <span className="self-end font-mono text-[7px] text-muted-foreground">🐳 containerized · CI/CD</span>
    </div>
  );
}

/* AgroSense AI: agriculture sensor dashboard with AI insight */
export function AgroSenseMock({ accent }: { accent: string }) {
  return (
    <div className="flex h-full w-full gap-3 bg-[#0a120c] p-4 font-mono">
      <div className="flex w-1/3 flex-col gap-2">
        <span className="text-[8px]" style={{ color: accent }}>AgroSense AI</span>
        {/* soil moisture gauge */}
        <div className="relative mt-1 flex aspect-square items-center justify-center rounded-full" style={{ background: `conic-gradient(${accent} 68%, rgba(255,255,255,0.06) 0)` }}>
          <div className="flex h-3/4 w-3/4 flex-col items-center justify-center rounded-full bg-[#0a120c]">
            <span className="text-[11px]" style={{ color: accent }}>68%</span>
            <span className="text-[6px] text-muted-foreground">SOIL</span>
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-2">
        <div className="grid grid-cols-2 gap-2">
          {[["Temp", "27°C"], ["Humidity", "74%"], ["pH", "6.4"], ["Light", "820lx"]].map(([k, v]) => (
            <div key={k} className="rounded bg-white/[0.03] px-2 py-1.5">
              <p className="text-[6px] text-muted-foreground">{k}</p>
              <p className="text-[9px] text-foreground/80">{v}</p>
            </div>
          ))}
        </div>
        <div className="flex-1 rounded p-2" style={{ border: `1px solid ${accent}`, background: "rgba(255,255,255,0.02)" }}>
          <p className="mb-1 text-[7px]" style={{ color: accent }}>✦ AI INSIGHT</p>
          <Bar w="90%" o={0.4} />
          <div className="mt-1.5"><Bar w="65%" o={0.3} /></div>
        </div>
      </div>
    </div>
  );
}

/* 04 — Four Seasons Tree: OpenGL scene with a tree across seasons */
export function SeasonsMock({ accent }: { accent: string }) {
  const seasons = ["#7ec8ff", "#8ef58a", accent, "#ff9b6b"]; // winter, spring, summer, autumn
  return (
    <div className="relative flex h-full w-full items-end justify-center gap-6 overflow-hidden bg-gradient-to-b from-[#0c0a08] to-[#161009] p-4">
      {/* HUD */}
      <span className="absolute left-3 top-3 font-mono text-[7px]" style={{ color: accent }}>
        GL · 60 FPS · SEASON 3/4
      </span>
      <div className="absolute right-3 top-3 flex gap-1">
        {seasons.map((c, i) => (
          <div key={i} className="h-1.5 w-1.5 rounded-full" style={{ background: c, opacity: i === 2 ? 1 : 0.4 }} />
        ))}
      </div>
      {/* Tree */}
      <div className="relative flex flex-col items-center">
        <div
          className="h-16 w-16 rounded-full blur-[2px]"
          style={{ background: `radial-gradient(circle at 40% 35%, ${accent}, transparent 72%)` }}
        />
        <div className="-mt-1 h-14 w-1.5 rounded-full" style={{ background: "#5a4327" }} />
      </div>
      {/* floating leaves */}
      {[10, 30, 55, 75, 88].map((l, i) => (
        <div
          key={i}
          className="absolute h-1 w-1 rounded-sm"
          style={{ left: `${l}%`, top: `${20 + (i * 13) % 50}%`, background: accent, opacity: 0.6 }}
        />
      ))}
      <div className="absolute bottom-0 left-0 h-3 w-full" style={{ background: "rgba(255,255,255,0.03)" }} />
    </div>
  );
}
