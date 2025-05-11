import { render, screen } from '@testing-library/react';
import { MovieList } from './MovieList';
import type { MovieType, PaginationResponse } from '@/shared/api/types';
import type { ReactNode, AnchorHTMLAttributes } from 'react';

// Mock next/link to render a simple anchor
describe('MovieList', () => {
  jest.mock('next/link', () => ({
    __esModule: true,
    default: ({
      children,
      ...props
    }: { children: ReactNode } & AnchorHTMLAttributes<HTMLAnchorElement>) => (
      <a {...props}>{children}</a>
    ),
  }));

  const makeMovies = (count: number): MovieType[] =>
    Array.from({ length: count }, (_, i) => ({
      _id: `id-${i}`,
      name: `Movie ${i}`,
      runtimeInMinutes: 120,
      budgetInMillions: 100,
      boxOfficeRevenueInMillions: 500,
      academyAwardNominations: 10,
      academyAwardWins: 5,
      rottenTomatoesScore: 95,
    }));

  const basePagination: PaginationResponse<MovieType> = {
    docs: [],
    total: 0,
    offset: 0,
    limit: 10,
    page: 1,
    pages: 1,
  };

  it('renders empty state when no movies', async () => {
    render(MovieList({ movies: basePagination }));
    expect(screen.getByTestId('empty-movie-list')).toBeInTheDocument();
  });

  it('renders a list of movies', async () => {
    const movies = makeMovies(3);
    const pagination = { ...basePagination, docs: movies, total: 3, pages: 1 };
    render(MovieList({ movies: pagination }));
    movies.forEach((movie) => {
      expect(screen.getByText(movie.name)).toBeInTheDocument();
    });
  });

  it('renders pagination when multiple pages', async () => {
    const movies = makeMovies(2);
    const pagination = { ...basePagination, docs: movies, total: 2, pages: 3 };
    render(MovieList({ movies: pagination }));
    expect(screen.getByTestId('pagination')).toBeInTheDocument();
  });
});
