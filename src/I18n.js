import { createI18n } from 'react-router-i18n';

import en from './lang/en';
import it from './lang/it';
// Array of supported locales
// The first in the array is treated as the default locale
const locales = ['en', 'it'];

// Dictionary of translations
const translations = {
  en: en,
  it: it
}

const I18n = createI18n(
  locales,
  translations,
  "__no_translation__"
);

export default I18n;
