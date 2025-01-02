import React from 'react';
import { useFanData } from '../../hooks/useFanData';
import { FanGrid } from '../FanGrid/FanGrid';

export function Home() {
  console.log(
    "%cDeveloped with ❤️ by https://inktypedesign.studio/",
    "color: #ff69b4; font-size: 16px; font-weight: bold;"
  );
  const { fanData, loading, error } = useFanData();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-white border-t-transparent" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center text-white">
        <p>Error loading fans data</p>
      </div>
    );
  }

  const categories = [...new Set(fanData.map(fan => fan.category))];
  
  return (
    <div className="min-h-screen w-full overflow-y-auto pb-20">
      <div className="mx-auto max-w-7xl px-4 py-8">
        {categories.map((category) => (
          <div key={category} className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-white">{category}</h2>
            <FanGrid fans={fanData.filter(fan => fan.category === category)} />
          </div>
        ))}
      </div>
    </div>
  );
}