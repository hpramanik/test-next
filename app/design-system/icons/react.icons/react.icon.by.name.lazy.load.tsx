import type { ReactElement } from "react";
import React, { Suspense } from "react";
import type { ReactIconByNameProps } from "./react.icon.by.name";

const ReactIconByName = React.lazy(async () => {
  return {
    default: (await import("./react.icon.by.name")).ReactIconByName,
  };
});

export const ReactIconByNameLazyLoad = (
  props: Readonly<ReactIconByNameProps>,
): ReactElement => {
  return (
    <Suspense fallback={props.fallback ?? null}>
      <ReactIconByName {...props} />
    </Suspense>
  );
};
