export default (unformatted: string) => {
  const d = new Date(unformatted);
  const userTimezoneOffset = d.getTimezoneOffset() * 60000;
  const dateWithTimezoneOffset = new Date(d.getTime() + userTimezoneOffset);
  return dateWithTimezoneOffset.toLocaleString("it", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};
