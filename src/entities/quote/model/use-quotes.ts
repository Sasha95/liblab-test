'use server';

import { PaginationParams, QuoteType, PaginationResponse } from '@/shared/api/types';
import { fetcher } from '@/shared/api/the-one-api';

export const getQuotes = async (params?: PaginationParams & { dialog?: string }) => {
  const quotes = await fetcher<PaginationResponse<QuoteType>>({
    endpoint: '/quote',
    params: {
      page: params?.page?.toString() || '1',
      limit: params?.limit?.toString() || '10',
      dialog: params?.dialog || '',
    },
  });
  return quotes;
};

export const getQuote = async (id: string) => {
  const quote = await fetcher<PaginationResponse<QuoteType>>({
    endpoint: `/quote/${id}`,
  });
  return quote;
};
