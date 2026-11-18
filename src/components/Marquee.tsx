import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";

const wrap = (min: number, max: number, v: number) => {
  const r = max - min;
  return ((((v - min) % r) + r) % r) + min;
};

/* Scroll-linked kinetic marquee: drifts on its own, speeds up with scroll velocity
   and flips direction when the reader scrolls back up. */
export function Marquee({ items, baseVelocity = -2.2, outline = false }: { items: string[]; baseVelocity?: number; outline?: boolean }) {
  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smooth = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const factor = useTransform(smooth, [-1000, 0, 1000], [-4, 0, 4], { clamp: false });
  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);
  const dir = useRef(1);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    let move = dir.current * baseVelocity * (delta / 1000);
    const f = factor.get();
    if (f < 0) dir.current = -1;
    else if (f > 0) dir.current = 1;
    move += dir.current * move * f;
    baseX.set(baseX.get() + move);
  });

  const row = (
    <span className="flex shrink-0 items-center">
      {items.map((t) => (
        <span key={t} className="flex items-center">
          <span
            className={`whitespace-nowrap px-6 font-serif text-[clamp(2.5rem,6vw,5rem)] italic leading-none ${
              outline ? "text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.35)]" : "text-ink"
            }`}
          >
            {t}
          </span>
          <span className="font-mono text-sm text-cyan">✦</span>
        </span>
      ))}
    </span>
  );

  return (
    <div className="overflow-hidden py-5" aria-hidden>
      <motion.div className="flex w-max" style={{ x }}>
        {row}
        {row}
        {row}
        {row}
      </motion.div>
    </div>
  );
}
