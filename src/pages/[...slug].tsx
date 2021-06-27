import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { EntryView } from "../components/EntryView";
import { useConfig } from "../hooks/useConfig";
import { getPage, getPages, Page } from "../lib/page";

interface Props {
  page: Page;
}

const PagePage = (props: Props) => {
  const config = useConfig();
  return (
    <>
      <Head>
        <title>{config.title(props.page.title)}</title>
      </Head>
      <EntryView entry={props.page} />
    </>
  );
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
