"use client";

import { useState, useRef, useCallback } from "react";

interface ExactConfirmModalProps {
  imageSrc: string;
  onAccept: () => void;
  onInvalid: () => void;
}

export default function ExactConfirmModal({
  imageSrc,
  onAccept,
  onInvalid,
}: ExactConfirmModalProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [initialized, setInitialized] = useState(false);
  const dragRef = useRef<{ startX: number; startY: number; origX: number; origY: number } | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const initPosition = useCallback((node: HTMLDivElement | null) => {
    if (node && !initialized) {
      // Position to the right half of the screen so Source panel stays visible
      const rect = node.getBoundingClientRect();
      setPosition({
        x: window.innerWidth / 2 - rect.width / 2 + window.innerWidth * 0.15,
        y: window.innerHeight / 2 - rect.height / 2,
      });
      setInitialized(true);
      modalRef.current = node;
    }
  }, [initialized]);

  const handleMouseDown = (e: React.MouseEvent) => {
    // Only drag from the title bar area
    const target = e.target as HTMLElement;
    if (!target.closest("[data-drag-handle]")) return;

    e.preventDefault();
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      origX: position.x,
      origY: position.y,
    };

    const handleMouseMove = (ev: MouseEvent) => {
      if (!dragRef.current) return;
      setPosition({
        x: dragRef.current.origX + (ev.clientX - dragRef.current.startX),
        y: dragRef.current.origY + (ev.clientY - dragRef.current.startY),
      });
    };

    const handleMouseUp = () => {
      dragRef.current = null;
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div className="fixed inset-0 z-50" style={{ pointerEvents: "none" }}>
      <div
        ref={initPosition}
        onMouseDown={handleMouseDown}
        className="bg-theme-panel border border-theme-border rounded-lg p-6 w-[550px] shadow-2xl absolute"
        style={{
          left: position.x,
          top: position.y,
          pointerEvents: "auto",
        }}
      >
        <div
          data-drag-handle
          className="flex items-center mb-4 cursor-move select-none"
        >
          <h2 className="text-lg font-semibold text-theme-text">
            Confirm Exact Match
          </h2>
          <span className="ml-auto text-theme-text-secondary text-xs">drag to move</span>
        </div>
        <div className="bg-theme-surface rounded border border-theme-border p-4 mb-6 flex items-center justify-center min-h-[200px]">
          <img
            src={imageSrc}
            alt="CDX Confirmation"
            className="max-w-full max-h-[400px] object-contain"
          />
        </div>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onAccept}
            className="px-6 py-2 bg-accent-green hover:bg-accent-green/80 text-white rounded font-medium cursor-pointer transition-colors"
          >
            Accept
          </button>
          <button
            onClick={onInvalid}
            className="px-6 py-2 bg-accent-red hover:bg-accent-red/80 text-white rounded font-medium cursor-pointer transition-colors"
          >
            Invalid
          </button>
        </div>
      </div>
    </div>
  );
}
