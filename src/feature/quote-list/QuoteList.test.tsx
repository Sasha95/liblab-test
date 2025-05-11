import { render, screen } from '../../shared/utils/test-utils';
import { QuoteList } from './QuoteList';
import type { QuoteType, PaginationResponse } from '@/shared/api/types';
import type { ReactNode, AnchorHTMLAttributes } from 'react';

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({
    children,
    ...props
  }: { children: ReactNode } & AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a {...props}>{children}</a>
  ),
}));

// Mock next/navigation's useRouter
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

describe('QuoteList', () => {
  const makeQuotes = (count: number): QuoteType[] =>
    Array.from({ length: count }, (_, i) => ({
      _id: `id-${i}`,
      dialog: `Quote dialog ${i}`,
      movie: `movie-${i}`,
      character: `character-${i}`,
    }));

  const basePagination: PaginationResponse<QuoteType> = {
    docs: [],
    total: 0,
    offset: 0,
    limit: 10,
    page: 1,
    pages: 1,
  };

  it('renders empty state when no quotes and no search', () => {
    render(<QuoteList quotePageHref="/quotes" quotes={basePagination} />);
    expect(screen.getByTestId('empty-quote-list')).toBeInTheDocument();
  });

  it('renders a list of quotes', () => {
    const quotes = makeQuotes(3);
    const pagination = { ...basePagination, docs: quotes, total: 3, pages: 1 };
    render(<QuoteList quotePageHref="/quotes" quotes={pagination} />);
    quotes.forEach((quote) => {
      expect(screen.getByText(quote.dialog)).toBeInTheDocument();
    });
  });

  it('renders pagination when multiple pages', () => {
    const quotes = makeQuotes(2);
    const pagination = { ...basePagination, docs: quotes, total: 2, pages: 3 };
    render(<QuoteList quotePageHref="/quotes" quotes={pagination} />);
    expect(screen.getByTestId('pagination')).toBeInTheDocument();
  });
});
