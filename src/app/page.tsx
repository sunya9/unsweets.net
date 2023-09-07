import Link from "next/link";
import { Metadata } from "next";
import { getEntries } from "../lib/entry";
import { EntryList } from "../components/EntryList";
import { config } from "../../blog.config";
import { buildFullPath } from "../lib/util";

export const metadata: Metadata = {
  title: config.title(),
  alternates: {
    canonical: buildFullPath("/"),
  },
};

export default async function Home() {
  const entries = await getEntries(5).then((entries) =>
    entries.map(({ date, slug, title }) => ({ date, slug, title })),
  );

  return (
    <>
      <EntryList entries={entries} />
      <Link href="/archives">Archives</Link>
    </>
  );
}
