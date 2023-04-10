import Head from "next/head";
import { GetStaticProps } from "next";
import Link from "next/link";
import { Entry, getEntries } from "../lib/entry";
import { useConfig } from "../hooks/useConfig";
import { EntryList } from "../components/EntryList";

interface Props {
  entries: Omit<Entry, "body">[];
}
export default function Home(props: Props) {
  const config = useConfig();
  return (
    <>
      <Head>
        <title>{config.title()}</title>
      </Head>

      <EntryList entries={props.entries} />
      <Link href="/archives">Archives</Link>
    </>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const entries = await getEntries(5).then((entries) =>
    entries.map(({ date, slug, title }) => ({ date, slug, title }))
  );
  return {
    props: {
      entries,
    },
  };
};
