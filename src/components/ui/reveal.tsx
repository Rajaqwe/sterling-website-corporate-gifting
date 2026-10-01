import type { CSSProperties } from "react";

type AnimationVariant =
  | "fade"
  | "fade-up"
  | "fade-down"
  | "fade-left"
  | "fade-right"
  | "scale"
  | "scale-soft"
  | "blur-up"
  | "clip-up"
  | "mask-text"
  | "emphasis"
  | "soft-reveal"
  | "none";

interface RevealProps {
  children: React.ReactNode;
  animationType?: AnimationVariant;
  variant?: AnimationVariant;
  delay?: number;
  duration?: number;
  className?: string;
}

const animationClasses: Record<AnimationVariant, string> = {
  fade: "animate-fade",
  "fade-up": "animate-fade-up",
  "fade-down": "animate-fade-down",
  "fade-left": "animate-fade-left",
  "fade-right": "animate-fade-right",
  scale: "animate-scale",
  "scale-soft": "animate-scale-soft",
  "blur-up": "animate-blur-up",
  "clip-up": "animate-clip-up",
  "mask-text": "animate-mask-text",
  emphasis: "animate-emphasis",
  "soft-reveal": "animate-soft-reveal",
  none: "",
};

export function Reveal({
  children,
  animationType,
  variant = "fade-up",
  delay = 0,
  duration,
  className = "",
}: RevealProps) {
  const activeVariant = animationType || variant;
  const animationClass =
    activeVariant === "none" ? "" : animationClasses[activeVariant];

  return (
    <div
      className={`${animationClass} ${className}`.trim()}
      style={{
        animationDelay: `${delay}ms`,
        ...(duration ? { animationDuration: `${duration}ms` } : {}),
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

export function StaggerContainer({
  children,
  staggerDelay = 100,
  initialDelay = 0,
  className = "",
}: StaggerContainerProps) {
  return (
    <div
      className={className}
      data-stagger
      style={{
        "--stagger-delay": `${staggerDelay}ms`,
        "--stagger-initial-delay": `${initialDelay}ms`,
      } as CSSProperties}
    >
      {children}
    </div>
  );
}
