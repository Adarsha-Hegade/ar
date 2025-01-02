import React, { useState, useRef } from 'react';
import { ChevronRight, Upload, Maximize, Minimize } from 'lucide-react';
import { FanSidebar } from './FanSidebar';
import { FanImageOverlay } from './FanImageOverlay';
import { useFullscreen } from '../../hooks/useFullscreen';

export function TryYourOwn() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFan, setSelectedFan] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { isFullscreen, toggleFullscreen } = useFullscreen();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFanSelect = (fanCode: string) => {
    setSelectedFan(fanCode);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gray-900">
      {/* Background Image or Upload Prompt */}
      {selectedImage ? (
        <img
          src={selectedImage}
          alt="Uploaded room"
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <div className="text-center">
            <button
              onClick={triggerFileInput}
              className="flex items-center gap-2 rounded-lg bg-white/10 px-6 py-3 text-white backdrop-blur-sm transition-all hover:bg-white/20"
            >
              <Upload size={20} />
              Upload Room Image
            </button>
            <p className="mt-4 text-sm text-gray-400">
              Upload an image of your room to visualize the fan
            </p>
          </div>
        </div>
      )}

      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageUpload}
        accept="image/*"
        className="hidden"
      />

      {/* Fan Image Overlay */}
      {selectedFan && selectedImage && <FanImageOverlay fanName={selectedFan} />}

      {/* Fullscreen Toggle */}
      <div className="fixed bottom-4 left-4 z-50">
        <button
          onClick={toggleFullscreen}
          className="rounded-full bg-white/10 p-3 backdrop-blur-sm transition-all hover:bg-white/20"
        >
          {isFullscreen ? (
            <Minimize className="h-6 w-6 text-white" />
          ) : (
            <Maximize className="h-6 w-6 text-white" />
          )}
        </button>
      </div>

      {/* Sidebar Toggle */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className={`fixed right-0 top-1/2 z-50 -translate-y-1/2 rounded-l-lg bg-white/10 p-3 backdrop-blur-sm transition-all hover:bg-white/20 ${
          isSidebarOpen ? 'translate-x-[300px]' : ''
        }`}
      >
        <ChevronRight
          className={`h-6 w-6 text-white transition-transform ${
            isSidebarOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Fan Selection Sidebar */}
      <FanSidebar
        isOpen={isSidebarOpen}
        onFanSelect={handleFanSelect}
        selectedFan={selectedFan}
        onClose={() => setIsSidebarOpen(false)}
      />
    </div>
  );
}