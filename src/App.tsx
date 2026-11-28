import { useState } from 'react'
import { profile } from '@/lib/profile'
import { rememberLocale, ui } from '@/i18n'
import { pickTheme } from '@/lib/commands'
import { isOverdue, projects } from '@/lib/projects'
import type { Project, Status } from '@/types'
import { STATUSES } from '@/types'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

const STATUS_STYLE: Record<Status, { dot: string }> = {
  building: { dot: 'bg-primary animate-pulse' },
  mvp: { dot: 'bg-primary' },
  live: { dot: 'bg-emerald-500' },
  paused: { dot: 'bg-zinc-500' },
  archived: { dot: 'bg-zinc-500' },
}

function StatusBadge({
  status,
  year,
  overdue,
}: {
  status: Status
  year: number | null
  overdue: boolean
}) {
  const s = STATUS_STYLE[status]
  // An overdue card stops pulsing, so a stalled project does not look active.
  const dot = overdue ? 'bg-zinc-500' : s.dot
  return (
    <Badge variant="outline" className="gap-2 font-mono">
      <span className={`size-2 rounded-full ${dot}`} aria-hidden />
      {overdue ? ui.overdue : ui.status[status]}
      {year ? <span className="text-muted-foreground">· {year}</span> : null}
    </Badge>
  )
}

function ProjectCard({ project }: { project: Project }) {
  const overdue = isOverdue(project)
  const finished = project.status === 'paused'
  return (
    <Card className={overdue ? 'opacity-70' : ''}>
      <CardHeader className="flex! flex-row items-center justify-between gap-4">
        {project.revealName ? (
          <h3 className="font-mono text-lg font-semibold">{project.name}</h3>
        ) : (
          <h3
            className="font-mono text-lg font-semibold"
            aria-label={ui.hiddenName}
          >
            <span className="inline-block h-5 w-28 rounded-sm bg-foreground align-middle" />
          </h3>
        )}
        <StatusBadge
          status={project.status}
          year={project.year}
          overdue={overdue}
        />
      </CardHeader>
      <CardContent className="space-y-3">
        <p>{project.description}</p>
        {finished && project.reason ? (
          <p className="font-mono text-sm text-muted-foreground">
            {ui.why}: {project.reason}
          </p>
        ) : (
          <p className="font-mono text-sm text-muted-foreground">
            {ui.next}: {project.next}
            {project.nextBy ? ` (${ui.by(project.nextBy)})` : ''}
          </p>
        )}
        <p className="font-mono text-xs text-muted-foreground">
          {ui.updated} {project.updated}
          {project.url ? (
            <>
              {' · '}
              <a
                className="text-primary underline-offset-4 hover:underline"
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {ui.repo}
              </a>
            </>
          ) : null}
        </p>
      </CardContent>
    </Card>
  )
}

function SectionHeading({
  id,
  label,
  command,
}: {
  id?: string
  label: string
  command: string
}) {
  return (
    <h2 id={id} className="font-mono text-sm text-muted-foreground">
      <span className="sr-only">{label}</span>
      <span aria-hidden>$ {command}</span>
    </h2>
  )
}

export default function App() {
  // One theme per page load, so both headings use the same tool.
  const [theme] = useState(pickTheme)
  const active = projects.filter((p) => p.status !== 'archived')
  const archived = projects.filter((p) => p.status === 'archived')
  return (
    <main className="mx-auto max-w-3xl space-y-16 px-4 py-16 sm:px-6">
      <section className="space-y-4">
        <div className="flex items-center justify-between font-mono text-sm">
          <p className="text-primary">kreanto.dev</p>
          <a
            className="text-muted-foreground underline-offset-4 hover:underline"
            href={ui.switchTo.href}
            hrefLang={ui.switchTo.lang}
            lang={ui.switchTo.lang}
            aria-label={ui.switchTo.aria}
            onClick={() => rememberLocale(ui.switchTo.lang)}
          >
            {ui.switchTo.label}
          </a>
        </div>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {ui.hi(profile.name)}
          <br />
          <span className="text-muted-foreground">{profile.headline}</span>
        </h1>
        <div className="space-y-3 text-muted-foreground">
          {profile.bio.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <ul className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-sm">
          {profile.links.map((l) => (
            <li key={l.href}>
              <a
                className="text-primary underline-offset-4 hover:underline"
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="font-mono text-sm text-muted-foreground">
          {profile.languages.map((l) => l.name).join(' · ')}
        </p>
      </section>

      <section className="space-y-4" aria-labelledby="projects">
        <SectionHeading
          id="projects"
          label={ui.projects}
          command={theme.projects}
        />
        <p className="text-sm text-muted-foreground">
          {ui.projectsIntro(STATUSES.map((s) => ui.status[s]).join(', '))}
        </p>
        {active.length === 0 ? (
          <p className="font-mono text-sm">
            {ui.empty}
            <span className="animate-pulse">_</span>
          </p>
        ) : (
          <div className="grid gap-4">
            {active.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        )}
        {archived.length > 0 && (
          <div className="space-y-3 pt-8">
            <SectionHeading
              label={ui.archive(archived.length)}
              command={theme.archive}
            />
            <p className="text-sm text-muted-foreground">
              {ui.archiveIntro}
            </p>
            <ul className="divide-y divide-border rounded-xl border border-border">
              {archived.map((p) => (
                <li
                  key={p.id}
                  className="flex flex-col gap-2 px-4 py-3 sm:flex-row sm:items-start sm:justify-between sm:gap-6"
                >
                  <div>
                    <a
                      className="font-mono text-sm text-primary underline-offset-4 hover:underline"
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {p.name}
                    </a>
                    <p className="text-sm text-muted-foreground">
                      {p.description}
                    </p>
                    {p.stack?.length ? (
                      <ul
                        aria-label={ui.stack}
                        className="mt-2 flex flex-wrap gap-1.5 font-mono text-xs"
                      >
                        {p.stack.map((s) => (
                          <li
                            key={s}
                            className="rounded-md border border-border px-1.5 py-0.5 text-muted-foreground"
                          >
                            {s}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                  <div className="flex flex-col items-start gap-1 sm:items-end">
                    <StatusBadge status="archived" year={null} overdue={false} />
                    <span className="font-mono text-xs whitespace-nowrap text-muted-foreground">
                      {ui.lastTouched} {p.updated.slice(0, 4)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      <footer className="font-mono text-xs text-muted-foreground">
        © {new Date().getFullYear()} Kreanto
      </footer>
    </main>
  )
}
