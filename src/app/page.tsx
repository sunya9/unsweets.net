import { Metadata } from "next";
import { getEntries } from "../lib/entry";
import { EntryList } from "../components/EntryList";
import { buildFullPath } from "../lib/util";
import { config } from "../../blog.config";
import { AppLink } from "../components/AppLink";

export const metadata: Metadata = {
  alternates: {
    canonical: buildFullPath("/"),
  },
};

export default async function Home() {
  const entries = await getEntries(5).then((entries) =>
    entries.map(({ date, slug, title }) => ({ date, slug, title })),
  );

  return (
    <>
      <section>
        <p>
          {config.title()}は<a href={config.xLink}>{config.author}</a>
          が技術メモなどを綴っているサイトです。
          以前はAndroid関連も取り扱っていましたが、現在は主にフロントエンドやNode.js周辺技術の話題を多く取り扱っています。
        </p>
        <p>
          制作物については <a href="https://github.com/sunya9">GitHub</a>
          をご覧ください。
        </p>
      </section>
      <section>
        <h2>最近の投稿</h2>
        <EntryList entries={entries} />
        <AppLink href="/archives">もっと読む</AppLink>
      </section>
    </>
  );
}
