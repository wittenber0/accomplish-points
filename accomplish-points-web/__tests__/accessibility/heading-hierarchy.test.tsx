import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import HomePage from '@/app/page'
import AboutPage from '@/app/about/page'
import ServicesPage from '@/app/services/page'
import ClientsPage from '@/app/clients/page'
import ContactPage from '@/app/contact/page'
import NotFoundPage from '@/app/not-found'

const pages = [
  { name: 'Home', component: HomePage },
  { name: 'About', component: AboutPage },
  { name: 'Services', component: ServicesPage },
  { name: 'Clients', component: ClientsPage },
  { name: 'Contact', component: ContactPage },
  { name: '404', component: NotFoundPage },
]

describe('Heading hierarchy across all pages', () => {
  pages.forEach(({ name, component: Page }) => {
    describe(`${name} page`, () => {
      it('has exactly one H1', () => {
        const { container } = render(<Page />)
        expect(container.querySelectorAll('h1')).toHaveLength(1)
      })

      it('does not skip heading levels', () => {
        const { container } = render(<Page />)
        const headings = container.querySelectorAll('h1, h2, h3, h4, h5, h6')
        const levels = Array.from(headings).map((h) => parseInt(h.tagName[1]))
        let maxLevelSeen = 0
        for (const level of levels) {
          expect(level).toBeLessThanOrEqual(maxLevelSeen + 1)
          maxLevelSeen = Math.max(maxLevelSeen, level)
        }
      })
    })
  })
})
