"use client";

import { useState } from "react";

// Floating label input component
function FloatingInput({
  id,
  name,
  type,
  label,
  value,
  onChange,
  disabled,
  required,
}: {
  id: string;
  name: string;
  type: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
  required?: boolean;
}) {
  const hasValue = value.length > 0;

  return (
    <div className="relative">
      <input
        type={type}
        id={id}
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder=" "
        className="peer w-full px-4 py-4 pt-6 rounded-xl border-2 border-pink-200 focus:border-pink-400 focus:outline-none transition-all text-gray-900 disabled:opacity-50 bg-white"
      />
      {/* At rest the label is centred against the input's full height rather
          than pinned near the top; the input is taller than its text because
          `pt-6` reserves room for the label to float up into on focus. */}
      <label
        htmlFor={id}
        className={`pointer-events-none absolute left-4 transition-all duration-200 ${
          hasValue
            ? "top-2 translate-y-0 text-xs text-pink-500"
            : "top-1/2 -translate-y-1/2 text-base text-gray-500"
        } peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:text-pink-500`}
      >
        {label}
      </label>
    </div>
  );
}

// Floating label select component
function FloatingSelect({
  id,
  name,
  label,
  value,
  onChange,
  disabled,
  options,
}: {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  disabled: boolean;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="relative">
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="peer w-full px-4 py-4 pt-6 rounded-xl border-2 border-pink-200 focus:border-pink-400 focus:outline-none transition-all text-gray-900 disabled:opacity-50 bg-white appearance-none cursor-pointer"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <label
        htmlFor={id}
        className="absolute left-4 top-2 text-xs text-pink-500 transition-all duration-200 pointer-events-none"
      >
        {label}
      </label>
      {/* Dropdown arrow */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
}

// Accept / decline choice, rendered as a real radio group so it is reachable
// with the keyboard and announced correctly by screen readers.
function AttendanceChoice({
  attending,
  onChange,
  disabled,
}: {
  attending: boolean;
  onChange: (value: boolean) => void;
  disabled: boolean;
}) {
  const options = [
    { value: true, icon: "🎉", label: "Joyfully accepts" },
    { value: false, icon: "💌", label: "Regretfully declines" },
  ];

  // The fieldset carries no margin utility on purpose: the parent form's
  // `space-y-5` is defined inside `:where(...)`, which has zero specificity, so
  // even `m-0` would beat it and collapse the gap below this group.
  return (
    <fieldset disabled={disabled} className="border-0 p-0">
      <legend className="text-sm font-medium text-gray-600 mb-3 px-1">
        Will you be joining us?
      </legend>
      <div className="grid grid-cols-2 gap-3">
        {options.map((option) => (
          <label key={String(option.value)} className="relative cursor-pointer">
            <input
              type="radio"
              name="attending"
              value={String(option.value)}
              checked={attending === option.value}
              onChange={() => onChange(option.value)}
              className="peer sr-only"
            />
            <div className="rounded-xl border-2 border-pink-200 px-3 py-4 text-center transition-all peer-checked:border-pink-500 peer-checked:bg-pink-50 peer-focus-visible:ring-2 peer-focus-visible:ring-pink-400 peer-focus-visible:ring-offset-2 peer-disabled:opacity-50">
              <div className="text-2xl mb-1">{option.icon}</div>
              <div className="text-sm font-semibold text-gray-800">
                {option.label}
              </div>
            </div>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

// Animated success component
function SuccessMessage({
  name,
  attending,
}: {
  name: string;
  attending: boolean;
}) {
  return (
    <div className="success-container bg-gradient-to-br from-pink-100 via-rose-100 to-pink-50 border-2 border-pink-300 rounded-2xl p-8 text-center overflow-hidden relative">
      {/* Floating hearts background - celebratory only for acceptances */}
      {attending && (
        <div className="floating-hearts">
          <span className="heart heart-1">💕</span>
          <span className="heart heart-2">💖</span>
          <span className="heart heart-3">💗</span>
          <span className="heart heart-4">✨</span>
          <span className="heart heart-5">🎉</span>
        </div>
      )}

      {/* Main content with staggered animations */}
      <div className="relative z-10">
        <div className="icon-pop text-5xl mb-4">{attending ? "💖" : "💌"}</div>
        <h3 className="title-slide text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-600 mb-3">
          Thank You!
        </h3>
        <p className="message-fade text-rose-700 text-lg">
          {attending
            ? "We can't wait to celebrate with you,"
            : "We're sorry you can't make it, but thank you for letting us know,"}
        </p>
        <p className="name-pop text-xl font-semibold text-rose-800 mt-1">
          {name}! {attending ? "🎉" : "💗"}
        </p>
      </div>

      <style>{`
        .success-container {
          animation: container-pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        @keyframes container-pop {
          0% { transform: scale(0.8); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }

        .icon-pop {
          animation: icon-bounce 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s both;
        }

        @keyframes icon-bounce {
          0% { transform: scale(0) rotate(-20deg); opacity: 0; }
          60% { transform: scale(1.3) rotate(10deg); }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }

        .title-slide {
          animation: title-in 0.5s ease-out 0.4s both;
        }

        @keyframes title-in {
          0% { transform: translateY(20px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }

        .message-fade {
          animation: fade-up 0.5s ease-out 0.6s both;
        }

        .name-pop {
          animation: name-bounce 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.8s both;
        }

        @keyframes fade-up {
          0% { transform: translateY(10px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }

        @keyframes name-bounce {
          0% { transform: scale(0.5); opacity: 0; }
          60% { transform: scale(1.1); }
          100% { transform: scale(1); opacity: 1; }
        }

        /* Floating hearts */
        .floating-hearts {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
        }

        .heart {
          position: absolute;
          font-size: 1.5rem;
          opacity: 0;
          animation: float-up 3s ease-out forwards;
        }

        .heart-1 { left: 10%; animation-delay: 0.3s; }
        .heart-2 { left: 30%; animation-delay: 0.5s; }
        .heart-3 { left: 50%; animation-delay: 0.7s; }
        .heart-4 { left: 70%; animation-delay: 0.9s; }
        .heart-5 { left: 85%; animation-delay: 1.1s; }

        @keyframes float-up {
          0% {
            bottom: -20px;
            opacity: 0;
            transform: scale(0.5) rotate(0deg);
          }
          20% {
            opacity: 1;
          }
          100% {
            bottom: 100%;
            opacity: 0;
            transform: scale(1) rotate(20deg);
          }
        }
      `}</style>
    </div>
  );
}

export default function RSVPForm() {
  const [formData, setFormData] = useState({
    name: "",
    plusOne: "0",
    phone: "",
    email: "",
  });
  const [attending, setAttending] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          plusOne: attending ? parseInt(formData.plusOne) : 0,
          attending,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit RSVP");
      }

      setSubmitted(true);

      // Notify other components that an RSVP was submitted
      window.dispatchEvent(new CustomEvent("rsvp-submitted"));
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (submitted) {
    return <SuccessMessage name={formData.name} attending={attending} />;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl p-6 shadow-lg space-y-5"
    >
      {error && (
        <div className="bg-red-100 border-2 border-red-300 rounded-xl p-4 text-red-700 text-center">
          {error}
        </div>
      )}

      <FloatingInput
        id="name"
        name="name"
        type="text"
        label="Your Name"
        value={formData.name}
        onChange={handleChange}
        disabled={loading}
        required
      />

      <AttendanceChoice
        attending={attending}
        onChange={setAttending}
        disabled={loading}
      />

      {/* Only meaningful for acceptances - someone who declines brings no one */}
      {attending && (
        <FloatingSelect
          id="plusOne"
          name="plusOne"
          label="Number of Additional Guests (+1s)"
          value={formData.plusOne}
          onChange={handleChange}
          disabled={loading}
          options={[0, 1, 2, 3, 4, 5].map((num) => ({
            value: String(num),
            label: String(num),
          }))}
        />
      )}

      <FloatingInput
        id="phone"
        name="phone"
        type="tel"
        label="Phone Number"
        value={formData.phone}
        onChange={handleChange}
        disabled={loading}
        required
      />

      <FloatingInput
        id="email"
        name="email"
        type="email"
        label="Email Address"
        value={formData.email}
        onChange={handleChange}
        disabled={loading}
        required
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold text-lg rounded-xl hover:from-pink-600 hover:to-rose-600 transition-all duration-300 hover:scale-105 shadow-lg disabled:opacity-50 disabled:hover:scale-100"
      >
        {loading
          ? "Submitting..."
          : attending
            ? "RSVP Now! 💌"
            : "Send Your Reply 💌"}
      </button>
    </form>
  );
}
