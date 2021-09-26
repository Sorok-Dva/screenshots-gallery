import Vue from 'vue'
import VueI18n from 'vue-i18n'
import en from '@/locales/en.json'

import type { Locale } from '@/plugins/translate'

VueI18n.prototype.getChoiceIndex = function(choice, choicesLength) {
  if (choice === 0) return 0
  
  const teen = choice > 10 && choice < 20
  const endsWithOne = choice % 10 === 1
  
  if (!teen && endsWithOne) return 1
  if (!teen && choice % 10 >= 2 && choice % 10 <= 4) return 2
  
  return (choicesLength < 4) ? 2 : 3
}

Vue.use(VueI18n)

const dateTimeFormats = {
  'en': {
    short: {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }
  },
  'fr': {
    short: {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }
  },
  'ru': {
    short: {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }
  }
}

const numberFormats = {
  'en': {
    currency: {
      style: 'currency', currency: 'GBP'
    }
  },
  'fr': {
    currency: {
      style: 'currency', currency: 'EUR'
    }
  },
  'ru': {
    currency: {
      style: 'currency', currency: 'RUB'
    }
  }
}

export const i18n = new VueI18n({
  locale: process.env.VUE_APP_I18N_LOCALE || 'en' as Locale,
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en' as Locale,
  messages: { en },
  dateTimeFormats,
  numberFormats
})