import { config } from "../../blog.config";
import {
  coloredTitle,
  imageResponseWithFont,
  OgBackground,
  ogContentType,
  ogSize,
} from "../lib/ogUtil";

export const dynamic = "force-static";

export const alt = config.title();

export const contentType = ogContentType;

export const size = ogSize;

export default function Image() {
  return imageResponseWithFont(
    <OgBackground tw="items-center">
      <div tw="flex text-9xl">{coloredTitle}</div>
    </OgBackground>,
  );
}
