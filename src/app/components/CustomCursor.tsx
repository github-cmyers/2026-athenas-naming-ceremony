"use client";

import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => {
    let sparkleId = 0;
    let lastSparkleTime = 0;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      // Create sparkle trail (throttled)
      const now = Date.now();
      if (now - lastSparkleTime > 50) {
        lastSparkleTime = now;
        const newSparkle = { id: sparkleId++, x: e.clientX, y: e.clientY };
        setSparkles((prev) => [...prev.slice(-8), newSparkle]);

        // Remove sparkle after animation
        setTimeout(() => {
          setSparkles((prev) => prev.filter((s) => s.id !== newSparkle.id));
        }, 600);
      }

      // Check if hovering over clickable element
      const target = e.target as HTMLElement;
      const isClickable =
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        window.getComputedStyle(target).cursor === "pointer";
      setIsPointer(isClickable);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  // Don't render on touch devices
  if (typeof window !== "undefined" && "ontouchstart" in window) {
    return null;
  }

  return (
    <>
      {/* Main cursor */}
      <div
        className="fixed pointer-events-none z-[9999] transition-transform duration-100 ease-out"
        style={{
          left: position.x,
          top: position.y,
          opacity: isVisible ? 1 : 0,
          transform: `translate(-50%, -50%) scale(${isPointer ? 1.5 : 1})`,
        }}
      >
        {/* Outer ring */}
        <div
          className={`absolute rounded-full border-2 transition-all duration-300 ${
            isPointer
              ? "w-10 h-10 border-rose-400 bg-rose-400/20"
              : "w-8 h-8 border-rose-300"
          }`}
          style={{ transform: "translate(-50%, -50%)" }}
        />

        {/* Inner dot / heart */}
        <div
          className="absolute transition-all duration-200"
          style={{ transform: "translate(-50%, -50%)" }}
        >
          {isPointer ? (
            <span className="text-lg animate-pulse">💖</span>
          ) : (
            <div className="w-2 h-2 bg-rose-500 rounded-full" />
          )}
        </div>
      </div>

      {/* Sparkle trail */}
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="fixed pointer-events-none z-[9998] animate-sparkle-fade"
          style={{
            left: sparkle.x,
            top: sparkle.y,
            transform: "translate(-50%, -50%)",
          }}
        >
          <span className="text-sm">✨</span>
        </div>
      ))}

      {/* Global styles for cursor and sparkle animation */}
      <style jsx global>{`
        * {
          cursor: none !important;
        }

        @keyframes sparkle-fade {
          0% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0) translateY(-20px);
          }
        }

        .animate-sparkle-fade {
          animation: sparkle-fade 0.6s ease-out forwards;
        }

        @media (pointer: coarse) {
          * {
            cursor: auto !important;
          }
        }
      `}</style>
    </>
  );
}
