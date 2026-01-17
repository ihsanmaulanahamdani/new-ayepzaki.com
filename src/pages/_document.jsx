import { Head, Html, Main, NextScript } from 'next/document'

const modeScript = `
  let darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

  updateMode()
  darkModeMediaQuery.addEventListener('change', updateModeWithoutTransitions)
  window.addEventListener('storage', updateModeWithoutTransitions)

  function updateMode() {
    let isSystemDarkMode = darkModeMediaQuery.matches
    let isDarkMode = window.localStorage.isDarkMode === 'true' || (!('isDarkMode' in window.localStorage) && isSystemDarkMode)

    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }

    if (isDarkMode === isSystemDarkMode) {
      delete window.localStorage.isDarkMode
    }
  }

  function disableTransitionsTemporarily() {
    document.documentElement.classList.add('[&_*]:!transition-none')
    window.setTimeout(() => {
      document.documentElement.classList.remove('[&_*]:!transition-none')
    }, 0)
  }

  function updateModeWithoutTransitions() {
    disableTransitionsTemporarily()
    updateMode()
  }
`

export default function Document() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ayepzaki.com'
  
  return (
    <Html className="h-full antialiased" lang="id" dir="ltr">
      <Head>
        {/* Character Set & Viewport */}
        <meta charSet="utf-8" />
        
        {/* Favicon & Icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Preconnect for Performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS Prefetch for External Resources */}
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        
        {/* Theme Color for Mobile Browsers */}
        <meta name="theme-color" content="#0d9488" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#0f172a" media="(prefers-color-scheme: dark)" />
        <meta name="msapplication-TileColor" content="#0d9488" />
        
        {/* Mobile App Meta */}
        <meta name="application-name" content="Ayep Zaki" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Ayep Zaki" />
        <meta name="mobile-web-app-capable" content="yes" />
        
        {/* Format Detection */}
        <meta name="format-detection" content="telephone=no, date=no, email=no, address=no" />
        
        {/* RSS Feeds */}
        <link
          rel="alternate"
          type="application/rss+xml"
          title="RSS Feed - H. Ayep Zaki"
          href={`${siteUrl}/rss/feed.xml`}
        />
        <link
          rel="alternate"
          type="application/feed+json"
          title="JSON Feed - H. Ayep Zaki"
          href={`${siteUrl}/rss/feed.json`}
        />
        
        {/* Sitemap Reference */}
        <link rel="sitemap" type="application/xml" href={`${siteUrl}/sitemap.xml`} />
        
        {/* Dark Mode Script */}
        <script dangerouslySetInnerHTML={{ __html: modeScript }} />
      </Head>
      <body className="flex h-full flex-col bg-zinc-50 dark:bg-black">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
