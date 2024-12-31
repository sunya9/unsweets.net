import {
  imageResponseWithFontChildPage,
  ogContentType,
  ogSize,
} from "../../lib/ogUtil";

export const contentType = ogContentType;
export const size = ogSize;
export const alt = "Archives";

export default async function Image() {
  return imageResponseWithFontChildPage("Archives");
}
