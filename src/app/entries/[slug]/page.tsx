import { Metadata } from "next";
import { notFound } from "next/navigation";
import { EntryView } from "../../../components/EntryView";
import { getEntries, getEntry } from "../../../lib/entry";
import { commonOpenGraph } from "../../../lib/ogUtil";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export const dynamicParams = false;

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;

  const { slug } = params;

  const canonical = `/entries/${slug}`;
  const entry = await getEntry(slug);
  if (!entry) notFound();
  return {
    title: entry.title,
    alternates: {
      canonical,
    },
    openGraph: {
      ...commonOpenGraph,
      type: "article",
      title: entry.title,
      url: canonical,
    },
  };
}

const EntryPage = async (props: Props) => {
  const params = await props.params;

  const { slug } = params;

  const entry = await getEntry(slug);
  if (!entry) notFound();
  return (
    <EntryView entry={entry} path={`/entries/${entry.slug}`} shareButton />
  );
};

export default EntryPage;

export async function generateStaticParams() {
  return getEntries().then((entries) =>
    entries.map((entry) => ({
      slug: entry.slug,
    })),
  );
}
