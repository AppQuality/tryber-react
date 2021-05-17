import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./lang/en";
import it from "./lang/it";
// the translations
// (tip move them in a JSON file and import them)
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
    resources,
    supportedLngs: ["it", "en"],
    fallbackLng: "en",
    keySeparator: false, // we do not use keys in form messages.welcome
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
