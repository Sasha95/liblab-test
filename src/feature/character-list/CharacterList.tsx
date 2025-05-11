import Link from 'next/link';
import { Pagination } from '@/shared/ui/pagination/Pagination';
import { SearchWithNavigation } from '@/shared/ui/search/SearchWithNavigation';
import { CharacterType, PaginationResponse } from '@/shared/api/types';
import styles from './characterList.module.css';

export type Props = {
  characters: PaginationResponse<CharacterType>;
  search?: string;
};

const EmptyCharacterList = () => {
  return (
    <div data-testid="empty-character-list" className={styles.empty}>
      No characters found.
    </div>
  );
};

export async function CharacterList({ characters, search = '' }: Props) {
  if (!characters.docs.length && !search) {
    return <EmptyCharacterList />;
  }

  return (
    <>
      <SearchWithNavigation
        search={search}
        pageHref="/characters"
        placeholder="Search characters..."
        ariaLabel="Search characters"
      >
        {characters.docs.length > 0 ? (
          <>
            <div className={styles.stack}>
              {characters.docs.map((character) => (
                <Link
                  href={`/characters/${character._id}`}
                  key={character._id}
                  className={styles.card}
                  tabIndex={0}
                >
                  <span className={styles.characterName}>{character.name}</span>
                </Link>
              ))}
              <Pagination
                currentPage={characters.page}
                totalPages={characters.pages}
                getPageHref={(page) =>
                  `?page=${page}${search ? `&search=${encodeURIComponent(search)}` : ''}`
                }
              />
            </div>
          </>
        ) : (
          <EmptyCharacterList />
        )}
      </SearchWithNavigation>
    </>
  );
}
