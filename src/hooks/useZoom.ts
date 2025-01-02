import { useState, useCallback } from 'react';

export function useZoom(initialScale: number = 1, minScale: number = 0.5, maxScale: number = 3) {
  const [scale, setScale] = useState(initialScale);

  const onWheel = useCallback((event: React.WheelEvent) => {
    event.preventDefault();
    const delta = event.deltaY * -0.01;
    const newScale = Math.min(Math.max(scale + delta, minScale), maxScale);
    setScale(newScale);
  }, [scale]);

  return { scale, onWheel };
}