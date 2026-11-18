import { useEffect, useRef, useState } from "react";
import { LAYOUTS, THEMES, useSettings, type Layout, type Theme } from "../settings";

/* Nav control: pick colour theme (Night / Day / Blueprint) and layout (Showcase / Simple). */
export function DisplayMenu() {
  const { theme, setTheme, layout, setLayout } = useSettings();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-label="Display settings: theme and layout"
        aria-expanded={open}
        aria-controls="display-panel"
        onClick={() => setOpen((o) => !o)}
        className="grid size-9 cursor-pointer place-items-center border border-fg/20 text-ink transition-colors hover:border-fg/60"
      >
        <ThemeIcon theme={theme} />
      </button>

      {open && (
        <div
          id="display-panel"
          className="absolute right-0 top-[calc(100%+12px)] z-50 w-[min(18rem,calc(100vw-2.5rem))] border border-fg/15 bg-obsidian/95 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl"
        >
          <Choice<Theme> label="Theme" options={THEMES} value={theme} onChange={setTheme} />
          <Choice<Layout> label="Layout" options={LAYOUTS} value={layout} onChange={setLayout} />
          <p className="mt-3 text-[13px] leading-snug text-dim">
            {layout === "simple"
              ? "Simple: smaller headings, one column, almost no motion."
              : "Showcase: the full design with animation."}
          </p>
        </div>
      )}
    </div>
  );
}

function Choice<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly { id: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <fieldset className="mt-4 first:mt-0">
      <legend className="font-mono text-[12px] uppercase tracking-wider text-dim">{label}</legend>
      <div className="mt-2 grid gap-1.5" style={{ gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` }}>
        {options.map((o) => {
          const on = o.id === value;
          return (
            <button
              key={o.id}
              type="button"
              aria-pressed={on}
              onClick={() => onChange(o.id)}
              className={`cursor-pointer border px-2 py-2 font-mono text-[12px] uppercase tracking-wide transition-colors ${
                on ? "border-cyan bg-cyan/10 text-cyan" : "border-fg/15 text-ink/80 hover:border-fg/40"
              }`}
            >
              {o.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

function ThemeIcon({ theme }: { theme: Theme }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.5 } as const;
  return (
    <svg viewBox="0 0 20 20" className="size-[18px]" aria-hidden>
      {theme === "night" && <path d="M15.5 12.5A6.5 6.5 0 0 1 7.5 4.5a6.5 6.5 0 1 0 8 8Z" {...common} />}
      {theme === "day" && (
        <g {...common}>
          <circle cx="10" cy="10" r="3.5" />
          <path d="M10 1.5v2.5M10 16v2.5M1.5 10H4M16 10h2.5M4 4l1.8 1.8M14.2 14.2 16 16M4 16l1.8-1.8M14.2 5.8 16 4" />
        </g>
      )}
      {theme === "blueprint" && <path d="M2.5 2.5h15v15h-15ZM7.5 2.5v15M12.5 2.5v15M2.5 7.5h15M2.5 12.5h15" {...common} />}
    </svg>
  );
}
