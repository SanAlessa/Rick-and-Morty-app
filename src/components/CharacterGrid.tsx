import { useState } from 'react';
import { CharacterCard } from './CharacterCard';
import { useCharacters } from '../hooks/useCharacters';
import { Loader } from './Loader';
import { Pagination } from './Pagination';
import { Character } from '@/types/character';

export function CharacterGrid({ selector }: { selector: 1 | 2 }) {
  const [page, setPage] = useState(1);
  const { data, loading } = useCharacters(page);

  if (loading || !data) return <Loader />;

  return (
    <div>
      <div className="grid grid-cols-2 gap-2 mb-4">
        {data.results.map((char: Character) => (
          <CharacterCard key={char.id} character={char} selector={selector} />
        ))}
      </div>
      
      <Pagination
        currentPage={page}
        totalPages={data.info.pages}
        onPageChange={setPage}
      />
    </div>
  );
}
