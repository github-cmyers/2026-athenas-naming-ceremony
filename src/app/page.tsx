import ImageGallery from "./components/ImageGallery";
import RSVPForm from "./components/RSVPForm";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 via-rose-100 to-pink-50">
      {/* Hero Section */}
      <header className="text-center py-16 px-4">
        <div className="text-6xl mb-4">🌸 ✨ 💖</div>
        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-pink-500 via-rose-500 to-pink-400 bg-clip-text text-transparent mb-4">
          You&apos;re Invited!
        </h1>
        <p className="text-2xl md:text-3xl text-rose-700 font-medium mb-2">
          Join us for a special celebration
        </p>
        <p className="text-xl text-rose-600">
          as we welcome our baby girl at her
        </p>
        <div className="text-4xl font-bold text-rose-500 my-4">Naming Ceremony</div>
        <div className="text-4xl">🎀 👶 🕊️</div>
      </header>

      {/* Ceremony Details */}
      <section className="max-w-2xl mx-auto px-4 mb-12">
        <div className="bg-white/70 backdrop-blur rounded-2xl p-6 shadow-lg text-center">
          <h2 className="text-2xl font-bold text-rose-700 mb-4">Ceremony Details</h2>
          <div className="space-y-2 text-lg text-gray-700">
            <p><span className="font-semibold">Date:</span> [Date TBD]</p>
            <p><span className="font-semibold">Time:</span> [Time TBD]</p>
            <p><span className="font-semibold">Location:</span> [Venue TBD]</p>
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="max-w-4xl mx-auto px-4 mb-12">
        <h2 className="text-3xl font-bold text-center text-rose-700 mb-6">
          Gallery 📸
        </h2>
        <ImageGallery />
      </section>

      {/* RSVP Form */}
      <section className="max-w-md mx-auto px-4 pb-16">
        <h2 className="text-3xl font-bold text-center text-rose-700 mb-6">
          RSVP 💌
        </h2>
        <RSVPForm />
      </section>

      {/* Footer */}
      <footer className="text-center py-8 text-rose-600">
        <p>We can&apos;t wait to celebrate with you!</p>
        <div className="text-2xl mt-2">🌸 💖 ✨</div>
      </footer>
    </div>
  );
}
