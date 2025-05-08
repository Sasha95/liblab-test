import { CharacterType } from '@/shared/api/types';
import styles from './character.module.css';
import Link from 'next/link';

type Props = {
  character: CharacterType;
};

export const Character = ({ character }: Props) => {
  const { name, race, gender, wikiUrl, spouse } = character;
  return (
    <div className={styles.character}>
      <h1>{name}</h1>
      {race && <p>Race: {race}</p>}
      {gender && <p>Gender: {gender}</p>}
      {spouse && <p>Spouse: {spouse}</p>}
      {wikiUrl && (
        <Link href={wikiUrl} target="_blank" rel="noopener noreferrer" className={styles.link}>
          Wiki
        </Link>
      )}
    </div>
  );
};
