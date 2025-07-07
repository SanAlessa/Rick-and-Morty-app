import { renderHook } from '@testing-library/react';
import { useCharacters } from '../useCharacters';
import { api } from '@/lib/api';
import { act } from 'react';

jest.mock('@/lib/api');

describe('useCharacters', () => {
  const mockedApi = api as jest.Mocked<typeof api>;

  it('debe cargar los datos de personajes y cambiar el estado', async () => {
    const fakeResponse = {
      data: {
        info: { count: 2, pages: 1 },
        results: [
          { id: 1, name: 'Rick', status: 'Alive', image: '', species: 'Human', episode: [] },
          { id: 2, name: 'Morty', status: 'Alive', image: '', species: 'Human', episode: [] },
        ],
      },
    };

    mockedApi.get.mockResolvedValue(fakeResponse);

    const { result } = renderHook(() => useCharacters(1));

    // Loading debe ser true al inicio
    expect(result.current.loading).toBe(true);

    // Esperar a que se resuelva el fetch
    await act(async () => {
      await Promise.resolve(); // Espera el .then
    });

    expect(mockedApi.get).toHaveBeenCalledWith('/character?page=1');
    expect(result.current.data).toEqual(fakeResponse.data);
    expect(result.current.loading).toBe(false);
  });
});
