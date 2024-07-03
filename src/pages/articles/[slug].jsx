import { ArticleLayout } from '@/components/ArticleLayout'
import { readGhostArticle } from '@/lib/getAllArticles'
import React from 'react'

const DetailArticle = ({ article }) => {
  const meta = {
    author: article.primary_author.name,
    date: article.published_at.split('T')[0],
    title: article.title,
    description: article.excerpt,
  }

  return (
    <ArticleLayout meta={meta} featureImage={article.feature_image}>
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
