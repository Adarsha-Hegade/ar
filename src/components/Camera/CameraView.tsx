import React, { useEffect, useRef } from 'react';

interface CameraViewProps {
  onError?: (error: Error) => void;
}

export function CameraView({ onError }: CameraViewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ 
          video: { 
            facingMode: "environment",
            // width: { ideal: window.innerWidth },
            // height: { ideal: window.innerHeight }
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
  }, [onError]);

  return (
    <video
      ref={videoRef}
      autoPlay
      playsInline
      className="fixed inset-0 h-full w-full object-cover"
    />
  );
}