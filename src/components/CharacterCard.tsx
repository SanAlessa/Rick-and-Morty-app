import Image from 'next/image';
import { useCharacterStore } from '../store/characterStore';
import { Character } from '@/types/character';

export function CharacterCard({
  character,
  selector,
}: {
  character: Character;
  selector: 1 | 2;
}) {
  const { setCharacter1, setCharacter2, character1, character2 } =
    useCharacterStore();

  const selected = selector === 1 ? character1 : character2;
  const setChar = selector === 1 ? setCharacter1 : setCharacter2;

  const toggleSelect = () => {
    if (selected?.id === character.id) {
      setChar(null);
    } else {
      setChar(character);
    }
  };

  return (
    <div
      onClick={toggleSelect}
      className={`p-2 border rounded cursor-pointer flex flex-col items-center justify-center`}
      style={{
        backgroundColor: selected?.id === character.id ? '#97ce4c' : undefined,
      }}
    >
      <Image
        src={character.image}
        alt={character.name}
        width={100}
        height={100}
      />
      <h3 className="font-bold">{character.name}</h3>
      <p>
        <span
          className={`text-sm ${
            character.status === 'Alive'
              ? 'text-green-800'
              : character.status === 'Dead'
              ? 'text-red-800'
              : 'text-gray-400'
          }`}
        >
          ● {character.status} - {character.species}
        </span>
      </p>
    </div>
  );
}
