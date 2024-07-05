import Head from 'next/head'
import dynamic from 'next/dynamic'

import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'

import { formatDate } from '@/lib/formatDate'
import { getGhostArticlesPerPage } from '@/lib/getAllArticles'

import article from '../../data/article.json'
const Pagination = dynamic(() => import('@/components/Pagination'), {
  ssr: false,
})

function Article({ article }) {
  const date = article.published_at.split('T')[0]

  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3">
        <div className="flex gap-x-3">
          <div>
            <img
              src={article.feature_image}
              className="h-auto w-full rounded-md sm:hidden mb-3"
              alt="Feature Image"
            />
            <Card.Title href={`/articles/${article.slug}`} isBlank={false}>
              {article.title}
            </Card.Title>
            <Card.Eyebrow
              as="time"
              dateTime={date}
              className="md:hidden"
              decorate
            >
              {formatDate(date)}
            </Card.Eyebrow>
            <Card.Description>{article.excerpt}</Card.Description>
          </div>
          <img
            src={article.feature_image}
            className="hidden h-auto w-52 rounded-md sm:block"
            alt="Feature Image"
          />
        </div>
        <Card.Cta>Read article</Card.Cta>
      </Card>
      <Card.Eyebrow as="time" dateTime={date} className="mt-1 hidden md:block">
        {formatDate(date)}
      </Card.Eyebrow>
    </article>
  )
}

export default function ArticlesIndex({ articles, pagination }) {
  return (
    <>
      <Head>
        <title>Articles - {article.tabTitle}</title>
        <meta name="description" content={article.description} />
      </Head>
      <SimpleLayout title={article.title} intro={article.description}>
        <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
          <div className="flex max-w-3xl flex-col space-y-16">
            {articles?.map((article) => (
              <Article key={article.slug} article={article} />
            ))}
          </div>
        </div>
        <Pagination pagination={pagination} />
      </SimpleLayout>
    </>
  )
}

export async function getServerSideProps(context) {
  const page = Number(context.query.page) || 1
  const articles = await getGhostArticlesPerPage(page)

  try {
    return {
      props: {
        articles,
        pagination: articles.meta.pagination,
      },
    }
  } catch (error) {
    return { props: {} }
  }
}
