import Link from "next/link";
import { Metadata } from "next";
import { getEntries } from "../lib/entry";
import { EntryList } from "../components/EntryList";
import { buildFullPath } from "../lib/util";
import { config } from "../../blog.config";

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
          {config.title()}は{config.author}
          が技術メモなどを綴っているサイトです。
          主にNode.js関連の話題を取り扱っています。
        </p>
        <p>
          制作物については <a href="https://github.com/sunya9">GitHub</a>
          をご覧ください。
        </p>
      </section>
      <section>
        <h2>最近の投稿</h2>
        <EntryList entries={entries} />
        <Link href="/archives">もっと読む</Link>
      </section>
    </>
  );
}
