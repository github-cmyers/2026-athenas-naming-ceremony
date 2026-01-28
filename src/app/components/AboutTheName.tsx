interface AboutTheNameProps {
  name: string;
  origin: string;
  meaning: string;
  reason: string;
}

export default function AboutTheName({ name, origin, meaning, reason }: AboutTheNameProps) {
  return (
    <section className="max-w-2xl mx-auto px-4 mb-12">
      <div className="bg-white/70 backdrop-blur rounded-2xl p-6 shadow-lg">
        <h2 className="text-2xl font-bold text-rose-700 mb-4 text-center">
          About the Name
        </h2>
        <div className="text-center mb-4">
          <span className="text-5xl font-bold bg-gradient-to-r from-pink-500 via-rose-500 to-pink-400 bg-clip-text text-transparent">
            {name}
          </span>
        </div>
        <div className="space-y-4 text-gray-700">
          <p>
            <span className="font-semibold text-rose-600">Origin:</span> {origin}
          </p>
          <p>
            <span className="font-semibold text-rose-600">Meaning:</span> {meaning}
          </p>
          <p>
            <span className="font-semibold text-rose-600">Why we chose it:</span> {reason}
          </p>
          <div className="text-center pt-2">
            <span className="text-3xl">🦉</span>
            <p className="text-sm text-rose-500 mt-1">
              The owl, symbol of Athena, represents wisdom and knowledge
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
