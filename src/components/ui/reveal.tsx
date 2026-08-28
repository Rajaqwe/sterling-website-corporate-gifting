"use client";

import React, { useEffect, useRef, useState } from "react";

interface RevealProps {
  children: React.ReactNode;
  animation?: "fade-in-up" | "fade-in" | "scale-in";
  delay?: number;
  duration?: number;
  className?: string;
  threshold?: number;
}

export function Reveal({
  children,
  animation = "fade-in-up",
  delay = 0,
  duration,
  className = "",
  threshold = 0.1,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Disconnect once it becomes visible so it only animates once
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold]);

  // Map the animation prop to the tailwind animate-* class
  const animationClass = isVisible ? `motion-safe:animate-${animation}` : "opacity-0";

  return (
    <div
      ref={ref}
      className={`${animationClass} ${className}`}
      style={{
        animationDelay: `${delay}ms`,
        ...(duration && { animationDuration: `${duration}ms` }),
      }}
    >
      {children}
    </div>
  );
}

interface StaggerContainerProps {
  children: React.ReactNode;
  staggerDelay?: number;
  initialDelay?: number;
  className?: string;
}

/**
 * Automatically applies staggered delays to its direct Reveal children.
 */
export function StaggerContainer({
  children,
  staggerDelay = 100,
  initialDelay = 0,
  className = "",
}: StaggerContainerProps) {
  return (
    <div className={className}>
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          // If the child is a Reveal component (or supports a delay prop), pass the staggered delay
          return React.cloneElement(child, {
            delay: initialDelay + index * staggerDelay,
          } as any);
        }
        return child;
      })}
    </div>
  );
}
