"use client";

import { useEffect, useState, ReactNode } from "react";

interface ParallaxBackgroundProps {
  children: ReactNode;
}

export default function ParallaxBackground({ children }: ParallaxBackgroundProps) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Fixed parallax background layers */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Base gradient - moves slowest */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-pink-100 via-rose-100 to-pink-50"
          style={{
            transform: `translateY(${scrollY * 0.1}px)`,
          }}
        />

        {/* Floating shapes layer 1 - slow */}
        <div
          className="absolute inset-0"
          style={{
            transform: `translateY(${scrollY * 0.15}px)`,
          }}
        >
          <div className="absolute top-[10%] left-[10%] w-64 h-64 bg-rose-200/30 rounded-full blur-3xl" />
          <div className="absolute top-[30%] right-[15%] w-96 h-96 bg-pink-200/30 rounded-full blur-3xl" />
          <div className="absolute top-[60%] left-[20%] w-72 h-72 bg-rose-300/20 rounded-full blur-3xl" />
        </div>

        {/* Floating shapes layer 2 - medium */}
        <div
          className="absolute inset-0"
          style={{
            transform: `translateY(${scrollY * 0.25}px)`,
          }}
        >
          <div className="absolute top-[20%] right-[10%] w-48 h-48 bg-pink-300/20 rounded-full blur-2xl" />
          <div className="absolute top-[50%] left-[5%] w-56 h-56 bg-rose-200/25 rounded-full blur-2xl" />
          <div className="absolute top-[80%] right-[25%] w-64 h-64 bg-pink-200/20 rounded-full blur-2xl" />
        </div>

        {/* Decorative elements layer - faster */}
        <div
          className="absolute inset-0"
          style={{
            transform: `translateY(${scrollY * 0.35}px)`,
          }}
        >
          {[...Array(15)].map((_, i) => (
            <span
              key={i}
              className="absolute text-2xl opacity-20"
              style={{
                left: `${5 + (i * 7) % 90}%`,
                top: `${10 + (i * 13) % 80}%`,
              }}
            >
              {["🌸", "✨", "💖", "🎀", "🦋"][i % 5]}
            </span>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
