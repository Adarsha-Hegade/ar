import React, { useState } from 'react';
import { Fan } from 'lucide-react';

interface FanGridCardProps {
  fanUrlCode: string;
  fanDisplayName: string;
  onClick: () => void;
  isSelected: boolean;
}

export function FanGridCard({ fanUrlCode, fanDisplayName, onClick, isSelected }: FanGridCardProps) {
  const [imageError, setImageError] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleImageLoad = () => {
    setLoading(false);
  };

  const handleImageError = () => {
    setLoading(false);
    setImageError(true);
  };

  const truncateName = (name: string) => {
    const truncated = name.split(' - ')[0];
    return truncated.trim();
  };

  return (
    <div
      onClick={onClick}
      className={`group flex cursor-pointer flex-col items-center rounded-lg bg-white/5 p-3 transition-all hover:bg-white/10 ${
        isSelected ? 'ring-2 ring-white' : ''
      }`}
    >
      <div className="relative h-32 w-32 overflow-hidden rounded-lg bg-gray-800">
        {loading && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-white border-t-transparent" />
          </div>
        )}
        {imageError ? (
          <div className="flex h-full items-center justify-center">
            <Fan className="h-12 w-12 text-white/50" />
          </div>
        ) : (
          <img
            src={`/images/thumbs/${fanUrlCode}.png`}
            alt={fanDisplayName || 'Fan'}
            className={`h-auto w-auto object-cover p-3 transition-all duration-300 ${
              loading ? 'opacity-0' : 'opacity-100'
            } group-hover:scale-110`}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        )}
      </div>
      <p className="mt-2 text-center text-sm font-medium text-white">
        {truncateName(fanDisplayName || 'Unknown')}
      </p>
    </div>
  );
}