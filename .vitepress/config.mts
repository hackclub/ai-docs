import { defineConfig } from 'vitepress'
import llmstxt from 'vitepress-plugin-llms'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Hack Club AI",
  description: "Free AI APIs for teens",
  vite: {
    plugins: [llmstxt()],
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Guide', link: '/' },
      { text: 'API Reference', link: '/api/chat-completions' }
    ],

    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Quick Start', link: '/' },
          { text: 'Authentication', link: '/guide/authentication' },
          { text: 'Rules & Rate Limiting', link: '/guide/rules' }
        ]
      },
      {
        text: 'API Reference',
        items: [
          { text: 'Chat Completions', link: '/api/chat-completions' },
          { text: 'Image Generation', link: '/api/image-generation' },
          { text: 'PDF Inputs', link: '/api/pdf-inputs' },
          { text: 'Embeddings', link: '/api/embeddings' },
          { text: 'Get Models', link: '/api/get-models' },
          { text: 'Token Stats', link: '/api/stats' },
          { text: 'Moderations', link: '/api/moderations' }
        ]
      },
      {
        text: 'LLMs',
        items: [
          { text: 'llms.txt', link: '/llms.txt' },
          { text: 'llms-full.txt', link: '/llms-full.txt' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/hackclub/ai' }
    ],

    search: {
      provider: 'local'
    }
  }
})
