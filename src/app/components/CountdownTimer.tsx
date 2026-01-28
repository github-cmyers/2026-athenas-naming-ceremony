"use client";

import { useState, useEffect } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownTimerProps {
  targetDate: Date;
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);

    function calculateTimeLeft(): TimeLeft | null {
      const difference = targetDate.getTime() - new Date().getTime();

      if (difference <= 0) {
        return null;
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (!hasMounted) {
    return (
      <div className="flex justify-center gap-4 text-center">
        {["Days", "Hours", "Minutes", "Seconds"].map((label) => (
          <div key={label} className="bg-white/50 rounded-xl p-4 min-w-[80px]">
            <div className="text-3xl font-bold text-rose-600">--</div>
            <div className="text-sm text-rose-500">{label}</div>
          </div>
        ))}
      </div>
    );
  }

  if (!timeLeft) {
    return (
      <div className="text-2xl font-bold text-rose-600 text-center">
        The celebration has begun!
      </div>
    );
  }

  return (
    <div className="flex justify-center gap-4 text-center">
      {[
        { value: timeLeft.days, label: "Days" },
        { value: timeLeft.hours, label: "Hours" },
        { value: timeLeft.minutes, label: "Minutes" },
        { value: timeLeft.seconds, label: "Seconds" },
      ].map(({ value, label }) => (
        <div key={label} className="bg-white/50 rounded-xl p-4 min-w-[80px]">
          <div className="text-3xl font-bold text-rose-600">
            {value.toString().padStart(2, "0")}
          </div>
          <div className="text-sm text-rose-500">{label}</div>
        </div>
      ))}
    </div>
  );
}
