import Hero from "./components/Hero";
import AboutNamingCeremony from "./components/AboutNamingCeremony";
import CountdownTimer from "./components/CountdownTimer";
import CeremonyDetails from "./components/CeremonyDetails";
import AboutTheName from "./components/AboutTheName";
import ImageGallery from "./components/ImageGallery";
import RSVPForm from "./components/RSVPForm";
import Footer from "./components/Footer";
import AnimatedSection from "./components/AnimatedSection";

export default function Home() {
  const ceremonyDate = new Date("2026-03-17T15:00:00");

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 via-rose-100 to-pink-50">
      <Hero />

      <AnimatedSection animation="fade-up" delay={0}>
        <AboutNamingCeremony />
      </AnimatedSection>

      <AnimatedSection animation="fade-up" delay={100}>
        <section className="max-w-2xl mx-auto px-4 mb-12">
          <h2 className="text-2xl font-bold text-center text-rose-700 mb-4">
            Counting Down
          </h2>
          <CountdownTimer targetDate={ceremonyDate} />
        </section>
      </AnimatedSection>

      <AnimatedSection animation="fade-left" delay={0}>
        <CeremonyDetails
          date="March 17th, 2026"
          time="3:00 PM"
          address="5 Jay St, Worcester, MA"
          startDate={ceremonyDate}
        />
      </AnimatedSection>

      <AnimatedSection animation="fade-right" delay={0}>
        <AboutTheName
          name="Athena"
          origin="Greek"
          meaning="Athena is the ancient Greek goddess of wisdom, courage, inspiration, civilization, law and justice, strategic warfare, mathematics, strength, strategy, the arts, crafts, and skill."
          reason="We hope our daughter will grow to embody the qualities of her namesake — wisdom, strength, and creativity. Athena represents the perfect balance of intelligence and courage, and we believe this name will inspire her to be a thoughtful leader and a fierce protector of those she loves."
        />
      </AnimatedSection>

      <AnimatedSection animation="zoom" delay={0}>
        <section className="max-w-4xl mx-auto px-4 mb-12">
          <h2 className="text-3xl font-bold text-center text-rose-700 mb-6">
            Gallery 📸
          </h2>
          <ImageGallery />
        </section>
      </AnimatedSection>

      <AnimatedSection animation="fade-up" delay={0}>
        <section className="max-w-md mx-auto px-4 pb-16">
          <h2 className="text-3xl font-bold text-center text-rose-700 mb-6">
            RSVP 💌
          </h2>
          <RSVPForm />
        </section>
      </AnimatedSection>

      <Footer />
    </div>
  );
}
