import en from '@/data/profile.json'
import es from '@/data/profile.es.json'
import { locale } from '@/i18n'

/** English is the source; links and name are shared, text comes from the locale file. */
export const profile = locale === 'es' ? { ...en, ...es } : en
