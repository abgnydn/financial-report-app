export const convertDateFormat = (dateString: string, long?: string) => {
  const [year, month] = dateString.split("-");
  const date = new Date(`${month}/01/${year}`);
  const monthName = date.toLocaleString("default", {
    month: long ? "long" : "short",
  });
  return `${monthName} ${year}`;
};
