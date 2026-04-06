import '@testing-library/jest-dom/vitest'
import { vi } from 'vitest'

vi.mock('next/font/google', () => ({
  Source_Serif_4: () => ({
    className: 'mock-source-serif',
    variable: '--font-heading',
    style: { fontFamily: 'Source Serif 4' },
  }),
  Source_Sans_3: () => ({
    className: 'mock-source-sans',
    variable: '--font-body',
    style: { fontFamily: 'Source Sans 3' },
  }),
}))
