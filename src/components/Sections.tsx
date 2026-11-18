import { useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { about, certifications, education, experience, leadership, profile, skills } from "../data";
import portrait from "../assets/portrait.jpg";
import { Arrow, Button, ButtonLink, Section, SectionHead } from "./ui";
import { Marquee } from "./Marquee";

const rise = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
};
const spring = (delay = 0) => ({ type: "spring" as const, stiffness: 100, damping: 20, delay });

export function Nav() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const links = [
    ["Work", "#work"],
    ["About", "#about"],
    ["Experience", "#experience"],
    ["Skills", "#skills"],
  ];
  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-hair bg-obsidian/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1320px] items-center gap-6 border-x border-hair px-5 sm:px-8 lg:px-12">
        <a href="#top" className="flex items-center gap-3">
          <span className="grid size-8 place-items-center border border-white/70 font-serif text-lg italic leading-none">SD</span>
          <span className="hidden font-mono text-[12px] uppercase tracking-[0.16em] text-ink sm:inline">{profile.name}</span>
        </a>
        <div className="ml-auto hidden items-center gap-7 md:flex">
          {links.map(([l, h]) => (
            <a key={h} href={h} className="font-mono text-[12px] uppercase tracking-[0.14em] text-dim transition-colors hover:text-ink">
              {l}
            </a>
          ))}
        </div>
        <ButtonLink href="#contact" className="ml-auto min-h-9 px-4 py-1.5 text-[12px] md:ml-0">
          Contact
        </ButtonLink>
      </div>
      <motion.div className="absolute bottom-[-1px] left-0 h-px w-full origin-left bg-cyan" style={{ scaleX: progress }} />
    </nav>
  );
}

export function About() {
  return (
    <Section id="about">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-6">
        <motion.figure {...rise} transition={spring()} className="lg:col-span-4">
          <div className="group relative max-w-[340px] border border-white/10 bg-white/[0.03] p-3 backdrop-blur-xl">
            <img src={portrait} alt="Portrait of Sushmoy Datta" className="aspect-square w-full object-cover grayscale contrast-110 transition duration-500 group-hover:grayscale-0" />
            <span className="absolute left-3 top-3 h-4 w-4 border-l border-t border-cyan" />
            <span className="absolute bottom-3 right-3 h-4 w-4 border-b border-r border-cyan" />
          </div>
          <figcaption className="mt-4 font-mono text-[11px] uppercase tracking-wider text-white/45">
            {profile.name} · {profile.location}
          </figcaption>
        </motion.figure>

        <div className="lg:col-span-7 lg:col-start-6">
          <p className="mb-4 font-mono text-[12px] uppercase tracking-[0.18em] text-cyan">/ About</p>
          <motion.p {...rise} transition={spring(0.05)} className="font-serif text-[clamp(2.2rem,4.2vw,3.75rem)] leading-[1.02] tracking-[-0.015em] text-balance">
            {about.lead}
          </motion.p>
          {about.body.map((b, i) => (
            <motion.p key={i} {...rise} transition={spring(0.1 + i * 0.06)} className="mt-6 max-w-[62ch] text-[17px] leading-relaxed text-dim">
              {b}
            </motion.p>
          ))}
          <motion.dl {...rise} transition={spring(0.25)} className="mt-10 grid grid-cols-1 border-t border-hair sm:grid-cols-3">
            {[
              ["Based in", profile.location],
              ["Focus", "Network analytics, RCA, telecom automation"],
              ["Open to", "Network analytics, telecom automation and 5G/6G roles"],
            ].map(([k, v]) => (
              <div key={k} className="border-b border-hair py-4 sm:border-b-0 sm:pr-4">
                <dt className="font-mono text-[11px] uppercase tracking-wider text-white/40">{k}</dt>
                <dd className="mt-1.5 text-[15px] text-ink">{v}</dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </div>
    </Section>
  );
}

export function Experience() {
  return (
    <Section id="experience">
      <SectionHead label="Experience" title={<>Operations first, <em className="text-white/60">analytics on top.</em></>} />
      <ol className="border-t border-hair">
        {experience.map((r, i) => (
          <motion.li key={r.title} {...rise} transition={spring(i * 0.05)} className="group grid gap-4 border-b border-hair py-8 lg:grid-cols-12 lg:gap-6 lg:py-10">
            <div className="font-mono text-[12px] uppercase tracking-wider text-dim lg:col-span-3">
              <span className="whitespace-nowrap">{r.when}</span>
              <span className="mt-1 block text-white/35">{r.place}</span>
            </div>
            <div className="lg:col-span-4">
              <h3 className="font-serif text-[clamp(1.6rem,2.4vw,2.1rem)] leading-[1.05] text-ink">
                {r.title}
                {r.current && (
                  <span className="ml-3 inline-flex translate-y-[-4px] items-center gap-1.5 border border-cyan/40 px-1.5 py-0.5 align-middle font-mono text-[10px] uppercase tracking-wider text-cyan">
                    <span className="size-1.5 rounded-full bg-cyan" />
                    Now
                  </span>
                )}
              </h3>
              <p className="mt-2 text-[15px] text-dim">{r.org}</p>
            </div>
            <ul className="space-y-2.5 lg:col-span-5">
              {r.points.map((pt) => (
                <li key={pt} className="relative pl-5 text-[15px] leading-relaxed text-ink/85">
                  <span className="absolute left-0 top-[0.7em] h-px w-2.5 bg-cyan" />
                  {pt}
                </li>
              ))}
            </ul>
          </motion.li>
        ))}
      </ol>
    </Section>
  );
}

export function Skills() {
  return (
    <Section id="skills">
      <SectionHead label="Skills" title={<>From the radio layer <em className="text-white/60">to the dashboard.</em></>} />
      <div className="grid grid-cols-1 gap-px border border-hair bg-hair sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((g, i) => (
          <motion.div key={g.group} {...rise} transition={spring(i * 0.05)} className="bg-obsidian p-6 sm:p-7">
            <h3 className="font-mono text-[12px] uppercase tracking-[0.16em] text-cyan">{g.group}</h3>
            <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-1.5">
              {g.items.map((s, j) => (
                <li key={s} className="text-[16px] text-ink/90">
                  {s}
                  {j < g.items.length - 1 && <span className="ml-3 text-white/20">/</span>}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

export function Credentials() {
  return (
    <Section>
      <div className="grid gap-14 lg:grid-cols-3 lg:gap-8">
        <div>
          <p className="mb-6 font-mono text-[12px] uppercase tracking-[0.18em] text-cyan">/ Education</p>
          <ul className="space-y-7">
            {education.map((e) => (
              <motion.li key={e.degree} {...rise} transition={spring()}>
                <p className="font-mono text-[11px] uppercase tracking-wider text-white/40">
                  {e.when} · {e.result}
                </p>
                <h3 className="mt-1.5 font-serif text-[26px] leading-[1.08]">{e.degree}</h3>
                <p className="mt-1 text-[15px] text-dim">{e.school}</p>
              </motion.li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-6 font-mono text-[12px] uppercase tracking-[0.18em] text-cyan">/ Leadership & awards</p>
          <ul className="space-y-6">
            {leadership.map((l) => (
              <motion.li key={l.title} {...rise} transition={spring(0.05)}>
                <h3 className="font-serif text-[24px] leading-[1.1]">{l.title}</h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-dim">{l.detail}</p>
              </motion.li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-6 font-mono text-[12px] uppercase tracking-[0.18em] text-cyan">/ Certifications</p>
          <ul className="border-t border-hair">
            {certifications.map((c) => (
              <motion.li key={c.name} {...rise} transition={spring(0.1)} className="flex items-baseline justify-between gap-4 border-b border-hair py-3.5">
                <span>
                  <span className="block text-[15px] text-ink">{c.name}</span>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-white/40">{c.by}</span>
                </span>
                <span className="font-mono text-[12px] text-dim">{c.year}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

export function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
    } catch {
      setCopied(false);
    }
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <section id="contact" className="relative border-t border-hair">
      <div className="border-b border-hair">
        <Marquee items={["Let's talk", "Network analytics", "Telecom automation", "5G / 6G"]} baseVelocity={1.6} outline />
      </div>
      <div className="grid gap-12 px-5 py-20 sm:px-8 lg:grid-cols-12 lg:gap-6 lg:px-12 lg:py-28">
        <div className="lg:col-span-7">
          <p className="mb-4 font-mono text-[12px] uppercase tracking-[0.18em] text-cyan">/ Contact</p>
          <motion.h2 {...rise} transition={spring()} className="font-serif text-[clamp(3rem,7vw,6.5rem)] leading-[0.92] tracking-[-0.025em] text-balance">
            Have a network that needs <em className="text-white/60">explaining?</em>
          </motion.h2>
          <p className="mt-6 max-w-[48ch] text-[17px] leading-relaxed text-dim">
            I'm open to roles and collaborations in network analytics, telecom automation and 5G/6G. Email is the quickest way to reach me.
          </p>
        </div>
        <div className="flex flex-col justify-end gap-6 lg:col-span-4 lg:col-start-9">
          <a href={`mailto:${profile.email}`} className="group block border-b border-white/20 pb-3 font-serif text-[clamp(1.5rem,2.4vw,2rem)] leading-tight break-all transition-colors hover:border-cyan">
            {profile.email}
          </a>
          <div className="flex flex-wrap gap-4">
            <ButtonLink href={`mailto:${profile.email}`}>
              Email me <Arrow />
            </ButtonLink>
            <Button variant="ghost" onClick={copy} aria-live="polite">
              {copied ? "Copied" : "Copy email"}
            </Button>
          </div>
          <div className="flex flex-wrap gap-4">
            <ButtonLink href={profile.linkedin} variant="ghost">
              LinkedIn <Arrow />
            </ButtonLink>
            <ButtonLink href={profile.github} variant="ghost">
              GitHub <Arrow />
            </ButtonLink>
          </div>
        </div>
      </div>
      <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-hair px-5 py-6 font-mono text-[11px] uppercase tracking-wider text-white/40 sm:px-8 lg:px-12">
        <span>© 2026 {profile.name}</span>
        <span>{profile.coords} · Built with React, Tailwind & Framer Motion</span>
      </footer>
    </section>
  );
}
