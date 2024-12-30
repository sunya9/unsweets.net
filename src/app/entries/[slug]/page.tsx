import { Metadata } from "next";
import { notFound } from "next/navigation";
import { EntryView } from "../../../components/EntryView";
import { getEntries, getEntry } from "../../../lib/entry";
import { buildFullPath } from "../../../lib/util";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export const dynamicParams = false;

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;

  const { slug } = params;

  const entry = await getEntry(slug);
  if (!entry) notFound();

  return {
    title: entry.title,
    alternates: {
      canonical: buildFullPath(`/entries/${entry.slug}`),
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
