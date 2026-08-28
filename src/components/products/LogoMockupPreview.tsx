"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { UploadCloud, Move, Image as ImageIcon, X } from "lucide-react";
import Image from "next/image";

interface LogoMockupPreviewProps {
  productImageSrc: string;
}

export function LogoMockupPreview({ productImageSrc }: LogoMockupPreviewProps) {
  const [logoSrc, setLogoSrc] = useState<string | null>(null);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [scale, setScale] = useState([30]);
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<{ startX: number; startY: number; initX: number; initY: number } | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setLogoSrc(url);
    }
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initX: position.x,
      initY: position.y
    };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !dragRef.current) return;
    
    // Calculate movement as percentage of container roughly
    const dx = ((e.clientX - dragRef.current.startX) / 300) * 100;
    const dy = ((e.clientY - dragRef.current.startY) / 300) * 100;
    
    setPosition({
      x: Math.max(0, Math.min(100, dragRef.current.initX + dx)),
      y: Math.max(0, Math.min(100, dragRef.current.initY + dy))
    });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    dragRef.current = null;
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
  };

  return (
    <div className="flex flex-col gap-4 border border-border/60 rounded-xl p-4 bg-surface-elevated">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-primary text-sm flex items-center gap-2">
          <ImageIcon className="h-4 w-4" /> Live Proofing Engine
        </h3>
        {logoSrc && (
          <Button variant="ghost" size="sm" onClick={() => setLogoSrc(null)} className="h-7 px-2 text-xs">
            <X className="h-3 w-3 mr-1" /> Clear
          </Button>
        )}
      </div>

      <div className="relative aspect-square w-full max-w-sm mx-auto overflow-hidden bg-secondary/30 rounded-lg border border-border/50">
        <Image 
          src={productImageSrc} 
          alt="Product" 
          fill 
          className="object-cover pointer-events-none" 
        />
        
        {logoSrc ? (
          <div 
            className="absolute touch-none cursor-move transform -translate-x-1/2 -translate-y-1/2 border-2 border-transparent hover:border-accent/50 group"
            style={{ 
              left: `${position.x}%`, 
              top: `${position.y}%`,
              width: `${scale[0]}%`,
              height: `${scale[0]}%`,
              transform: `translate(-50%, -50%) perspective(500px) rotateX(10deg) rotateY(-5deg)`,
              mixBlendMode: 'multiply'
            }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
          >
            {/* Use next/image with unoptimized for blob URLs */}
            <Image 
              src={logoSrc} 
              alt="Logo Overlay"
              fill 
              unoptimized
              className="object-contain drop-shadow-sm pointer-events-none opacity-90 contrast-125 grayscale" 
            />
            <div className="absolute inset-0 hidden group-hover:flex items-center justify-center bg-black/10 rounded pointer-events-none">
              <Move className="h-6 w-6 text-white drop-shadow-md" />
            </div>
          </div>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/40 backdrop-blur-[2px]">
            <label className="cursor-pointer flex flex-col items-center justify-center bg-background border border-border hover:border-accent hover:text-accent transition-colors shadow-sm rounded-xl p-4">
              <UploadCloud className="h-8 w-8 mb-2 text-muted-foreground" />
              <span className="text-sm font-semibold">Upload Logo</span>
              <span className="text-xs text-muted-foreground">PNG/JPG (Transparent best)</span>
              <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
            </label>
          </div>
        )}
      </div>

      {logoSrc && (
        <div className="flex items-center gap-4 text-xs">
          <span className="font-medium shrink-0">Logo Size</span>
          <Slider
            value={scale}
            onValueChange={(val: any) => setScale(Array.isArray(val) ? [...val] : [val])}
            min={10}
            max={80}
            step={1}
            className="flex-1"
          />
        </div>
      )}
    </div>
  );
}
