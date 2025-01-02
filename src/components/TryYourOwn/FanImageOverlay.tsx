import React, { useState } from 'react';
import { useTouch } from '../../hooks/useTouch';
import { Fan } from 'lucide-react';

interface FanImageOverlayProps {
  fanName: string;
}

export function FanImageOverlay({ fanName }: FanImageOverlayProps) {
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const { scale, position, onTouchStart, onTouchMove, onTouchEnd } = useTouch();

  const handleImageLoad = () => {
    setLoading(false);
  };

  const handleImageError = () => {
    setLoading(false);
    setImageError(true);
  };

  return (
    <div 
      className="absolute inset-0 touch-none"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {loading && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-white border-t-transparent" />
        </div>
      )}
      {imageError ? (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Fan className="h-12 w-12 text-white/50" />
        </div>
      ) : (
        <img
          src={`/images/${fanName}.png`}
          alt={`${fanName} fan`}
          className="pointer-events-none absolute left-1/2 top-1/2 origin-center transition-opacity"
          style={{
            transform: `translate(-50%, -50%) translate(${position.x}px, ${position.y}px) scale(${scale})`,
            opacity: loading ? 0 : 1,
          }}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      )}
    </div>
  );
}