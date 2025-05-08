import Link from 'next/link';
import { getMovies } from '../../entities/movie/model/use-movies';
import styles from './movieList.module.css';
import { Pagination } from '@/shared/ui/pagination/Pagination';
import { formatNumber } from '@/shared/utils/formatNumber';

export type Props = { page?: number; limit?: number };

export async function MovieList({ page = 1, limit = 10 }: Props) {
  const movies = await getMovies({ page, limit });

  if (!movies.docs.length) return <div className={styles.empty}>No movies found.</div>;

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
      />
    </div>
  );
}
