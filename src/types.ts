export const STATUSES = ['building', 'mvp', 'live', 'paused', 'archived'] as const

export type Status = (typeof STATUSES)[number]

export interface Project {
  id: string
  name: string
  /** Show the real name only once the project is finished. */
  revealName: boolean
  status: Status
  /** MVP launch year, set once status reaches mvp or live. */
  year: number | null
  description: string
  /** One small, concrete next step. */
  next?: string
  /** Last time you worked on it, as YYYY-MM-DD. */
  updated: string
  /** Deadline for the next step, as YYYY-MM-DD, or null for none. */
  nextBy: string | null
  /** Why it is paused. */
  reason?: string
  /** Main technologies used, shown as small tags. */
  stack?: string[]
  /** Public link, once there is something to open. */
  url?: string
}
