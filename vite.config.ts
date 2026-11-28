import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

// Inlines the stylesheet (it is ~9 KiB, and a linked file blocks first paint)
// and preloads the Latin fonts, so they start downloading with the HTML
// instead of after the CSS has been fetched and parsed.
function inlineCssPreloadFonts(): Plugin {
  return {
    name: 'inline-css-preload-fonts',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      handler(html, ctx) {
        const bundle = ctx.bundle
        if (!bundle) return html
        let out = html
        for (const [file, chunk] of Object.entries(bundle)) {
          if (chunk.type === 'asset' && file.endsWith('.css')) {
            const link = new RegExp(`<link[^>]*href="/${file}"[^>]*>`)
            if (link.test(out)) {
              out = out.replace(link, () => `<style>${chunk.source}</style>`)
              delete bundle[file]
            }
          }
        }
        const preloads = Object.keys(bundle)
          .filter((f) => /(geist|jetbrains-mono)-latin-wght-normal.*\.woff2$/.test(f))
          .map(
            (f) =>
              `<link rel="preload" as="font" type="font/woff2" href="/${f}" crossorigin />`,
          )
          .join('\n    ')
        return out.replace('</head>', `    ${preloads}\n  </head>`)
      },
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), inlineCssPreloadFonts()],
  resolve: {
    alias: { '@': path.resolve(import.meta.dirname, './src') },
  },
})
