import React, {FC} from 'react'
import classnames from 'classnames'
import {usePagination} from '../Paginated'
import {ScrollTopComponent} from '../../assets/ts/components'

interface PaginationProps {
  onPageChange: (page: number) => void
  totalCount: number
  siblingCount?: number
  currentPage: number
  pageSize: number
}

const DOTS: string = 'DOTS'

const Pagination: FC<PaginationProps> = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
}) => {
  const paginationRange =
    usePagination({
      currentPage,
      totalCount,
      siblingCount,
      pageSize,
    }) ?? []

  if (currentPage === 0 || paginationRange.length < 2) {
    return null
  }

  const onNext = () => {
    if (paginationRange.length > currentPage) {
      onPageChange(currentPage + 1)
    }
  }

  const onPrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1)
    }
  }

  let lastPage = paginationRange![paginationRange!.length - 1]
  return (
    <ul className='pagination'>
      <li
        className={classnames('page-item previous', {
          disabled: currentPage === 1,
        })}
        onClick={onPrevious}
      >
        <button
          className='page-link'
          onClick={() => {
            ScrollTopComponent.goTop()
          }}
        >
          <i className='bi bi-chevron-left'></i>
        </button>
      </li>
      {paginationRange!.map((pageNumber, idx) => {
        if (pageNumber === DOTS) {
          return (
            <li key={idx} className='page-item'>
              &#8230;
            </li>
          )
        }
        return (
          <li
            key={pageNumber}
            className={classnames('page-item', {
              active: pageNumber === currentPage,
            })}
            onClick={() => onPageChange(pageNumber as number)}
          >
            <button onClick={() => ScrollTopComponent.goTop()} className='page-link'>
              {pageNumber}
            </button>
          </li>
        )
      })}
      <li
        className={classnames('page-item next', {
          disabled: currentPage === lastPage,
        })}
        onClick={onNext}
      >
        <button
          className='page-link'
          onClick={() => {
            ScrollTopComponent.goTop()
          }}
        >
          <i className='bi bi-chevron-right'></i>
        </button>
      </li>
    </ul>
  )
}

export default Pagination
