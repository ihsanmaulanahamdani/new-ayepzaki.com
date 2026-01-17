import { ArticleLayout } from '@/components/ArticleLayout'
import { Container } from '@/components/Container'
import SEO from '@/components/SEO'
import { readGhostArticle } from '@/lib/getAllArticles'
import { siteConfig } from '@/lib/seo'
import Link from 'next/link'
import React from 'react'

const DetailArticle = ({ article }) => {
  // Handle article not found
  if (!article) {
    return (
      <>
        <SEO
          title="Artikel Tidak Ditemukan - H. Ayep Zaki"
          description="Artikel yang Anda cari tidak ditemukan."
          canonical="/articles"
          ogType="website"
        />
        
        <Container className="mt-16 sm:mt-32">
          <div className="text-center">
            <div className="mx-auto h-24 w-24 text-zinc-400 dark:text-zinc-500">
              <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            </div>
            <h1 className="mt-6 text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
              Artikel Tidak Ditemukan
            </h1>
            <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
              Maaf, artikel yang Anda cari tidak dapat ditemukan atau sudah tidak tersedia.
            </p>
            <div className="mt-8">
              <Link
                href="/articles"
                className="inline-flex items-center rounded-md bg-teal-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
              >
                Kembali ke Daftar Artikel
              </Link>
            </div>
          </div>
        </Container>
      </>
    )
  }

  const meta = {
    author: article.primary_author?.name || 'H. Ayep Zaki',
    date: article.published_at.split('T')[0],
    title: article.title,
    description: article.excerpt,
  }

  return (
    <ArticleLayout
      meta={meta}
      featureImage={article.feature_image}
      featureImageCaption={article.feature_image_caption}
    >
      <div dangerouslySetInnerHTML={{ __html: article.html }} />
    </ArticleLayout>
  )
}

export async function getServerSideProps(context) {
  try {
    const slug = context.params.slug

    return {
      props: {
        article: await readGhostArticle(slug),
      },
    }
  } catch (error) {
    return {
      props: {
        article: null,
      },
    }
  }
}

export default DetailArticle
