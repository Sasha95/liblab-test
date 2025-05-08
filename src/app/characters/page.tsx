import { getCharacters } from '@/entities/character/model/use-characters';
import { CharacterList } from '@/feature/character-list/CharacterList';

type Props = {
  searchParams: Promise<{ page?: string; limit?: string; search?: string }>;
};

export default async function CharacterPage({ searchParams }: Props) {
  const { page, limit, search } = await searchParams;
  const characters = await getCharacters({
    page: page ? parseInt(page) : undefined,
    limit: limit ? parseInt(limit) : undefined,
    name: search ? `/${search}/i` : undefined,
  });

  return <CharacterList characters={characters} search={search} />;
}
