import { GetStaticPaths, GetStaticProps } from "next";
import { EntryView } from "../components/EntryView";
import { getPage, getPages, Page } from "../lib/page";

interface Props {
  page: Page;
}

const PagePage = (props: Props) => {
  return <EntryView entry={props.page} />;
};

export default PagePage;

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
  const page = await getPage(slug.join("/"));

  return {
    props: {
      page,
    },
  };
};
