import { GetStaticPaths, GetStaticProps } from "next";
import { EntryView } from "../components/EntryView";
import { Entry } from "../lib/entry";
import { getEntries } from "../lib/getEntries";
import { getEntry } from "../lib/getEntry";
import { getPage } from "../lib/getPage";
import { getPages } from "../lib/getPages";

interface Props {
  entry: Entry;
}

const EntryPage = (props: Props) => {
  return <EntryView entry={props.entry} />;
};

export default EntryPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getPages().then((pages) =>
    pages.map((slug) => `/${slug}`)
  );
  return {
    paths,
    fallback: false,
  };
};

type Params = {
  slug: string[];
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  if (!params) return { notFound: true };
  const { slug } = params;
  const entry = await getPage(slug.join("/"));

  return {
    props: {
      entry,
    },
  };
};
