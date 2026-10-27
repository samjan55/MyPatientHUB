import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import en from './Locales/en.json'
import fa from './Locales/fa.json'
import ps from './Locales/ps.json'
import findDoctor from './Locales/finddoctor'
import dashboard from './Locales/dashboard'
import appointment from './Locales/appointment'
import findclinic from './Locales/findclinic'
import pharmacy from './Locales/pharmacy'
import login from './Locales/login'
import chat from './Locales/chat'
import marketplace from './Locales/marketplace.js'
import myaccount from './Locales/myaccount.js'
import depents from './Locales/depents.js'
import settings from './Locales/settings'
import singup from './Locales/signup.js'
import register from './Locales/register'
import bodymap from './Locales/bodymap.js'






const pages = [dashboard, appointment, login, findDoctor, findclinic,pharmacy,chat, marketplace, depents,myaccount, settings, singup, register, bodymap,]

function merge(lang, base) {
  return pages.reduce((all, page) => ({ ...all, ...page[lang] }), base)
}

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: merge('en', en) },
    fa: { translation: merge('fa', fa) },
    ps: { translation: merge('ps', ps) },
  },
  lng: localStorage.getItem('lang') || 'en',
  fallbackLng: 'en',
  keySeparator: false,
  nsSeparator: false,
  interpolation: { escapeValue: false },
})

const RTL = ['fa', 'ps']

function applyDirection(lang) {
  document.documentElement.lang = lang
  document.documentElement.dir = RTL.includes(lang) ? 'rtl' : 'ltr'
  localStorage.setItem('lang', lang)
}

applyDirection(i18n.language)
i18n.on('languageChanged', applyDirection)

export default i18n