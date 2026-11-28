import { en, type Strings } from './en'
import { es } from './es'

export type Locale = 'en' | 'es'

/** Each language has its own HTML page; its `lang` attribute is the source of truth. */
export const locale: Locale =
  document.documentElement.lang === 'es' ? 'es' : 'en'

export const ui: Strings = locale === 'es' ? es : en

/** Remembers an explicit choice so the root page stops redirecting by browser language. */
export function rememberLocale(l: string) {
  try {
    localStorage.setItem('lang', l)
  } catch {
    // Storage can be blocked; the link still works.
  }
}
