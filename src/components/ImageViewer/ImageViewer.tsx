import React, { useState, useEffect } from 'react';
import { Fan } from 'lucide-react';
import { useTouch } from '../../hooks/useTouch';

interface ImageViewerProps {
  fanName: string;
}

export function ImageViewer({ fanName }: ImageViewerProps) {
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const { scale, position, onTouchStart, onTouchMove, onTouchEnd } = useTouch();

  // Preload image
  useEffect(() => {
    setLoading(true);
    setImageError(false);

    const img = new Image();
    img.src = `/images/${fanName}.png`;
    
    img.onload = () => {
      setLoading(false);
    };
    
    img.onerror = () => {
      setLoading(false);
      setImageError(true);
    };

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [fanName]);
 

  return (
    <div 
      className="absolute inset-0 touch-none"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {loading && (
        <div className="flex h-full items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="h-32 w-32 animate-spin rounded-full border-4 border-white border-t-transparent" />
            <p className="text-white">Loading {fanName.replace(/-/g, ' ')}...</p>
          </div>
        </div>
      )}
      {imageError ? (
        <div className="flex h-full items-center justify-center">
          <div className="flex flex-col items-center gap-4 text-white">
            <Fan className="h-32 w-32" />
            <p>No preview available for {fanName.replace(/-/g, ' ')}</p>
          </div>
        </div>
      ) : (
        <img
          src={`/images/${fanName}.png`}
          alt={`${fanName} fan`}
          className={`pointer-events-none absolute left-1/2 top-1/2 origin-center transition-transform ${
            loading ? 'opacity-0' : 'opacity-100'
          }`}
          style={{
            transform: `translate(-50%, -50%) translate(${position.x}px, ${position.y}px) scale(${scale})`,
          }}
        />
      )}
    </div>
  );
}