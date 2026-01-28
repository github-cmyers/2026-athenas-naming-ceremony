"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  animation?: "fade-up" | "fade-down" | "fade-left" | "fade-right" | "zoom" | "fade";
  delay?: number;
  duration?: number;
  threshold?: number;
}

export default function AnimatedSection({
  children,
  className = "",
  animation = "fade-up",
  delay = 0,
  duration = 700,
  threshold = 0.1,
}: AnimatedSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  const getInitialStyles = () => {
    const base = { opacity: 0, transition: `all ${duration}ms ease-out ${delay}ms` };
    switch (animation) {
      case "fade-up":
        return { ...base, transform: "translateY(40px)" };
      case "fade-down":
        return { ...base, transform: "translateY(-40px)" };
      case "fade-left":
        return { ...base, transform: "translateX(40px)" };
      case "fade-right":
        return { ...base, transform: "translateX(-40px)" };
      case "zoom":
        return { ...base, transform: "scale(0.9)" };
      case "fade":
      default:
        return base;
    }
  };

  const getVisibleStyles = () => {
    return {
      opacity: 1,
      transform: "translateY(0) translateX(0) scale(1)",
      transition: `all ${duration}ms ease-out ${delay}ms`,
    };
  };

  return (
    <div
      ref={ref}
      className={className}
      style={isVisible ? getVisibleStyles() : getInitialStyles()}
    >
      {children}
    </div>
  );
}
