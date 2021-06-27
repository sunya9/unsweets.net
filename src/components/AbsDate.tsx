import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(timezone);
dayjs.extend(utc);
dayjs.tz.setDefault("Asia/Tokyo");

interface Props {
  date: number;
  omitYear?: true;
}

export const AbsDate = ({ date, omitYear }: Props) => {
  const day = dayjs.utc(date).local();
  return <time dateTime={day.format()}>{formatYyyymmdd(day, omitYear)}</time>;
};

const dateTemplate = (omitYear: boolean) => (omitYear ? "MM-DD" : "YYYY-MM-DD");

const formatYyyymmdd = (day: dayjs.Dayjs, omitYear = false) => {
  return day.format(dateTemplate(omitYear));
};
