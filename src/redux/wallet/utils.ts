import dateFormatter from "src/utils/dateFormatter";

export const currencyTable: { [index: string]: string } = {
  EUR: "€",
  USD: "$",
  GBP: "£",
};

export const getPaidDate = (requestDate?: string) => {
  if (requestDate && requestDate !== "-") {
    return dateFormatter(requestDate);
  }
  return "-";
};
