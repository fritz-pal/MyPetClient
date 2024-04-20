import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import i18next from 'i18next'
import global_de from './translations/de/global.json'
import global_en from './translations/en/global.json'
import { I18nextProvider } from 'react-i18next'
import UserContextProvider from './context/UserContext.tsx'
import { devUser } from './models/User.ts'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import LanguageDetector from "i18next-browser-languagedetector";
import { SUPPORTED_LANGS } from './constants.ts'
import { CookiesProvider } from 'react-cookie'

i18next.use(LanguageDetector).init({
  fallbackLng: 'en',
  debug: true,
  interpolation: { escapeValue: false },
  supportedLngs: SUPPORTED_LANGS,
  resources: {
    "en": global_en,
    "de": global_de
  }
})

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
