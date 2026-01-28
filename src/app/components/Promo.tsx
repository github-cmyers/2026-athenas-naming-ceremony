"use client";

interface PromoProps {
  name: string;
  phone: string;
  email?: string;
}

export default function Promo({ name, phone, email }: PromoProps) {
  const phoneLink = `tel:${phone.replace(/[^0-9+]/g, "")}`;
  const emailLink = email ? `mailto:${email}` : null;

  return (
    <section className="max-w-2xl mx-auto px-4 mb-12">
      <div className="relative overflow-hidden rounded-2xl shadow-xl">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700" />

        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute top-4 left-4 text-4xl opacity-20">💻</div>
          <div className="absolute bottom-4 right-4 text-4xl opacity-20">✨</div>
        </div>

        {/* Content */}
        <div className="relative p-8 text-center">
          {/* Badge */}
          <div className="inline-block mb-4">
            <span className="px-4 py-1 bg-yellow-400 text-yellow-900 text-sm font-bold rounded-full uppercase tracking-wide shadow-lg">
              Colin's Side Hustle
            </span>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            This website was built by Ethan & Athen's Dad. If you're interested in me building you one of your own tailored exactly to your needs at a fair price, feel free to reach out.
          </h2>

          {/* CTA Button */}
          <a
            href={phoneLink}
            className="inline-flex items-center gap-3 px-8 py-4 bg-white hover:bg-gray-100 text-purple-700 font-bold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl group"
          >
            <svg
              className="w-6 h-6 group-hover:animate-bounce"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            <span className="text-lg">{phone}</span>
          </a>

          {emailLink && (
            <div className="mt-4">
              <a
                href={emailLink}
                className="inline-flex items-center gap-2 text-purple-200 hover:text-white transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                {email}
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
