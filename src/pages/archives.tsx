import * as React from "react";
import Head from "next/head";
import { GetStaticProps } from "next";
import { Entry, getEntries } from "../lib/entry";
import { useConfig } from "../hooks/useConfig";
import { EntryList } from "../components/EntryList";

interface Props {
  entries: Omit<Entry, "body">[];
}
export default function Home(props: Props) {
  const config = useConfig();
  const entriesGroupedByYear = props.entries.reduce<{
    [key: number]: Omit<Entry, "body">[];
  }>((memo, entry) => {
    const year = new Date(entry.date).getFullYear();
    return {
      ...memo,
      [year]: (memo[year] || []).concat(entry),
    };
  }, {});
  const years = Object.keys(entriesGroupedByYear)
    .map((year) => +year)
    .sort((a, b) => b - a);
  return (
    <div>
      <Head>
        <title>{config.title("Archives")}</title>
      </Head>

      <main>
        <h1>Archives</h1>
        {years.map((year) => (
          <React.Fragment key={year}>
            <h2>{year}</h2>
            <EntryList entries={entriesGroupedByYear[year]} omitYear />
          </React.Fragment>
        ))}
      </main>
    </div>
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
