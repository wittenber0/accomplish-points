import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          slate: '#2F3C4A',
          teal: '#2A5C5A',
          sage: '#7A9E8E',
          amber: '#C29545',
          stone: '#E8E3DA',
          cream: '#FAF8F4',
        },
        body: {
          DEFAULT: '#3D3830',
          muted: '#7A746A',
        },
        border: {
          DEFAULT: '#D4CFC6',
        },
        status: {
          success: '#3D7A5F',
          error: '#A13D2D',
        },
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'Georgia', "'Times New Roman'", 'serif'],
        body: ['var(--font-body)', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        h1: ['2.441rem', { lineHeight: '1.2', fontWeight: '700', letterSpacing: '-0.02em' }],
        h2: ['1.953rem', { lineHeight: '1.25', fontWeight: '600', letterSpacing: '-0.01em' }],
        h3: ['1.563rem', { lineHeight: '1.3', fontWeight: '600', letterSpacing: '0' }],
        h4: ['1.25rem', { lineHeight: '1.4', fontWeight: '600', letterSpacing: '0' }],
        body: ['1.125rem', { lineHeight: '1.7', fontWeight: '400', letterSpacing: '0' }],
        'body-sm': ['1rem', { lineHeight: '1.6', fontWeight: '400', letterSpacing: '0' }],
        caption: ['0.875rem', { lineHeight: '1.5', fontWeight: '400', letterSpacing: '0.01em' }],
        nav: ['0.9375rem', { lineHeight: '1', fontWeight: '600', letterSpacing: '0.03em' }],
        button: ['0.9375rem', { lineHeight: '1', fontWeight: '600', letterSpacing: '0.04em' }],
      },
      maxWidth: {
        container: '1200px',
      },
    },
  },
  plugins: [],
}
export default config
