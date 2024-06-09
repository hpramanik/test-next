'use client';
import type {
  ChartComponentLike,
  ChartData,
  ChartOptions,
  ChartType,
  DefaultDataPoint,
  Plugin
} from 'chart.js';
import { Chart as ChartLib, registerables } from 'chart.js';
import { saveAs } from 'file-saver';
import { useCallback, useEffect, useRef } from 'react';
import { useRefDimension } from '../../utilities';

export interface ChartProps<T extends ChartType = 'line'> {
  type: T;
  data: ChartData<T, DefaultDataPoint<T>>;
  options?: ChartOptions<T>;
  plugins?: Plugin<T>[];
  downloadFileName?: string;
  downloadRef?: React.RefObject<HTMLElement>;
  classNames?: string;
  initialHeight?: number;
  initialWidth?: number;
}

export const registerAllCharts = (external?: ChartComponentLike[]): void => {
  ChartLib.register(...registerables, ...(external ?? []));
};

export const Chart = <T extends ChartType = 'line'>({
  type,
  data,
  options,
  plugins,
  downloadFileName,
  downloadRef,
  classNames = 'h-full w-full',
  initialHeight = 0,
  initialWidth = 0
}: Readonly<ChartProps<T>>): JSX.Element => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);

  const { height, width } = useRefDimension(parentRef, {
    height: initialHeight,
    width: initialWidth
  });

  const handleDownload = useCallback(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.toBlob((blob) => {
        if (blob) {
          saveAs(
            blob,
            downloadFileName ? `${downloadFileName}.png` : 'chart.png'
          );
        }
      });
    }
  }, [downloadFileName]);

  useEffect(() => {
    if (!downloadRef?.current) return;
    const element = downloadRef.current;
    element.addEventListener('click', handleDownload);
    return () => {
      element.removeEventListener('click', handleDownload);
    };
  }, [downloadRef, handleDownload]);

  useEffect(() => {
    let chartRef: ChartLib<T, DefaultDataPoint<T>> | null = null;
    if (canvasRef.current) {
      chartRef = new ChartLib<T>(canvasRef.current, {
        type,
        data,
        options,
        plugins
      });

      return () => {
        if (chartRef) {
          chartRef.destroy();
        }
      };
    }
  }, [canvasRef, data, options, plugins, type, width, height]);

  return (
    <div className={classNames} ref={parentRef}>
      <canvas height={height} ref={canvasRef} width={width} />
    </div>
  );
};
