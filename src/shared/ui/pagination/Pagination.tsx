import Link from 'next/link';
import styles from './pagination.module.css';
import cn from 'classnames';

type Props = {
  currentPage: number;
  totalPages: number;
  getPageHref: (page: number) => string;
  siblingCount?: number;
};

export function Pagination({ currentPage, totalPages, getPageHref, siblingCount = 1 }: Props) {
  if (totalPages <= 1) return null;

  const createPageArray = () => {
    const pages: (number | 'dots')[] = [];
    const start = Math.max(2, currentPage - siblingCount);
    const end = Math.min(totalPages - 1, currentPage + siblingCount);
    pages.push(1);
    if (start > 2) pages.push('dots');
    for (let i = start; i <= end; i++) pages.push(i);
    if (end < totalPages - 1) pages.push('dots');
    if (totalPages > 1) pages.push(totalPages);
    return pages;
  };

  const pages = createPageArray();

  const renderPage = (page: number | 'dots') => {
    if (page === 'dots') {
      return (
        <span key={Math.random()} className={styles.dots}>
          …
        </span>
      );
    }
    const isActive = page === currentPage;
    return (
      <Link
        key={page}
        href={getPageHref(page)}
        className={cn(styles.page, { [styles.active]: isActive })}
        aria-current={isActive ? 'page' : undefined}
      >
        {page}
      </Link>
    );
  };

  const disabled = currentPage === 1 || currentPage === totalPages;

  return (
    <nav className={styles.pagination} aria-label="Pagination">
      <Link
        href={getPageHref(currentPage - 1)}
        className={cn(styles.navBtn, { [styles.disabled]: disabled })}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
      >
        Prev
      </Link>

      {pages.map(renderPage)}
      <Link
        href={getPageHref(currentPage + 1)}
        className={cn(styles.navBtn, { [styles.disabled]: disabled })}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
      >
        Next
      </Link>
    </nav>
  );
}
