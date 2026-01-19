/**
 * SEO Configuration and Utilities
 * Comprehensive SEO helper for H. Ayep Zaki website
 */

export const siteConfig = {
  siteName: 'H. Ayep Zaki',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://ayepzaki.com',
  locale: 'id_ID',
  language: 'id',
  twitterHandle: '@ayepzaki_resmi',
  author: {
    name: 'H. Ayep Zaki, S.E., M.M.',
    title: 'Wali Kota Sukabumi ke-23',
    description: 'Politikus Partai NasDem yang menjabat sebagai Wali Kota Sukabumi ke-23. Dilantik oleh Presiden Prabowo Subianto pada 20 Februari 2025 di Istana Negara, Jakarta.',
    email: 'ayepzaki.com@gmail.com',
    image: '/images/photos/ayep-zaki.png',
  },
  organization: {
    name: 'Pemerintah Kota Sukabumi',
    url: 'https://sukabumikota.go.id',
    logo: '/images/logos/sukabumi.png',
    address: {
      streetAddress: 'Jl. Pelabuhan II No. 1',
      addressLocality: 'Sukabumi',
      addressRegion: 'Jawa Barat',
      postalCode: '43111',
      addressCountry: 'ID',
    },
    contactPoint: {
      telephone: '+62-266-211800',
      contactType: 'customer service',
      email: 'walikota@sukabumikota.go.id',
    },
  },
  social: {
    instagram: 'https://www.instagram.com/ayepzaki',
    youtube: 'https://www.youtube.com/ayepzaki',
    facebook: 'https://www.facebook.com/ayepzaki.official',
    twitter: 'https://twitter.com/ayepzaki_resmi',
  },
  defaultOgImage: '/images/photos/og-ayepzaki.png',
  defaultMeta: {
    title: 'H. Ayep Zaki, S.E., M.M. - Wali Kota Sukabumi',
    description: 'Website resmi H. Ayep Zaki, S.E., M.M. - Wali Kota Sukabumi ke-23 periode 2025-2030. Membangun Kota Sukabumi yang Maju, Sejahtera, dan Berkarakter.',
    keywords: 'Ayep Zaki, Wali Kota Sukabumi, Sukabumi, Pemerintah Kota, NasDem, Jawa Barat, walikota, kepala daerah',
  },
}

/**
 * Generate SEO meta tags object for use with next/head
 * @param {Object} options - SEO options
 * @returns {Object} - Meta tags configuration
 */
export function generateSEO({
  title,
  description,
  canonical,
  ogType = 'website',
  ogImage,
  ogImageAlt,
  article,
  noindex = false,
  additionalMetaTags = [],
}) {
  const seo = {
    title: title || siteConfig.defaultMeta.title,
    description: description || siteConfig.defaultMeta.description,
    canonical: canonical ? `${siteConfig.siteUrl}${canonical}` : siteConfig.siteUrl,
    openGraph: {
      type: ogType,
      locale: siteConfig.locale,
      url: canonical ? `${siteConfig.siteUrl}${canonical}` : siteConfig.siteUrl,
      title: title || siteConfig.defaultMeta.title,
      description: description || siteConfig.defaultMeta.description,
      siteName: siteConfig.siteName,
      images: [
        {
          url: ogImage || `${siteConfig.siteUrl}${siteConfig.defaultOgImage}`,
          width: 1200,
          height: 630,
          alt: ogImageAlt || siteConfig.author.name,
        },
      ],
    },
    twitter: {
      card: ogImage ? 'summary_large_image' : 'summary',
      site: siteConfig.twitterHandle,
      creator: siteConfig.twitterHandle,
      title: title || siteConfig.defaultMeta.title,
      description: description || siteConfig.defaultMeta.description,
      image: ogImage || `${siteConfig.siteUrl}${siteConfig.defaultOgImage}`,
    },
    additionalMetaTags: [
      { name: 'keywords', content: siteConfig.defaultMeta.keywords },
      { name: 'author', content: siteConfig.author.name },
      { name: 'robots', content: noindex ? 'noindex,nofollow' : 'index,follow' },
      { name: 'googlebot', content: noindex ? 'noindex,nofollow' : 'index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1' },
      { name: 'geo.region', content: 'ID-JB' },
      { name: 'geo.placename', content: 'Sukabumi' },
      { name: 'geo.position', content: '-6.9175;106.9275' },
      { name: 'ICBM', content: '-6.9175, 106.9275' },
      { name: 'theme-color', content: '#0d9488' },
      { property: 'fb:app_id', content: '' }, // Add your FB App ID if available
      ...additionalMetaTags,
    ],
  }

  if (article) {
    seo.openGraph.type = 'article'
    seo.openGraph.article = {
      publishedTime: article.publishedTime,
      modifiedTime: article.modifiedTime || article.publishedTime,
      author: article.author || siteConfig.author.name,
      section: article.section || 'Berita',
      tags: article.tags || [],
    }
  }

  return seo
}

/**
 * Generate JSON-LD structured data for Person (H. Ayep Zaki)
 */
export function generatePersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteConfig.author.name,
    jobTitle: siteConfig.author.title,
    description: siteConfig.author.description,
    url: siteConfig.siteUrl,
    image: `${siteConfig.siteUrl}${siteConfig.author.image}`,
    email: siteConfig.author.email,
    sameAs: [
      siteConfig.social.instagram,
      siteConfig.social.youtube,
      siteConfig.social.facebook,
      siteConfig.social.twitter,
    ],
    worksFor: {
      '@type': 'GovernmentOrganization',
      name: siteConfig.organization.name,
      url: siteConfig.organization.url,
    },
    address: {
      '@type': 'PostalAddress',
      ...siteConfig.organization.address,
    },
  }
}

/**
 * Generate JSON-LD structured data for Government Organization
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'GovernmentOrganization',
    name: siteConfig.organization.name,
    url: siteConfig.organization.url,
    logo: `${siteConfig.siteUrl}${siteConfig.organization.logo}`,
    description: 'Pemerintah Kota Sukabumi, Jawa Barat, Indonesia',
    address: {
      '@type': 'PostalAddress',
      ...siteConfig.organization.address,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      ...siteConfig.organization.contactPoint,
      availableLanguage: ['Indonesian', 'English'],
    },
    sameAs: [
      siteConfig.social.instagram,
      siteConfig.social.youtube,
      siteConfig.social.facebook,
      siteConfig.social.twitter,
    ],
  }
}

/**
 * Generate JSON-LD structured data for WebSite (with search)
 */
export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.siteName,
    alternateName: 'Website Resmi Wali Kota Sukabumi',
    url: siteConfig.siteUrl,
    description: siteConfig.defaultMeta.description,
    publisher: {
      '@type': 'Person',
      name: siteConfig.author.name,
    },
    inLanguage: siteConfig.language,
  }
}

/**
 * Generate JSON-LD structured data for Article
 */
export function generateArticleSchema({
  title,
  description,
  url,
  image,
  datePublished,
  dateModified,
  author,
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: title,
    description: description,
    url: `${siteConfig.siteUrl}${url}`,
    image: image ? [image] : [`${siteConfig.siteUrl}${siteConfig.author.image}`],
    datePublished: datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Person',
      name: author || siteConfig.author.name,
      url: siteConfig.siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.siteName,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.siteUrl}${siteConfig.organization.logo}`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteConfig.siteUrl}${url}`,
    },
    inLanguage: siteConfig.language,
  }
}

/**
 * Generate JSON-LD structured data for BreadcrumbList
 */
export function generateBreadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url ? `${siteConfig.siteUrl}${item.url}` : undefined,
    })),
  }
}

/**
 * Generate JSON-LD for Contact Page
 */
export function generateContactPageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Hubungi Wali Kota Sukabumi',
    description: 'Sampaikan aspirasi, saran, atau pertanyaan Anda kepada Wali Kota Sukabumi',
    url: `${siteConfig.siteUrl}/contact`,
    mainEntity: {
      '@type': 'GovernmentOrganization',
      name: siteConfig.organization.name,
      address: {
        '@type': 'PostalAddress',
        ...siteConfig.organization.address,
      },
      contactPoint: {
        '@type': 'ContactPoint',
        ...siteConfig.organization.contactPoint,
      },
    },
  }
}

/**
 * Generate JSON-LD for About/Profile Page
 */
export function generateAboutPageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    name: `Profil ${siteConfig.author.name}`,
    description: siteConfig.author.description,
    url: `${siteConfig.siteUrl}/about`,
    mainEntity: generatePersonSchema(),
  }
}
