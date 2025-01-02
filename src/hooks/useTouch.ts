import { useState, useCallback } from 'react';

interface TouchState {
  scale: number;
  position: { x: number; y: number };
}

interface TouchInfo {
  distance: number | null;
  position: { x: number; y: number } | null;
  startScale: number;
}

export function useTouch(initialScale = 1, minScale = 0.1, maxScale = 2) {
  const [state, setState] = useState<TouchState>({
    scale: initialScale,
    position: { x: 0, y: 0 },
  });
  
  const [touchInfo, setTouchInfo] = useState<TouchInfo>({
    distance: null,
    position: null,
    startScale: initialScale,
  });

  const getDistance = (touches: TouchList) => {
    return Math.hypot(
      touches[0].clientX - touches[1].clientX,
      touches[0].clientY - touches[1].clientY
    );
  };

  const onTouchStart = useCallback((event: React.TouchEvent) => {
    if (event.touches.length === 2) {
      setTouchInfo(prev => ({
        ...prev,
        distance: getDistance(event.touches),
        startScale: state.scale,
      }));
    } else if (event.touches.length === 1) {
      setTouchInfo(prev => ({
        ...prev,
        position: {
          x: event.touches[0].clientX - state.position.x,
          y: event.touches[0].clientY - state.position.y,
        },
      }));
    }
  }, [state.position, state.scale]);

  const onTouchMove = useCallback((event: React.TouchEvent) => {
    event.preventDefault();
    
    if (event.touches.length === 2 && touchInfo.distance !== null) {
      const distance = getDistance(event.touches);
      const newScale = Math.min(
        Math.max(touchInfo.startScale * (distance / touchInfo.distance), minScale),
        maxScale
      );
      
      setState(prev => ({
        ...prev,
        scale: newScale,
      }));
    } else if (event.touches.length === 1 && touchInfo.position) {
      setState(prev => ({
        ...prev,
        position: {
          x: event.touches[0].clientX - touchInfo.position!.x,
          y: event.touches[0].clientY - touchInfo.position!.y,
        },
      }));
    }
  }, [touchInfo, minScale, maxScale]);

  const onTouchEnd = useCallback(() => {
    setTouchInfo({
      distance: null,
      position: null,
      startScale: state.scale,
    });
  }, [state.scale]);

  return {
    scale: state.scale,
    position: state.position,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  };
}