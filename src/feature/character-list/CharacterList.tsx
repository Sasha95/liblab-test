import Link from 'next/link';
import styles from './characterList.module.css';
import { Pagination } from '@/shared/ui/pagination/Pagination';
import { SearchWithNavigation } from '@/shared/ui/search/SearchWithNavigation';
import { CharacterType, PaginationResponse } from '@/shared/api/types';

export type Props = {
  characters: PaginationResponse<CharacterType>;
  search?: string;
};

export async function CharacterList({ characters, search = '' }: Props) {
  if (!characters.docs.length && !search) {
    return <div className={styles.empty}>No characters found.</div>;
  }

  return (
    <div>
      <SearchWithNavigation
        search={search}
        pageHref="/characters"
        placeholder="Search characters..."
        ariaLabel="Search characters"
      />
      {characters.docs.length > 0 ? (
        <>
          <ul className={styles.list}>
            {characters.docs.map((character) => (
              <Link href={`/characters/${character._id}`} key={character._id}>
                <li className={styles.item}>{character.name}</li>
              </Link>
            ))}
          </ul>
          <Pagination
            currentPage={characters.page}
            totalPages={characters.pages}
            getPageHref={(page) =>
              `?page=${page}${search ? `&search=${encodeURIComponent(search)}` : ''}`
            }
          />
        </>
      ) : (
        <div className={styles.empty}>No characters found.</div>
      )}
    </div>
  );
}
