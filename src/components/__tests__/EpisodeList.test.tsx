import { render, screen, waitFor } from '@testing-library/react';
import { EpisodeList } from '../EpisodeList';

jest.mock('@/store/characterStore', () => ({
  useCharacterStore: jest.fn(),
}));

const mockUseCharacterStore = require('@/store/characterStore')
  .useCharacterStore as jest.Mock;

describe('EpisodeList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('no renderiza nada si no hay personajes seleccionados', () => {
    mockUseCharacterStore.mockReturnValue({ character1: null, character2: null });

    const { container } = render(<EpisodeList />);
    expect(container.firstChild).toBeNull();
  });

  it('muestra el loader cuando está cargando', async () => {
    const character1 = {
      episode: [
        'https://rickandmortyapi.com/api/episode/1',
        'https://rickandmortyapi.com/api/episode/2',
      ],
    };
    const character2 = {
      episode: [
        'https://rickandmortyapi.com/api/episode/2',
        'https://rickandmortyapi.com/api/episode/3',
      ],
    };

    mockUseCharacterStore.mockReturnValue({ character1, character2 });

    global.fetch = jest.fn().mockResolvedValue({
      json: () =>
        Promise.resolve([
          { id: 1, episode: 'S01E01', name: 'Pilot', air_date: 'Dec 2, 2013' },
          { id: 2, episode: 'S01E02', name: 'Lawnmower Dog', air_date: 'Dec 9, 2013' },
          { id: 3, episode: 'S01E03', name: 'Anatomy Park', air_date: 'Dec 16, 2013' },
        ]),
    });

    render(<EpisodeList />);
    expect(screen.getByAltText(/loading/i)).toBeInTheDocument();

    // Espera hasta que desaparezca el loader
    await waitFor(() => {
      expect(screen.queryByAltText(/loading/i)).not.toBeInTheDocument();
    });

    // Comprueba que los títulos de sección aparezcan
    expect(screen.getByText(/Character #1 - Only Episodes/i)).toBeInTheDocument();
    expect(screen.getByText(/Characters #1 & #2 - Shared Episodes/i)).toBeInTheDocument();
    expect(screen.getByText(/Character #2 - Only Episodes/i)).toBeInTheDocument();
  });
});
