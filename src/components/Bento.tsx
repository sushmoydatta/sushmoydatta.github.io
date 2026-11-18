import { useRef, type MouseEvent } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring, type Variants } from "framer-motion";
import { MOTION } from "../motion";
import { useCalm, useSettings } from "../settings";
import { projects, type Project } from "../data";
import { ProjectArt } from "./ProjectArt";
import { Arrow, Section, SectionHead, Tag } from "./ui";

const grid: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: MOTION.cardStagger } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 48, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: MOTION.cardSpring },
};

function TiltCard({ p }: { p: Project }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useCalm();
  const simple = useSettings().layout === "simple";
  const rx = useSpring(0, { stiffness: 200, damping: 20 });
  const ry = useSpring(0, { stiffness: 200, damping: 20 });
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);
  const glow = useMotionTemplate`radial-gradient(420px circle at ${gx}% ${gy}%, color-mix(in oklab, var(--color-cyan) 10%, transparent), transparent 60%)`;
  const big = p.id === "rca";

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const b = el.getBoundingClientRect();
    const px = (e.clientX - b.left) / b.width;
    const py = (e.clientY - b.top) / b.height;
    gx.set(px * 100);
    gy.set(py * 100);
    if (reduce) return;
    const k = big ? MOTION.cardTilt * 0.6 : MOTION.cardTilt; // larger cards tilt less
    ry.set((px - 0.5) * k * 2);
    rx.set(-(py - 0.5) * k * 2);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  const Body = (
    <>
      <motion.div aria-hidden className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ backgroundImage: glow }} />
      <div className="relative flex items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <Tag accent={p.kind === "Work"}>{p.kind}</Tag>
          {p.note && <span className="font-mono text-[12px] uppercase tracking-wider text-fg/60">{p.note}</span>}
        </div>
        {p.link && (
          <span className="inline-flex items-center gap-1.5 font-mono text-[12px] uppercase tracking-wider text-dim transition-colors group-hover:text-cyan">
            GitHub <Arrow />
          </span>
        )}
      </div>

      <div className={`relative my-6 ${big ? "h-40 sm:h-52 lg:h-auto lg:min-h-64 lg:flex-1" : "h-28 sm:h-32"}`} style={{ transform: "translateZ(40px)" }}>
        <ProjectArt kind={p.art} />
      </div>

      <div className="relative mt-auto" style={{ transform: "translateZ(24px)" }}>
        <h3 className={`font-serif leading-[1.02] tracking-[-0.01em] text-ink text-balance ${big ? "text-[clamp(2rem,3.4vw,3rem)]" : "text-[clamp(1.6rem,2.2vw,2rem)]"}`}>{p.title}</h3>
        <p className="mt-3 max-w-[62ch] text-[15px] leading-relaxed text-dim">{p.summary}</p>

        {p.figures && (
          <dl className="mt-5 grid grid-cols-2 border-t border-fg/10 sm:grid-cols-4">
            {p.figures.map((f) => (
              <div key={f.l} className="flex flex-col border-fg/10 py-3 pr-3 [&:not(:last-child)]:sm:border-r sm:pl-3 sm:first:pl-0">
                <dd className="order-1 font-serif text-[28px] leading-none text-ink">{f.v}</dd>
                <dt className="order-2 mt-1.5 font-mono text-[12px] uppercase tracking-wider text-fg/60">{f.l}</dt>
              </div>
            ))}
          </dl>
        )}

        <ul className="mt-5 flex flex-wrap gap-1.5">
          {p.stack.map((s) => (
            <li key={s} className="border border-fg/10 bg-fg/[0.03] px-2 py-1 font-mono text-[12px] text-fg/70">
              {s}
            </li>
          ))}
        </ul>
      </div>
    </>
  );

  const cls =
    "group relative flex h-full flex-col overflow-hidden bg-fg/[0.03] backdrop-blur-xl border border-fg/10 p-6 sm:p-7 transition-colors duration-300 hover:border-fg/25";

  return (
    <motion.div variants={item} className={simple ? "" : p.span} style={{ perspective: 1100 }}>
      <motion.div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }} className="h-full">
        {p.link ? (
          <a href={p.link} target="_blank" rel="noreferrer" className={cls} aria-label={`${p.title} on GitHub`}>
            {Body}
          </a>
        ) : (
          <article className={cls}>{Body}</article>
        )}
      </motion.div>
    </motion.div>
  );
}

export function Bento() {
  const simple = useSettings().layout === "simple";
  return (
    <Section id="work">
      <SectionHead
        label="Selected work"
        title={
          <>
            Network data, <em className="text-fg/60">made legible.</em>
          </>
        }
        aside="Three builds from Grameenphone and Searchlite, three personal projects in ML and LLMs, and two theses in wireless and RF."
      />
      <motion.div
        variants={grid}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className={simple ? "grid grid-cols-1 gap-4 md:grid-cols-2" : "grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-12 lg:gap-5"}
      >
        {projects.map((p) => (
          <TiltCard key={p.id} p={p} />
        ))}
      </motion.div>
    </Section>
  );
}
