'use server';

import { MovieType, PaginationParams, QuoteType, PaginationResponse } from '@/shared/api/types';
import { fetcher } from '@/shared/api/the-one-api';

export const getMovies = async (params?: PaginationParams) => {
  const movies = await fetcher<PaginationResponse<MovieType>>({
    endpoint: '/movie',
    params: {
      page: params?.page?.toString() || '1',
      limit: params?.limit?.toString() || '10',
    },
  });
  return movies;
};

export const getMovie = async (id: string) => {
  const movie = await fetcher<PaginationResponse<MovieType>>({
    endpoint: `/movie/${id}`,
  });
  return movie;
};

export const getMovieQuotes = async (
  id: string,
  params?: PaginationParams & { dialog?: string },
) => {
  const quotes = await fetcher<PaginationResponse<QuoteType>>({
    endpoint: `/movie/${id}/quote`,
    params: {
      page: params?.page?.toString() || '1',
      limit: params?.limit?.toString() || '10',
      dialog: params?.dialog || '',
    },
  });
  return quotes;
};
