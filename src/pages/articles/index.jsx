import Head from 'next/head'

import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'

import { formatDate } from '@/lib/formatDate'
import { getGhostArticles } from '@/lib/getAllArticles'

import article from '../../data/article.json'

function Article({ article }) {
  const date = article.published_at.split('T')[0]

  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3">
        <Card.Title href={`/articles/${article.slug}`} isBlank={false}>
          {article.title}
        </Card.Title>
        <Card.Eyebrow as="time" dateTime={date} className="md:hidden" decorate>
          {formatDate(date)}
        </Card.Eyebrow>
        <Card.Description>{article.excerpt}</Card.Description>
        <Card.Cta>Read article</Card.Cta>
      </Card>
      <Card.Eyebrow as="time" dateTime={date} className="mt-1 hidden md:block">
        {formatDate(date)}
      </Card.Eyebrow>
    </article>
  )
}

export default function ArticlesIndex({ articles }) {
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
      </SimpleLayout>
    </>
  )
}

export async function getServerSideProps() {
  try {
    return {
      props: {
        articles: await getGhostArticles(),
      },
    }
  } catch (error) {
    return { props: {} }
  }
}
