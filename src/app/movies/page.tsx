import { MovieList } from '@/feature/movie-list/MovieList';

type Props = {
  searchParams: Promise<{ page?: string; limit?: string }>;
};

export default async function MoviePage({ searchParams }: Props) {
  const { page, limit } = await searchParams;

  return (
    <MovieList
      page={page ? parseInt(page) : undefined}
      limit={limit ? parseInt(limit) : undefined}
    />
  );
}
