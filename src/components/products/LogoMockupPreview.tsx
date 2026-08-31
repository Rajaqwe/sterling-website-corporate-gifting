"use client";

import React, { useState, useRef, DragEvent } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { UploadCloud, Image as ImageIcon, X, Maximize2, Check } from "lucide-react";
import Image from "next/image";

interface LogoMockupPreviewProps {
  productImageSrc: string;
}

interface LogoItem {
  id: string;
  src: string;
  position: { x: number; y: number };
  width: number;
  height: number;
  isConfirmed: boolean;
}

export function LogoMockupPreview({ productImageSrc }: LogoMockupPreviewProps) {
  const [logos, setLogos] = useState<LogoItem[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const dragRef = useRef<{ 
    startX: number; 
    startY: number; 
    initX: number; 
    initY: number; 
    initWidth: number;
    initHeight: number;
    type: 'drag' | 'resize' 
  } | null>(null);

  const processFiles = (files: File[]) => {
    const newLogos = files.filter(f => f.type.startsWith('image/')).map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      src: URL.createObjectURL(file),
      position: { x: 50, y: 50 },
      width: 30,
      height: 30,
      isConfirmed: false
    }));
    
    if (newLogos.length > 0) {
      setLogos((prev) => [...prev, ...newLogos]);
      setActiveId(newLogos[newLogos.length - 1].id);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    processFiles(Array.from(e.target.files || []));
    e.target.value = '';
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files) {
      processFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handlePointerDown = (e: React.PointerEvent, id: string, type: 'drag' | 'resize' = 'drag') => {
    e.stopPropagation();
    setActiveId(id);
    const logo = logos.find(l => l.id === id);
    if (!logo) return;

    if (type === 'drag') setIsDragging(true);
    if (type === 'resize') setIsResizing(true);
    
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initX: logo.position.x,
      initY: logo.position.y,
      initWidth: logo.width,
      initHeight: logo.height,
      type
    };
    try {
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    } catch (err) {}
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragRef.current || !activeId || !containerRef.current) return;
    
    const containerRect = containerRef.current.getBoundingClientRect();
    
    if (dragRef.current.type === 'drag') {
      const dx = ((e.clientX - dragRef.current.startX) / containerRect.width) * 100;
      const dy = ((e.clientY - dragRef.current.startY) / containerRect.height) * 100;
      
      const newX = Math.max(0, Math.min(100, dragRef.current.initX + dx));
      const newY = Math.max(0, Math.min(100, dragRef.current.initY + dy));

      setLogos(prev => prev.map(l => l.id === activeId ? {
        ...l,
        position: {
          x: newX,
          y: newY
        }
      } : l));
    } else if (dragRef.current.type === 'resize') {
      // Independent vertical and horizontal stretching
      // Multiply by 2 because the element is centered (-translate-x-1/2), so growing width by 2px pushes the corner by 1px
      const dx = ((e.clientX - dragRef.current.startX) / containerRect.width) * 200;
      const dy = ((e.clientY - dragRef.current.startY) / containerRect.height) * 200;
      
      const newWidth = Math.max(5, Math.min(200, dragRef.current.initWidth + dx));
      const newHeight = Math.max(5, Math.min(200, dragRef.current.initHeight + dy));
      
      setLogos(prev => prev.map(l => l.id === activeId ? {
        ...l,
        width: newWidth,
        height: newHeight
      } : l));
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    setIsResizing(false);
    dragRef.current = null;
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch (err) {}
  };

  const confirmLogo = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setLogos(prev => prev.map(l => l.id === id ? { ...l, isConfirmed: true } : l));
    setActiveId(null);
  };

  const activeLogo = logos.find(l => l.id === activeId);

  return (
    <div className="flex flex-col gap-4 border border-border/60 rounded-xl p-4 bg-surface-elevated">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-primary text-sm flex items-center gap-2">
          <ImageIcon className="h-4 w-4" /> Live Proofing Engine
        </h3>
        <div className="flex gap-2">
          {logos.length > 0 && (
            <Button variant="ghost" size="sm" onClick={() => setLogos([])} className="h-7 px-2 text-xs text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30">
              <X className="h-3 w-3 mr-1" /> Clear All
            </Button>
          )}
          <label className="cursor-pointer h-7 px-3 text-xs flex items-center justify-center bg-accent text-primary rounded-md font-medium hover:bg-gold-hover transition-colors shadow-sm">
             <UploadCloud className="h-3 w-3 mr-1.5" /> Add Logo
             <input type="file" accept="image/*" multiple className="hidden" onChange={handleFileUpload} />
          </label>
        </div>
      </div>

      <div 
        ref={containerRef}
        className={`relative aspect-square w-full max-w-sm mx-auto overflow-hidden bg-secondary/30 rounded-lg border-2 transition-colors ${isDragOver ? 'border-accent border-dashed bg-accent/5' : 'border-border/50'}`}
        onPointerMove={isDragging || isResizing ? handlePointerMove : undefined}
        onPointerUp={isDragging || isResizing ? handlePointerUp : undefined}
        onPointerLeave={isDragging || isResizing ? handlePointerUp : undefined}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => setActiveId(null)} // deselect on background click
      >
        <Image 
          src={productImageSrc} 
          alt="Product" 
          fill 
          sizes="(max-width: 768px) 100vw, 400px"
          className="object-cover pointer-events-none" 
        />
        
        {logos.length === 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/40 backdrop-blur-[2px] pointer-events-none">
            <div className={`flex flex-col items-center justify-center bg-background/90 border-2 shadow-sm rounded-xl p-6 pointer-events-none transition-colors ${isDragOver ? 'border-accent text-accent scale-105' : 'border-border/60'}`}>
              <UploadCloud className="h-10 w-10 mb-3 text-muted-foreground" />
              <span className="text-sm font-semibold">Drag & Drop Logos Here</span>
              <span className="text-xs text-muted-foreground mt-1">Or click "Add Logo" above</span>
            </div>
          </div>
        )}

        {logos.map((logo) => {
          const isActive = activeId === logo.id;
          const isConfirmed = logo.isConfirmed && !isActive;
          
          return (
            <div 
              key={logo.id}
              onClick={(e) => { e.stopPropagation(); setActiveId(logo.id); }}
              className={`absolute touch-none transform -translate-x-1/2 -translate-y-1/2 ${isActive ? 'border-2 border-accent border-dashed z-20 shadow-xl' : 'border-2 border-transparent z-10'} hover:border-accent/50 group`}
              style={{ 
                left: `${logo.position.x}%`, 
                top: `${logo.position.y}%`,
                width: `${logo.width}%`,
                height: `${logo.height}%`,
                transform: `translate(-50%, -50%) perspective(500px) rotateX(10deg) rotateY(-5deg)`,
                mixBlendMode: isConfirmed ? 'normal' : 'multiply'
              }}
            >
              <div 
                className="absolute inset-0 cursor-move"
                onPointerDown={(e) => handlePointerDown(e, logo.id, 'drag')}
              />
              
              <Image 
                src={logo.src} 
                alt="Logo Overlay"
                fill 
                sizes="200px"
                unoptimized
                className={`object-fill drop-shadow-sm pointer-events-none transition-all duration-300 ${isConfirmed ? 'opacity-100 grayscale-0 contrast-100' : 'opacity-90 grayscale contrast-125'}`} 
              />

              {isActive && (
                <>
                  <button 
                    className="absolute -top-4 -right-4 bg-red-500 text-white rounded-full p-1.5 z-30 shadow-md hover:bg-red-600 transition-transform hover:scale-110"
                    onClick={(e) => {
                      e.stopPropagation();
                      setLogos(prev => prev.filter(l => l.id !== logo.id));
                      setActiveId(null);
                    }}
                  >
                    <X className="h-4 w-4" />
                  </button>
                  <button 
                    className="absolute -top-4 -left-4 bg-emerald-500 text-white rounded-full p-1.5 z-30 shadow-md hover:bg-emerald-600 transition-transform hover:scale-110"
                    onClick={(e) => confirmLogo(e, logo.id)}
                    title="Confirm Placement"
                  >
                    <Check className="h-4 w-4" />
                  </button>
                  <div 
                    className="absolute -bottom-3 -right-3 bg-white border border-border text-primary rounded-full p-1.5 cursor-nwse-resize z-30 shadow-md hover:scale-110 transition-transform flex items-center justify-center"
                    onPointerDown={(e) => handlePointerDown(e, logo.id, 'resize')}
                  >
                    <Maximize2 className="h-3 w-3" />
                  </div>
                </>
              )}
            </div>
          )
        })}
      </div>

      <div className={`flex items-center gap-4 text-xs transition-opacity duration-300 ${activeLogo ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
        <span className="font-medium shrink-0">Scale Size</span>
        <Slider
          value={[activeLogo ? Math.max(activeLogo.width, activeLogo.height) : 10]}
          onValueChange={(val: any) => {
            if (!activeId || !activeLogo) return;
            const maxVal = Array.isArray(val) ? val[0] : val;
            // Maintain aspect ratio while scaling via slider
            const ratio = activeLogo.width / activeLogo.height;
            let newWidth = maxVal;
            let newHeight = maxVal;
            if (ratio > 1) {
              newHeight = maxVal / ratio;
            } else {
              newWidth = maxVal * ratio;
            }
            setLogos(prev => prev.map(l => l.id === activeId ? { ...l, width: newWidth, height: newHeight } : l));
          }}
          min={10}
          max={100}
          step={5}
          className="flex-1"
        />
        <div className="w-8 h-8 rounded border flex items-center justify-center font-medium bg-background shrink-0 shadow-sm text-foreground">
          {activeLogo ? Math.round((Math.max(activeLogo.width, activeLogo.height) - 10) / 10) + 1 : '-'}
        </div>
      </div>
    </div>
  );
}
