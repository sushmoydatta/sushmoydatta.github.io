import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from "framer-motion";
import { MOTION } from "../motion";
import { ART, useCalm, useSettings } from "../settings";

/* Interactive 3D floating glass orb.
   A frosted glass sphere holds a rotating wireframe mesh (a subdivided icosphere drawn on canvas),
   read as a network of nodes and links. The whole object drifts with mouse parallax on springs. */

type V3 = [number, number, number];

function icosphere(subdiv: number) {
  const t = (1 + Math.sqrt(5)) / 2;
  let verts: V3[] = [
    [-1, t, 0], [1, t, 0], [-1, -t, 0], [1, -t, 0],
    [0, -1, t], [0, 1, t], [0, -1, -t], [0, 1, -t],
    [t, 0, -1], [t, 0, 1], [-t, 0, -1], [-t, 0, 1],
  ];
  let faces: [number, number, number][] = [
    [0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11],
    [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8],
    [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9],
    [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1],
  ];
  const norm = (v: V3): V3 => {
    const l = Math.hypot(...v);
    return [v[0] / l, v[1] / l, v[2] / l];
  };
  verts = verts.map(norm);
  for (let s = 0; s < subdiv; s++) {
    const cache = new Map<string, number>();
    const mid = (a: number, b: number) => {
      const k = a < b ? `${a}-${b}` : `${b}-${a}`;
      const hit = cache.get(k);
      if (hit !== undefined) return hit;
      const va = verts[a], vb = verts[b];
      verts.push(norm([(va[0] + vb[0]) / 2, (va[1] + vb[1]) / 2, (va[2] + vb[2]) / 2]));
      cache.set(k, verts.length - 1);
      return verts.length - 1;
    };
    const next: typeof faces = [];
    for (const [a, b, c] of faces) {
      const ab = mid(a, b), bc = mid(b, c), ca = mid(c, a);
      next.push([a, ab, ca], [b, bc, ab], [c, ca, bc], [ab, bc, ca]);
    }
    faces = next;
  }
  const edges = new Set<string>();
  for (const [a, b, c] of faces) {
    for (const [p, q] of [[a, b], [b, c], [c, a]]) edges.add(p < q ? `${p}-${q}` : `${q}-${p}`);
  }
  return { verts, edges: [...edges].map((e) => e.split("-").map(Number) as [number, number]) };
}

function MeshCanvas({ mx, my, still, pal }: { mx: MotionValue<number>; my: MotionValue<number>; still: boolean; pal: (typeof ART)["night"] }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const { verts, edges } = icosphere(2);
    // A few nodes act as "alarms" that pulse cyan.
    const hot = new Set([3, 17, 29, 44, 58, 71, 90, 113, 130, 151]);
    let raf = 0;
    let size = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      size = canvas.clientWidth;
      canvas.width = size * dpr;
      canvas.height = size * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const draw = (time: number) => {
      const t = still ? 0.6 : time / MOTION.orbSpinMs;
      const ay = t * Math.PI * 2 * 0.35 + mx.get() * 0.6;
      const ax = 0.35 + my.get() * 0.45;
      const cy = Math.cos(ay), sy = Math.sin(ay), cx = Math.cos(ax), sx = Math.sin(ax);
      const R = size * 0.36;
      const c = size / 2;
      const proj = verts.map(([x, y, z]) => {
        const x1 = x * cy + z * sy;
        const z1 = -x * sy + z * cy;
        const y1 = y * cx - z1 * sx;
        const z2 = y * sx + z1 * cx;
        const p = 2.6 / (2.6 + z2);
        return [c + x1 * R * p, c + y1 * R * p, z2] as const;
      });
      ctx.clearRect(0, 0, size, size);
      ctx.lineWidth = 1;
      for (const [a, b] of edges) {
        const pa = proj[a], pb = proj[b];
        const depth = (pa[2] + pb[2]) / 2; // -1 front .. 1 back
        const alpha = 0.06 + (1 - (depth + 1) / 2) * 0.32;
        ctx.strokeStyle = `rgba(${pal.line},${alpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.moveTo(pa[0], pa[1]);
        ctx.lineTo(pb[0], pb[1]);
        ctx.stroke();
      }
      const pulse = still ? 0.6 : (Math.sin(time / MOTION.orbPulseMs) + 1) / 2;
      proj.forEach(([x, y, z], i) => {
        const front = 1 - (z + 1) / 2;
        if (hot.has(i)) {
          ctx.fillStyle = `rgba(${pal.accent},${(0.35 + front * 0.65).toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(x, y, 2.2 + pulse * 2.2 * front, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillStyle = `rgba(${pal.fg},${(0.12 + front * 0.6).toFixed(3)})`;
          ctx.fillRect(x - 1, y - 1, 2, 2);
        }
      });
      if (!still) raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [mx, my, still, pal]);

  return <canvas ref={ref} className="absolute inset-0 h-full w-full" aria-hidden />;
}

export function Orb({ className = "" }: { className?: string }) {
  const reduce = useCalm();
  const { theme } = useSettings();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 50, damping: 18, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 50, damping: 18, mass: 0.6 });
  const x = useTransform(sx, [-1, 1], [-36, 36]);
  const y = useTransform(sy, [-1, 1], [-28, 28]);
  const rotX = useTransform(sy, [-1, 1], [14, -14]);
  const rotY = useTransform(sx, [-1, 1], [-14, 14]);
  const hx = useTransform(sx, [-1, 1], [62, 38]); // highlight follows the light
  const hy = useTransform(sy, [-1, 1], [36, 20]);
  const highlight = useTransform(
    [hx, hy] as MotionValue<number>[],
    ([a, b]: number[]) =>
      `radial-gradient(circle at ${a}% ${b}%, color-mix(in oklab, var(--color-fg) 22%, transparent), color-mix(in oklab, var(--color-fg) 4%, transparent) 32%, color-mix(in oklab, var(--color-cyan) 5%, transparent) 62%, transparent 72%)`,
  );

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: PointerEvent) => {
      mx.set((e.clientX / window.innerWidth) * 2 - 1);
      my.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my, reduce]);

  return (
    <motion.div
      aria-hidden
      className={`pointer-events-none aspect-square ${className}`}
      style={{ x, y, rotateX: rotX, rotateY: rotY, transformPerspective: 1200 }}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 40, damping: 16, delay: 0.2 }}
    >
      <motion.div
        className="relative h-full w-full"
        animate={reduce ? undefined : { y: [0, -14, 0] }}
        transition={{ duration: MOTION.orbFloatSeconds, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* cyan bloom */}
        <div className="absolute inset-[18%] rounded-full bg-cyan/20 blur-[90px]" />
        {/* orbit rings */}
        <div className="absolute inset-[-6%] rounded-full border border-fg/[0.06]" style={{ transform: "rotateX(72deg)" }} />
        <div className="absolute inset-[4%] rounded-full border border-cyan/15" style={{ transform: "rotateX(72deg) rotateY(18deg)" }} />
        {/* glass sphere */}
        <motion.div
          className="absolute inset-[8%] overflow-hidden rounded-full border border-fg/10 backdrop-blur-[2px]"
          style={{
            backgroundImage: highlight,
            boxShadow:
              "inset 0 0 60px color-mix(in oklab, var(--color-fg) 5%, transparent), inset -30px -40px 80px color-mix(in oklab, var(--color-cyan) 6%, transparent), 0 40px 120px var(--orb-shadow)",
          }}
        >
          <MeshCanvas mx={sx} my={sy} still={reduce} pal={ART[theme]} />
        </motion.div>
        {/* rim light */}
        <div className="absolute inset-[8%] rounded-full [background:conic-gradient(from_210deg,transparent_0deg,color-mix(in_oklab,var(--color-cyan)_25%,transparent)_40deg,transparent_90deg)] [mask:radial-gradient(circle,transparent_69%,#000_70.5%)]" />
      </motion.div>
    </motion.div>
  );
}
