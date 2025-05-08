import { getCharacter } from '@/entities/character/model/use-characters';
import { getMovie } from '@/entities/movie/model/use-movies';
import { getQuote } from '@/entities/quote/model/use-quotes';
import { Quote } from '@/entities/quote/ui/quote/Quote';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ quoteId: string }>;
};

const QuotePage = async ({ params }: Props) => {
  const { quoteId } = await params;
  const quote = await getQuote(quoteId);
  if (!quote) return notFound();
  const [movie, character] = await Promise.all([
    getMovie(quote.docs[0].movie),
    getCharacter(quote.docs[0].character),
  ]);

  return (
    <Quote
      quote={quote.docs[0]}
      movieName={movie.docs[0].name}
      characterName={character.docs[0].name}
    />
  );
};

export default QuotePage;
