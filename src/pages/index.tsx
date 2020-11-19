import Head from "next/head";
import { GetStaticProps } from "next";
import { Entry } from "../lib/entry";
import { getEntries } from "../lib/getEntries";
import { useConfig } from "../hooks/useConfig";
import Link from "next/link";

interface Props {
  entries: Entry[];
}
export default function Home(props: Props) {
  const config = useConfig();
  return (
    <div>
      <Head>
        <title>{config.title()}</title>
      </Head>

      <main>
        <ul>
          {props.entries.map((entry) => (
            <li key={entry.slug}>
              <Link href={`/entries/${entry.slug}`}>
                <a>{entry.title}</a>
              </Link>
            </li>
          ))}
        </ul>
        <Link href="/archives">
          <a>Archives</a>
        </Link>
      </main>
    </div>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const entries = await getEntries(10);
  return {
    props: {
      entries,
    },
  };
};