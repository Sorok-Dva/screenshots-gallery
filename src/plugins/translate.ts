import axios from 'axios'
import { i18n } from '@/i18n'

export type Locale = 'en' | 'fr' | 'ru'

export interface TranslateInterface {
  defaultLocal: Locale
  supportedLocales: Array<string>
  getCurrentLocale: string
}

const translate = {
  defaultLocale: process.env!.VUE_APP_I18N_LOCALE,
  supportedLocales: process.env.VUE_APP_I18N_SUPPORTED_LOCALE!.split(','),
  getCurrentLocale: i18n.locale as Locale,
  
  setCurrentLocale: (locale: Locale) => {
    i18n.locale = locale
  },
  getUserSupportedLocale: () => {
    const userPreferredLocale = translate.getCurrentLocale
    
    if (translate.isLocaleSupported(userPreferredLocale)) {
      return userPreferredLocale
    }

    return translate.defaultLocale || 'fr'
  },
  getUserLocale: () => {
    const locale = window.navigator.language || translate.defaultLocale || 'fr'
    return {
      locale: locale,
      localeNoISO: locale.split('-')[0]
    }
  },
  setI18nLocaleInServices: (locale: Locale) => {
    translate.setCurrentLocale(locale)
    axios.defaults.headers.common['Accept-Language'] = locale
    document.querySelector('html')?.setAttribute('lang', locale)
    return locale
  },
  changeLocale: (locale: Locale) => {
    if (!translate.isLocaleSupported(locale)) return Promise.reject(new Error('Locale not supported'))
    if (i18n.locale === locale) return Promise.resolve(locale)
    return translate.loadLocaleFile(locale).then(msgs => {
      i18n.setLocaleMessage(locale, msgs)
      return translate.setI18nLocaleInServices(locale)
    })
  },
  loadLocaleFile: (locale: Locale) => import(`@/locales/${locale}.json`),
  isLocaleSupported: (locale: Locale) => translate.supportedLocales?.includes(locale),
  routeMiddleware: (to: any, from: any, next: CallableFunction) => {
    const locale = to.params.locale
    if (!translate.isLocaleSupported(locale)) return next(translate.getUserSupportedLocale())
    return translate.changeLocale(locale).then(() => next())
  },
  i18nRoute: (to: any) => {
    return {
      ...to,
      params: {
        locale: translate.getCurrentLocale,
        ...to.params
      }
    }
  }
}

export default translate
