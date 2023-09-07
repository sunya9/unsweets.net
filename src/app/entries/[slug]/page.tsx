import { Metadata } from "next";
import { EntryView } from "../../../components/EntryView";
import { getEntries, getEntry } from "../../../lib/entry.js";
import { config } from "../../../../blog.config";
import { buildFullPath } from "../../../lib/util";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params: { slug },
}: Props): Promise<Metadata> {
  const entry = await getEntry(slug);

  return {
    title: config.title(entry.title),
    alternates: {
      canonical: buildFullPath(`/entries/${entry.slug}`),
    },
  };
}

const EntryPage = async ({ params: { slug } }: Props) => {
  const entry = await getEntry(slug);
  return (
    <EntryView entry={entry} path={`/entries/${entry.slug}`} shareButton />
  );
};

export default EntryPage;

export async function generateStaticParams() {
  return getEntries().then((entries) =>
    entries.map((entry) => ({
      slug: entry.slug,
    }))
  );
}
