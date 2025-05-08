import styles from './quoteList.module.css';
import { Pagination } from '@/shared/ui/pagination/Pagination';
import Link from 'next/link';
import { SearchWithNavigation } from '@/shared/ui/search/SearchWithNavigation';
import { PaginationResponse, QuoteType } from '@/shared/api/types';

export type Props = {
  quotePageHref: string;
  search?: string;
  quotes: PaginationResponse<QuoteType>;
  showSearch?: boolean;
};

export async function QuoteList({ quotePageHref, search = '', quotes, showSearch = false }: Props) {
  if (!quotes.docs.length && !search) {
    return <div className={styles.empty}>No quotes found.</div>;
  }
  return (
    <div>
      {showSearch && (
        <SearchWithNavigation
          search={search}
          pageHref={quotePageHref}
          placeholder="Search quotes..."
          ariaLabel="Search quotes"
        />
      )}
      {quotes.docs.length > 0 ? (
        <>
          <ul className={styles.list}>
            {quotes.docs.map((quote) => (
              <li key={quote._id} className={styles.item}>
                <Link href={`/quotes/${quote._id}`}>{quote.dialog}</Link>
              </li>
            ))}
          </ul>
          <Pagination
            currentPage={quotes.page}
            totalPages={quotes.pages}
            getPageHref={(page) =>
              `${quotePageHref}?page=${page}${search ? `&search=${encodeURIComponent(search)}` : ''}`
            }
          />
        </>
      ) : (
        <div className={styles.empty}>No quotes found.</div>
      )}
    </div>
  );
}
