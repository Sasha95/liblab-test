import { getCharacter } from '@/entities/character/model/use-characters';
import { Character } from '@/entities/character/ui/character/Character';
import { notFound } from 'next/navigation';
type Props = {
  params: Promise<{ characterId: string }>;
};

const CharacterPage = async ({ params }: Props) => {
  const { characterId } = await params;
  const character = await getCharacter(characterId);
  if (!character) return notFound();
  const characterData = character.docs[0];

  return <Character character={characterData} />;
};

export default CharacterPage;
