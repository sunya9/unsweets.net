"use client";

import { PropsWithChildren } from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

export const ZoomWrapper = ({ children }: PropsWithChildren) => {
  return <Zoom>{children}</Zoom>;
};
