import i18n from "src/i18n";

const getUnlocalizedUrl = (url: string) => {
  const locales = i18n.languages.map((locale) => "/" + locale);

  const regExp = new RegExp(locales.join("|"), "g");

  return url.replace(regExp, "").replace("//", "/");
};

export default getUnlocalizedUrl;
