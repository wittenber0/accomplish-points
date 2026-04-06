import { Hero } from '@/components/sections/Hero'
import { ServicesOverview } from '@/components/sections/ServicesOverview'
import { TestimonialStrip } from '@/components/sections/TestimonialStrip'
import { CredentialsBar } from '@/components/sections/CredentialsBar'
import { CallToAction } from '@/components/sections/CallToAction'

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesOverview />
      <TestimonialStrip />
      <CredentialsBar />
      <CallToAction
        heading="Ready to accomplish what matters most?"
        body="Every engagement begins with a conversation about what you need."
        buttonText="Get in Touch"
        buttonHref="/contact"
      />
    </>
  )
}
