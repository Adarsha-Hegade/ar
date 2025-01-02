import { useState, useCallback } from 'react';

interface TouchState {
  scale: number;
  position: { x: number; y: number };
}

export function useTouch(initialScale = 1) {
  const [state, setState] = useState<TouchState>({
    scale: initialScale,
    position: { x: 0, y: 0 },
  });
  const [initialDistance, setInitialDistance] = useState<number | null>(null);
  const [initialPosition, setInitialPosition] = useState<{ x: number; y: number } | null>(null);

  const getDistance = (touches: TouchList) => {
    return Math.hypot(
      touches[0].clientX - touches[1].clientX,
      touches[0].clientY - touches[1].clientY
    );
  };

  const onTouchStart = useCallback((event: React.TouchEvent) => {
    if (event.touches.length === 2) {
      setInitialDistance(getDistance(event.touches));
    } else if (event.touches.length === 1) {
      setInitialPosition({
        x: event.touches[0].clientX - state.position.x,
        y: event.touches[0].clientY - state.position.y,
      });
    }
  }, [state.position]);

  const onTouchMove = useCallback((event: React.TouchEvent) => {
    event.preventDefault();
    
    if (event.touches.length === 2 && initialDistance) {
      const distance = getDistance(event.touches);
      const scale = Math.min(Math.max(state.scale * (distance / initialDistance), 0.5), 3);
      
      setState(prev => ({
        ...prev,
        scale,
      }));
      setInitialDistance(distance);
    } else if (event.touches.length === 1 && initialPosition) {
      setState(prev => ({
        ...prev,
        position: {
          x: event.touches[0].clientX - initialPosition.x,
          y: event.touches[0].clientY - initialPosition.y,
        },
      }));
    }
  }, [initialDistance, initialPosition, state.scale]);

  const onTouchEnd = useCallback(() => {
    setInitialDistance(null);
    setInitialPosition(null);
  }, []);

  return {
    scale: state.scale,
    position: state.position,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  };
}