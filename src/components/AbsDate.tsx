import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(timezone);
dayjs.extend(utc);
dayjs.tz.setDefault("Asia/Tokyo");

interface Props {
  date: number;
}

export const AbsDate = ({ date }: Props) => {
  const day = dayjs.utc(date).local();
  return <time dateTime={day.format()}>{day.format("YYYY.MM.DD")}</time>;
};
