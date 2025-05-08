import { getQuotes } from '@/entities/quote/model/use-quotes';
import { QuoteList } from '@/feature/quote-list/QuoteList';

type Props = {
  searchParams: Promise<{ page?: string; limit?: string; search?: string }>;
};

export default async function QuotesPage({ searchParams }: Props) {
  const { page, limit, search } = await searchParams;
  const quotes = await getQuotes({
    page: page ? parseInt(page) : undefined,
    limit: limit ? parseInt(limit) : undefined,
    dialog: search ? `/${search}/i` : undefined,
  });

  return <QuoteList quotePageHref={`/quotes`} search={search} quotes={quotes} showSearch />;
}
