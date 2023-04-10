import Head from "next/head";
import { GetStaticProps } from "next";
import { Entry, getEntries } from "../lib/entry.js";
import { useConfig } from "../hooks/useConfig";
import { EntryList } from "../components/EntryList";

interface Props {
  entries: Omit<Entry, "body">[];
}

export default function Home({ entries }: Props) {
  const config = useConfig();

  return (
    <>
      <Head>
        <title>{config.title("Archives")}</title>
      </Head>

      <h1>Archives</h1>
      <EntryList entries={entries} />
    </>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const entries = await getEntries().then((entries) =>
    entries.map(({ date, slug, title }) => ({ date, slug, title }))
  );
  return {
    props: {
      entries,
    },
  };
};
