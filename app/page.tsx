import { About } from "@/components/about";
import { Achievements } from "@/components/achievements";
import { Experience } from "@/components/experience";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { OpenSource } from "@/components/open-source";
import { Press } from "@/components/press";
import { HomeScroll } from "@/components/home-scroll";
import { WorkGrid } from "@/components/work-grid";

export default function HomePage() {
  return (
    <HomeScroll>
      <main id="main" className="animate-fade-in">
        {/* 01 — Intro */}
        <section
          className="page-chapter"
          data-chapter="intro"
          aria-label="Intro"
        >
          <div data-scroll-stop>
            <Hero />
          </div>
          <div data-scroll-stop>
            <About />
          </div>
        </section>

        {/* 02 — Work */}
        <section
          className="page-chapter"
          data-chapter="work"
          aria-label="Work"
        >
          <WorkGrid />
        </section>

        {/* 03 — Achievements */}
        <section
          className="page-chapter"
          data-chapter="achievements"
          aria-label="Achievements"
        >
          <div data-scroll-stop>
            <OpenSource />
          </div>
          <Achievements />
        </section>

        {/* 04 — Contact */}
        <section
          className="page-chapter"
          data-chapter="contact"
          data-scroll-stop
          aria-label="Contact"
        >
          <Press />
          <Experience />
          <Footer />
        </section>
      </main>
    </HomeScroll>
  );
}
