interface ContactSectionProps {
  name: string;
  phone: string;
  email?: string;
}

export default function ContactSection({ name, phone, email }: ContactSectionProps) {
  const phoneLink = `tel:${phone.replace(/[^0-9+]/g, "")}`;
  const emailLink = email ? `mailto:${email}` : null;

  return (
    <section className="max-w-2xl mx-auto px-4 mb-12">
      <div className="bg-white/70 backdrop-blur rounded-2xl p-6 shadow-lg text-center">
        <h2 className="text-2xl font-bold text-rose-700 mb-4">Questions?</h2>
        <p className="text-gray-600 mb-4">
          Feel free to reach out if you have any questions:
        </p>
        <div className="space-y-3">
          <a
            href={phoneLink}
            className="inline-flex items-center gap-2 px-6 py-2 bg-rose-500 hover:bg-rose-600 text-white font-semibold rounded-lg transition-colors"
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
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            {phone}
          </a>
          {emailLink && (
            <div>
              <a
                href={emailLink}
                className="inline-flex items-center gap-2 text-rose-600 hover:text-rose-700 transition-colors"
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
