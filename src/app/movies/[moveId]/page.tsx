import { getMovie, getMovieQuotes } from '@/entities/movie/model/use-movies';
import { Movie } from '@/entities/movie/ui/movie/Movie';
import { QuoteList } from '@/feature/quote-list/QuoteList';
import styles from './page.module.css';
import { Suspense } from 'react';
import { Spinner } from '@/shared/ui/spinner/Spinner';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ moveId: string }>;
  searchParams: Promise<{ page?: string; limit?: string; search?: string }>;
};

const MoviePage = async ({ params, searchParams }: Props) => {
  const { moveId } = await params;
  const { page, limit, search } = await searchParams;
  const movie = await getMovie(moveId);

  if (!movie) {
    notFound();
  }

  const movieData = movie.docs[0];
  const quotes = await getMovieQuotes(moveId, {
    page: page ? parseInt(page) : 1,
    limit: limit ? parseInt(limit) : 10,
    dialog: search ? `/${search}/i` : undefined,
  });

  return (
    <div>
      <Movie movie={movieData} />
      <h2 className={styles.title}>Quotes</h2>
      <div className={styles.quotes}>
        <Suspense fallback={<Spinner />}>
          <QuoteList quotePageHref={`/movies/${moveId}`} search={search} quotes={quotes} />
        </Suspense>
      </div>
    </div>
  );
};
export default MoviePage;
