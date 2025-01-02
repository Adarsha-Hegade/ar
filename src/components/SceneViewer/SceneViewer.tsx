import React, { useState, useEffect } from 'react';
import { ChevronUp, Maximize, Minimize, Image } from 'lucide-react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { Toolbar } from '../Toolbar/Toolbar';
import { ImageViewer } from '../ImageViewer/ImageViewer';
import { CameraView } from '../Camera/CameraView';
import { useFanData } from '../../hooks/useFanData';
import { useFullscreen } from '../../hooks/useFullscreen';

export function SceneViewer() {
  const { fanName } = useParams<{ fanName: string }>();
  const [isToolbarOpen, setIsToolbarOpen] = useState(false);
  const [cameraError, setCameraError] = useState<Error | null>(null);
  const [selectedBackground, setSelectedBackground] = useState<string | null>(null);
  const { fanData, loading, error } = useFanData();
  const { isFullscreen, toggleFullscreen } = useFullscreen();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !error && fanData.length > 0) {
      const fanExists = fanData.some(fan => fan.urlCode === fanName);
      if (!fanExists) {
        navigate('/', { replace: true });
      }
    }
  }, [fanName, fanData, loading, error, navigate]);

  useEffect(() => {
    const backgrounds = localStorage.getItem('userBackgrounds');
    if (backgrounds) {
      const parsedBackgrounds = JSON.parse(backgrounds);
      if (parsedBackgrounds.length > 0) {
        setSelectedBackground(parsedBackgrounds[0].url);
      }
    }
  }, []);

  const handleBackgroundChange = () => {
    const backgrounds = JSON.parse(localStorage.getItem('userBackgrounds') || '[]');
    if (backgrounds.length > 0) {
      const currentIndex = backgrounds.findIndex((bg: { url: string }) => bg.url === selectedBackground);
      const nextIndex = (currentIndex + 1) % backgrounds.length;
      setSelectedBackground(backgrounds[nextIndex].url);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-900">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-white border-t-transparent" />
      </div>
    );
  }

  if (error) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gray-900">
      {!cameraError && <CameraView onError={setCameraError} customBackground={selectedBackground} />}
      {fanName && <ImageViewer fanName={fanName} />}
      
      <div className="fixed bottom-4 left-4 z-50 flex gap-2">
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
        {localStorage.getItem('userBackgrounds') && (
          <button
            onClick={handleBackgroundChange}
            className="rounded-full bg-white/10 p-3 backdrop-blur-sm transition-all hover:bg-white/20"
          >
            <Image className="h-6 w-6 text-white" />
          </button>
        )}
      </div>

      <button
        onClick={() => setIsToolbarOpen(!isToolbarOpen)}
        className={`fixed bottom-4 right-4 z-50 rounded-full bg-white/10 p-3 backdrop-blur-sm transition-all hover:bg-white/20 ${
          isToolbarOpen ? 'rotate-180' : ''
        }`}
      >
        <ChevronUp className="h-6 w-6 text-white" />
      </button>

      <Toolbar isOpen={isToolbarOpen} currentFan={fanName || ''} />
    </div>
  );
}