import type { Layout, Layouts } from "react-grid-layout";
import { defaultColBreakpoints } from "./default.col.breakpoints";

export interface DefaultLayoutProps
  extends Omit<Layout, "i" | "w" | "h" | "x" | "y"> {
  numberOfComponents: number;
  componentNamePrefix?: string;
  numberOfComponentInEachRowPerBreakPoint?: Record<string, number>;
  colBreakpoints?: Record<string, number>;
}

interface DefaultGetLayoutsProps
  extends Omit<
    DefaultLayoutProps,
    "numberOfComponentInEachRowPerBreakPoint" | "colBreakpoints"
  > {
  numberOfComponentInEachRow: number;
  gridCols: number;
}

const getLayouts = ({
  numberOfComponentInEachRow,
  componentNamePrefix,
  numberOfComponents,
  gridCols,
  ...rest
}: DefaultGetLayoutsProps): Layout[] => {
  const layouts: Layout[] = [];
  let currentRow = 0;
  const equivalentWidth = gridCols / numberOfComponentInEachRow;
  const equivalentHeight = 3;

  for (let compCount = 0; compCount < numberOfComponents; ) {
    let widthMultiplier = 0;
    for (
      let rowCompCount = compCount;
      rowCompCount < compCount + numberOfComponentInEachRow &&
      rowCompCount < numberOfComponents;
      rowCompCount++
    ) {
      layouts.push({
        i: `${componentNamePrefix ?? ""}-${rowCompCount + 1}`,
        w: equivalentWidth,
        h: equivalentHeight,
        x: widthMultiplier * equivalentWidth,
        y: currentRow * equivalentHeight,
        ...rest,
      });

      widthMultiplier++;
    }
    compCount += numberOfComponentInEachRow;
    currentRow++;
  }

  return layouts;
};

export const defaultLayout = ({
  componentNamePrefix = "comp",
  numberOfComponentInEachRowPerBreakPoint = {
    lg: 3,
    md: 2,
    sm: 2,
    xs: 1,
    xxs: 1,
  },
  numberOfComponents,
  colBreakpoints = defaultColBreakpoints,
  ...rest
}: DefaultLayoutProps): Layouts => {
  const layouts: Layouts = {};

  for (const breakpoint in numberOfComponentInEachRowPerBreakPoint) {
    layouts[breakpoint] = getLayouts({
      numberOfComponents,
      componentNamePrefix,
      numberOfComponentInEachRow:
        numberOfComponentInEachRowPerBreakPoint[breakpoint] ?? 4,
      gridCols: colBreakpoints[breakpoint] ?? 16,
      ...rest,
    });
  }

  return layouts;
};
