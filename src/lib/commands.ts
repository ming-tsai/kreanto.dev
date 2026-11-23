/**
 * Terminal-style headings. Each theme has one command for the projects list
 * and one from the same tool for the archive list. One theme is picked at
 * random on each page load. The text is decoration: the headings also carry a
 * plain label for screen readers and search engines.
 */
export interface CommandTheme {
  projects: string
  archive: string
}

export const THEMES: CommandTheme[] = [
  { projects: 'ship --list', archive: 'ship --list --archived' },
  { projects: 'ls projects/', archive: 'ls archive/' },
  { projects: 'git branch --list', archive: 'git log --before=2025 --oneline' },
  { projects: 'docker ps', archive: 'docker ps -a --filter status=exited' },
  { projects: `grep '"building"' projects.json`, archive: `grep '"archived"' projects.json` },
]

export function pickTheme(): CommandTheme {
  return THEMES[Math.floor(Math.random() * THEMES.length)]
}
