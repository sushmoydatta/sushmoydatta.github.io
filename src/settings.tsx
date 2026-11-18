import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";

/* Visitor display settings: colour theme and layout.
   Stored in localStorage and mirrored onto <html data-theme data-layout>,
   so CSS (index.css) and components read the same values.
   index.html applies the saved values before React loads, so there is no flash. */

export const THEMES = [
  { id: "night", label: "Night" },
  { id: "day", label: "Day" },
  { id: "blueprint", label: "Blueprint" },
] as const;
export type Theme = (typeof THEMES)[number]["id"];

export const LAYOUTS = [
  { id: "showcase", label: "Showcase" },
  { id: "simple", label: "Simple" },
] as const;
export type Layout = (typeof LAYOUTS)[number]["id"];

/* Colours for things drawn in JavaScript (orb canvas, project drawings),
   which cannot read CSS variables. Keep in step with index.css. */
export const ART: Record<Theme, { fg: string; line: string; accent: string; accentHex: string; bg: string }> = {
  night: { fg: "255,255,255", line: "220,250,255", accent: "0,240,255", accentHex: "#00F0FF", bg: "#08080A" },
  day: { fg: "15,23,42", line: "15,23,42", accent: "14,116,144", accentHex: "#0E7490", bg: "#EEF1F5" },
  blueprint: { fg: "255,255,255", line: "255,255,255", accent: "255,138,138", accentHex: "#FF8A8A", bg: "#0C3A6B" },
};

const KEYS = { theme: "sd-theme", layout: "sd-layout" };

function load<T extends string>(key: string, options: readonly { id: T }[], fallback: T): T {
  try {
    const v = localStorage.getItem(key);
    if (options.some((o) => o.id === v)) return v as T;
  } catch {
    /* storage blocked: use the default */
  }
  return fallback;
}

function save(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* storage blocked: the choice lasts for this visit only */
  }
}

type Settings = {
  theme: Theme;
  layout: Layout;
  setTheme: (t: Theme) => void;
  setLayout: (l: Layout) => void;
};

const Ctx = createContext<Settings | null>(null);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => load(KEYS.theme, THEMES, "night"));
  const [layout, setLayout] = useState<Layout>(() => load(KEYS.layout, LAYOUTS, "showcase"));

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", ART[theme].bg);
    save(KEYS.theme, theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.dataset.layout = layout;
    save(KEYS.layout, layout);
  }, [layout]);

  return <Ctx.Provider value={{ theme, layout, setTheme, setLayout }}>{children}</Ctx.Provider>;
}

export function useSettings() {
  const s = useContext(Ctx);
  if (!s) throw new Error("useSettings must be used inside <SettingsProvider>");
  return s;
}

/* True when motion should be kept to a minimum: the visitor's OS asks for
   reduced motion, or they picked the Simple layout. */
export function useCalm() {
  const os = useReducedMotion();
  const { layout } = useSettings();
  return Boolean(os) || layout === "simple";
}
