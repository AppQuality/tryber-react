import { useTranslation } from "react-i18next";

export default function useFiscalTypesText(
  type: ApiComponents["schemas"]["FiscalType"] & "internal"
) {
  const { t } = useTranslation();
  switch (type) {
    case "withholding":
      return t("Fiscal types:::Witholding < 5000€");
    case "non-italian":
      return t("Fiscal types:::Foreign");
    case "vat":
      return t("Fiscal types:::VAT");
    case "witholding-extra":
      return t("Fiscal types:::Witholding > 5000€");
    case "company":
      return t("Fiscal types:::Company");
    case "internal":
      return t("Fiscal types:::Internal employee");
    default:
      throw new Error("Invalid fiscal type");
  }
}
