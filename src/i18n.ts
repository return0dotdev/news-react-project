import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslation from '../src/locales/en.json';
import chTranslation from '../src/locales/zh.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      zh: { translation: chTranslation }
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
