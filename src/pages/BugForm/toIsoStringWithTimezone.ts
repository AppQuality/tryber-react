export const toISOStringWithTimezone = (date: Date, time: Date) => {
  const tzOffset = -date.getTimezoneOffset();
  const diff = tzOffset >= 0 ? "+" : "-";
  const pad = (n: number) => `${Math.floor(Math.abs(n))}`.padStart(2, "0");
  return (
    date.getFullYear() +
    "-" +
    pad(date.getUTCMonth() + 1) +
    "-" +
    pad(date.getUTCDate()) +
    "T" +
    pad(time.getUTCHours()) +
    ":" +
    pad(time.getUTCMinutes()) +
    ":" +
    pad(time.getUTCSeconds()) +
    "." +
    pad(time.getUTCMilliseconds()) +
    diff +
    pad(tzOffset / 60) +
    ":" +
    pad(tzOffset % 60)
  );
};