import { useTranslation } from "react-i18next";

const useGenderOptions = () => {
  const { t } = useTranslation();
  return [
    { label: t("Gender option:::Female"), value: "female" },
    { label: t("Gender option:::Male"), value: "male" },
    { label: t("Gender option:::Not Specified"), value: "not-specified" },
    { label: t("Gender option:::Other"), value: "other" },
  ];
};
export default useGenderOptions;
