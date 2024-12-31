import { yyyymmdd } from "../lib/dateUtil";

interface Props extends React.HTMLAttributes<HTMLTimeElement> {
  date: number;
}

export const AbsDate = ({ date, ...rest }: Props) => {
  const [formatted, day] = yyyymmdd(date);
  return (
    <time dateTime={day.format()} {...rest}>
      {formatted}
    </time>
  );
};
