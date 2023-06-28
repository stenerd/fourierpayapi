export const CheckDateDifference = function (
  start_date: string,
  end_date: string,
): number {
  const date1 = new Date(start_date) as unknown as number;
  const date2 = new Date(end_date) as unknown as number;
  const diffTime = Math.abs(date2 - date1);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};
