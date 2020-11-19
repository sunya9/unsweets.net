import dayjs from "dayjs";

interface Props {
  date: number;
  omitYear?: true;
}

export const AbsDate = ({ date, omitYear }: Props) => {
  const formatStr = omitYear ? "MM/DD" : "YYYY/MM/DD";
  return (
    <time dateTime={dayjs(date).toISOString()}>
      {dayjs(date).format(formatStr)}
    </time>
  );
};
