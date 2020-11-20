import Head from "next/head";
import { GetStaticProps } from "next";
import { Entry } from "../lib/entry";
import { getEntries } from "../lib/getEntries";
import { useConfig } from "../hooks/useConfig";
import Link from "next/link";
import { EntryList } from "../components/EntryList";

interface Props {
  entries: Omit<Entry, "body">[];
}
export default function Home(props: Props) {
  const config = useConfig();
  return (
    <div>
      <Head>
        <title>{config.title()}</title>
      </Head>

      <main>
        <EntryList entries={props.entries} />
        <Link href="/archives">
          <a>Archives</a>
        </Link>
      </main>
    </div>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const entries = await getEntries(5);
  return {
    props: {
      entries,
    },
  };
};
