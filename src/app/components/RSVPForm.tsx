"use client";

import { useState } from "react";

export default function RSVPForm() {
  const [formData, setFormData] = useState({
    name: "",
    plusOne: "0",
    phone: "",
    email: "",
  });
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
          plusOne: parseInt(formData.plusOne),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit RSVP");
      }

      setSubmitted(true);
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
    return (
      <div className="bg-pink-100 border-2 border-pink-300 rounded-2xl p-8 text-center">
        <div className="text-4xl mb-4">💖</div>
        <h3 className="text-2xl font-bold text-rose-800 mb-2">Thank You!</h3>
        <p className="text-rose-700">
          We can&apos;t wait to celebrate with you, {formData.name}!
        </p>
      </div>
    );
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

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Your Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          disabled={loading}
          className="w-full px-4 py-3 rounded-xl border-2 border-pink-200 focus:border-pink-400 focus:outline-none transition-colors text-gray-900 disabled:opacity-50"
          placeholder="Enter your name"
        />
      </div>

      <div>
        <label htmlFor="plusOne" className="block text-sm font-medium text-gray-700 mb-1">
          Number of Additional Guests (+1s)
        </label>
        <select
          id="plusOne"
          name="plusOne"
          value={formData.plusOne}
          onChange={handleChange}
          disabled={loading}
          className="w-full px-4 py-3 rounded-xl border-2 border-pink-200 focus:border-pink-400 focus:outline-none transition-colors text-gray-900 disabled:opacity-50"
        >
          {[0, 1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
          Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          required
          value={formData.phone}
          onChange={handleChange}
          disabled={loading}
          className="w-full px-4 py-3 rounded-xl border-2 border-pink-200 focus:border-pink-400 focus:outline-none transition-colors text-gray-900 disabled:opacity-50"
          placeholder="(555) 123-4567"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          disabled={loading}
          className="w-full px-4 py-3 rounded-xl border-2 border-pink-200 focus:border-pink-400 focus:outline-none transition-colors text-gray-900 disabled:opacity-50"
          placeholder="you@example.com"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold text-lg rounded-xl hover:from-pink-600 hover:to-rose-600 transition-all duration-300 hover:scale-105 shadow-lg disabled:opacity-50 disabled:hover:scale-100"
      >
        {loading ? "Submitting..." : "RSVP Now! 💌"}
      </button>
    </form>
  );
}
