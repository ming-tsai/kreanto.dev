import type { Strings } from './en'

export const es: Strings = {
  hi: (name) => `Hola, soy ${name}.`,
  projects: 'Proyectos',
  projectsIntro: (statuses) =>
    `Los nombres siguen ocultos hasta que un proyecto se publica. Estados: ${statuses}.`,
  empty: 'error: aún no se ha publicado nada. algo se está compilando',
  archive: (n) => `Archivo (${n} proyectos)`,
  archiveIntro: 'Laboratorios y experimentos antiguos que no voy a continuar.',
  hiddenName: 'Nombre oculto hasta que el proyecto esté terminado',
  why: 'por qué',
  next: 'siguiente',
  by: (date) => `para el ${date}`,
  updated: 'actualizado',
  repo: 'repo',
  lastTouched: 'último cambio',
  stack: 'Tecnologías',
  overdue: 'atrasado',
  status: {
    building: 'en desarrollo',
    mvp: 'mvp',
    live: 'en vivo',
    paused: 'en pausa',
    archived: 'archivado',
  },
  meta: {
    title: 'Kreanto | El estudio de proyectos de Ming Tsai',
    description:
      'Ming Tsai, desarrollador full-stack y líder de equipo que usa IA para mejorar la calidad del código. Kreanto: ideas de software, lo que se está construyendo, lo que funciona y lo que se archivó.',
  },
  language: 'Idioma',
}
