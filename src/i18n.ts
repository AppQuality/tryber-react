import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import countries from "i18n-iso-countries";

import en from "./locales/en/translation.json";
import it from "./locales/it/translation.json";
import es from "./locales/es/translation.json";
// the translations
// (tip move them in a JSON file and import them)
countries.registerLocale(require("i18n-iso-countries/langs/en.json"));
countries.registerLocale(require("i18n-iso-countries/langs/it.json"));
countries.registerLocale(require("i18n-iso-countries/langs/es.json"));
const resources = {
  en: { translation: en },
  it: { translation: it },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    detection: {
      order: ["querystring", "path", "subdomain"],
    },
    nsSeparator: ":::",
    resources,
    supportedLngs: ["it", "en"],
    fallbackLng: "en",
    keySeparator: false, // we do not use keys in form messages.welcome
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
