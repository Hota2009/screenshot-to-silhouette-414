import { createFileRoute } from "@tanstack/react-router";
import { MotionConfig } from "framer-motion";

import { About } from "@/components/site/About";
import { Clients } from "@/components/site/Clients";
import { Contact } from "@/components/site/Contact";
import { BackToTop, Footer } from "@/components/site/Footer";
import { Hero } from "@/components/site/Hero";
import { Navbar } from "@/components/site/Navbar";
import { Projects } from "@/components/site/Projects";

import { Services } from "@/components/site/Services";
import { Values } from "@/components/site/Values";
import { Mission, Vision } from "@/components/site/VisionMission";
import { WhyUs } from "@/components/site/WhyUs";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/")({
  loaderDeps: ({ search }) => ({ lang: search.lang ?? ("en" as const) }),
  loader: ({ deps }) => deps,
  head: ({ loaderData }) => seoHead(loaderData?.lang ?? "en"),
  component: Index,
});

function Index() {
  return (
    <MotionConfig reducedMotion="user">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Vision />
        <Mission />
        <Values />
        <Services />
        <WhyUs />
        <Clients />
        <Projects />
        <Contact requestedService={null} />
      </main>
      <Footer />
      <BackToTop />
    </MotionConfig>
  );
}
