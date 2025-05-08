'use server';

const API_BASE_URL = process.env.API_BASE_URL;
const API_TOKEN = process.env.API_TOKEN;

type FetcherParams = {
  endpoint: string;
  params?: Record<string, string>;
  options?: RequestInit;
};

export const fetcher = async <T>({ endpoint, params, options }: FetcherParams): Promise<T> => {
  const url = new URL(`${API_BASE_URL}${endpoint}`);
  Object.entries(params || {}).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });

  const res = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${API_TOKEN}` },
    ...options,
    next: {
      revalidate: 60 * 60 * 24,
      ...options?.next,
    },
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  const data = await res.json();
  return data as T;
};
