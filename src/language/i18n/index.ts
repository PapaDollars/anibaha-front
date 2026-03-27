import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from '../en/index.json'
import fr from '../fr/index.json'

i18n
  .use(LanguageDetector) 
  .use(initReactI18next) 
  .init({
    detection: {
      order: ['localStorage', 'navigator'], 
      caches: ['localStorage'], 
    },
    resources: {
      en: { translation: en },
      fr: { translation: fr }, 
    },
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false, 
    },
  });

export default i18n;