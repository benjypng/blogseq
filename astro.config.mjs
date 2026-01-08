// @ts-check
import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'
import fs from 'node:fs'
import path from 'node:path'
import logseq from 'astroplugin-logseq'

const getBlogSidebar = () => {
  const blogDir = 'src/content/docs/blog'

  const files = fs
    .readdirSync(blogDir)
    .filter((f) => f.endsWith('.md') || f.endsWith('.mdx'))
  const items = files.map((file) => {
    const content = fs.readFileSync(path.join(blogDir, file), 'utf-8')
    const titleMatch = content.match(/^title:\s*(.+)$/m)
    const dateMatch = content.match(/^date:\s*(.+)$/m)
    const title = titleMatch ? titleMatch[1].replace(/['"]/g, '').trim() : file
    const dateStr = dateMatch
      ? dateMatch[1].replace(/['"]/g, '').trim()
      : '1970-01-01'
    return {
      label: title,
      link: `blog/${file.replace(/\.mdx?$/, '')}/`,
      dateObj: new Date(dateStr),
    }
  })

  // @ts-expect-error
  items.sort((a, b) => b.dateObj - a.dateObj)
  return items.map(({ label, link }) => ({ label, link }))
}

export default defineConfig({
  site: 'https://benjypng.github.io',
  base: '/blogseq',
  integrations: [
    logseq({
      token: import.meta.env.VITE_LOGSEQ_TOKEN,
      pollingInterval: 1000,
      targets: [
        {
          tag: 'public',
          directory: 'src/content/docs/guides',
        },
        {
          tag: 'blog',
          directory: 'src/content/docs/blog',
        },
      ],
    }),
    starlight({
      title: 'Blogseq',
      logo: {
        light: './public/logo_light.jpg',
        dark: './public/logo_dark.jpg',
        replacesTitle: true,
      },
      plugins: [],
      customCss: ['./src/styles/custom.css'],
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/benjypng',
        },
      ],
      sidebar: [
        {
          label: 'Blog',
          items: getBlogSidebar(),
          collapsed: false,
        },
        {
          label: 'Plugin README',
          autogenerate: { directory: 'guides' },
          collapsed: false,
        },
      ],
    }),
  ],
})
