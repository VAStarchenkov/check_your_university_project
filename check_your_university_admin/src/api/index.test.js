import api from './index';

describe('API модуль', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('api.post не включает X-Auth-Token, если токена нет', async () => {
    const originalPost = api.post;

    api.post = jest.fn().mockImplementation((url, data, config) => {
      expect(config?.headers?.['X-Auth-Token']).toBeUndefined();
      return Promise.resolve({ data: 'ok' });
    });

    await api.post('/test', { test: true }, { headers: {} });

    api.post = originalPost;
  });  
});
