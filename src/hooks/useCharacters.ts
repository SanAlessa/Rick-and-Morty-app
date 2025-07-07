import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import { CharacterApiResponse } from '@/types/character';

export function useCharacters(page = 1) {
  const [data, setData] = useState<CharacterApiResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.get(`/character?page=${page}`)
      .then((res) => setData(res.data))
      .finally(() => setLoading(false));
  }, [page]);

  return { data, loading };
}