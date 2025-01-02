import { useState, useCallback } from 'react';

interface Position {
  x: number;
  y: number;
}

export function useDrag(initialPosition: Position = { x: 0, y: 0 }) {
  const [position, setPosition] = useState<Position>(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState<Position>({ x: 0, y: 0 });

  const onMouseDown = useCallback((event: React.MouseEvent) => {
    setIsDragging(true);
    setStartPosition({
      x: event.clientX - position.x,
      y: event.clientY - position.y,
    });

    const onMouseMove = (moveEvent: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: moveEvent.clientX - startPosition.x,
          y: moveEvent.clientY - startPosition.y,
        });
      }
    };

    const onMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }, [isDragging, position, startPosition]);

  return { position, onMouseDown };
}