import Link from "next/link";
import { Entry } from "../lib/entry";
import { AbsDate } from "./AbsDate";

interface Props {
  entries: Omit<Entry, "body">[];
}
export const EntryList = (props: Props) => {
  return (
    <ul>
      {props.entries.map((entry) => (
        <li key={entry.slug}>
          <div className="text-[color:var(--tw-prose-lead)]">
            <AbsDate date={entry.date} />
          </div>
          <Link href={`/entries/${entry.slug}`}>{entry.title}</Link>
        </li>
      ))}
    </ul>
  );
};
