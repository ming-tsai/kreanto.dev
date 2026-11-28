import type { Status } from '@/types'

export const en = {
  hi: (name: string) => `Hi, I'm ${name}.`,
  projects: 'Projects',
  projectsIntro: (statuses: string) =>
    `Names stay hidden until a project ships. Statuses: ${statuses}.`,
  empty: 'error: nothing shipped yet. something is compiling',
  archive: (n: number) => `Archive (${n} projects)`,
  archiveIntro: "Old labs and experiments I'm not continuing.",
  hiddenName: 'Name hidden until the project is finished',
  why: 'why',
  next: 'next',
  by: (date: string) => `by ${date}`,
  updated: 'updated',
  repo: 'repo',
  lastTouched: 'last touched',
  stack: 'Stack',
  overdue: 'overdue',
  status: {
    building: 'building',
    mvp: 'mvp',
    live: 'live',
    paused: 'paused',
    archived: 'archived',
  } satisfies Record<Status, string>,
  switchTo: { label: 'Español', href: '/es/', aria: 'Leer en español', lang: 'es' },
}

export type Strings = typeof en
