import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'
import logseq from 'astroplugin-logseq'

export default defineConfig({
  site: 'https://benjypng.github.io',
  base: '/blogseq',
  integrations: [
    logseq({
      token: import.meta.env.VITE_LOGSEQ_TOKEN,
      pollingInterval: 500,
      dateRef: 'publish-date',
      targets: [
        {
          tag: 'readme',
          directory: 'src/content/docs/readme',
        },
        {
          tag: 'blogseq',
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
      components: {
        PageTitle: './src/components/TitleWithDate.astro',
      },
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
          autogenerate: { directory: 'blog' },
          collapsed: false,
        },
        {
          label: 'Plugin README',
          autogenerate: { directory: 'readme' },
          collapsed: false,
        },
      ],
    }),
  ],
})
