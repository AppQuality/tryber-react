import countries from "i18n-iso-countries";
import i18n, { InitOptions } from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import enLinks from "./locales/en/links.json";
import en from "./locales/en/translation.json";
import esLinks from "./locales/es/links.json";
import es from "./locales/es/translation.json";
import itLinks from "./locales/it/links.json";
import it from "./locales/it/translation.json";

// the translations
// (tip move them in a JSON file and import them)
countries.registerLocale(require("i18n-iso-countries/langs/en.json"));
countries.registerLocale(require("i18n-iso-countries/langs/it.json"));
countries.registerLocale(require("i18n-iso-countries/langs/es.json"));
const resources = {
  en: { translation: en, links: enLinks },
  it: { translation: it, links: itLinks },
  es: { translation: es, links: esLinks },
};

export const i18nOptions: InitOptions = {
  detection: {
    order: ["querystring", "path", "subdomain"],
  },
  contextSeparator: "_",
  ns: ["common", "translation", "links"],
  defaultNS: "translation",
  returnEmptyString: false,
  nsSeparator: false,
  resources,
  supportedLngs: ["it", "en", "es"],
  fallbackLng: "en",
  keySeparator: ":::",
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
  postProcess: "test",
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .use({
    type: "postProcessor",
    name: "test",
    process: function (value: string) {
      const urlSearchParams = new URLSearchParams(window.location.search);
      if (urlSearchParams.has("debugTranslations")) {
        return "<T>" + value + "</T>";
      }
      return value;
    },
  })
  .init(i18nOptions);

export default i18n;
