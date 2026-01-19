import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import SEO from '@/components/SEO'
import {
  FacebookIcon,
  InstagramIcon,
  XIcon,
  YoutubeIcon,
} from '@/components/SocialIcons'
import {
  siteConfig,
  generateAboutPageSchema,
  generateBreadcrumbSchema,
} from '@/lib/seo'

import about from '../data/about.json'

const portraitImage = '/images/photos/ayep-zaki.png'

function SocialLink({ className, href, children, icon: Icon }) {
  return (
    <li className={clsx(className, 'group')}>
      <Link
        href={href}
        target="_blank"
        className="flex items-center gap-4 rounded-xl bg-white px-4 py-3.5 shadow-sm ring-1 ring-zinc-100 transition hover:shadow-md hover:ring-teal-500/50 dark:bg-zinc-800/50 dark:ring-zinc-700 dark:hover:ring-teal-500/50"
      >
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-teal-50/80 transition group-hover:bg-teal-100/80 dark:bg-teal-900/20 dark:group-hover:bg-teal-900/30">
          <Icon className="h-5 w-5 fill-teal-600 dark:fill-teal-400" />
        </div>
        <span className="flex-1 text-sm font-semibold text-zinc-700 transition group-hover:text-teal-700 dark:text-zinc-300 dark:group-hover:text-teal-400">
          {children}
        </span>
        <svg
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-5 w-5 text-zinc-400 transition group-hover:translate-x-1 group-hover:text-teal-600 dark:text-zinc-500 dark:group-hover:text-teal-400"
        >
          <path
            fillRule="evenodd"
            d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
            clipRule="evenodd"
          />
        </svg>
      </Link>
    </li>
  )
}

function MailIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        d="M6 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6Zm.245 2.187a.75.75 0 0 0-.99 1.126l6.25 5.5a.75.75 0 0 0 .99 0l6.25-5.5a.75.75 0 0 0-.99-1.126L12 12.251 6.245 7.187Z"
      />
    </svg>
  )
}

export default function About() {
  // Generate structured data for SEO
  const structuredData = [
    generateAboutPageSchema(),
    generateBreadcrumbSchema([
      { name: 'Beranda', url: '/' },
      { name: 'Tentang' },
    ]),
  ]

  const pageDescription =
    about.biography ||
    `Profil lengkap ${about.title}, Wali Kota Sukabumi ke-23 periode 2025-2030. Pengusaha, filantropis, dan politikus Partai NasDem.`

  return (
    <>
      <SEO
        title={about.tabTitle}
        description={pageDescription}
        canonical="/about"
        ogType="profile"
        ogImage={`${siteConfig.siteUrl}${siteConfig.defaultOgImage}`}
        ogImageAlt={about.title}
        structuredData={structuredData}
      />
      <Container className="mt-16 sm:mt-32">
        <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
          <div className="lg:pl-20">
            <div className="relative max-w-md px-2.5 lg:max-w-lg">
              <div className="aspect-square overflow-hidden rounded-3xl">
                <Image
                  src={portraitImage}
                  alt=""
                  width={640}
                  height={640}
                  sizes="(min-width: 1024px) 40rem, 28rem"
                  className="h-full w-full object-cover object-top"
                />
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white/80 via-white/40 to-transparent dark:from-zinc-900/80 dark:via-zinc-900/40"></div>
              </div>
            </div>
          </div>
          <div className="lg:order-first lg:row-span-2">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
              {about.title}
            </h1>
            {about.subtitle && (
              <p className="mt-2 text-lg font-semibold text-teal-600 dark:text-teal-400">
                {about.subtitle}
              </p>
            )}
            {about.biography && (
              <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
                {about.biography}
              </p>
            )}
            <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
              {about.descriptions.map((el, i) => (
                <div key={i} dangerouslySetInnerHTML={{ __html: el }} />
              ))}
            </div>
          </div>
          <div className="lg:pl-20">
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-zinc-800 dark:text-zinc-100">
                Terhubung
              </h2>
              <ul role="list" className="space-y-3">
                {about.socialsMedia.map((socialMedia, i) => (
                  <SocialLink
                    key={i}
                    href={socialMedia.url}
                    icon={
                      socialMedia.name === 'x'
                        ? XIcon
                        : socialMedia.name === 'facebook'
                        ? FacebookIcon
                        : socialMedia.name === 'instagram'
                        ? InstagramIcon
                        : socialMedia.name === 'youtube' && YoutubeIcon
                    }
                  >
                    {socialMedia.label}
                  </SocialLink>
                ))}
                <SocialLink
                  href={`mailto:${about.contact.email}`}
                  icon={MailIcon}
                  className="border-zinc-200 dark:border-zinc-700/40"
                >
                  {about.contact.email}
                </SocialLink>
              </ul>
            </div>

            {/* Education Section */}
            {about.education && about.education.length > 0 && (
              <div className="mt-12">
                <h2 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
                  Riwayat Pendidikan
                </h2>
                <ol className="mt-6 space-y-4">
                  {about.education.map((edu, i) => (
                    <li key={i} className="flex gap-4">
                      <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
                        <span className="text-sm font-semibold text-teal-600 dark:text-teal-400">
                          {i + 1}
                        </span>
                      </div>
                      <dl className="flex flex-auto flex-wrap gap-x-2">
                        <dt className="sr-only">Institusi</dt>
                        <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
                          {edu.institution}
                        </dd>
                        <dt className="sr-only">Gelar</dt>
                        <dd className="text-xs text-zinc-500 dark:text-zinc-400">
                          {edu.degree}
                        </dd>
                        <dt className="sr-only">Periode</dt>
                        <dd className="flex-1 text-right text-xs text-zinc-400 dark:text-zinc-500">
                          <time>{edu.period}</time>
                        </dd>
                      </dl>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* Career Section */}
            {about.career && about.career.length > 0 && (
              <div className="mt-12">
                <h2 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
                  Riwayat Karier
                </h2>
                <ol className="mt-6 space-y-4">
                  {about.career.map((job, i) => (
                    <li key={i} className="flex gap-4">
                      <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                          className="h-5 w-5 stroke-teal-600 dark:stroke-teal-400"
                        >
                          <path d="M2.75 9.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z" />
                          <path d="M3 14.25h6.249c.484 0 .952-.002 1.316.319l.777.682a.996.996 0 0 0 1.316 0l.777-.682c.364-.32.832-.319 1.316-.319H21M8.75 6.5V4.75a2 2 0 0 1 2-2h2.5a2 2 0 0 1 2 2V6.5" />
                        </svg>
                      </div>
                      <dl className="flex flex-auto flex-wrap gap-x-2">
                        <dt className="sr-only">Jabatan</dt>
                        <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
                          {job.position}
                        </dd>
                        <dt className="sr-only">Deskripsi</dt>
                        <dd className="max-w-[75%] text-xs text-zinc-500 dark:text-zinc-400">
                          {job.description}
                        </dd>
                        <dt className="sr-only">Tahun</dt>
                        <dd className="flex-1 text-right text-xs text-zinc-400 dark:text-zinc-500">
                          <time>{job.year}</time>
                        </dd>
                      </dl>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        </div>
      </Container>
    </>
  )
}
