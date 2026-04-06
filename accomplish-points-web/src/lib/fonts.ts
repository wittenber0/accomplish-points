import { Source_Serif_4, Source_Sans_3 } from 'next/font/google'

export const headingFont = Source_Serif_4({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-heading',
  display: 'swap',
})

export const bodyFont = Source_Sans_3({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-body',
  display: 'swap',
})
