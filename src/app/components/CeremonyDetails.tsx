import AddToCalendar from "./AddToCalendar";

interface CeremonyDetailsProps {
  date: string;
  time: string;
  address: string;
  startDate: Date;
  durationHours?: number;
}

export default function CeremonyDetails({
  date,
  time,
  address,
  startDate,
  durationHours = 3,
}: CeremonyDetailsProps) {
  const mapsEmbedUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(address)}`;

  const endDate = new Date(startDate.getTime() + durationHours * 60 * 60 * 1000);

  return (
    <section className="max-w-2xl mx-auto px-4 mb-12">
      <div className="bg-white/70 backdrop-blur rounded-2xl p-6 shadow-lg text-center">
        <h2 className="text-2xl font-bold text-rose-700 mb-4">Ceremony Details</h2>
        <div className="space-y-2 text-lg text-gray-700">
          <p><span className="font-semibold">Date:</span> {date}</p>
          <p><span className="font-semibold">Time:</span> {time}</p>
          <p><span className="font-semibold">Location:</span> {address}</p>
        </div>

        <div className="mt-4">
          <AddToCalendar
            title="Athena's Naming Ceremony"
            description="Join us as we celebrate and officially name our baby girl Athena. This is a traditional naming ceremony honoring Malian customs."
            location={address}
            startDate={startDate}
            endDate={endDate}
          />
        </div>

        <div className="mt-4 rounded-xl overflow-hidden shadow-md">
          <iframe
            src={mapsEmbedUrl}
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Venue Location"
          />
        </div>
      </div>
    </section>
  );
}
