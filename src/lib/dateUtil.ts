import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(timezone);
dayjs.extend(utc);
dayjs.tz.setDefault("Asia/Tokyo");

export function yyyymmdd(date: number) {
  const day = dayjs.utc(date).local();
  return [day.format("YYYY.MM.DD"), day] as const;
}
