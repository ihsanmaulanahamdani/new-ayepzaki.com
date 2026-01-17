import Image from 'next/image'
import Link from 'next/link'

import { Container } from '@/components/Container'
import SEO from '@/components/SEO'
import portraitImage from '@/images/photos/ayep-zaki.png'
import {
  siteConfig,
  generateContactPageSchema,
  generateBreadcrumbSchema,
} from '@/lib/seo'

import contact from '../data/contact.json'

function OfficeIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path
        d="M2.25 21h19.5M2.25 3h19.5M9.75 3v18m4.5-18v18M4.5 21V9.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21M13.5 21V5.625c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"
        className="stroke-teal-500"
      />
    </svg>
  )
}

function EnvelopeIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path
        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
        className="stroke-teal-500"
      />
    </svg>
  )
}

function PhoneIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path
        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
        className="stroke-teal-500"
      />
    </svg>
  )
}

function MapPinIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path
        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
        className="stroke-teal-500"
      />
      <path
        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
        className="stroke-teal-500"
      />
    </svg>
  )
}

function InstagramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  )
}

function FacebookIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

function XIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function YoutubeIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  )
}

function ContactCard({
  icon: Icon,
  title,
  description,
  href,
  buttonText = 'Hubungi',
  external = false,
}) {
  const content = (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-zinc-100 transition hover:shadow-xl hover:ring-teal-500/50 dark:bg-zinc-800/50 dark:ring-zinc-700 dark:hover:ring-teal-500/50">
      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <div className="mb-4 inline-flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-teal-50 dark:bg-teal-900/20">
          <Icon className="h-7 w-7" />
        </div>
        <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
          {title}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          {description}
        </p>
        {href && (
          <div className="mt-6">
            <div className="inline-flex items-center gap-2 rounded-lg bg-teal-50 px-4 py-2.5 text-sm font-semibold text-teal-700 transition hover:bg-teal-100 dark:bg-teal-900/20 dark:text-teal-400 dark:hover:bg-teal-900/30">
              <span>{buttonText}</span>
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-4 w-4 transition group-hover:translate-x-1"
              >
                <path
                  fillRule="evenodd"
                  d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        )}
      </div>
    </div>
  )

  if (href) {
    return external ? (
      <a href={href} target="_blank" rel="noopener noreferrer" className="block h-full">
        {content}
      </a>
    ) : (
      <Link href={href} className="block h-full">{content}</Link>
    )
  }

  return content
}

function SocialMediaButton({ icon: Icon, name, url }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-3 rounded-xl bg-white p-4 shadow-sm ring-1 ring-zinc-100 transition hover:shadow-md hover:ring-teal-500/50 dark:bg-zinc-800/50 dark:ring-zinc-700 dark:hover:ring-teal-500/50"
    >
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-teal-50 dark:bg-teal-900/20">
        <Icon className="h-5 w-5 fill-teal-600 dark:fill-teal-400" />
      </div>
      <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
        {name}
      </span>
      <svg
        viewBox="0 0 20 20"
        fill="currentColor"
        className="ml-auto h-4 w-4 text-zinc-400 transition group-hover:translate-x-1 group-hover:text-teal-600 dark:group-hover:text-teal-400"
      >
        <path
          fillRule="evenodd"
          d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
          clipRule="evenodd"
        />
      </svg>
    </a>
  )
}

export default function Contact() {
  const getSocialIcon = (name) => {
    const icons = {
      Instagram: InstagramIcon,
      Facebook: FacebookIcon,
      X: XIcon,
      YouTube: YoutubeIcon,
    }
    return icons[name] || InstagramIcon
  }

  // Generate structured data for SEO
  const structuredData = [
    generateContactPageSchema(),
    generateBreadcrumbSchema([
      { name: 'Beranda', url: '/' },
      { name: 'Kontak' },
    ]),
  ]

  return (
    <>
      <SEO
        title={contact.tabTitle}
        description={contact.description}
        canonical="/contact"
        ogType="website"
        ogImage={`${siteConfig.siteUrl}/images/photos/ayep-zaki.png`}
        ogImageAlt="Hubungi Wali Kota Sukabumi - H. Ayep Zaki"
        structuredData={structuredData}
      />

      {/* Header with Portrait */}
      <Container className="mt-16 sm:mt-32">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Portrait Image - Shows first on mobile */}
          <div className="order-1 lg:order-2">
            <div className="relative mx-auto max-w-sm lg:max-w-lg">
              <div className="relative aspect-[5/4] overflow-hidden rounded-3xl bg-zinc-100 shadow-2xl ring-1 ring-zinc-900/5 dark:bg-zinc-800 dark:ring-white/10">
                <Image
                  src={portraitImage}
                  alt="H. Ayep Zaki"
                  width={300}
                  height={240}
                  className="h-full w-full object-cover object-top"
                  priority
                  unoptimized
                />
                <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white/90 via-white/50 to-transparent dark:from-zinc-900/90 dark:via-zinc-900/50"></div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -bottom-6 -right-6 -z-10 h-full w-full rounded-3xl bg-teal-500/10 dark:bg-teal-500/5"></div>
            </div>
          </div>

          {/* Text Content - Shows second on mobile */}
          <div className="order-2 flex flex-col justify-center lg:order-1">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-teal-50 px-4 py-2 text-sm font-semibold text-teal-700 dark:bg-teal-900/20 dark:text-teal-400">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Mari Terhubung
              </div>
            </div>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-5xl">
              {contact.title}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
              {contact.description}
            </p>
          </div>
        </div>
      </Container>

      {/* Contact Cards */}
      <Container className="mt-20 sm:mt-24">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
            Informasi Kontak
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
            Jangan ragu untuk menghubungi kami melalui berbagai saluran yang tersedia
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {contact.office && (
            <>
              <ContactCard
                icon={OfficeIcon}
                title={contact.office.name}
                description={contact.office.address}
                href="https://maps.app.goo.gl/nCDPFkBQr9BwGfYe6"
                buttonText="Kunjungi"
                external
              />
              <ContactCard
                icon={EnvelopeIcon}
                title="Email Resmi"
                description={`Kirim email ke ${contact.office.email} dan kami akan merespons secepat mungkin`}
                href={`mailto:${contact.office.email}`}
                buttonText="Kirim Email"
                external
              />
              <ContactCard
                icon={PhoneIcon}
                title="Telepon"
                description="Hubungi kami melalui telepon untuk pertanyaan yang mendesak atau jadwalkan pertemuan"
                href={`tel:${contact.office.phone}`}
                buttonText="Hubungi"
                external
              />
            </>
          )}
        </div>
      </Container>

      {/* Social Media */}
      <Container className="mb-20 mt-20 sm:mb-24 sm:mt-24">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Media Sosial
          </h2>
          <p className="mt-3 text-base text-zinc-600 dark:text-zinc-400">
            Ikuti kegiatan dan update terbaru melalui media sosial
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {contact.socialsMedia.map((social, i) => (
            <SocialMediaButton
              key={i}
              icon={getSocialIcon(social.name)}
              name={social.name}
              url={social.url}
            />
          ))}
        </div>
      </Container>

      {/* Contact Form */}
      {/* <Container className="mt-16 mb-16">
        <div className="rounded-3xl bg-gradient-to-br from-teal-50 to-white p-8 shadow-xl ring-1 ring-zinc-100 dark:from-zinc-800 dark:to-zinc-900 dark:ring-zinc-700 sm:p-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Kirim Pesan
          </h2>
          <p className="mt-2 text-base text-zinc-600 dark:text-zinc-400">
            Ada pertanyaan atau saran? Sampaikan kepada kami
          </p>
          <form className="mt-8 space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  id="name"
                  className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-zinc-900 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white"
                  placeholder="Masukkan nama Anda"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-zinc-900 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white"
                  placeholder="email@example.com"
                />
              </div>
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Subjek
              </label>
              <input
                type="text"
                id="subject"
                className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-zinc-900 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white"
                placeholder="Subjek pesan"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Pesan
              </label>
              <textarea
                id="message"
                rows={5}
                className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-zinc-900 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white"
                placeholder="Tulis pesan Anda di sini..."
              />
            </div>
            <Button type="submit" className="w-full sm:w-auto">
              Kirim Pesan
            </Button>
          </form>
        </div>
      </Container> */}
    </>
  )
}
