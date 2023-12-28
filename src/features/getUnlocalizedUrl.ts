import i18n from "src/i18n";

const getUnlocalizedUrl = (url: string) => {
  console.log(i18n.languages);
  const locales = i18n.languages;

  const regExp = new RegExp(locales.join("|"), "g");

  return url.replace(regExp, "").replace("//", "/");
};

export default getUnlocalizedUrl;
