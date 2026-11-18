import type { ReactElement } from "react";
import type { Project } from "../data";
import { ART, useSettings } from "../settings";

/* One small technical drawing per project, in hairlines with an accent signal; colours follow the theme.
   Each sits in a 400x160 box and scales to the card. */


function seeded(seed: number) {
  let s = seed;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}

export function ProjectArt({ kind }: { kind: Project["art"] }) {
  const pal = ART[useSettings().theme];
  const W = `rgba(${pal.fg},0.28)`;
  const S = `rgba(${pal.fg},0.5)`;
  const C = pal.accentHex;
  const BG = pal.bg;
  const r = seeded(kind.length * 977 + 13);
  let body: ReactElement;

  switch (kind) {
    case "chain": {
      // mother–child alarm chains: a root alarm fanning into child alarms, grouped into incidents
      const roots = [70, 200, 330];
      body = (
        <g>
          {roots.map((x, ri) => {
            const kids = [-48, -16, 16, 48];
            return (
              <g key={x}>
                <rect x={x - 54} y={14} width={108} height={136} fill="none" stroke={W} strokeDasharray="2 4" />
                {kids.map((k, ki) => (
                  <g key={k}>
                    <line x1={x} y1={48} x2={x + k} y2={104} stroke={S} />
                    <line x1={x + k} y1={104} x2={x + k + (ki % 2 ? 8 : -8)} y2={134} stroke={W} />
                    <circle cx={x + k} cy={104} r={4} fill={BG} stroke={S} />
                    <circle cx={x + k + (ki % 2 ? 8 : -8)} cy={134} r={2.5} fill={W} />
                  </g>
                ))}
                <circle cx={x} cy={48} r={ri === 1 ? 9 : 7} fill={ri === 1 ? C : BG} stroke={ri === 1 ? C : S} />
                {ri === 1 && <circle cx={x} cy={48} r={16} fill="none" stroke={C} strokeOpacity={0.4} />}
              </g>
            );
          })}
        </g>
      );
      break;
    }
    case "spectrum": {
      // four operators across frequency bands
      const ops = [0.3, 0.42, 0.18, 0.1];
      const bands = [0, 1, 2, 3, 4];
      body = (
        <g>
          {ops.map((_, oi) => (
            <g key={oi}>
              {bands.map((b) => {
                const w = 20 + r() * 46;
                const x = 20 + b * 76 + r() * (66 - w);
                return <rect key={b} x={x} y={22 + oi * 32} width={w} height={20} fill={oi === 1 ? C : W} fillOpacity={oi === 1 ? 0.85 : 0.35} />;
              })}
            </g>
          ))}
          {bands.map((b) => (
            <line key={b} x1={14 + b * 76} y1={14} x2={14 + b * 76} y2={150} stroke={W} strokeDasharray="1 4" />
          ))}
        </g>
      );
      break;
    }
    case "ledger": {
      // ledger rows traced back to source documents
      body = (
        <g>
          {[0, 1, 2, 3, 4].map((i) => {
            const w = 90 + r() * 120;
            return (
              <g key={i}>
                <rect x={20} y={20 + i * 26} width={w} height={6} fill={W} />
                <rect x={300} y={20 + i * 26} width={60 + r() * 20} height={6} fill={i === 2 ? C : S} />
                <line x1={24 + w} y1={23 + i * 26} x2={296} y2={23 + i * 26} stroke={W} strokeDasharray="1 5" />
              </g>
            );
          })}
          <path d="M374 72 h14 v-50 h-10 M388 72 v56 h-10" fill="none" stroke={C} />
        </g>
      );
      break;
    }
    case "rag": {
      // job post → retrieved chunks → letter
      body = (
        <g>
          <rect x={20} y={30} width={80} height={100} fill="none" stroke={S} />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <rect key={i} x={30} y={42 + i * 13} width={40 + r() * 20} height={4} fill={W} />
          ))}
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              <line x1={100} y1={80} x2={170} y2={36 + i * 30} stroke={W} />
              <rect x={170} y={28 + i * 30} width={60} height={16} fill={i === 1 || i === 2 ? C : "none"} fillOpacity={0.8} stroke={i === 1 || i === 2 ? C : S} />
            </g>
          ))}
          <line x1={230} y1={66} x2={290} y2={80} stroke={C} />
          <line x1={230} y1={96} x2={290} y2={80} stroke={C} />
          <rect x={290} y={30} width={90} height={100} fill="none" stroke={S} />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <rect key={i} x={300} y={44 + i * 13} width={50 + r() * 20} height={4} fill={i < 2 ? C : W} fillOpacity={i < 2 ? 0.7 : 1} />
          ))}
        </g>
      );
      break;
    }
    case "vectors": {
      // TF-IDF vectors and cosine similarity to a query
      const pts = Array.from({ length: 34 }, () => [30 + r() * 340, 14 + r() * 132] as const);
      const q = [200, 80] as const;
      const near = [...pts].sort((a, b) => Math.hypot(a[0] - q[0], a[1] - q[1]) - Math.hypot(b[0] - q[0], b[1] - q[1])).slice(0, 5);
      body = (
        <g>
          {near.map((p, i) => (
            <line key={i} x1={q[0]} y1={q[1]} x2={p[0]} y2={p[1]} stroke={C} strokeOpacity={0.6} />
          ))}
          {pts.map((p, i) => (
            <circle key={i} cx={p[0]} cy={p[1]} r={near.includes(p) ? 3.5 : 2.2} fill={near.includes(p) ? C : S} />
          ))}
          <circle cx={q[0]} cy={q[1]} r={7} fill={BG} stroke={C} strokeWidth={1.5} />
        </g>
      );
      break;
    }
    case "triage": {
      // message → check → safety response | document answer
      body = (
        <g>
          <rect x={20} y={64} width={70} height={32} fill="none" stroke={S} />
          <line x1={90} y1={80} x2={150} y2={80} stroke={S} />
          <path d="M170 60 L190 80 L170 100 L150 80 Z" fill="none" stroke={C} />
          <path d="M190 80 H230 V38 H280 M230 80 V122 H280" fill="none" stroke={W} />
          <rect x={280} y={24} width={100} height={28} fill={C} fillOpacity={0.85} />
          <rect x={280} y={108} width={100} height={28} fill="none" stroke={S} />
          {[0, 1, 2].map((i) => (
            <rect key={i} x={292} y={116 + i * 0} width={40 + i * 14} height={3} transform={`translate(0 ${i * 5})`} fill={W} />
          ))}
        </g>
      );
      break;
    }
    case "irs": {
      // reflecting surface: elements switched on/off, incident and reflected beams
      const cols = 16, rows = 6;
      body = (
        <g>
          <line x1={10} y1={150} x2={150} y2={60} stroke={W} strokeDasharray="3 4" />
          <line x1={250} y1={60} x2={390} y2={150} stroke={C} />
          {Array.from({ length: rows }).map((_, y) =>
            Array.from({ length: cols }).map((__, x) => {
              const on = r() > 0.42;
              return <rect key={`${x}-${y}`} x={120 + x * 10} y={14 + y * 10} width={7} height={7} fill={on ? C : "none"} fillOpacity={on ? 0.75 : 1} stroke={on ? "none" : W} />;
            }),
          )}
        </g>
      );
      break;
    }
    case "antenna": {
      body = (
        <g>
          {[0, 1, 2].map((i) => (
            <path key={i} d={`M${270 + i * 26} ${40 - i * 8} q ${18 + i * 6} 40 0 ${80 + i * 16}`} fill="none" stroke={C} strokeOpacity={1 - i * 0.28} />
          ))}
          <rect x={150} y={36} width={100} height={88} fill="none" stroke={S} />
          <rect x={164} y={50} width={72} height={60} fill={W} fillOpacity={0.25} stroke={S} />
          <rect x={196} y={110} width={8} height={40} fill={C} />
          <line x1={60} y1={150} x2={340} y2={150} stroke={W} />
        </g>
      );
      break;
    }
    default:
      body = <g />;
  }

  return (
    <svg viewBox="0 0 400 160" preserveAspectRatio="xMidYMid meet" className="h-full w-full" aria-hidden>
      {body}
    </svg>
  );
}
