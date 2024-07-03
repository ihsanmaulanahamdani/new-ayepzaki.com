import glob from 'fast-glob'
import * as path from 'path'
import GhostContentAPI from '@tryghost/content-api'

// Create API instance with site credentials
const api = new GhostContentAPI({
  url: 'https://blog.ayepzaki.com',
  key: 'a601ddb8ad229dfed131ab12cc',
  version: 'v5.0',
})

async function importArticle(articleFilename) {
  let { meta, default: component } = await import(
    `../pages/articles/${articleFilename}`
  )
  return {
    slug: articleFilename.replace(/(\/index)?\.mdx$/, ''),
    ...meta,
    component,
  }
}

export async function getAllArticles() {
  let articleFilenames = await glob(['*.mdx', '*/index.mdx'], {
    cwd: path.join(process.cwd(), 'src/pages/articles'),
  })

  let articles = await Promise.all(articleFilenames.map(importArticle))

  return articles.sort((a, z) => new Date(z.date) - new Date(a.date))
}

export async function getGhostArticles() {
  const data = await api.posts.browse({ limit: 5, include: 'tags,authors' })

  return data
}

export async function readGhostArticle(slug) {
  const data = await api.posts.read({ slug }, { include: 'tags,authors' })

  return data
}
