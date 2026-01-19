import Head from 'next/head'
import { siteConfig } from '@/lib/seo'

/**
 * SEO Component - Comprehensive SEO meta tags for Next.js pages
 * 
 * @param {Object} props
 * @param {string} props.title - Page title
 * @param {string} props.description - Page description
 * @param {string} props.canonical - Canonical URL path (e.g., '/about')
 * @param {string} props.ogType - Open Graph type ('website', 'article', 'profile')
 * @param {string} props.ogImage - Open Graph image URL
 * @param {string} props.ogImageAlt - Open Graph image alt text
 * @param {Object} props.article - Article-specific data
 * @param {boolean} props.noindex - Whether to noindex the page
 * @param {Array} props.structuredData - Array of JSON-LD objects
 */
export default function SEO({
  title,
  description,
  canonical,
  ogType = 'website',
  ogImage,
  ogImageAlt,
  article,
  noindex = false,
  structuredData = [],
}) {
  const pageTitle = title || siteConfig.defaultMeta.title
  const pageDescription = description || siteConfig.defaultMeta.description
  const pageUrl = canonical ? `${siteConfig.siteUrl}${canonical}` : siteConfig.siteUrl
  const pageImage = ogImage || `${siteConfig.siteUrl}${siteConfig.defaultOgImage}`
  const imageAlt = ogImageAlt || siteConfig.author.name

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{pageTitle}</title>
      <meta name="title" content={pageTitle} />
      <meta name="description" content={pageDescription} />
      <meta name="keywords" content={siteConfig.defaultMeta.keywords} />
      <meta name="author" content={siteConfig.author.name} />
      
      {/* Robots */}
      <meta 
        name="robots" 
        content={noindex ? 'noindex,nofollow' : 'index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1'} 
      />
      <meta 
        name="googlebot" 
        content={noindex ? 'noindex,nofollow' : 'index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1'} 
      />
      
      {/* Canonical URL */}
      <link rel="canonical" href={pageUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={article ? 'article' : ogType} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={pageImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={imageAlt} />
      <meta property="og:site_name" content={siteConfig.siteName} />
      <meta property="og:locale" content={siteConfig.locale} />
      
      {/* Article-specific Open Graph */}
      {article && (
        <>
          <meta property="article:published_time" content={article.publishedTime} />
          {article.modifiedTime && (
            <meta property="article:modified_time" content={article.modifiedTime} />
          )}
          <meta property="article:author" content={article.author || siteConfig.author.name} />
          <meta property="article:section" content={article.section || 'Berita'} />
          {article.tags?.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}
      
      {/* Twitter Card */}
      <meta name="twitter:card" content={ogImage ? 'summary_large_image' : 'summary'} />
      <meta name="twitter:site" content={siteConfig.twitterHandle} />
      <meta name="twitter:creator" content={siteConfig.twitterHandle} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={pageImage} />
      <meta name="twitter:image:alt" content={imageAlt} />
      
      {/* Geo Tags for Local SEO */}
      <meta name="geo.region" content="ID-JB" />
      <meta name="geo.placename" content="Sukabumi" />
      <meta name="geo.position" content="-6.9175;106.9275" />
      <meta name="ICBM" content="-6.9175, 106.9275" />
      
      {/* Additional SEO */}
      <meta name="theme-color" content="#0d9488" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content={siteConfig.siteName} />
      
      {/* Structured Data / JSON-LD */}
      {structuredData.map((data, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}
    </Head>
  )
}
