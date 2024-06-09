'use client';
import type { RefObject } from 'react';
import { useEffect, useState } from 'react';
import type { Dimension } from './dimension.type';

export const useRefDimension = (
  parentContainer: RefObject<HTMLElement>,
  initialDimension?: Dimension
): Dimension => {
  const [parentDim, setParentDim] = useState<Dimension>({
    height: initialDimension?.height,
    width: initialDimension?.width
  });

  useEffect(() => {
    if (parentContainer.current) {
      const resizeObserver = new ResizeObserver((event) => {
        setParentDim({
          height: event[0]?.contentBoxSize[0]?.blockSize,
          width: event[0]?.contentBoxSize[0]?.inlineSize
        });
      });

      resizeObserver.observe(parentContainer.current);

      return () => {
        resizeObserver.disconnect();
      };
    }
  }, [parentContainer]);

  return parentDim;
};
