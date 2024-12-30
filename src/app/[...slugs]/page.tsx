import { Metadata } from "next";
import { notFound } from "next/navigation";
import { EntryView } from "../../components/EntryView";
import { getPage, getPages } from "../../lib/page";
import { buildFullPath } from "../../lib/util";

interface Props {
  params: Promise<{
    slugs: string[];
  }>;
}

export const dynamicParams = false;

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;

  const { slugs } = params;

  const page = await getPage(slugs.join("/"));
  if (!page) notFound();

  return {
    title: page.title,
    alternates: {
      canonical: buildFullPath(`/${page.slug}`),
    },
  };
}

const PagePage = async (props: Props) => {
  const params = await props.params;

  const { slugs } = params;

  const slug = `${slugs.join("/")}`;
  const path = `/${slug}`;
  const page = await getPage(slug);
  if (!page) notFound();
  return <EntryView path={path} entry={page} />;
};

export default PagePage;

export async function generateStaticParams() {
  return getPages().then((pages) =>
    pages.map((slugs) => ({
      slugs: slugs.split("/"),
    })),
  );
}
