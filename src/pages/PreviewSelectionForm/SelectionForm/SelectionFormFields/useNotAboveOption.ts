import { useTranslation } from "react-i18next";

const useNotAboveOption = () => {
  const { t } = useTranslation();
  return {
    label: t("_FORM_INPUT-SELECT_NOT-ABOVE_", {
      defaultValue: "Nessuna delle precedenti",
    }),
    value: "-1",
  };
};

export default useNotAboveOption;
