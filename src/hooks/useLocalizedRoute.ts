import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

type CrowdRoutes = "getting-started" | "my-dashboard" | "";

export function useLocalizeRoute(route: string): string {
  const { i18n } = useTranslation();
  const [path, setPath] = useState(route);

  useEffect(() => {
    const localizedPath =
      i18n.language === "en" ? `/${route}` : `/${i18n.language}/${route}/`;
    setPath(localizedPath);
  }, [i18n.language]);
  return path;
}
