import { render, screen } from '@testing-library/react';
import { CharacterGrid } from '../CharacterGrid';
import { useCharacters } from '@/hooks/useCharacters';

jest.mock('@/hooks/useCharacters');
jest.mock('@/store/characterStore', () => ({
  useCharacterStore: () => ({
    setCharacter1: jest.fn(),
    setCharacter2: jest.fn(),
    character1: null,
    character2: null,
  }),
}));

describe('CharacterGrid', () => {
  const mockUseCharacters = useCharacters as jest.Mock;

  it('muestra el Loader cuando está cargando', () => {
    mockUseCharacters.mockReturnValue({
      data: null,
      loading: true,
    });

    render(<CharacterGrid selector={1} />);

    expect(screen.getByAltText(/loading/i)).toBeInTheDocument();
  });

  it('muestra las tarjetas de personajes y la paginación', () => {
    const mockData = {
      info: { pages: 2 },
      results: [
        {
          id: 1,
          name: 'Rick Sanchez',
          image: 'https://rick.com/image.jpg',
          status: 'Alive',
          species: 'Human',
        },
        {
          id: 2,
          name: 'Morty Smith',
          image: 'https://morty.com/image.jpg',
          status: 'Alive',
          species: 'Human',
        },
      ],
    };

    mockUseCharacters.mockReturnValue({
      data: mockData,
      loading: false,
    });

    render(<CharacterGrid selector={1} />);

    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Morty Smith')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument(); // Página actual
  });
});
