import i18next from "i18next";

export default (url: string) => {
  return `${i18next.language === "en" ? "" : "/" + i18next.language}${url}`;
};
