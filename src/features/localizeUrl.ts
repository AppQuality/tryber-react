import { AppRoute } from "../router";
import { useTranslation } from "react-i18next";

export const localizeRoute = (route: AppRoute) => {
  const { i18n } = useTranslation();
  if (i18n.language === "en") return `${route.path}`;
  return `${i18n.language}/${route.path}`;
};
