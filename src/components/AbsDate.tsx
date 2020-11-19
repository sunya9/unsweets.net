import dayjs from "dayjs";

interface Props {
  date: number;
}

export const AbsDate = ({ date }: Props) => {
  return (
    <time dateTime={dayjs(date).toISOString()}>
      {dayjs(date).format("YYYY-MM-DD")}
    </time>
  );
};
