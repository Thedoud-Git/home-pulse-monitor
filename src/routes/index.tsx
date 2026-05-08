import { createFileRoute } from "@tanstack/react-router";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Philosophy from "@/components/Philosophy";
import Protocol from "@/components/Protocol";
import SocialProof from "@/components/SocialProof";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "HomePulse — Le diagnostic vient à vous" },
      {
        name: "description",
        content:
          "HomePulse — diagnostic biologique au plus près du patient. Une medtech bienveillante, pensée par et pour les soignants.",
      },
      {
        property: "og:title",
        content: "HomePulse — Le diagnostic vient à vous",
      },
      {
        property: "og:description",
        content:
          "Des analyses biologiques fiables, là où vous êtes — sans devoir vous déplacer.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="relative bg-cream text-charcoal min-h-screen overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Philosophy />
        <Protocol />
        <SocialProof />
        <Pricing />
      </main>
      <Footer />
      <div className="noise-overlay grain-bg" aria-hidden />
    </div>
  );
}
