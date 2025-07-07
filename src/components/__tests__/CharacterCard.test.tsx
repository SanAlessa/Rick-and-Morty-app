import { render, screen, fireEvent } from '@testing-library/react';
import { CharacterCard } from '../CharacterCard';
import { useCharacterStore } from '@/store/characterStore';

jest.mock('@/store/characterStore', () => ({
  useCharacterStore: jest.fn(),
}));

describe('CharacterCard', () => {
  const mockCharacter = {
    id: 1,
    name: 'Rick Sanchez',
    image: 'https://rick.com/image.jpg',
    status: 'Alive',
    species: 'Human',
  };

  const setCharacter1 = jest.fn();
  const setCharacter2 = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renderiza el nombre del personaje y su especie/status', () => {
    (useCharacterStore as unknown as jest.Mock).mockReturnValue({
      setCharacter1,
      setCharacter2,
      character1: null,
      character2: null,
    });

    render(<CharacterCard character={mockCharacter} selector={1} />);

    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText(/Alive - Human/i)).toBeInTheDocument();
  });

  it('llama a setCharacter1 al seleccionar personaje', () => {
    (useCharacterStore as unknown as jest.Mock).mockReturnValue({
      setCharacter1,
      setCharacter2,
      character1: null,
      character2: null,
    });

    render(<CharacterCard character={mockCharacter} selector={1} />);
    fireEvent.click(screen.getByText('Rick Sanchez'));
    expect(setCharacter1).toHaveBeenCalledWith(mockCharacter);
  });

  it('des-selecciona si el personaje ya estaba seleccionado', () => {
    (useCharacterStore as unknown as jest.Mock).mockReturnValue({
      setCharacter1,
      setCharacter2,
      character1: mockCharacter,
      character2: null,
    });

    render(<CharacterCard character={mockCharacter} selector={1} />);
    fireEvent.click(screen.getByText('Rick Sanchez'));
    expect(setCharacter1).toHaveBeenCalledWith(null);
  });
});
