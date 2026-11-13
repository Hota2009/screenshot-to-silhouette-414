import { createFileRoute } from "@tanstack/react-router";
import { MotionConfig } from "framer-motion";
import { useState } from "react";

import { About } from "@/components/site/About";
import { Clients } from "@/components/site/Clients";
import { Contact } from "@/components/site/Contact";
import { BackToTop, Footer } from "@/components/site/Footer";
import { Hero } from "@/components/site/Hero";
import { Navbar } from "@/components/site/Navbar";
import { Projects } from "@/components/site/Projects";
import { scrollToId } from "@/components/site/primitives";
import { Services } from "@/components/site/Services";
import { Values } from "@/components/site/Values";
import { Mission, Vision } from "@/components/site/VisionMission";
import { WhyUs } from "@/components/site/WhyUs";
import type { ServiceId } from "@/content/site";

const TITLE =
  "Engine Experts for Maintenance — Electrical & Mechanical Maintenance in Saudi Arabia";
const DESCRIPTION =
  "Engine Experts delivers integrated maintenance and operation of electric motors, pumps, transformers, generators & ATS panels and HVAC systems across Saudi Arabia.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Engine Experts Maintenance Establishment",
          alternateName: "خبراء المحرك للصيانة",
          contactPoint: [
            {
              "@type": "ContactPoint",
              telephone: "+966540950953",
              email: "Engine-expert@outlook.com",
              areaServed: "SA",
              contactType: "customer service",
              name: "Customer Service",
            },
          ],
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [requested, setRequested] = useState<ServiceId | null>(null);

  return (
    <MotionConfig reducedMotion="user">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Vision />
        <Mission />
        <Values />
        <Services
          onRequest={(id) => {
            setRequested(id);
            requestAnimationFrame(() => scrollToId("contact"));
          }}
        />
        <WhyUs />
        <Clients />
        <Projects />
        <Contact requestedService={requested} />
      </main>
      <Footer />
      <BackToTop />
    </MotionConfig>
  );
}
