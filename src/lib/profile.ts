import en from '@/data/profile.json'
import es from '@/data/profile.es.json'
import type { Locale } from '@/i18n'

/** English is the source; links and name are shared, text comes from the locale file. */
export const profiles = { en, es: { ...en, ...es } } satisfies Record<Locale, unknown>
