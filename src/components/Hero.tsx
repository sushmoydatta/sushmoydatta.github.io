import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type Variants } from "framer-motion";
import { profile, marquee, stats } from "../data";
import { Orb } from "./Orb";
import { Marquee } from "./Marquee";
import { ButtonLink, Arrow, Tag, Cross } from "./ui";

const letters: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.045, delayChildren: 0.15 } },
};
const letter: Variants = {
  hidden: { y: "105%", rotate: 6, opacity: 0 },
  show: { y: "0%", rotate: 0, opacity: 1, transition: { type: "spring", stiffness: 140, damping: 18, mass: 0.8 } },
};
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number = 0) => ({ opacity: 1, y: 0, transition: { type: "spring", stiffness: 90, damping: 20, delay: 0.7 + i * 0.08 } }),
};

function KineticLine({ text, className = "" }: { text: string; className?: string }) {
  return (
    <motion.span variants={letters} initial="hidden" animate="show" className={`flex overflow-hidden pb-[0.08em] ${className}`} aria-hidden>
      {[...text].map((ch, i) => (
        <motion.span key={i} variants={letter} className="inline-block origin-bottom-left">
          {ch}
        </motion.span>
      ))}
    </motion.span>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const x1 = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-14%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "12%"]);
  const orbY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "28%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, reduce ? 1 : 0.2]);

  return (
    <header ref={ref} id="top" className="relative overflow-hidden pt-16">
      {/* Orb sits behind the headline */}
      <motion.div style={{ y: orbY }} className="pointer-events-none absolute right-[-18%] top-[8%] z-0 w-[95vw] max-w-[680px] opacity-70 sm:right-[-6%] sm:w-[70vw] sm:opacity-100 lg:right-[2%] lg:top-[6%] lg:w-[52vw]">
        <Orb className="w-full" />
      </motion.div>

      <div className="relative z-10 px-5 pt-10 sm:px-8 lg:px-12 lg:pt-14">
        {/* technical metadata */}
        <motion.div variants={fadeUp} initial="hidden" animate="show" custom={-6} className="flex flex-wrap items-center gap-2">
          <Tag>Portfolio / 2026</Tag>
          <Tag>{profile.location}</Tag>
          <Tag>{profile.coords}</Tag>
          <span className="ml-auto hidden sm:inline-flex">
            <Tag accent>
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-75" />
                <span className="relative inline-flex size-1.5 rounded-full bg-cyan" />
              </span>
              Available
            </Tag>
          </span>
        </motion.div>

        <motion.h1 style={{ opacity: fade }} className="mt-10 font-serif text-[clamp(4.6rem,17vw,15.5rem)] leading-[0.82] tracking-[-0.035em] lg:mt-14">
          <span className="sr-only">{profile.name}</span>
          <motion.span style={{ x: x1 }} className="block">
            <KineticLine text={profile.first} />
          </motion.span>
          <motion.span style={{ x: x2 }} className="block pl-[14%] italic text-white/90">
            <KineticLine text={profile.last} className="" />
          </motion.span>
        </motion.h1>

        <div className="mt-12 grid gap-10 pb-14 lg:mt-16 lg:grid-cols-12 lg:gap-6 lg:pb-20">
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0} className="lg:col-span-5">
            <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-cyan">{profile.title}</p>
            <p className="mt-4 max-w-[46ch] text-[clamp(1.125rem,1.6vw,1.375rem)] leading-snug text-ink/90 text-pretty">{profile.tagline}</p>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={1} className="flex flex-wrap items-start gap-4 lg:col-span-4 lg:col-start-7">
            <ButtonLink href="#work">
              View work <Arrow className="rotate-90" />
            </ButtonLink>
            <ButtonLink href="#contact" variant="ghost">
              Get in touch
            </ButtonLink>
          </motion.div>

          <motion.dl variants={fadeUp} initial="hidden" animate="show" custom={2} className="grid grid-cols-2 gap-x-6 gap-y-3 font-mono text-[12px] uppercase tracking-wider lg:col-span-2 lg:grid-cols-1">
            {[
              ["Now", "Searchlite · GP"],
              ["Focus", "Network analytics"],
              ["Edu", "M.Tech, IIT (ISM)"],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="text-white/40">{k}</dt>
                <dd className="mt-0.5 text-ink">{v}</dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </div>

      {/* kinetic marquee band */}
      <div className="relative z-10 border-y border-hair bg-obsidian/60 backdrop-blur-sm">
        <Cross className="-left-[5px] -top-[5px]" />
        <Cross className="-right-[5px] -top-[5px]" />
        <Marquee items={marquee} />
      </div>

      {/* headline figures */}
      <dl className="relative z-10 grid grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.value}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: i * 0.07 }}
            className={`flex flex-col border-hair px-5 py-8 sm:px-8 lg:px-12 ${i % 2 === 0 ? "border-r" : ""} ${i < 2 ? "border-b lg:border-b-0" : ""} lg:border-r lg:last:border-r-0`}
          >
            <dt className="order-2 mt-3 text-[14px] leading-snug text-dim">{s.label}</dt>
            <dd className="order-1 font-serif text-[clamp(2.5rem,4.4vw,4rem)] leading-none tracking-tight text-ink">{s.value}</dd>
          </motion.div>
        ))}
      </dl>
    </header>
  );
}
