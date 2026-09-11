"use client";

import React, { useEffect, useRef, useState } from "react";

type AnimationVariant = "fade" | "fade-up" | "fade-down" | "fade-left" | "fade-right" | "scale" | "scale-soft" | "blur-up" | "clip-up" | "mask-text" | "emphasis" | "soft-reveal" | "none";

interface RevealProps {
  children: React.ReactNode;
  animationType?: AnimationVariant;
  variant?: AnimationVariant; // Added variant alias
  delay?: number;
  duration?: number;
  className?: string;
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

export function Reveal({
  children,
  animationType,
  variant = "fade-up",
  delay = 0,
  duration,
  className = "",
  threshold = 0.1,
  rootMargin = "0px",
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const activeVariant = animationType || variant;

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
          if (once && ref.current) observer.unobserve(ref.current);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        root: null,
        rootMargin,
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

  const getAnimationClass = () => {
    if (!isVisible) {
      if (activeVariant === "none") return "";
      return "opacity-0";
    }
    if (activeVariant === "fade") return "animate-fade";
    if (activeVariant === "fade-up") return "animate-fade-up";
    if (activeVariant === "fade-down") return "animate-fade-down";
    if (activeVariant === "fade-left") return "animate-fade-left";
    if (activeVariant === "fade-right") return "animate-fade-right";
    if (activeVariant === "scale") return "animate-scale";
    if (activeVariant === "scale-soft") return "animate-scale-soft";
    if (activeVariant === "blur-up") return "animate-blur-up";
    if (activeVariant === "clip-up") return "animate-clip-up";
    if (activeVariant === "mask-text") return "animate-mask-text";
    if (activeVariant === "emphasis") return "animate-emphasis";
    if (activeVariant === "soft-reveal") return "animate-soft-reveal";
    return "";
  };

  return (
    <div
      ref={ref}
      className={`${getAnimationClass()} ${className}`}
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
