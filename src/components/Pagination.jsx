import format from '@/lib/format'
import { useRouter } from 'next/router'

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

  const paginationText = pagination
    ? `${
        paginationPage === 1
          ? '1'
          : format(paginationLimit * (paginationPage - 1) + 1)
      }-${
        totalItemsPerPage > paginationTotal
          ? format(paginationTotal)
          : format(paginationPage * paginationLimit)
      } of ${format(paginationTotal)}`
    : ''

  const onPrevious = () => onSetQuery(String(paginationPage - 1))
  const onNext = () => onSetQuery(String(paginationPage + 1))

  return (
    <nav
      className="mt-10 flex items-center justify-between sm:col-span-2 md:col-span-3 lg:col-span-4"
      aria-label="Pagination"
    >
      <div className="-mt-px flex w-0 flex-1">
        {paginationPage !== 1 ? (
          <button
            onClick={onPrevious}
            className="relative inline-flex items-center rounded-md px-3 py-1 text-sm font-semibold text-zinc-600 ring-1 ring-inset ring-gray-300 hover:text-teal-500 hover:ring-teal-500 focus-visible:outline-offset-0 dark:text-zinc-400"
          >
            Previous
          </button>
        ) : null}
      </div>
      <div className="-mt-px hidden w-0 flex-1 justify-center py-4 sm:flex">
        <div className="rounded-full border border-gray-400 px-1.5 text-center">
          <p className="text-xs text-gray-500">{paginationText}</p>
        </div>
      </div>
      <div className="-mt-px flex w-0 flex-1 justify-end">
        {pagination?.next ? (
          <button
            onClick={onNext}
            className="relative ml-3 inline-flex items-center rounded-md px-3 py-1 text-sm font-semibold text-zinc-600 ring-1 ring-inset ring-gray-300 hover:text-teal-500 hover:ring-teal-500 focus-visible:outline-offset-0 dark:text-zinc-400"
          >
            Next
          </button>
        ) : null}
      </div>
    </nav>
  )
}

export default Pagination
