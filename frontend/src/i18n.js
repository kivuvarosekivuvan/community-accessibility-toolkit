import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from './locales/en/translation.json';
import translationES from './locales/es/translation.json';
import translationSW from './locales/sw/translation.json';
import translationSH from './locales/sh/translation.json';


const resources = {
  en: { translation: translationEN },
  es: { translation: translationES },
  sw: { translation: translationSW },
  sh: { translation: translationSH },
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;