import { generateSitemap } from '@/lib/generateSitemap'
import { getGhostArticles } from '@/lib/getAllArticles'

export default async function handler(req, res) {
  try {
    // Fetch all articles for the sitemap
    const articles = await getGhostArticles() || []
    
    // Generate the sitemap XML
    const sitemap = generateSitemap(articles)

    // Set the response headers
    res.setHeader('Content-Type', 'application/xml')
    res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate')
    
    // Send the sitemap
    res.status(200).send(sitemap)
  } catch (error) {
    console.error('Error generating sitemap:', error)
    res.status(500).json({ error: 'Error generating sitemap' })
  }
}
