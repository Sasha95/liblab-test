'use server';
import { CharacterType, PaginationParams, PaginationResponse } from '@/shared/api/types';
import { fetcher } from '@/shared/api/the-one-api';

export const getCharacters = async (params?: PaginationParams & { name?: string }) => {
  const characters = await fetcher<PaginationResponse<CharacterType>>({
    endpoint: '/character',
    params: {
      page: params?.page?.toString() || '1',
      limit: params?.limit?.toString() || '10',
      name: params?.name || '',
    },
  });
  return characters;
};

export const getCharacter = async (id: string) => {
  return await fetcher<PaginationResponse<CharacterType>>({
    endpoint: `/character/${id}`,
  });
};
