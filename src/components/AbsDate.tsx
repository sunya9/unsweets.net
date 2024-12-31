import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(timezone);
dayjs.extend(utc);
dayjs.tz.setDefault("Asia/Tokyo");

interface Props extends React.HTMLAttributes<HTMLTimeElement> {
  date: number;
}

export const AbsDate = ({ date, ...rest }: Props) => {
  const day = dayjs.utc(date).local();
  return (
    <time dateTime={day.format()} {...rest}>
      {day.format("YYYY.MM.DD")}
    </time>
  );
};
