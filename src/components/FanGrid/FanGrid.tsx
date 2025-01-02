import React from 'react';
import { Link } from 'react-router-dom';
import { Fan } from 'lucide-react';
import { FanData } from '../../types/fan';

interface FanGridProps {
  fans: FanData[];
}

export function FanGrid({ fans }: FanGridProps) {
  return (
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {fans.map((fan) => (
        <Link
          key={fan.urlCode}
          to={`/${fan.urlCode}`}
          className="group overflow-hidden rounded-lg bg-white/5 p-4 transition-all hover:bg-white/10"
        >
          <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-800">
            <img
              src={`/images/thumbs/${fan.urlCode}.png`}
              alt={fan.modelName}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
              onError={(e) => {
                const target = e.currentTarget;
                target.style.display = 'none';
                const fallback = document.createElement('div');
                fallback.className = 'flex h-full items-center justify-center';
                fallback.innerHTML = '<div class="h-12 w-12 text-white/50"><Fan /></div>';
                target.parentElement?.appendChild(fallback);
              }}
            />
          </div>
          <h3 className="mt-4 text-center text-lg font-medium text-white">
            {fan.modelName}
          </h3>
        </Link>
      ))}
    </div>
  );
}




