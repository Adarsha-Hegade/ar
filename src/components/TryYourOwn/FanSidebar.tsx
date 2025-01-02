import React, { useState, useMemo } from 'react';
import { Search, X } from 'lucide-react';
import { useFanData } from '../../hooks/useFanData';
import { FanGridCard } from './FanGridCard';

interface FanSidebarProps {
  isOpen: boolean;
  onFanSelect: (fanCode: string) => void;
  selectedFan: string | null;
  onClose: () => void;
}

export function FanSidebar({ isOpen, onFanSelect, selectedFan, onClose }: FanSidebarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const { fanData, loading } = useFanData();

  const filteredFans = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return fanData.filter(fan => 
      fan.modelName.toLowerCase().includes(query) ||
      fan.fanSize.toLowerCase().includes(query) ||
      fan.fanFinish.toLowerCase().includes(query)
    );
  }, [fanData, searchQuery]);

  if (loading) {
    return null;
  }

  return (
    <div
      className={`fixed right-0 top-0 h-full w-[300px] transform overflow-hidden bg-black/80 backdrop-blur-lg transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="flex h-full flex-col">
        {/* Header with close button */}
        <div className="flex items-center justify-between border-b border-white/10 p-4">
          <h2 className="text-lg font-semibold text-white">Select Fan</h2>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-gray-400 hover:bg-white/10 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Search bar */}
        <div className="border-b border-white/10 p-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search fans..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg bg-white/10 px-4 py-2 pl-10 text-white placeholder-gray-400"
            />
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Fan grid */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-2 gap-4">
            {filteredFans.map((fan) => (
              <FanGridCard
                key={fan.urlCode}
                fanUrlCode={fan.urlCode}
                fanDisplayName={fan.modelName}
                onClick={() => onFanSelect(fan.urlCode)}
                isSelected={selectedFan === fan.urlCode}
              />
            ))}
          </div>
          {filteredFans.length === 0 && (
            <p className="text-center text-gray-400">No fans found</p>
          )}
        </div>
      </div>
    </div>
  );
}