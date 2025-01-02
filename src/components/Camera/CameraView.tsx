import React, { useEffect, useRef, useState } from 'react';

interface CameraViewProps {
  onError?: (error: Error) => void;
  customBackground?: string;
}

export function CameraView({ onError, customBackground }: CameraViewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [usingCamera, setUsingCamera] = useState(!customBackground);

  useEffect(() => {
    if (!customBackground && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ 
          video: { 
            facingMode: "environment",
          } 
        })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.play();
          }
        })
        .catch((error) => {
          console.error("Error accessing camera:", error);
          onError?.(error);
        });
    }

    return () => {
      if (videoRef.current?.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, [onError, customBackground]);

  if (customBackground) {
    return (
      <div 
        className="fixed inset-0 h-full w-full"
        style={{
          backgroundImage: `url(${customBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
    );
  }

  return (
    <video
      ref={videoRef}
      autoPlay
      playsInline
      className="fixed inset-0 h-full w-full object-cover"
    />
  );
}