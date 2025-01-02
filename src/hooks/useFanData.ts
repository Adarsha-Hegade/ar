import { useState, useEffect } from 'react';
import { FanData } from '../types/fan';

export function useFanData() {
  const [fanData, setFanData] = useState<FanData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetch('/fans.json')
      .then((response) => response.json())
      .then((data: FanData[]) => {
        setFanData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  return { fanData, loading, error };
}