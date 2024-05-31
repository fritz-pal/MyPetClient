import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import i18next from 'i18next'
import HttpBackend from 'i18next-http-backend'
import global_de from './translations/de/global.json'
import global_en from './translations/en/global.json'
import { I18nextProvider } from 'react-i18next'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import LanguageDetector from "i18next-browser-languagedetector";
import { SUPPORTED_LANGS } from './constants.ts'
import { CookiesProvider } from 'react-cookie'
import { TranslationAPI } from './models/Translation.ts'

i18next
  .use(HttpBackend)
  .use(LanguageDetector)
  .init({
    fallbackLng: 'en',
    debug: true,
    interpolation: { escapeValue: false },
    supportedLngs: SUPPORTED_LANGS,
    backend: {
      loadPath: (lng: string, ns: string) => {
        if (ns === 'species') {
          return `/api/lang/${lng}/species`;
        }
        return `/translations/${lng}/global.json`;
      }
    },
    resources: {
      "en": global_en,
      "de": global_de
    }
  });

const loadBackendTranslations = async (lang: string, namespaces: string[]) => {
  for (const ns of namespaces) {
    if (ns === 'species') {
      const translations = await TranslationAPI.getTranslation(lang, ns);
      i18next.addResourceBundle(lang, ns, translations);
    }
  }
};

SUPPORTED_LANGS.forEach(lang => {
  loadBackendTranslations(lang, ['species']);
});

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <I18nextProvider i18n={i18next}>
      <CookiesProvider defaultSetOptions={{ path: process.env.NODE_ENV === 'production' ? '/LabSWP24MyPet' : '/' }}>
          <App />
      </CookiesProvider>
    </I18nextProvider>
  </QueryClientProvider>,
)
