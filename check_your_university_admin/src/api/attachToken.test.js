import { attachTokenToRequest } from './attachToken';

describe('attachTokenToRequest', () => {
  afterEach(() => localStorage.clear());

  test('добавляет X-Auth-Token, если токен есть', () => {
    localStorage.setItem('access_token', 'abc123');
    const config = { headers: {} };

    const updated = attachTokenToRequest(config);

    expect(updated.headers['X-Auth-Token']).toBe('abc123');
  });

  test('не добавляет X-Auth-Token, если токена нет', () => {
    const config = { headers: {} };

    const updated = attachTokenToRequest(config);

    expect(updated.headers['X-Auth-Token']).toBeUndefined();
  });
});
