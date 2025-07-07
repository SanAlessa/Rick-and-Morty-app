import { useCharacterStore } from '../store/characterStore';
import { useEffect, useState } from 'react';
import { Loader } from './Loader';

function getEpisodeId(url: string) {
  return url.split('/').pop();
}

export function EpisodeList() {
  const { character1, character2 } = useCharacterStore();
  const [loading, setLoading] = useState(false);

  const [episodes, setEpisodes] = useState<any>({
    only1: [],
    shared: [],
    only2: [],
  });

  useEffect(() => {
    if (!character1 || !character2) return;
    setLoading(true);
    const ep1 = new Set(character1.episode);
    const ep2 = new Set(character2.episode);

    const shared = [...ep1].filter((e) => ep2.has(e));
    const only1 = [...ep1].filter((e) => !ep2.has(e));
    const only2 = [...ep2].filter((e) => !ep1.has(e));

    const all = [...shared, ...only1, ...only2].map(getEpisodeId).join(',');

    fetch(`https://rickandmortyapi.com/api/episode/${all}`)
      .then((res) => res.json())
      .then((data) => {
        const episodesArr = Array.isArray(data) ? data : [data];
        setEpisodes({
          shared: episodesArr.filter((e) =>
            shared.includes(`https://rickandmortyapi.com/api/episode/${e.id}`)
          ),
          only1: episodesArr.filter((e) =>
            only1.includes(`https://rickandmortyapi.com/api/episode/${e.id}`)
          ),
          only2: episodesArr.filter((e) =>
            only2.includes(`https://rickandmortyapi.com/api/episode/${e.id}`)
          ),
        });
        setLoading(false);
        window.scrollTo({
          top: document.getElementById('episode-list')?.offsetTop || 0,
          behavior: 'smooth',
        });
      });
  }, [character1, character2]);

  if (!character1 || !character2) return null;
  if (loading) return <Loader />;

  return (
    <div className="grid grid-cols-3 gap-4 mt-8">
      {['only1', 'shared', 'only2'].map((key) => (
        <div key={key}>
          <h3 className="font-bold mb-2">
            {key === 'only1' && 'Character #1 - Only Episodes'}
            {key === 'shared' && 'Characters #1 & #2 - Shared Episodes'}
            {key === 'only2' && 'Character #2 - Only Episodes'}
          </h3>
          <ul className="text-sm">
            {episodes[key].map((ep: any) => (
              <li key={ep.id}>
                <strong>{ep.episode}</strong> - {ep.name}{' '}
                <em className="text-gray-500">({ep.air_date})</em>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
