import { useTranslation } from "react-i18next";

export const localizeRoute = (route: string) => {
  const { i18n } = useTranslation();
  if (i18n.language === "en") return `/${route}`;
  return `/${i18n.language}/${route}/`;
};
