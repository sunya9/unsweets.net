import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { EntryView } from "../../components/EntryView";
import { useConfig } from "../../hooks/useConfig";
import { Entry, getEntries, getEntry } from "../../lib/entry.js";

interface Props {
  entry: Entry;
}

const EntryPage = (props: Props) => {
  const config = useConfig();
  return (
    <>
      <Head>
        <title>{config.title(props.entry.title)}</title>
      </Head>
      <EntryView entry={props.entry} shareButton />
    </>
  );
};

export default EntryPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getEntries().then((entries) =>
    entries.map((entry) => `/entries/${entry.slug}`)
  );
  return {
    paths,
    fallback: false,
  };
};

type Params = {
  slug: string;
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  if (!params) return { notFound: true };
  const { slug } = params;
  const entry = await getEntry(slug);

  return {
    props: {
      entry,
    },
  };
};
