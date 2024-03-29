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
import React from 'react'

i18next.init({
  fallbackLng: 'en',
  lng: 'de',
  debug: true,
  interpolation: { escapeValue: false },
  supportedLngs: ['en', 'de'],
  resources: {
    "en": global_en,
    "de": global_de
  }
})

const queryClient = new QueryClient();
console.log("Hellouu");
ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <I18nextProvider i18n={i18next}>
      <UserContextProvider initialUser={devUser}>
        <App />
      </UserContextProvider>
    </I18nextProvider>
  </QueryClientProvider>,
)
