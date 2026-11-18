import type { ReactNode, AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

const base =
  "group relative inline-flex min-h-11 items-center justify-center gap-2 px-5 py-2.5 font-mono text-[13px] uppercase tracking-wide text-ink select-none " +
  "border transition-[transform,box-shadow,background-color] duration-100 ease-out will-change-transform";

// Neo-brutalist tactility + glass glow: translucent glass fill, crisp 1px border,
// hard cyan offset shadow that depresses on click.
const variants = {
  primary:
    "bg-fg/[0.06] backdrop-blur-md border-fg/80 shadow-[4px_4px_0px_var(--color-cyan)] " +
    "hover:bg-fg/[0.1] hover:shadow-[5px_5px_0px_var(--color-cyan)] hover:-translate-x-px hover:-translate-y-px " +
    "active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_var(--color-cyan)]",
  ghost:
    "bg-fg/[0.02] backdrop-blur-md border-fg/20 shadow-[4px_4px_0px_color-mix(in_oklab,var(--color-fg)_12%,transparent)] " +
    "hover:border-fg/60 hover:bg-fg/[0.06] " +
    "active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_color-mix(in_oklab,var(--color-fg)_12%,transparent)]",
};

type Variant = keyof typeof variants;

export function ButtonLink({
  variant = "primary",
  className = "",
  children,
  ...rest
}: AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: Variant }) {
  const external = rest.href?.startsWith("http");
  return (
    <a
      className={`${base} ${variants[variant]} ${className}`}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      {...rest}
    >
      {children}
    </a>
  );
}

export function Button({
  variant = "primary",
  className = "",
  children,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return (
    <button type="button" className={`${base} ${variants[variant]} cursor-pointer ${className}`} {...rest}>
      {children}
    </button>
  );
}

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={`size-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${className}`} aria-hidden>
      <path d="M4 12 12 4M5.5 4H12v6.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function Tag({ children, accent = false }: { children: ReactNode; accent?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 border px-2 py-1 font-mono text-[12px] uppercase leading-none tracking-wider ${
        accent ? "border-cyan/40 text-cyan" : "border-fg/12 text-dim"
      }`}
    >
      {children}
    </span>
  );
}

// Section heading with a mono label and crosshair marks on the frame.
export function SectionHead({ label, title, aside }: { label: string; title: ReactNode; aside?: ReactNode }) {
  return (
    <div className="mb-10 grid gap-6 lg:mb-14 lg:grid-cols-12 lg:items-end">
      <div className="lg:col-span-8">
        <p className="mb-4 font-mono text-[13px] uppercase tracking-[0.18em] text-cyan">/ {label}</p>
        <h2 className="font-serif text-[clamp(2.4rem,4.6vw,4rem)] leading-[0.95] tracking-[-0.02em] text-balance">{title}</h2>
      </div>
      {aside && <div className="text-[15px] leading-relaxed text-dim lg:col-span-4 lg:pb-2">{aside}</div>}
    </div>
  );
}

export function Section({ id, children, className = "" }: { id?: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} className={`relative border-t border-hair ${className}`}>
      <Cross className="-left-[5px] -top-[5px]" />
      <Cross className="-right-[5px] -top-[5px]" />
      <div className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28">{children}</div>
    </section>
  );
}

export function Cross({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 9 9" className={`pointer-events-none absolute z-10 hidden size-[9px] sm:block text-fg/60 ${className}`} aria-hidden>
      <path d="M4.5 0v9M0 4.5h9" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}
