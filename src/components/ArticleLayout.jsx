import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'

import { Container } from '@/components/Container'
import { Prose } from '@/components/Prose'
import SEO from '@/components/SEO'
import { formatDate } from '@/lib/formatDate'
import {
  siteConfig,
  generateArticleSchema,
  generateBreadcrumbSchema,
} from '@/lib/seo'

function ArrowLeftIcon(props) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M7.25 11.25 3.75 8m0 0 3.5-3.25M3.75 8h8.5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function ArticleLayout({
  children,
  meta,
  featureImage,
  featureImageCaption,
  isRssFeed = false,
  previousPathname,
}) {
  let router = useRouter()

  if (isRssFeed) {
    return children
  }

  // Generate structured data for article SEO
  const articleSlug = router.asPath
  const structuredData = [
    generateArticleSchema({
      title: meta.title,
      description: meta.description,
      url: articleSlug,
      image: featureImage,
      datePublished: meta.date,
      dateModified: meta.date,
      author: meta.author,
    }),
    generateBreadcrumbSchema([
      { name: 'Beranda', url: '/' },
      { name: 'Artikel', url: '/articles' },
      { name: meta.title },
    ]),
  ]

  return (
    <>
      <SEO
        title={`${meta.title} - H. Ayep Zaki`}
        description={meta.description}
        canonical={articleSlug}
        ogType="article"
        ogImage={featureImage}
        ogImageAlt={meta.title}
        article={{
          publishedTime: meta.date,
          modifiedTime: meta.date,
          author: meta.author || siteConfig.author.name,
          section: 'Berita',
          tags: meta.tags || ['Sukabumi', 'Berita', 'Wali Kota'],
        }}
        structuredData={structuredData}
      />

      <Container className="lg:mt-12">
        <div className="xl:relative">
          <div className="mx-auto w-full">
            {previousPathname && (
              <button
                type="button"
                onClick={() => router.back()}
                aria-label="Kembali ke artikel"
                className="group mb-8 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 transition hover:shadow-lg dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0 dark:ring-white/10 dark:hover:border-zinc-700 dark:hover:ring-white/20 lg:absolute lg:-left-16 lg:-mt-2 lg:mb-0 xl:-left-20"
              >
                <ArrowLeftIcon className="h-4 w-4 stroke-zinc-500 transition group-hover:stroke-zinc-700 dark:stroke-zinc-500 dark:group-hover:stroke-zinc-400" />
              </button>
            )}
            <article>
              <header className="flex flex-col space-y-5">
                <time
                  dateTime={meta.date}
                  className="flex items-center text-sm font-medium text-teal-600 dark:text-teal-400"
                >
                  <svg
                    className="mr-2 h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  {formatDate(meta.date)}
                </time>
                <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl lg:text-5xl">
                  {meta.title}
                </h1>
                {/* Feature Image - Full Width */}
                {featureImage && (
                  <div className="w-full">
                    <div className="relative aspect-[21/9] w-full overflow-hidden">
                      <Image
                        src={featureImage}
                        alt={meta.title}
                        width={1200}
                        height={630}
                        className="h-full w-full object-cover rounded-2xl"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/60 via-zinc-900/20 to-transparent"></div>
                    </div>
                  </div>
                )}
              </header>

              {featureImageCaption && (
                <div
                  className="rounded-lg bg-zinc-50 px-4 py-3 text-sm italic text-zinc-600 dark:bg-zinc-800/50 dark:text-zinc-400"
                  dangerouslySetInnerHTML={{ __html: featureImageCaption }}
                />
              )}

              <Prose className="mt-10">{children}</Prose>
            </article>
          </div>
        </div>
      </Container>
    </>
  )
}
