"use client";

import { ImgHTMLAttributes } from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

type Props = {
  fixedSrc: string;
} & Omit<ImgHTMLAttributes<HTMLImageElement>, "src">;

export const ZoomWrapper = ({ fixedSrc, alt, ...rest }: Props) => {
  return (
    <Zoom wrapElement="span" zoomMargin={16}>
      <img
        src={fixedSrc}
        className="my-0 max-h-64 border shadow-lg"
        alt={alt}
        {...rest}
      />
    </Zoom>
  );
};
