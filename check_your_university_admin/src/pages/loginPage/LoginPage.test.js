import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  MemoryRouter: ({ children }) => <div>{children}</div>,
}));

jest.mock('../../api', () => ({
  post: jest.fn(),
}));

import LoginPage from './LoginPage';
import api from '../../api';

beforeEach(() => {
  jest.clearAllMocks();
});

test('рендерится заголовок авторизации', () => {
  render(<LoginPage />);
  const heading = screen.getByText(/Авторизация администратора/i);
  expect(heading).toBeInTheDocument();
});

test('поля логин и пароль можно заполнять', async () => {
  render(<LoginPage />);
  const emailInput = screen.getByLabelText(/Логин/i);
  const passwordInput = screen.getByLabelText(/Пароль/i);

  await userEvent.type(emailInput, 'admin@example.com');
  await userEvent.type(passwordInput, '123456');

  expect(emailInput).toHaveValue('admin@example.com');
  expect(passwordInput).toHaveValue('123456');
});

test('показывается сообщение об ошибке при неправильном логине', async () => {
  api.post.mockRejectedValueOnce(new Error('Ошибка авторизации'));

  render(<LoginPage />);
  const emailInput = screen.getByLabelText(/Логин/i);
  const passwordInput = screen.getByLabelText(/Пароль/i);
  const submitButton = screen.getByRole('button', { name: /Войти/i });

  await userEvent.type(emailInput, 'wrong@example.com');
  await userEvent.type(passwordInput, 'wrongpass');
  await userEvent.click(submitButton);

  const errorMessage = await screen.findByText(/Неверный логин или пароль/i);
  expect(errorMessage).toBeInTheDocument();
});

test('успешная авторизация вызывает переход на /requests', async () => {
  api.post.mockResolvedValueOnce({
    data: {
      access_token: 'fake_access_token',
      refresh_token: 'fake_refresh_token',
    },
  });

  render(<LoginPage />);
  const emailInput = screen.getByLabelText(/Логин/i);
  const passwordInput = screen.getByLabelText(/Пароль/i);
  const submitButton = screen.getByRole('button', { name: /Войти/i });

  await userEvent.type(emailInput, 'admin@example.com');
  await userEvent.type(passwordInput, '123456');
  await userEvent.click(submitButton);

  await waitFor(() => {
    expect(mockNavigate).toHaveBeenCalledWith('/requests');
  });
});
