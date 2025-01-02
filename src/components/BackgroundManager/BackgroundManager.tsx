import React, { useState, useEffect } from 'react';
import { ChevronLeft, Save } from 'lucide-react';
import { BackgroundUploader } from './BackgroundUploader';
import { FanSidebar } from './FanSidebar';
import { ImageViewer } from '../ImageViewer/ImageViewer';

export function BackgroundManager() {
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [selectedFan, setSelectedFan] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleImageSelect = (imageUrl: string) => {
    setBackgroundImage(imageUrl);
    // Save to localStorage
    const backgrounds = JSON.parse(localStorage.getItem('userBackgrounds') || '[]');
    backgrounds.push({ url: imageUrl, timestamp: Date.now() });
    localStorage.setItem('userBackgrounds', JSON.stringify(backgrounds));
  };

  const handleFanSelect = (fanUrlCode: string) => {
    setSelectedFan(fanUrlCode);
  };

  useEffect(() => {
    // Load last used background if available
    const backgrounds = JSON.parse(localStorage.getItem('userBackgrounds') || '[]');
    if (backgrounds.length > 0) {
      setBackgroundImage(backgrounds[backgrounds.length - 1].url);
    }
  }, []);

  return (
    <div className="relative h-[calc(100vh-4rem)] w-full overflow-hidden">
      <div className="relative h-full">
        {!backgroundImage ? (
          <BackgroundUploader onImageSelect={handleImageSelect} />
        ) : (
          <div className="relative h-full">
            <div
              className="absolute inset-0 h-full w-full"
              style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            {selectedFan && <ImageViewer fanName={selectedFan} />}
          </div>
        )}

        {/* Toggle Sidebar Button */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="fixed right-4 top-20 z-50 rounded-full bg-white/10 p-3 backdrop-blur-sm transition-all hover:bg-white/20"
        >
          <ChevronLeft
            className={`h-6 w-6 text-white transition-transform duration-300 ${
              isSidebarOpen ? 'rotate-180' : ''
            }`}
          />
        </button>
      </div>

      <FanSidebar
        onFanSelect={handleFanSelect}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
    </div>
  );
}