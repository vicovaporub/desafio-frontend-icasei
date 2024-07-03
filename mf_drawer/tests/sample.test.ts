import { fetchFavorites } from '../src/index';

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([1, 2, 3]),
  })
) as jest.Mock;


describe('fetchFavorites function', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  it('should fetch favorites and return the number of favorited videos', async () => {
    const count = await fetchFavorites();
    expect(count).toEqual(3);
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it('should return 0 on fetch failure', async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() => Promise.resolve({ ok: false }));
    const count = await fetchFavorites();
    expect(count).toEqual(0);
  });
});



