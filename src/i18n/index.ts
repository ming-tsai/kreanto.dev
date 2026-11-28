import { createContext, useContext } from 'react'
import { en, type Strings } from './en'
import { es } from './es'

export type Locale = 'en' | 'es'

export const strings: Record<Locale, Strings> = { en, es }

/** Each language has its own URL: /es/ is Spanish, everything else is English. */
export function localeFromPath(path: string): Locale {
  return path === '/es' || path.startsWith('/es/') ? 'es' : 'en'
}

export const pathFor: Record<Locale, string> = { en: '/', es: '/es/' }

export const UiContext = createContext<Strings>(en)

/** The interface strings for the language being shown. */
export function useUi(): Strings {
  return useContext(UiContext)
}

/** Remembers an explicit choice so the root page stops redirecting by browser language. */
export function rememberLocale(l: Locale) {
  try {
    localStorage.setItem('lang', l)
  } catch {
    // Storage can be blocked; the choice still applies to this visit.
  }
}

/** Keeps the document in step with the language, since the HTML file was loaded in the other one. */
export function applyLocale(l: Locale) {
  const m = strings[l].meta
  document.documentElement.lang = l
  document.title = m.title
  document
    .querySelector('meta[name="description"]')
    ?.setAttribute('content', m.description)
  document
    .querySelector('link[rel="canonical"]')
    ?.setAttribute('href', `https://kreanto.dev${pathFor[l]}`)
}
