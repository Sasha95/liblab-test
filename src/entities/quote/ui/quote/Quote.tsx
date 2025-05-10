import { QuoteType } from '@/shared/api/types';
import { Card, Text, Title } from '@mantine/core';
import { CustomLink } from '@/shared/ui/custom-link/CustomLink';
import { BackButton } from '@/shared/ui/back-button/BackButton';
import styles from './quote.module.css';

type Props = {
  quote: QuoteType;
  movieName: string;
  characterName: string;
};

export const Quote = async ({ quote, movieName, characterName }: Props) => {
  return (
    <>
      <BackButton />
      <Card shadow="lg" padding="xl" radius="xl" withBorder className={styles.card}>
        <div className={styles.quoteMark} aria-hidden="true">
          “
        </div>
        <Title order={2} mb="sm" className={styles.title}>
          {quote.dialog}
        </Title>
        <Text className={styles.meta}>
          <b>Movie:</b> <CustomLink href={`/movies/${quote.movie}`}>{movieName}</CustomLink>
        </Text>
        <Text className={styles.meta}>
          <b>Character:</b>{' '}
          <CustomLink href={`/characters/${quote.character}`}>{characterName}</CustomLink>
        </Text>
      </Card>
    </>
  );
};
