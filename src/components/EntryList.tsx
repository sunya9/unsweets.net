import Link from "next/link";
import { Entry } from "../lib/entry";
import { AbsDate } from "./AbsDate";

interface Props {
  entries: Entry[];
}
export const EntryList = (props: Props) => {
  return (
    <ul>
      {props.entries.map((entry) => (
        <li key={entry.slug}>
          <div className="text-gray-500">
            <AbsDate date={entry.date} />
          </div>
          <Link href={`/entries/${entry.slug}`}>
            <a>{entry.title}</a>
          </Link>
        </li>
      ))}
    </ul>
  );
};
