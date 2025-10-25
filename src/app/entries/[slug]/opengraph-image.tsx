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
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!slug) {
    return [];
  }
  const entry = await getEntry(slug);

  return [
    {
      alt: entry.title,
      contentType: ogContentType,
      size: ogSize,
      id: "default",
    },
  ];
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = await getEntry(slug);
  const [formattedDate] = yyyymmdd(entry.date);
  return imageResponseWithFontChildPage(entry.title, formattedDate);
}
