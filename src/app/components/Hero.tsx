"use client";

import { useState } from "react";

export default function Hero() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <header className="text-center py-16 px-4 overflow-hidden relative">
      {/* Floating background particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <span
            key={i}
            className="absolute text-2xl opacity-40 animate-float"
            style={{
              left: `${8 + (i * 8)}%`,
              top: `${10 + (i % 3) * 30}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + (i % 3)}s`,
            }}
          >
            {["✨", "🌸", "💖", "🎀"][i % 4]}
          </span>
        ))}
      </div>

      {/* Top emojis with bounce animation */}
      <div className="text-6xl mb-4 flex justify-center gap-4">
        <span className="animate-bounce-slow" style={{ animationDelay: "0s" }}>🌸</span>
        <span className="animate-pulse-glow">✨</span>
        <span className="animate-bounce-slow" style={{ animationDelay: "0.5s" }}>💖</span>
      </div>

      {/* Main heading with hover effect */}
      <h1
        className={`text-5xl md:text-7xl font-bold mb-4 cursor-default transition-all duration-500 ease-out relative inline-block
          ${isHovered
            ? "scale-110 drop-shadow-[0_0_30px_rgba(244,63,94,0.6)]"
            : "scale-100"
          }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <span className="bg-gradient-to-r from-pink-500 via-rose-500 to-pink-400 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
          You&apos;re Invited!
        </span>
        {isHovered && (
          <span className="absolute -top-2 -right-4 text-2xl animate-spin-slow">✨</span>
        )}
      </h1>

      {/* Subtitle with fade-in effect */}
      <p className="text-2xl md:text-3xl text-rose-700 font-medium mb-2 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
        Join us for a special celebration
      </p>
      <p className="text-xl text-rose-600 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
        as we welcome our baby girl at her
      </p>

      {/* Naming Ceremony with glow pulse */}
      <div className="text-4xl md:text-5xl font-bold my-6 relative inline-block">
        <span className="text-rose-500 animate-text-glow">Naming Ceremony</span>
        <div className="absolute -inset-4 bg-rose-400/20 blur-xl rounded-full animate-pulse-slow -z-10" />
      </div>

      {/* Bottom emojis with float animation */}
      <div className="text-4xl flex justify-center gap-6">
        <span className="animate-float-rotate" style={{ animationDelay: "0s" }}>🎀</span>
        <span className="animate-float" style={{ animationDelay: "0.3s" }}>👶</span>
        <span className="animate-float-rotate" style={{ animationDelay: "0.6s" }}>🕊️</span>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes float-rotate {
          0%, 100% { transform: translateY(0px) rotate(-5deg); }
          50% { transform: translateY(-15px) rotate(5deg); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulse-glow {
          0%, 100% { transform: scale(1); filter: brightness(1); }
          50% { transform: scale(1.2); filter: brightness(1.5); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes gradient {
          0% { background-position: 0% center; }
          50% { background-position: 100% center; }
          100% { background-position: 0% center; }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes text-glow {
          0%, 100% { text-shadow: 0 0 10px rgba(244,63,94,0.3); }
          50% { text-shadow: 0 0 25px rgba(244,63,94,0.6), 0 0 50px rgba(244,63,94,0.3); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-float-rotate { animation: float-rotate 4s ease-in-out infinite; }
        .animate-bounce-slow { animation: bounce-slow 2s ease-in-out infinite; }
        .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 3s linear infinite; }
        .animate-gradient { animation: gradient 3s ease infinite; }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; opacity: 0; }
        .animate-text-glow { animation: text-glow 2s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
      `}</style>
    </header>
  );
}
