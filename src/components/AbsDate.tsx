interface Props {
  date: number;
  omitYear?: true;
}

export const AbsDate = ({ date, omitYear }: Props) => {
  return (
    <time dateTime={new Date(date).toISOString()}>
      {getYyyymmdd(date, omitYear)}
    </time>
  );
};

const zeroPad = (num: number) => num.toString().padStart(2, "0");

const getYyyymmdd = (dateMs: number, omitYear = false) => {
  const date = new Date(dateMs);
  const dateStrAry = [
    date.getFullYear(),
    zeroPad(date.getMonth() + 1),
    zeroPad(date.getDate()),
  ];
  const sliceIndex = +omitYear;
  return dateStrAry.slice(sliceIndex).join("/");
};
