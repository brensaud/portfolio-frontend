import type { Preview } from '@storybook/react'
import '../src/styles/globals.css'

/**
 * Storybook preview configuration.
 *
 * Theme toggle: Use the toolbar globe icon to switch between dark/light.
 * The `data-theme` attribute is set on the wrapper div, mirroring how
 * ThemeProvider applies it in production.
 */
const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Color theme',
      defaultValue: 'dark',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'dark', title: 'Dark', left: '🌙' },
          { value: 'light', title: 'Light', left: '☀️' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = (context.globals['theme'] as string | undefined) ?? 'dark'
      return (
        <div
          data-theme={theme}
          style={{
            backgroundColor: 'var(--color-background)',
            color: 'var(--color-text-primary)',
            padding: '2rem',
            minHeight: '100vh',
            fontFamily: 'var(--font-sans)',
          }}
        >
          <Story />
        </div>
      )
    },
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    // Disable the default backgrounds addon — we control the background via data-theme
    backgrounds: { disable: true },
  },
}

export default preview
