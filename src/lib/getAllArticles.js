// import glob from 'fast-glob'
// import * as path from 'path'
import GhostContentAPI from '@tryghost/content-api'
import fallbackArticles from '../data/fallback-articles.json'

// Create API instance with site credentials from environment or fallback
const ghostConfig = {
  url: process.env.NEXT_PUBLIC_GHOST_URL || 'https://blog.ayepzaki.com',
  key: process.env.NEXT_PUBLIC_GHOST_API_KEY || '68b8e00a726bb60554231660f8',
  version: 'v5.0',
}

const api = new GhostContentAPI(ghostConfig)

// async function importArticle(articleFilename) {
//   let { meta, default: component } = await import(
//     `../pages/articles/${articleFilename}`
//   )
//   return {
//     slug: articleFilename.replace(/(\/index)?\.mdx$/, ''),
//     ...meta,
//     component,
//   }
// }

// export async function getAllArticles() {
//   let articleFilenames = await glob(['*.mdx', '*/index.mdx'], {
//     cwd: path.join(process.cwd(), 'src/pages/articles'),
//   })

//   let articles = await Promise.all(articleFilenames.map(importArticle))

//   return articles.sort((a, z) => new Date(z.date) - new Date(a.date))
// }

export async function getGhostArticlesPerPage(page) {
  try {
    const data = await api.posts.browse({
      limit: 9,
      page,
      fields: ['slug', 'title', 'published_at', 'excerpt', 'feature_image'],
      include: 'tags,authors',
    })

    return {
      articles: data || [],
      meta: data.meta || { pagination: { page: 1, pages: 1, limit: 9, total: 0 } },
    }
  } catch (error) {
    console.warn('Failed to fetch articles from Ghost, using fallback:', error.message)
    
    // Use fallback articles when Ghost is not available
    const startIndex = (page - 1) * 9
    const endIndex = startIndex + 9
    const paginatedArticles = fallbackArticles.slice(startIndex, endIndex)
    
    return {
      articles: paginatedArticles,
      meta: { 
        pagination: { 
          page: page,
          pages: Math.ceil(fallbackArticles.length / 9),
          limit: 9,
          total: fallbackArticles.length,
          prev: page > 1 ? page - 1 : null,
          next: page < Math.ceil(fallbackArticles.length / 9) ? page + 1 : null,
        }
      },
    }
  }
}

export async function getGhostArticles() {
  try {
    const data = await api.posts.browse({ limit: 3, include: 'tags,authors' })
    return data
  } catch (error) {
    console.warn('Failed to fetch articles from Ghost, using fallback:', error.message)
    return fallbackArticles.slice(0, 3)
  }
}

export async function readGhostArticle(slug) {
  try {
    const data = await api.posts.read({ slug }, { include: 'tags,authors' })
    return data
  } catch (error) {
    console.warn('Failed to fetch article from Ghost, checking fallback:', error.message)
    
    // Try to find article in fallback data
    const fallbackArticle = fallbackArticles.find(article => article.slug === slug)
    return fallbackArticle || null
  }
}
