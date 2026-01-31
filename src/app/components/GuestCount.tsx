"use client";

import { useState, useEffect, useCallback } from "react";

interface RSVPCount {
  families: number;
  guests: number;
}

export default function GuestCount() {
  const [counts, setCounts] = useState<RSVPCount | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchGuestCount = useCallback(async () => {
    try {
      const res = await fetch("/api/rsvp/count");
      if (res.ok) {
        const data: RSVPCount = await res.json();
        setCounts(data);
      }
    } catch (error) {
      console.error("Failed to fetch guest count:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGuestCount();

    // Listen for RSVP submissions and refresh the count
    const handleRSVPSubmitted = () => {
      fetchGuestCount();
    };

    window.addEventListener("rsvp-submitted", handleRSVPSubmitted);
    return () => {
      window.removeEventListener("rsvp-submitted", handleRSVPSubmitted);
    };
  }, [fetchGuestCount]);

  if (isLoading) {
    return (
      <div className="text-center py-4">
        <div className="inline-block animate-pulse bg-rose-200 rounded-full px-6 py-2">
          <span className="text-rose-200">Loading...</span>
        </div>
      </div>
    );
  }

  if (!counts || counts.guests === 0) {
    return (
      <div className="text-center py-4">
        <div className="inline-block bg-white/70 backdrop-blur rounded-full px-6 py-3 shadow-md">
          <span className="text-rose-600 font-medium">
            Be the first to RSVP!
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center py-4">
      <div className="inline-block bg-white/70 backdrop-blur rounded-full px-8 py-4 shadow-md">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🎉</span>
          <div>
            <span className="text-2xl font-bold text-rose-600">{counts.guests}</span>
            <span className="text-rose-700 font-medium ml-2">
              {counts.guests === 1 ? "guest" : "guests"} coming
            </span>
          </div>
          <span className="text-3xl">🎉</span>
        </div>
        <p className="text-sm text-rose-500 mt-1">
          {counts.families} {counts.families === 1 ? "family" : "families"} have RSVP&apos;d
        </p>
      </div>
    </div>
  );
}
