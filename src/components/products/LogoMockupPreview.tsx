"use client";

import React, { useState, useRef, DragEvent, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { UploadCloud, Image as ImageIcon, X, Maximize2, Check, RotateCw, Undo, Redo, Trash2, AlignCenter, AlignHorizontalSpaceBetween, AlignVerticalSpaceBetween } from "lucide-react";
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
  rotation: number;
  isConfirmed: boolean;
}

export function LogoMockupPreview({ productImageSrc }: LogoMockupPreviewProps) {
  const [logos, setLogos] = useState<LogoItem[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Undo / Redo History
  const [history, setHistory] = useState<LogoItem[][]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const saveHistory = (newLogos: LogoItem[]) => {
    const nextHistory = history.slice(0, historyIndex + 1);
    nextHistory.push(newLogos);
    setHistory(nextHistory);
    setHistoryIndex(nextHistory.length - 1);
  };

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setLogos(history[historyIndex - 1]);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setLogos(history[historyIndex + 1]);
    }
  };

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
      rotation: 0,
      isConfirmed: false
    }));
    
    if (newLogos.length > 0) {
      const updatedLogos = [...logos, ...newLogos];
      setLogos(updatedLogos);
      saveHistory(updatedLogos);
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
        position: { x: newX, y: newY }
      } : l));
    } else if (dragRef.current.type === 'resize') {
      const dx = ((e.clientX - dragRef.current.startX) / containerRect.width) * 200;
      const dy = ((e.clientY - dragRef.current.startY) / containerRect.height) * 200;
      
      const newWidth = Math.max(5, Math.min(200, dragRef.current.initWidth + dx));
      const newHeight = Math.max(5, Math.min(200, dragRef.current.initHeight + dy));
      
      setLogos(prev => prev.map(l => l.id === activeId ? {
        ...l, width: newWidth, height: newHeight
      } : l));
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (isDragging || isResizing) {
      saveHistory(logos); // save history at end of drag/resize
    }
    setIsDragging(false);
    setIsResizing(false);
    dragRef.current = null;
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch (err) {}
  };

  const updateActiveLogo = (updates: Partial<LogoItem>) => {
    if (!activeId) return;
    const nextLogos = logos.map(l => l.id === activeId ? { ...l, ...updates } : l);
    setLogos(nextLogos);
    saveHistory(nextLogos);
  };

  const rotateActiveLogo = () => {
    const logo = logos.find(l => l.id === activeId);
    if (logo) {
      updateActiveLogo({ rotation: (logo.rotation || 0) + 15 });
    }
  };

  const deleteActiveLogo = () => {
    if (!activeId) return;
    const nextLogos = logos.filter(l => l.id !== activeId);
    setLogos(nextLogos);
    saveHistory(nextLogos);
    setActiveId(null);
  };

  const snapTo = (x: number, y: number) => {
    updateActiveLogo({ position: { x, y } });
  };

  const confirmLogo = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const nextLogos = logos.map(l => l.id === id ? { ...l, isConfirmed: true } : l);
    setLogos(nextLogos);
    saveHistory(nextLogos);
    setActiveId(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!activeId) return;
    const logo = logos.find(l => l.id === activeId);
    if (!logo) return;

    let handled = false;
    const step = e.shiftKey ? 5 : 1;

    if (e.key === 'ArrowUp') {
      updateActiveLogo({ position: { ...logo.position, y: Math.max(0, logo.position.y - step) } });
      handled = true;
    } else if (e.key === 'ArrowDown') {
      updateActiveLogo({ position: { ...logo.position, y: Math.min(100, logo.position.y + step) } });
      handled = true;
    } else if (e.key === 'ArrowLeft') {
      updateActiveLogo({ position: { ...logo.position, x: Math.max(0, logo.position.x - step) } });
      handled = true;
    } else if (e.key === 'ArrowRight') {
      updateActiveLogo({ position: { ...logo.position, x: Math.min(100, logo.position.x + step) } });
      handled = true;
    } else if (e.key === 'Delete' || e.key === 'Backspace') {
      deleteActiveLogo();
      handled = true;
    }

    if (handled) e.preventDefault();
  };

  const activeLogo = logos.find(l => l.id === activeId);

  return (
    <div className="flex flex-col gap-4 border border-border/60 rounded-xl p-4 bg-surface-elevated">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="font-semibold text-primary text-sm flex items-center gap-2">
          <ImageIcon className="h-4 w-4" /> Live Proofing Engine
        </h3>
        
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 bg-secondary/50 p-1 rounded-md">
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={undo} disabled={historyIndex <= 0} title="Undo">
              <Undo className="h-3.5 w-3.5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={redo} disabled={historyIndex >= history.length - 1} title="Redo">
              <Redo className="h-3.5 w-3.5" />
            </Button>
          </div>

          {activeLogo && (
            <div className="flex items-center gap-1 bg-secondary/50 p-1 rounded-md">
              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => snapTo(50, 50)} title="Center">
                <AlignCenter className="h-3.5 w-3.5" />
              </Button>
              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => snapTo(20, 20)} title="Top Left">
                <AlignHorizontalSpaceBetween className="h-3.5 w-3.5" />
              </Button>
              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={rotateActiveLogo} title="Rotate 15°">
                <RotateCw className="h-3.5 w-3.5" />
              </Button>
              <Button variant="ghost" size="icon" className="h-7 w-7 text-red-500 hover:text-red-600 hover:bg-red-50" onClick={deleteActiveLogo} title="Delete">
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          )}

          <div className="flex items-center gap-2">
            {logos.length > 0 && (
              <Button variant="ghost" size="sm" onClick={() => { setLogos([]); setHistory([]); setHistoryIndex(-1); }} className="h-7 px-2 text-xs text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30">
                <X className="h-3 w-3 mr-1" /> Clear All
              </Button>
            )}
            <label className="cursor-pointer h-7 px-3 text-xs flex items-center justify-center bg-accent text-primary rounded-md font-medium hover:bg-gold-hover transition-colors shadow-sm">
               <UploadCloud className="h-3 w-3 mr-1.5" /> Add Logo
               <input type="file" accept="image/*" multiple className="hidden" onChange={handleFileUpload} />
            </label>
          </div>
        </div>
      </div>

      <div 
        ref={containerRef}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        className={`relative aspect-square w-full max-w-sm mx-auto overflow-hidden bg-secondary/30 rounded-lg border-2 transition-colors focus:outline-none focus:ring-2 focus:ring-accent ${isDragOver ? 'border-accent border-dashed bg-accent/5' : 'border-border/50'}`}
        onPointerMove={isDragging || isResizing ? handlePointerMove : undefined}
        onPointerUp={isDragging || isResizing ? handlePointerUp : undefined}
        onPointerLeave={isDragging || isResizing ? handlePointerUp : undefined}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => setActiveId(null)}
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
                transform: `translate(-50%, -50%) perspective(500px) rotateX(10deg) rotateY(-5deg) rotateZ(${logo.rotation || 0}deg)`,
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
                      deleteActiveLogo();
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
                  <button 
                    type="button"
                    aria-label="Resize logo"
                    className="absolute -bottom-3 -right-3 bg-background border border-border text-foreground rounded-full p-1.5 cursor-nwse-resize z-30 shadow-md hover:scale-110 transition-transform flex items-center justify-center"
                    onPointerDown={(e) => handlePointerDown(e, logo.id, 'resize')}
                  >
                    <Maximize2 className="h-3 w-3" />
                  </button>
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
            const ratio = activeLogo.width / activeLogo.height;
            let newWidth = maxVal;
            let newHeight = maxVal;
            if (ratio > 1) {
              newHeight = maxVal / ratio;
            } else {
              newWidth = maxVal * ratio;
            }
            updateActiveLogo({ width: newWidth, height: newHeight });
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

export default LogoMockupPreview;
