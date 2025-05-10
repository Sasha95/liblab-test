import { MovieList } from '@/feature/movie-list/MovieList';
import { getMovies } from '@/entities/movie/model/use-movies';

type Props = {
  searchParams: Promise<{ page?: string; limit?: string }>;
};

export default async function MoviePage({ searchParams }: Props) {
  const { page, limit } = await searchParams;
  const pageNumber = page ? parseInt(page) : undefined;
  const limitNumber = limit ? parseInt(limit) : undefined;

  const movies = await getMovies({ page: pageNumber, limit: limitNumber });

  return <MovieList movies={movies} />;
}
