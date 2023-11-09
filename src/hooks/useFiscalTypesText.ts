import { useTranslation } from "react-i18next";
import { useGetUsersMeFiscalQuery } from "src/services/tryberApi";

function useFiscalTypesText() {
  const { t } = useTranslation();
  const { data } = useGetUsersMeFiscalQuery();
  switch (data?.type) {
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
      return "";
  }
}

export default useFiscalTypesText;
