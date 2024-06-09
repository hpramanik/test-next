'use client';
import { useEffect, useState } from 'react';
import type { Dimension } from './dimension.type';

export const useScreenDimension = (): Dimension => {
  const hasWindow = typeof window !== 'undefined';

  const getWindowDimensions = (): Dimension => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    return { width, height };
  };

  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    if (hasWindow) {
      const handleResize = (): void => {
        setWindowDimensions(getWindowDimensions());
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [hasWindow]);

  return windowDimensions;
};
