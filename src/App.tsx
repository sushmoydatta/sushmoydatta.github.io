import { MotionConfig } from "framer-motion";
import { GridFrame } from "./components/GridFrame";
import { Hero } from "./components/Hero";
import { Bento } from "./components/Bento";
import { About, Contact, Credentials, Experience, Nav, Skills } from "./components/Sections";

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <GridFrame />
      <Nav />
      <main className="relative z-10 mx-auto max-w-[1320px]">
        <Hero />
        <Bento />
        <About />
        <Experience />
        <Skills />
        <Credentials />
        <Contact />
      </main>
    </MotionConfig>
  );
}
