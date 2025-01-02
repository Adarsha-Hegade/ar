import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { useFanData } from '../../hooks/useFanData';

interface FanSidebarProps {
  onFanSelect: (fanUrlCode: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function FanSidebar({ onFanSelect, isOpen, onClose }: FanSidebarProps) {
  const { fanData, loading } = useFanData();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFans = fanData.filter(fan => 
    fan.modelName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div 
      className={`fixed right-0 top-0 h-full w-80 transform bg-gray-900 shadow-xl transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="flex h-16 items-center justify-between border-b border-gray-800 px-4">
        <h2 className="text-lg font-semibold text-white">Available Fans</h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>
      </div>

      <div className="p-4">
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search fans..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg bg-gray-800 px-4 py-2 pl-10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        </div>

        {loading ? (
          <div className="flex h-full items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-white border-t-transparent" />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 8rem)' }}>
            {filteredFans.map((fan) => (
              <button
                key={fan.urlCode}
                onClick={() => onFanSelect(fan.urlCode)}
                className="group overflow-hidden rounded-lg bg-white/5 p-2 transition-all hover:bg-white/10"
              >
                <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-800">
                  <img
                    src={`/images/thumbs/${fan.urlCode}.png`}
                    alt={fan.modelName}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <p className="mt-2 truncate text-sm text-white">
                  {fan.modelName.split(' – ')[0]}
                </p>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}