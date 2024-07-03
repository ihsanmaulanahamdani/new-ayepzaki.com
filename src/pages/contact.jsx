import Head from 'next/head'

import { Card } from '@/components/Card'
import { Section } from '@/components/Section'
import { SimpleLayout } from '@/components/SimpleLayout'

import contact from '../data/contact.json'

function ContactSection({ children, ...props }) {
  return (
    <Section {...props}>
      <div className="space-y-16">{children}</div>
    </Section>
  )
}

function Appearance({ title, description, cta, href }) {
  return (
    <Card as="article">
      <Card.Title as="h3" href={href}>
        {title}
      </Card.Title>
      <Card.Description>{description}</Card.Description>
      <Card.Cta>{cta}</Card.Cta>
    </Card>
  )
}

export default function Speaking() {
  return (
    <>
      <Head>
        <title>Contact - {contact.tabTitle}</title>
        <meta name="description" content={contact.title} />
      </Head>
      <SimpleLayout title={contact.title} intro={contact.description}>
        <div className="space-y-20">
          <ContactSection title="Social Media">
            {contact.socialsMedia.map((socialMedia, i) => (
              <Appearance
                key={i}
                href={socialMedia.url}
                title={socialMedia.name}
                description={socialMedia.description}
                cta={socialMedia.label}
              />
            ))}
          </ContactSection>
          <ContactSection title="Contact">
            <Appearance
              href="mailto:ayepzaki.com@gmail.com"
              title="Email"
              description="Kirim saya email"
              cta="Send Email"
            />
          </ContactSection>
        </div>
      </SimpleLayout>
    </>
  )
}
