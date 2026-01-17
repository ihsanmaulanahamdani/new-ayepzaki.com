import format from '@/lib/format'
import { useRouter } from 'next/router'
import clsx from 'clsx'

const Pagination = ({ pagination }) => {
  const router = useRouter()

  const onSetQuery = (value) => {
    if (value !== '1') {
      router.push(
        {
          pathname: router.pathname,
          query: { page: value },
        },
        undefined
      )
    } else {
      router.push(
        {
          pathname: router.pathname,
        },
        undefined
      )
    }
  }

  const paginationTotal = pagination?.total
  const paginationPage = pagination?.page
  const paginationLimit = pagination?.limit
  const totalItemsPerPage = pagination?.page * pagination?.limit
  const totalPages = pagination?.pages || 1

  const paginationText = pagination
    ? `${
        paginationPage === 1
          ? '1'
          : format(paginationLimit * (paginationPage - 1) + 1)
      }-${
        totalItemsPerPage > paginationTotal
          ? format(paginationTotal)
          : format(paginationPage * paginationLimit)
      } dari ${format(paginationTotal)}`
    : ''

  const onPrevious = () => onSetQuery(String(paginationPage - 1))
  const onNext = () => onSetQuery(String(paginationPage + 1))

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = []
    const maxPagesToShow = 5
    
    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (paginationPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages)
      } else if (paginationPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages)
      } else {
        pages.push(1, '...', paginationPage - 1, paginationPage, paginationPage + 1, '...', totalPages)
      }
    }
    return pages
  }

  if (!pagination || totalPages <= 1) return null

  return (
    <nav
      className="mt-16 flex items-center justify-center"
      aria-label="Pagination"
    >
      <div className="flex flex-col items-center gap-6">
        {/* Page Info */}
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Menampilkan <span className="font-semibold text-zinc-900 dark:text-white">{paginationText}</span> berita
        </p>
        
        {/* Pagination Controls */}
        <div className="flex items-center gap-2">
          {/* Previous Button */}
          <button
            onClick={onPrevious}
            disabled={paginationPage === 1}
            className={clsx(
              'inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold shadow-sm transition',
              paginationPage === 1
                ? 'cursor-not-allowed bg-zinc-100 text-zinc-400 dark:bg-zinc-800 dark:text-zinc-600'
                : 'bg-white text-zinc-700 ring-1 ring-zinc-200 hover:bg-teal-50 hover:text-teal-600 hover:ring-teal-500 dark:bg-zinc-800 dark:text-zinc-300 dark:ring-zinc-700 dark:hover:bg-teal-900/20 dark:hover:text-teal-400'
            )}
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
              <path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clipRule="evenodd" />
            </svg>
            Sebelumnya
          </button>

          {/* Page Numbers */}
          <div className="hidden items-center gap-1 sm:flex">
            {getPageNumbers().map((page, index) => {
              if (page === '...') {
                return (
                  <span key={`ellipsis-${index}`} className="px-2 text-zinc-400 dark:text-zinc-600">
                    ···
                  </span>
                )
              }
              
              const isActive = page === paginationPage
              return (
                <button
                  key={page}
                  onClick={() => onSetQuery(String(page))}
                  className={clsx(
                    'flex h-10 w-10 items-center justify-center rounded-lg text-sm font-semibold transition',
                    isActive
                      ? 'bg-teal-600 text-white shadow-md dark:bg-teal-500'
                      : 'text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800'
                  )}
                >
                  {page}
                </button>
              )
            })}
          </div>

          {/* Next Button */}
          <button
            onClick={onNext}
            disabled={!pagination?.next}
            className={clsx(
              'inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold shadow-sm transition',
              !pagination?.next
                ? 'cursor-not-allowed bg-zinc-100 text-zinc-400 dark:bg-zinc-800 dark:text-zinc-600'
                : 'bg-white text-zinc-700 ring-1 ring-zinc-200 hover:bg-teal-50 hover:text-teal-600 hover:ring-teal-500 dark:bg-zinc-800 dark:text-zinc-300 dark:ring-zinc-700 dark:hover:bg-teal-900/20 dark:hover:text-teal-400'
            )}
          >
            Selanjutnya
            <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
              <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Pagination
