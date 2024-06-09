import type { ReactNode } from 'react';
import type { AutoGridComponent } from './auto.grid.types';

export const autoGridComponentRenderer = (
  component: AutoGridComponent
): ReactNode => {
  if (!component.component) {
    return null;
  }

  const JsxElem = component.component;

  return <JsxElem data={component.props} />;
};
