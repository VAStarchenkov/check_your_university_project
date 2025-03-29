import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Home from './Home';

beforeAll(() => {
  global.fetch = jest.fn();
});

afterAll(() => {
  global.fetch.mockRestore();
});

describe('Home Page', () => {
  beforeEach(() => {
    global.fetch.mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([250, 100]),
      })
    );
  });

  test('рендерит заголовок "Основная статистика проекта"', async () => {
    render(<Home />);
    expect(await screen.findByText(/Основная статистика проекта/i)).toBeInTheDocument();
  });

  test('рендерит заголовок "Краткая информация о самом проекте"', async () => {
    render(<Home />);
    expect(await screen.findByText(/Краткая информация о самом проекте/i)).toBeInTheDocument();
  });

  test('рендерит статистику по заявкам', async () => {
    render(<Home />);
    
    await waitFor(() => {
      expect(screen.getByText(/Обработано за месяц/i)).toHaveTextContent('100');
      expect(screen.getByText(/Подано за месяц/i)).toHaveTextContent('250');
    });
  });

  test('рендерит краткую информацию о проекте', async () => {
    render(<Home />);
    
    expect(
      await screen.findByText(/Данный проект был создан в качестве курсовой/i)
    ).toBeInTheDocument();

    expect(
      await screen.findByText(/Результатом нашей работы является функциональный продукт/i)
    ).toBeInTheDocument();
  });
});
