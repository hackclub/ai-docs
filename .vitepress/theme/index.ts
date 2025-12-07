import DefaultTheme from "vitepress/theme";
import "@catppuccin/vitepress/theme/mocha/pink.css";
import { enhanceAppWithTabs } from 'vitepress-plugin-tabs/client'
import type { Theme } from 'vitepress'

export default {
    extends: DefaultTheme,
    enhanceApp({ app }) {
        enhanceAppWithTabs(app)
    },
} satisfies Theme
