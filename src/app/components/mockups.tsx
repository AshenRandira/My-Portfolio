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

import serveSyncImg from '../../imports/ServeSync.png';
import cineScopeImg from '../../imports/Cinescope.png';
import pulseDockImg from '../../imports/PulseDock.png';
import agroSenseImg from '../../imports/Agrosense.png';

/* 01 — ServeSync: backend / admin dashboard with audit rows */
export function ServeSyncMock({ accent }: { accent: string }) {
  return <img src={serveSyncImg} alt="ServeSync" className="h-full w-full object-cover" />;
}

/* 02 — CineScope: cinematic discovery grid + hero poster */
export function CineScopeMock({ accent }: { accent: string }) {
  return <img src={cineScopeImg} alt="CineScope" className="h-full w-full object-cover" />;
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
  return <img src={pulseDockImg} alt="PulseDock" className="h-full w-full object-cover" />;
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
  return <img src={agroSenseImg} alt="AgroSense" className="h-full w-full object-cover" />;
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
