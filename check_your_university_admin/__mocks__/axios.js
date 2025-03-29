const axiosMock = {
    create: () => ({
      interceptors: {
        request: { use: jest.fn() }
      },
      post: jest.fn(),
      get: jest.fn()
    })
};
  
export default axiosMock;