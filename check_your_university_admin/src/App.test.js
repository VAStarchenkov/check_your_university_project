import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('редирект на /login при посещении /', () => {
  render(<App />);
  const heading = screen.getByText(/Авторизация администратора/i);
  expect(heading).toBeInTheDocument();
});

test('рендеринг LoginPage по маршруту /login', () => {
  render(<App />);
  window.history.pushState({}, 'Login Page', '/login');
  const heading = screen.getByText(/Авторизация администратора/i);
  expect(heading).toBeInTheDocument();
});
