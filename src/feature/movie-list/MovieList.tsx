import Link from 'next/link';
import styles from './movieList.module.css';
import { Pagination } from '@/shared/ui/pagination/Pagination';
import { formatNumber } from '@/shared/utils/formatNumber';
import { MovieType, PaginationResponse } from '@/shared/api/types';

export type Props = {
  movies: PaginationResponse<MovieType>;
};

export const MovieList = ({ movies }: Props) => {
  if (!movies.docs.length)
    return (
      <div className={styles.empty} data-testid="empty-movie-list">
        No movies found.
      </div>
    );

  return (
    <div>
      <ul className={styles.list}>
        {movies.docs.map((movie) => (
          <li key={movie._id} className={styles.item}>
            <Link href={`/movies/${movie._id}`} className={styles.card}>
              <div className={styles.cardContent}>
                <h2>{movie.name}</h2>
                <div className={styles.meta}>
                  {movie.runtimeInMinutes && <span>Duration: {movie.runtimeInMinutes} min</span>}
                  {movie.budgetInMillions && (
                    <span>Budget: ${formatNumber(movie.budgetInMillions)}</span>
                  )}
                  {movie.boxOfficeRevenueInMillions && (
                    <span>
                      Box Office Revenue: ${formatNumber(movie.boxOfficeRevenueInMillions)}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <Pagination
        currentPage={movies.page}
        totalPages={movies.pages}
        getPageHref={(page) => `?page=${page}`}
        data-testid="pagination"
      />
    </div>
  );
};
