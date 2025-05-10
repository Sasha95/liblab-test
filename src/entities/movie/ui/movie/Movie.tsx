import { MovieType } from '@/shared/api/types';
import styles from './movie.module.css';
import { formatNumber } from '@/shared/utils/formatNumber';
import { BackButton } from '@/shared/ui/back-button/BackButton';
type Props = {
  movie: MovieType;
};

export const Movie = ({ movie }: Props) => {
  const {
    runtimeInMinutes,
    budgetInMillions,
    boxOfficeRevenueInMillions,
    rottenTomatoesScore,
    academyAwardNominations,
    academyAwardWins,
  } = movie;

  return (
    <>
      <BackButton />
      <div className={styles.movie}>
        <h1 className={styles.movieTitle}>{movie.name}</h1>
        <div className={styles.movieInfo}>
          <span className={styles.movieInfoItem}>Duration: {runtimeInMinutes} minutes </span>
          <span className={styles.movieInfoItem}>Budget: {formatNumber(budgetInMillions)} </span>
          <span className={styles.movieInfoItem}>
            Box Office Revenue: {formatNumber(boxOfficeRevenueInMillions)}{' '}
          </span>
          <span className={styles.movieInfoItem}>
            Rotten Tomatoes Score: {rottenTomatoesScore}%
          </span>
          <span className={styles.movieInfoItem}>
            Academy Award Nominations: {academyAwardNominations}
          </span>
          <span className={styles.movieInfoItem}>Academy Award Wins: {academyAwardWins}</span>
        </div>
      </div>
    </>
  );
};
