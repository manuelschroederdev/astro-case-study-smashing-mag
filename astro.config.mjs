import { defineConfig } from 'astro/config'
import storyblok from '@storyblok/astro'
import tailwind from '@astrojs/tailwind'
import basicSsl from '@vitejs/plugin-basic-ssl'
import vue from '@astrojs/vue'
import { loadEnv } from 'vite'

const env = loadEnv('', process.cwd(), 'STORYBLOK')

// https://astro.build/config
import svelte from '@astrojs/svelte'

// https://astro.build/config
export default defineConfig({
  integrations: [
    storyblok({
      accessToken: env.STORYBLOK_TOKEN,
      bridge: true,
      components: {
        page: 'storyblok/Page',
        hero: 'storyblok/Hero',
        tabbed_content: 'storyblok/TabbedContent',
      },
    }),
    tailwind(),
    vue(),
    svelte(),
  ],
  vite: {
    plugins: [basicSsl()],
    server: {
      https: true,
    },
  },
})
