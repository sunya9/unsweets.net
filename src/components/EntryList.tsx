import { Entry } from "../lib/entry";
import { AbsDate } from "./AbsDate";
import { AppLink } from "./AppLink";

interface Props {
  entries: Omit<Entry, "body">[];
}
export const EntryList = (props: Props) => {
  return (
    <ul>
      {props.entries.map((entry) => (
        <li
          key={entry.slug}
          className="mb-4"
          style={{
            viewTransitionName: `entry-wrapper-${entry.slug}`,
          }}
        >
          <div className="text-sm leading-none text-[--tw-prose-lead]">
            <AbsDate
              date={entry.date}
              style={{
                viewTransitionName: `entry-date-${entry.slug}`,
              }}
            />
          </div>
          <AppLink
            className="contain-paint"
            style={{
              viewTransitionName: `entry-title-${entry.slug}`,
            }}
            href={`/entries/${entry.slug}`}
          >
            {entry.title}
          </AppLink>
        </li>
      ))}
    </ul>
  );
};
