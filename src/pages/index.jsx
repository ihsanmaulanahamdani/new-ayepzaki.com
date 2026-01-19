import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import SEO from '@/components/SEO'
import {
  FacebookIcon,
  InstagramIcon,
  XIcon,
  YoutubeIcon,
} from '@/components/SocialIcons'
import { formatDate } from '@/lib/formatDate'
import { getGhostArticles } from '@/lib/getAllArticles'
import {
  siteConfig,
  generatePersonSchema,
  generateOrganizationSchema,
  generateWebsiteSchema,
} from '@/lib/seo'

import homepage from '../data/homepage.json'

const portraitImage = '/images/photos/ayep-zaki.png'

function BriefcaseIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M2.75 9.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
        className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
      />
      <path
        d="M3 14.25h6.249c.484 0 .952-.002 1.316.319l.777.682a.996.996 0 0 0 1.316 0l.777-.682c.364-.32.832-.319 1.316-.319H21M8.75 6.5V4.75a2 2 0 0 1 2-2h2.5a2 2 0 0 1 2 2V6.5"
        className="stroke-zinc-400 dark:stroke-zinc-500"
      />
    </svg>
  )
}

function EmailIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="h-6 w-6"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
        className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
      />
    </svg>
  )
}

function DevicePhoneMobileIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="h-6 w-6"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
        className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
      />
    </svg>
  )
}

function Article({ article }) {
  const date = article.published_at.split('T')[0]

  return (
    <article className="group relative flex flex-col gap-4 rounded-xl border border-zinc-200 bg-white p-4 shadow-sm transition hover:border-teal-500 hover:shadow-md dark:border-zinc-700/40 dark:bg-zinc-800/50 dark:hover:border-teal-500/50 sm:flex-row sm:gap-6 sm:p-4">
      <Link
        href={`/articles/${article.slug}`}
        className="relative flex-shrink-0 overflow-hidden rounded-lg"
      >
        <div className="relative aspect-[16/9] w-full sm:h-full sm:w-52">
          <Image
            src={article.feature_image}
            alt={article.title}
            width={208}
            height={117}
            className="h-full w-full rounded-lg object-cover transition duration-300"
          />
        </div>
      </Link>
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <time
            dateTime={date}
            className="mb-2 block text-xs font-medium uppercase tracking-wide text-teal-600 dark:text-teal-400"
          >
            {formatDate(date)}
          </time>
          <Link href={`/articles/${article.slug}`}>
            <h3 className="mb-2 text-lg font-bold leading-snug tracking-tight text-zinc-900 transition hover:text-teal-600 dark:text-zinc-100 dark:hover:text-teal-400 sm:line-clamp-2 sm:text-xl">
              {article.title}
            </h3>
          </Link>
          <p className="line-clamp-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:line-clamp-1">
            {article.excerpt}
          </p>
        </div>
        <div className="mt-3 flex items-center">
          <Link
            href={`/articles/${article.slug}`}
            className="group/link inline-flex items-center text-sm font-semibold text-teal-600 transition hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300"
          >
            Baca artikel
            <svg
              className="ml-1.5 h-4 w-4 transition group-hover/link:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  )
}

function SocialLink({ icon: Icon, href, label }) {
  return (
    <Link
      href={href}
      target="_blank"
      aria-label={label}
      className="group flex items-center justify-center gap-2"
    >
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-50/80 transition group-hover:bg-teal-100/80 dark:bg-teal-900/20 dark:group-hover:bg-teal-900/30 sm:h-9 sm:w-9">
        <Icon className="h-4 w-4 fill-teal-600 transition dark:fill-teal-400 sm:h-5 sm:w-5" />
      </div>
      <span className="text-xs font-semibold text-zinc-700 transition group-hover:text-teal-700 dark:text-zinc-300 dark:group-hover:text-teal-400 sm:hidden">
        {label.split(' ')[0]}
      </span>
    </Link>
  )
}

function Resume() {
  let resume = [
    {
      company: 'Kota Sukabumi',
      title: 'Wali Kota Sukabumi ke-23',
      logo: '/images/logos/sukabumi.png',
      time: '2025 - 2030',
    },
    {
      company: 'Forum Komunikasi Doa Bangsa',
      title: 'Pendiri',
      logo: '/images/logos/fkdb.jpg',
      time: '2015',
    },
    {
      company: 'Yayasan Pembina Pendidikan Doa Bangsa',
      title: 'Pendiri',
      logo: '/images/logos/yppdb.png',
      time: '2010',
    },
    {
      company: 'Tempe Azaki',
      title: 'Pendiri',
      logo: '/images/logos/azaki.png',
      time: '2005',
    },
  ]

  return (
    <div className="rounded-2xl border border-zinc-100 dark:border-zinc-700/40">
      <div className="border-b border-zinc-100 px-6 py-4 dark:border-zinc-700/40 dark:text-zinc-100">
        <h2 className="flex text-sm font-semibold">
          <BriefcaseIcon className="h-6 w-6 flex-none" />
          <span className="ml-3">Riwayat</span>
        </h2>
      </div>
      <ol className="space-y-4 px-6 py-4">
        {resume.map((role, roleIndex) => (
          <li key={roleIndex} className="flex gap-4">
            <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
              <Image
                src={role.logo}
                alt=""
                width={28}
                height={28}
                className="h-7 w-7 rounded-full"
                unoptimized
              />
            </div>
            <dl className="flex flex-auto flex-wrap gap-x-2">
              <dt className="sr-only">Organisasi</dt>
              <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
                {role.company}
              </dd>
              <dt className="sr-only">Jabatan</dt>
              <dd className="text-xs text-zinc-500 dark:text-zinc-400">
                {role.title}
              </dd>
              <dt className="sr-only">Tahun</dt>
              <dd
                className="ml-auto text-xs text-zinc-400 dark:text-zinc-500"
                aria-label={`${role.time.label ?? role.time}`}
              >
                <time dateTime={role.time.dateTime ?? role.time}>
                  {role.time.label ?? role.time}
                </time>
              </dd>
            </dl>
          </li>
        ))}
      </ol>
    </div>
  )
}

function Contacts() {
  let contacts = [
    {
      title: 'Email',
      description: 'ayepzaki.com@gmail.com',
      Icon: EmailIcon,
      url: `mailto:ayepzaki.com@gmail.com`,
    },
  ]

  return (
    <div className="rounded-2xl border border-zinc-100 dark:border-zinc-700/40">
      <div className="border-b border-zinc-100 px-6 py-4 dark:border-zinc-700/40">
        <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          <DevicePhoneMobileIcon className="h-6 w-6 flex-none" />
          <span className="ml-3">Kontak</span>
        </h2>
      </div>
      <ol className="space-y-4 px-6 py-4">
        {contacts.map((contact, contactIndex) => (
          <li key={contactIndex} className="flex gap-4">
            <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
              <contact.Icon />
            </div>
            <dl className="flex flex-auto flex-wrap gap-x-2">
              <dt className="sr-only">Judul</dt>
              <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
                {contact.title}
              </dd>
              <dt className="sr-only">Alamat Email</dt>
              <dd className="text-xs text-zinc-500 dark:text-zinc-400">
                {contact.description}
              </dd>
            </dl>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default function Home({ articles }) {
  // Generate structured data for SEO
  const structuredData = [
    generateWebsiteSchema(),
    generatePersonSchema(),
    generateOrganizationSchema(),
  ]

  return (
    <>
      <SEO
        title={homepage.tabTitle}
        description={homepage.description}
        canonical="/"
        ogType="website"
        ogImage={`${siteConfig.siteUrl}${siteConfig.defaultOgImage}`}
        ogImageAlt="H. Ayep Zaki, S.E., M.M. - Wali Kota Sukabumi"
        structuredData={structuredData}
      />
      <Container className="mt-10 lg:mt-0">
        <div className="grid min-h-screen grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
          {/* Text Content */}
          <div className="order-2 lg:order-1">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
              {homepage.title}
            </h1>
            {homepage.subtitle && (
              <p className="mt-2 text-lg font-semibold text-teal-600 dark:text-teal-400">
                {homepage.subtitle}
              </p>
            )}
            <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
              {homepage.description}
            </p>
            {homepage.tagline && (
              <p className="mt-4 text-lg italic text-zinc-700 dark:text-zinc-300">
                &ldquo;{homepage.tagline}&rdquo;
              </p>
            )}

            {/* Social Links */}
            <div className="mt-8">
              <h2 className="mb-3 text-sm font-semibold text-zinc-700 dark:text-zinc-400">
                Terhubung dengan Saya
              </h2>
              <div className="flex flex-wrap gap-3">
                {homepage.socialsMedia.map((socialMedia, i) => (
                  <SocialLink
                    key={i}
                    href={socialMedia.url}
                    label={socialMedia.label}
                    icon={
                      socialMedia.name === 'twitter'
                        ? XIcon
                        : socialMedia.name === 'facebook'
                        ? FacebookIcon
                        : socialMedia.name === 'instagram'
                        ? InstagramIcon
                        : socialMedia.name === 'youtube' && YoutubeIcon
                    }
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Portrait Image */}
          <div className="order-1 lg:order-2">
            <div className="relative mx-auto max-w-sm lg:max-w-none">
              <div className="aspect-square overflow-hidden rounded-3xl shadow-2xl ring-1 ring-zinc-900/5 dark:ring-white/10">
                <Image
                  src={portraitImage}
                  alt="H. Ayep Zaki"
                  width={512}
                  height={512}
                  sizes="(min-width: 1024px) 32rem, 24rem"
                  className="h-full w-full object-cover object-top"
                  priority
                />
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white/80 via-white/40 to-transparent dark:from-zinc-900/80 dark:via-zinc-900/40"></div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container className="mt-24 lg:mt-0">
        <div className="mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-4xl">
            Artikel Terbaru
          </h2>
          <p className="mt-2 text-base text-zinc-600 dark:text-zinc-400">
            Berita dan informasi terkini seputar kegiatan H. Ayep Zaki
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
          <div className="space-y-8 lg:col-span-3">
            {articles?.map((article) => (
              <Article key={article.slug} article={article} />
            ))}
            <div className="flex justify-center sm:col-span-2">
              <Button
                href="/articles"
                variant="secondary"
                className="w-full rounded-xl sm:w-auto"
              >
                Lihat Semua Artikel
              </Button>
            </div>
          </div>
          <div className="space-y-8 lg:col-span-2">
            <Resume />
            <Contacts />
          </div>
        </div>
      </Container>
    </>
  )
}

export async function getServerSideProps() {
  try {
    return {
      props: {
        articles: (await getGhostArticles()) || [],
      },
    }
  } catch (error) {
    return { props: {} }
  }
}
