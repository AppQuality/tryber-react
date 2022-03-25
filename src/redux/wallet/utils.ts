export const currencyTable: { [index: string]: string } = {
  EUR: "€",
  USD: "$",
  GBP: "£",
};

export const getPaidDate = (requestDate?: string) => {
  if (requestDate && requestDate !== "-") {
    const date = new Date(requestDate);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
  }
  return "-";
};
