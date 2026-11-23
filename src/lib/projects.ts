import raw from '@/data/projects.json'
import { STATUSES, type Project } from '@/types'

const DATE = /^\d{4}-\d{2}-\d{2}$/

/** Fail the build with a clear message instead of shipping a blank page. */
function validate(list: unknown): Project[] {
  if (!Array.isArray(list)) throw new Error('projects.json must be an array')
  const ids = new Set<string>()
  for (const p of list as Project[]) {
    const where = `projects.json: "${p?.id ?? '?'}"`
    if (!p.id || ids.has(p.id)) throw new Error(`${where} needs a unique id`)
    ids.add(p.id)
    if (!STATUSES.includes(p.status))
      throw new Error(`${where} has unknown status "${p.status}"`)
    if (!DATE.test(p.updated))
      throw new Error(`${where} needs updated as YYYY-MM-DD`)
    if (p.nextBy !== null && !DATE.test(p.nextBy))
      throw new Error(`${where} nextBy must be YYYY-MM-DD or null`)
    if ((p.status === 'mvp' || p.status === 'live') && !p.year)
      throw new Error(`${where} is ${p.status} but has no launch year`)
    if (p.status === 'paused' && !p.reason)
      throw new Error(`${where} is paused but has no reason`)
  }
  return list as Project[]
}

export const projects = validate(raw)

export function isOverdue(p: Project, today = new Date()): boolean {
  if (p.status !== 'building' || !p.nextBy) return false
  return p.nextBy < today.toISOString().slice(0, 10)
}
