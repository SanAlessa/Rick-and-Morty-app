import { api } from '../api';

describe('api', () => {
  it('debería tener baseURL configurada correctamente', () => {
    expect(api.defaults.baseURL).toBe('https://rickandmortyapi.com/api');
  });

  it('debería ser una instancia de axios', () => {
    expect(typeof api.get).toBe('function');
    expect(typeof api.post).toBe('function');
  });
});
