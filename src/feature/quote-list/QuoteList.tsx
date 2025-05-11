import Link from 'next/link';
import { SearchWithNavigation } from '@/shared/ui/search/SearchWithNavigation';
import { PaginationResponse, QuoteType } from '@/shared/api/types';
import { Card, Group, Text } from '@mantine/core';
import styles from './quoteList.module.css';
import { Pagination } from '@/shared/ui/pagination/Pagination';

export type Props = {
  quotePageHref: string;
  search?: string;
  quotes: PaginationResponse<QuoteType>;
  showSearch?: boolean;
};

const EmptyQuoteList = () => {
  return (
    <Text mb={'lg'} c="dimmed" data-testid="empty-quote-list">
      No quotes found.
    </Text>
  );
};

export const QuoteList = ({ quotePageHref, search = '', quotes, showSearch = false }: Props) => {
  if (!quotes.docs.length && !search) {
    return <EmptyQuoteList />;
  }

  return (
    <SearchWithNavigation
      search={search}
      pageHref={quotePageHref}
      ariaLabel="Search quotes"
      showSearch={showSearch}
    >
      {quotes.docs.length > 0 ? (
        <>
          <Group gap="md">
            {quotes.docs.map((quote) => (
              <Link href={`/quotes/${quote._id}`} key={quote._id} className={styles.quoteLink}>
                <Card shadow="sm" padding="xs" radius="md" withBorder className={styles.quoteCard}>
                  <Text>{quote.dialog}</Text>
                </Card>
              </Link>
            ))}
          </Group>
          <Pagination
            currentPage={quotes.page}
            totalPages={quotes.pages}
            getPageHref={(page) =>
              `${quotePageHref}?page=${page}${search ? `&search=${encodeURIComponent(search)}` : ''}`
            }
            data-testid="pagination"
          />
        </>
      ) : (
        <EmptyQuoteList />
      )}
    </SearchWithNavigation>
  );
};
