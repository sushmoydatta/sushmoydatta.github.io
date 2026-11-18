/* Every animation speed on the site, in one place.
   To make things calmer: raise the delays/durations, lower the stiffness.
   Spring "stiffness" = how hard it pulls (higher = faster);
   "damping" = how quickly it settles (higher = less bounce). */

export const MOTION = {
  // Hero name: letters rise in one after another
  heroLetterStagger: 0.07, // seconds between letters (was 0.045)
  heroLetterDelay: 0.2, // wait before the first letter
  heroLetterSpring: { type: "spring", stiffness: 70, damping: 20, mass: 1 } as const, // was 140 / 18

  // Hero tagline, buttons and tags fade up after the name
  heroFadeDelay: 1.0, // was 0.7
  heroFadeStep: 0.12, // was 0.08

  // Section content rising into view
  rise: { type: "spring", stiffness: 60, damping: 20 } as const, // was 100 / 20

  // Project cards
  cardStagger: 0.14, // was 0.09
  cardSpring: { type: "spring", stiffness: 60, damping: 18, mass: 1 } as const, // was 110 / 18
  cardTilt: 5, // degrees of 3D tilt on hover (was 7)

  // Marquee bands
  marqueeSpeed: 0.55, // multiplier on the base drift (1 = old speed)
  marqueeScrollBoost: 1.5, // how much scrolling speeds it up (was 4)

  // Orb
  orbSpinMs: 15000, // one slow rotation cycle (was 9000)
  orbPulseMs: 950, // node glow pulse; ~6s per pulse (was 420, ~2.6s)
  orbFloatSeconds: 10, // up-down float (was 7)
};
