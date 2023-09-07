import { Metadata } from "next";
import { EntryView } from "../../components/EntryView";
import { getPage, getPages } from "../../lib/page";
import { config } from "../../../blog.config";
import { AppLayout } from "../../components/AppLayout";
import { buildFullPath } from "../../lib/util";

interface Props {
  params: {
    slugs: string[];
  };
}

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
  return (
    <AppLayout path={path}>
      <EntryView path={path} entry={page} />
    </AppLayout>
  );
};

export default PagePage;

export async function generateStaticParams() {
  return getPages().then((pages) =>
    pages.map((slugs) => ({
      slugs: slugs.split("/"),
    }))
  );
}
