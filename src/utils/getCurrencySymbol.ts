// function to get localized currency symbol fron currency code
const getCurrencySymbol = (code: string) => {
  if (code === "EUR") return "€";
  if (code === "USD") return "$";
  return "";
};

export default getCurrencySymbol;
