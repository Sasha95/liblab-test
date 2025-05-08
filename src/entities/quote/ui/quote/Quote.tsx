import { QuoteType } from '@/shared/api/types';
import styles from './quote.module.css';
import Link from 'next/link';

type Props = {
  quote: QuoteType;
  movieName: string;
  characterName: string;
};

export const Quote = async ({ quote, movieName, characterName }: Props) => {
  return (
    <div className={styles.quote}>
      <div className={styles.movie}>
        <div className={styles.info}>
          <p>Movie:</p>
          <Link href={`/movies/${quote.movie}`}>{movieName}</Link>
        </div>
        <div className={styles.info}>
          <p>Character:</p>
          <Link href={`/characters/${quote.character}`}>{characterName}</Link>
        </div>
      </div>
      <div className={styles.dialog}>{quote.dialog}</div>
    </div>
  );
};
