import { Metadata } from "next";
import { EntryView } from "../../components/EntryView";
import { getPage, getPages } from "../../lib/page";
import { config } from "../../../blog.config";
import { buildFullPath } from "../../lib/util";

interface Props {
  params: {
    slugs: string[];
  };
}

export const dynamic = "force-static";

export async function generateMetadata({
  params: { slugs },
}: Props): Promise<Metadata> {
  const page = await getPage(slugs.join("/"));

  return {
    title: config.title(page.title),
    alternates: {
      canonical: buildFullPath(`/${page.slug}`),
    },
  };
}

const PagePage = async ({ params: { slugs } }: Props) => {
  const slug = `${slugs.join("/")}`;
  const path = `/${slug}`;
  const page = await getPage(slug);
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
