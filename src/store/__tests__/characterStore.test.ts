import { act } from 'react-dom/test-utils';
import { useCharacterStore } from '../characterStore';

describe('useCharacterStore', () => {
  const exampleCharacter = {
    id: 42,
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    image: 'https://rick.com/image.jpg',
    episode: ['https://rickandmortyapi.com/api/episode/1'],
  };

  beforeEach(() => {
    // Resetear el estado del store antes de cada test
    useCharacterStore.setState({
      character1: null,
      character2: null,
      setCharacter1: useCharacterStore.getState().setCharacter1,
      setCharacter2: useCharacterStore.getState().setCharacter2,
    });
  });

  it('debe inicializar con null en character1 y character2', () => {
    const state = useCharacterStore.getState();
    expect(state.character1).toBeNull();
    expect(state.character2).toBeNull();
  });

  it('debe setear correctamente character1', () => {
    act(() => {
      useCharacterStore.getState().setCharacter1(exampleCharacter);
    });
    expect(useCharacterStore.getState().character1).toEqual(exampleCharacter);
  });

  it('debe setear correctamente character2', () => {
    act(() => {
      useCharacterStore.getState().setCharacter2(exampleCharacter);
    });
    expect(useCharacterStore.getState().character2).toEqual(exampleCharacter);
  });

  it('debe limpiar ambos personajes al setear null', () => {
    act(() => {
      useCharacterStore.getState().setCharacter1(exampleCharacter);
      useCharacterStore.getState().setCharacter2(exampleCharacter);
    });

    expect(useCharacterStore.getState().character1).not.toBeNull();
    expect(useCharacterStore.getState().character2).not.toBeNull();

    act(() => {
      useCharacterStore.getState().setCharacter1(null);
      useCharacterStore.getState().setCharacter2(null);
    });

    expect(useCharacterStore.getState().character1).toBeNull();
    expect(useCharacterStore.getState().character2).toBeNull();
  });
});
