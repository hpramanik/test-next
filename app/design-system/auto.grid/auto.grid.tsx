"use client";
import type { ReactNode } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import { autoGridComponentRenderer } from "./auto.grid.component.renderer";
import { type AutoGridProps } from "./auto.grid.types";
import { defaultColBreakpoints, defaultGridBreakpoints } from "./defaults";

const ReactGridLayoutLib = WidthProvider(Responsive);

export const AutoGrid = ({
  reactGridLayoutProps,
  components,
  debug,
}: Readonly<AutoGridProps>): JSX.Element => {
  const inlineStyle: React.CSSProperties = {
    height: "100%",
    width: "100%",
  };

  if (debug) {
    inlineStyle.border = "medium dashed blue";
  }

  const renderComponents = (): ReactNode => {
    return components.map((component) => {
      return (
        <div key={component.name} style={inlineStyle}>
          {autoGridComponentRenderer(component)}
        </div>
      );
    });
  };

  return (
    <ReactGridLayoutLib
      {...{
        ...reactGridLayoutProps,
        cols: reactGridLayoutProps.cols ?? defaultColBreakpoints,
        breakpoints: reactGridLayoutProps.breakpoints ?? defaultGridBreakpoints,
        autoSize: reactGridLayoutProps.autoSize ?? true,
      }}
    >
      {renderComponents()}
    </ReactGridLayoutLib>
  );
};
