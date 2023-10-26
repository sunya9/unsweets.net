import { Metadata } from "next";
import { notFound } from "next/navigation";
import { EntryView } from "../../components/EntryView";
import { getPage, getPages } from "../../lib/page";
import { buildFullPath } from "../../lib/util";

interface Props {
  params: {
    slugs: string[];
  };
}

export const dynamic = "force-static";
export const fetchCache = "force-cache";

export async function generateMetadata({
  params: { slugs },
}: Props): Promise<Metadata> {
  const page = await getPage(slugs.join("/"));
  if (!page) notFound();

  return {
    title: page.title,
    alternates: {
      canonical: buildFullPath(`/${page.slug}`),
    },
  };
}

const PagePage = async ({ params: { slugs } }: Props) => {
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
