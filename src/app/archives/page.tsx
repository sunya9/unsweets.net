import { Metadata } from "next";
import { getEntries } from "../../lib/entry.js";
import { config } from "../../../blog.config.js";
import { AppLayout } from "../../components/AppLayout";
import { EntryList } from "../../components/EntryList";
import { buildFullPath } from "../../lib/util.js";

export const metadata: Metadata = {
  title: config.title("Archives"),
  alternates: {
    canonical: buildFullPath("/archives"),
  },
};

export default async function Home() {
  const entries = await getEntries().then((entries) =>
    entries.map(({ date, slug, title }) => ({ date, slug, title }))
  );
  return (
    <AppLayout path="/archives">
      <h1>Archives</h1>
      <EntryList entries={entries} />
    </AppLayout>
  );
}
