/**
 * Sitemap Generator for H. Ayep Zaki Website
 * Generates XML sitemap for better SEO indexing
 */

import { siteConfig } from './seo'

const staticPages = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/about', changefreq: 'monthly', priority: 0.8 },
  { url: '/contact', changefreq: 'monthly', priority: 0.7 },
  { url: '/articles', changefreq: 'daily', priority: 0.9 },
]

/**
 * Generate XML sitemap string
 * @param {Array} articles - Array of article objects with slug and published_at
 * @returns {string} - XML sitemap content
 */
export function generateSitemap(articles = []) {
  const baseUrl = siteConfig.siteUrl
  const currentDate = new Date().toISOString().split('T')[0]

  const staticUrls = staticPages.map(
    (page) => `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )

  const articleUrls = articles.map((article) => {
    const lastmod = article.updated_at || article.published_at
    const date = lastmod ? lastmod.split('T')[0] : currentDate
    return `
  <url>
    <loc>${baseUrl}/articles/${article.slug}</loc>
    <lastmod>${date}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`
  })

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${staticUrls.join('')}
${articleUrls.join('')}
</urlset>`
}

/**
 * Generate sitemap index for large sites
 * @returns {string} - XML sitemap index content
 */
export function generateSitemapIndex() {
  const baseUrl = siteConfig.siteUrl
  const currentDate = new Date().toISOString().split('T')[0]

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${baseUrl}/sitemap-static.xml</loc>
    <lastmod>${currentDate}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/sitemap-articles.xml</loc>
    <lastmod>${currentDate}</lastmod>
  </sitemap>
</sitemapindex>`
}
