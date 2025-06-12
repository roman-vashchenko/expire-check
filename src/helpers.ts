export const formattedDate = (date: string): string => {
  const [year, month, day] = date.split("-");
  return `${day}.${month}.${year}`;
};

export const getStatusColor = (expiryDate: string): string => {
  const now: Date = new Date();
  const expiry: Date = new Date(expiryDate);
  const diff: number =
    (expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
  console.log(Math.floor(diff));

  if (Math.floor(diff) <= 0) return "rgba(250, 4, 4, 0.38)";
  if (Math.floor(diff) <= 30) return "rgba(250, 184, 5, 0.38)";
  return "#00000000";
};
