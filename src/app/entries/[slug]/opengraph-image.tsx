import { yyyymmdd } from "../../../lib/dateUtil";
import { getEntry } from "../../../lib/entry";
import {
  imageResponseWithFontChildPage,
  ogContentType,
  ogSize,
} from "../../../lib/ogUtil";

export async function generateImageMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const entry = await getEntry(params.slug);

  return [
    {
      alt: entry.title,
      contentType: ogContentType,
      ogSize,
      id: "defualt",
    },
  ];
}

export default async function Image({ params }: { params: { slug: string } }) {
  const entry = await getEntry(params.slug);
  const [formattedDate] = yyyymmdd(entry.date);
  return imageResponseWithFontChildPage(entry.title, formattedDate);
}
