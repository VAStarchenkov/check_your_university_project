export function attachTokenToRequest(config) {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers['X-Auth-Token'] = token;
    }
    return config;
  }
  