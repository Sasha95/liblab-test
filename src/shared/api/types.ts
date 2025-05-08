export type MovieType = {
  _id: string;
  name: string;
  runtimeInMinutes: number;
  budgetInMillions: number;
  boxOfficeRevenueInMillions: number;
  academyAwardNominations: number;
  academyAwardWins: number;
  rottenTomatoesScore: number;
};

export type CharacterType = {
  _id: string;
  name: string;
  race?: string;
  gender?: string;
  realm?: string;
  birth?: string;
  death?: string;
  spouse?: string;
  wikiUrl?: string;
};

export type QuoteType = {
  _id: string;
  dialog: string;
  movie: string;
  character: string;
};

export type PaginationResponse<T> = {
  docs: T[];
  total: number;
  offset: number;
  limit: number;
  page: number;
  pages: number;
};

export type PaginationParams = { page?: number; limit?: number };
