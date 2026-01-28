"use client";

import { useState, useEffect } from "react";

interface RSVP {
  Id: number;
  Name: string;
  PlusOne: number;
  Phone: string;
  Email: string;
  CreatedAt: string;
}

export default function GuestCount() {
  const [totalGuests, setTotalGuests] = useState<number | null>(null);
  const [rsvpCount, setRsvpCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLocal, setIsLocal] = useState(false);

  useEffect(() => {
    // Only show on localhost
    const isLocalhost = window.location.hostname === "localhost";
    setIsLocal(isLocalhost);

    if (!isLocalhost) {
      setIsLoading(false);
      return;
    }

    async function fetchGuestCount() {
      try {
        const res = await fetch("/api/rsvp");
        if (res.ok) {
          const data: RSVP[] = await res.json();
          const total = data.reduce((sum, rsvp) => sum + 1 + rsvp.PlusOne, 0);
          setTotalGuests(total);
          setRsvpCount(data.length);
        }
      } catch (error) {
        console.error("Failed to fetch guest count:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchGuestCount();
  }, []);

  // Don't render anything on production
  if (!isLocal) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="text-center py-4">
        <div className="inline-block animate-pulse bg-rose-200 rounded-full px-6 py-2">
          <span className="text-rose-200">Loading...</span>
        </div>
      </div>
    );
  }

  if (totalGuests === null || totalGuests === 0) {
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
            <span className="text-2xl font-bold text-rose-600">{totalGuests}</span>
            <span className="text-rose-700 font-medium ml-2">
              {totalGuests === 1 ? "guest" : "guests"} have RSVP&apos;d
            </span>
          </div>
          <span className="text-3xl">🎉</span>
        </div>
        <p className="text-sm text-rose-500 mt-1">
          Currently {rsvpCount} {rsvpCount === 1 ? "family" : "families"} attending
        </p>
      </div>
    </div>
  );
}
