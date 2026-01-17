import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'

import { Container } from '@/components/Container'
import SEO from '@/components/SEO'

import { formatDate } from '@/lib/formatDate'
import { getGhostArticlesPerPage } from '@/lib/getAllArticles'
import {
  siteConfig,
  generateBreadcrumbSchema,
} from '@/lib/seo'

import article from '../../data/article.json'
const Pagination = dynamic(() => import('@/components/Pagination'), {
  ssr: false,
})

function CalendarIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" className="stroke-zinc-400 dark:stroke-zinc-500" />
      <line x1="16" y1="2" x2="16" y2="6" className="stroke-zinc-400 dark:stroke-zinc-500" />
      <line x1="8" y1="2" x2="8" y2="6" className="stroke-zinc-400 dark:stroke-zinc-500" />
      <line x1="3" y1="10" x2="21" y2="10" className="stroke-zinc-400 dark:stroke-zinc-500" />
    </svg>
  )
}

function Article({ article }) {
  const date = article.published_at.split('T')[0]

  return (
    <Link href={`/articles/${article.slug}`} className="group">
      <article className="relative overflow-hidden rounded-xl bg-white shadow-md ring-1 ring-zinc-100 transition hover:shadow-xl hover:ring-teal-500/50 dark:bg-zinc-800/50 dark:ring-zinc-700 dark:hover:ring-teal-500/50">
        {/* Featured Image */}
        <div className="aspect-[16/9] overflow-hidden bg-zinc-100 dark:bg-zinc-800">
          <Image
            src={article.feature_image}
            alt={article.title}
            width={400}
            height={225}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
        </div>
        
        {/* Content */}
        <div className="p-6">
          {/* Date Badge */}
          <div className="mb-3 flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
            <CalendarIcon className="h-4 w-4" />
            <time dateTime={date}>{formatDate(date)}</time>
          </div>
          
          {/* Title */}
          <h3 className="line-clamp-3 mb-3 text-xl font-bold tracking-tight text-zinc-900 transition group-hover:text-teal-600 dark:text-white dark:group-hover:text-teal-400">
            {article.title}
          </h3>
          
          {/* Excerpt */}
          <p className="line-clamp-3 text-base text-zinc-600 dark:text-zinc-400">
            {article.excerpt}
          </p>
          
          {/* Read More Link */}
          <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-teal-600 dark:text-teal-400">
            <span>Baca Selengkapnya</span>
            <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 transition group-hover:translate-x-1">
              <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </article>
    </Link>
  )
}

export default function ArticlesIndex({ articles, pagination }) {
  // Handle empty articles state
  if (!articles || articles.length === 0) {
    return (
      <>
        <SEO
          title={article.tabTitle}
          description={article.description}
          canonical="/articles"
          ogType="website"
          ogImage={`${siteConfig.siteUrl}/images/photos/ayep-zaki.png`}
          ogImageAlt="Berita & Kegiatan - H. Ayep Zaki"
        />
        
        {/* Header Section */}
        <Container className="mt-16 sm:mt-32">
          <header className="max-w-2xl">
            <h1 className="line-clamp-3 text-4xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-5xl">
              {article.title}
            </h1>
            <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-400">
              {article.description}
            </p>
          </header>
        </Container>
        
        {/* Empty State */}
        <Container className="mt-16 sm:mt-20">
          <div className="text-center">
            <div className="mx-auto h-24 w-24 text-zinc-400 dark:text-zinc-500">
              <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            </div>
            <h3 className="mt-6 text-xl font-semibold text-zinc-900 dark:text-white">Artikel Tidak Tersedia</h3>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              Mohon maaf, artikel sedang tidak tersedia saat ini. Silakan coba lagi nanti.
            </p>
          </div>
        </Container>
      </>
    )
  }

  // Generate structured data for SEO
  const structuredData = [
    generateBreadcrumbSchema([
      { name: 'Beranda', url: '/' },
      { name: 'Artikel' },
    ]),
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: article.title,
      description: article.description,
      url: `${siteConfig.siteUrl}/articles`,
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: Array.isArray(articles) ? articles.slice(0, 10).map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          url: `${siteConfig.siteUrl}/articles/${item.slug}`,
          name: item.title,
        })) : [],
      },
    },
  ]

  return (
    <>
      <SEO
        title={article.tabTitle}
        description={article.description}
        canonical="/articles"
        ogType="website"
        ogImage={`${siteConfig.siteUrl}/images/photos/ayep-zaki.png`}
        ogImageAlt="Berita & Kegiatan - H. Ayep Zaki"
        structuredData={structuredData}
      />
      
      {/* Header Section */}
      <Container className="mt-16 sm:mt-32">
        <header className="max-w-2xl">
          <h1 className="line-clamp-3 text-4xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-5xl">
            {article.title}
          </h1>
          <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-400">
            {article.description}
          </p>
        </header>
      </Container>
      
      {/* Articles Grid */}
      <Container className="mt-16 sm:mt-20">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {articles?.map((article) => (
            <Article key={article.slug} article={article} />
          ))}
        </div>
        
        {/* Pagination */}
        <Pagination pagination={pagination} />
      </Container>
    </>
  )
}

export async function getServerSideProps(context) {
  const page = Number(context.query.page) || 1
  const result = await getGhostArticlesPerPage(page)

  try {
    return {
      props: {
        articles: result.articles || [],
        pagination: result.meta?.pagination || { page: 1, pages: 1, limit: 9, total: 0 },
      },
    }
  } catch (error) {
    console.error('Error in getServerSideProps:', error)
    return {
      props: {
        articles: [],
        pagination: { page: 1, pages: 1, limit: 9, total: 0 },
      },
    }
  }
}
