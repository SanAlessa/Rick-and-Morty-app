import { create } from 'zustand';

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
  episode: string[];
}

interface State {
  character1: Character | null;
  character2: Character | null;
  setCharacter1: (char: Character | null) => void;
  setCharacter2: (char: Character | null) => void;
}

export const useCharacterStore = create<State>((set) => ({
  character1: null,
  character2: null,
  setCharacter1: (char) => set({ character1: char }),
  setCharacter2: (char) => set({ character2: char }),
}));