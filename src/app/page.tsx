'use client';
import { useCharacterStore } from '@/store/characterStore';
import { CharacterGrid } from '../components/CharacterGrid';
import { EpisodeList } from '../components/EpisodeList';

export default function HomePage() {
  const { setCharacter1, setCharacter2 } = useCharacterStore();
  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-8">
        Rick & Morty Episode Explorer
      </h1>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div>
          <h2 className="font-semibold mb-2 text-center">Character #1</h2>
          <CharacterGrid selector={1} />
        </div>
        <div>
          <h2 className="font-semibold mb-2 text-center">Character #2</h2>
          <CharacterGrid selector={2} />
        </div>
      </div>
      <div className="flex justify-center mb-4">
        <button
          onClick={() => {
            setCharacter1(null);
            setCharacter2(null);
          }}
          className="px-4 py-2 rounded hover:brightness-105 cursor-pointer"
          style={{ backgroundColor: '#97ce4c', color: 'white'}}
        >
          Limpiar selecciones
        </button>
      </div>
      <div id="episode-list">
        <EpisodeList />
      </div>
    </main>
  );
}
