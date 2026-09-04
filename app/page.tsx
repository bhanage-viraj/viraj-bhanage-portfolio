import { About } from "@/components/about";
import { Achievements } from "@/components/achievements";
import { Experience } from "@/components/experience";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { OpenSource } from "@/components/open-source";
import { Press } from "@/components/press";
import { WorkGrid } from "@/components/work-grid";

export default function HomePage() {
  return (
    <main id="main">
      <Hero />
      <About />
      <WorkGrid />
      <OpenSource />
      <Achievements />
      <Press />
      <Experience />
      <Footer />
    </main>
  );
}
