"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { demoVideos } from "@/data/demoVideos";

const SLIDE_DURATION = 4000;

export function DemoVideoCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isPageVisible, setIsPageVisible] = useState(true);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState<Record<number, boolean>>({});
  
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const prefersReducedMotion = useRef(false);

  // Initialize reduced motion preference
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      prefersReducedMotion.current = mediaQuery.matches;
      
      const listener = (e: MediaQueryListEvent) => {
        prefersReducedMotion.current = e.matches;
      };
      
      mediaQuery.addEventListener('change', listener);
      return () => mediaQuery.removeEventListener('change', listener);
    }
  }, []);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === demoVideos.length - 1 ? 0 : prev + 1));
  }, []);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? demoVideos.length - 1 : prev - 1));
  }, []);

  const goToIndex = (index: number) => {
    setCurrentIndex(index);
  };

  // Visibility API to pause carousel when tab is hidden
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsPageVisible(document.visibilityState === "visible");
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // Main Timer Logic
  useEffect(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    // Only run timer if page is visible, not hovered, and we have multiple videos
    if (isPageVisible && !isHovered && demoVideos.length > 1) {
      timerRef.current = setInterval(() => {
        goToNext();
      }, SLIDE_DURATION);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [currentIndex, isPageVisible, isHovered, goToNext]);

  // Video Playback Management
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;
      
      if (index === currentIndex && isPageVisible) {
        // Active video: try to play
        video.play().catch((err) => {
          // Autoplay might be blocked by browser; this is fine for muted videos,
          // but we catch it to prevent console errors crashing the component.
          console.debug("Video playback prevented:", err);
        });
      } else {
        // Inactive video: pause and reset to save resources
        video.pause();
        // Optional: reset time to 0 if you want each slide to start fresh
        // video.currentTime = 0; 
      }
    });
  }, [currentIndex, isPageVisible]);

  // Touch Swipe Logic
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEndHandler = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) goToNext();
    if (isRightSwipe) goToPrev();
  };

  // Keyboard navigation
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") goToPrev();
    if (e.key === "ArrowRight") goToNext();
  };

  if (demoVideos.length === 0) return null;

  return (
    <div 
      className="relative w-full h-full overflow-hidden bg-slate-900 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEndHandler}
      onKeyDown={onKeyDown}
      tabIndex={0}
      aria-roledescription="carousel"
      aria-label="Demo Videos"
    >
      {/* Sliding Track */}
      <div 
        className="flex w-full h-full"
        style={{ 
          transform: `translateX(-${currentIndex * 100}%)`,
          transition: prefersReducedMotion.current ? 'none' : 'transform 700ms cubic-bezier(0.25, 1, 0.5, 1)'
        }}
      >
        {demoVideos.map((video, index) => (
          <div 
            key={video.id} 
            className="w-full h-full flex-shrink-0 relative"
            aria-hidden={currentIndex !== index}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${demoVideos.length}`}
          >
            {/* Smooth transition poster image */}
            <img 
              src={video.poster} 
              alt={video.title}
              className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ${isPlaying[index] ? 'opacity-0' : 'opacity-100'}`}
            />
            {/* The video element */}
            <video
              ref={(el) => {
                videoRefs.current[index] = el;
              }}
              src={video.src}
              onPlaying={() => setIsPlaying(prev => ({ ...prev, [index]: true }))}
              onWaiting={() => setIsPlaying(prev => ({ ...prev, [index]: false }))}
              muted
              playsInline
              loop
              className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
            />
            <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px] transition-opacity duration-700" />
          </div>
        ))}
      </div>

      {/* Navigation Controls - Desktop (hidden on mobile, shown on hover) */}
      <button
        onClick={(e) => { e.preventDefault(); goToPrev(); }}
        className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white backdrop-blur-md opacity-0 md:group-hover:opacity-100 transition-opacity z-20 focus:opacity-100 outline-none focus-visible:ring-2 focus-visible:ring-accent"
        aria-label="Previous video"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={(e) => { e.preventDefault(); goToNext(); }}
        className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white backdrop-blur-md opacity-0 md:group-hover:opacity-100 transition-opacity z-20 focus:opacity-100 outline-none focus-visible:ring-2 focus-visible:ring-accent"
        aria-label="Next video"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Pagination Indicators */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2.5 z-20">
        {demoVideos.map((_, index) => (
          <button
            key={index}
            onClick={(e) => { e.preventDefault(); goToIndex(index); }}
            className={`h-2 transition-all duration-300 rounded-full ${
              currentIndex === index 
                ? "w-8 bg-accent" 
                : "w-2 bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to demo video ${index + 1}`}
            aria-selected={currentIndex === index}
          />
        ))}
      </div>
    </div>
  );
}
