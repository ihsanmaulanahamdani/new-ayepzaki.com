import clsx from 'clsx'

export function Prose({ children, className }) {
  return (
    <div className={clsx(className, 'prose prose-lg dark:prose-invert max-w-none')}>
      <style jsx global>{`
        .prose {
          font-size: 1.0625rem;
          line-height: 1.75;
        }
        
        .prose p {
          margin-top: 1.5rem;
          margin-bottom: 1.5rem;
        }
        
        /* Full-width images */
        .prose img {
          width: 100%;
          height: auto;
          border-radius: 1rem;
          margin-top: 2rem;
          margin-bottom: 2rem;
          box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
        }
        
        .prose figure {
          margin-top: 2rem;
          margin-bottom: 2rem;
        }
        
        .prose figure img {
          margin-top: 0;
          margin-bottom: 0;
        }
        
        .prose figcaption {
          text-align: center;
          font-style: italic;
          margin-top: 0.75rem;
          font-size: 0.875rem;
        }
        
        /* Better headings */
        .prose h2 {
          margin-top: 2.5rem;
          margin-bottom: 1rem;
          font-size: 1.75rem;
          font-weight: 700;
          line-height: 1.3;
        }
        
        .prose h3 {
          margin-top: 2rem;
          margin-bottom: 0.75rem;
          font-size: 1.375rem;
          font-weight: 600;
          line-height: 1.4;
        }
        
        .prose h4 {
          margin-top: 1.75rem;
          margin-bottom: 0.5rem;
          font-size: 1.125rem;
          font-weight: 600;
        }
        
        /* Better lists */
        .prose ul,
        .prose ol {
          margin-top: 1.5rem;
          margin-bottom: 1.5rem;
          padding-left: 1.625rem;
        }
        
        .prose li {
          margin-top: 0.5rem;
          margin-bottom: 0.5rem;
        }
        
        /* Better blockquotes */
        .prose blockquote {
          margin-top: 2rem;
          margin-bottom: 2rem;
          padding: 1.5rem;
          border-left: 4px solid rgb(20 184 166);
          background: rgb(240 253 250 / 0.5);
          border-radius: 0.5rem;
          font-style: italic;
        }
        
        .dark .prose blockquote {
          background: rgb(20 184 166 / 0.05);
          border-left-color: rgb(45 212 191);
        }
        
        /* Better code blocks */
        .prose pre {
          margin-top: 2rem;
          margin-bottom: 2rem;
          border-radius: 1rem;
          padding: 1.5rem;
          overflow-x: auto;
        }
        
        .prose code {
          font-size: 0.875em;
        }
        
        /* Better tables on mobile */
        .prose table {
          display: block;
          overflow-x: auto;
          margin-top: 2rem;
          margin-bottom: 2rem;
        }
        
        @media (min-width: 640px) {
          .prose table {
            display: table;
          }
        }
        
        /* Ghost-specific classes */
        .prose .kg-image,
        .prose .kg-gallery-image img {
          width: 100%;
          height: auto;
        }
        
        .prose .kg-gallery-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1rem;
          margin-top: 2rem;
          margin-bottom: 2rem;
        }
        
        .prose .kg-gallery-image {
          margin: 0;
        }
        
        .prose .kg-bookmark-card {
          margin-top: 2rem;
          margin-bottom: 2rem;
          border: 1px solid rgb(228 228 231);
          border-radius: 0.75rem;
          overflow: hidden;
          transition: all 0.3s;
        }
        
        .dark .prose .kg-bookmark-card {
          border-color: rgb(63 63 70);
        }
        
        .prose .kg-bookmark-card:hover {
          box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
        }
        
        .prose .kg-embed-card {
          margin-top: 2rem;
          margin-bottom: 2rem;
        }
        
        .prose .kg-embed-card iframe {
          width: 100%;
          border-radius: 0.75rem;
        }
      `}</style>
      {children}
    </div>
  )
}
