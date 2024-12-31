import { Metadata } from "next";
import { getEntries } from "../../lib/entry";
import { EntryList } from "../../components/EntryList";

export const metadata: Metadata = {
  title: "Archives",
  alternates: {
    canonical: "/archives",
  },
};

export default async function Home() {
  const entries = await getEntries().then((entries) =>
    entries.map(({ date, slug, title }) => ({ date, slug, title })),
  );
  return (
    <>
      <h1>Archives</h1>
      <EntryList entries={entries} />
    </>
  );
}
