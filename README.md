# kreanto.dev

The home page of Kreanto, Ming Tsai's studio for software side projects. It is a single page that says who is behind it and lists what is being built, what is live, and what was archived.

## Stack

- React 19 and TypeScript, built with Vite
- Tailwind CSS and shadcn/ui components
- Static output (`dist/`), meant to be hosted on Cloudflare

There is no server and no database. All content comes from two JSON files in the repo.

## Run it locally

You need Node.js 22 or newer.

```sh
npm install
npm run dev       # development server with hot reload
npm run build     # type check, then production build into dist/
npm run preview   # serve the production build locally
npm run lint      # run Oxlint
```

## Edit the content

| File | What it controls |
| :-- | :-- |
| `src/data/profile.json` | Name, headline, bio, languages, links |
| `src/data/projects.json` | The project cards and the archive list |
| `src/data/profile.es.json`, `src/data/projects.es.json` | The Spanish text for the same content. A new project needs an entry in `projects.es.json` or the build fails |
| `src/i18n/en.ts`, `src/i18n/es.ts` | Interface labels in each language |
| `index.html`, `es/index.html` | Page title, description and the link-preview (Open Graph) tags, per language |
| `public/og.png` | The 1200x630 link-preview image |

### Project statuses

| Status | Meaning |
| :-- | :-- |
| `building` | Work in progress, nothing public yet |
| `mvp` | A first usable version exists (needs a launch `year`) |
| `live` | Shipped and in use (needs a launch `year`) |
| `paused` | Stopped on purpose (needs a `reason`) |
| `archived` | An old lab or experiment, listed in the archive section |

A project with `revealName: false` shows a redacted name bar. Set it to `true` when the project ships. The redaction is a presentation choice, not a secret: the name is still in the built JavaScript.

`src/lib/projects.ts` checks the project data when the page loads. A mistake in `projects.json` can still produce a blank page, so run `npm run build` and open `npm run preview` before you publish a change.

## Deploy

The site is a static build. On Cloudflare:

- Build command: `npm run build`
- Output directory: `dist`
- Node version: 22 or newer

Test the generated `*.pages.dev` or `*.workers.dev` address before pointing `kreanto.dev` at it.

## Contributing, security, license

- [CONTRIBUTING.md](CONTRIBUTING.md)
- [SECURITY.md](SECURITY.md)
- [LICENSE](LICENSE)
