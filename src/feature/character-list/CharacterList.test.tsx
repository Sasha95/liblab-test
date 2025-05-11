import { render, screen } from '@testing-library/react';
import { CharacterList } from './CharacterList';
import type { CharacterType, PaginationResponse } from '@/shared/api/types';
import type { ReactNode, AnchorHTMLAttributes } from 'react';

// Mock next/link to render a simple anchor
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({
    children,
    ...props
  }: { children: ReactNode } & AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a {...props}>{children}</a>
  ),
}));

// Mock next/navigation's useRouter
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

const makeCharacters = (count: number): CharacterType[] =>
  Array.from({ length: count }, (_, i) => ({
    _id: `id-${i}`,
    name: `Character ${i}`,
  }));

const basePagination: PaginationResponse<CharacterType> = {
  docs: [],
  total: 0,
  offset: 0,
  limit: 10,
  page: 1,
  pages: 1,
};

describe('CharacterList', () => {
  it('renders empty state when no characters and no search', async () => {
    render(await CharacterList({ characters: basePagination }));
    expect(screen.getByTestId('empty-character-list')).toBeInTheDocument();
  });

  it('renders empty state when no characters but search is present', async () => {
    render(await CharacterList({ characters: basePagination, search: 'Frodo' }));
    expect(screen.getByTestId('empty-character-list')).toBeInTheDocument();
  });

  it('renders a list of characters', async () => {
    const characters = makeCharacters(3);
    const pagination = { ...basePagination, docs: characters, total: 3, pages: 1 };
    render(await CharacterList({ characters: pagination }));
    characters.forEach((char) => {
      expect(screen.getByText(char.name)).toBeInTheDocument();
    });
  });

  it('renders pagination when multiple pages', async () => {
    const characters = makeCharacters(2);
    const pagination = { ...basePagination, docs: characters, total: 2, pages: 3 };
    render(await CharacterList({ characters: pagination }));
    expect(screen.getByTestId('pagination')).toBeInTheDocument();
  });
});
