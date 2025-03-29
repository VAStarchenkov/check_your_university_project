import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import University from './University';

describe('University', () => {
  const mockUniversity = {
    name: 'Тестовый университет',
    img: 'test-image.jpg',
    index: 3,
  };

  test('рендерит имя университета', () => {
    render(
      <MemoryRouter>
        <University {...mockUniversity} />
      </MemoryRouter>
    );

    expect(screen.getByText(mockUniversity.name)).toBeInTheDocument();
  });

  test('рендерит изображение с корректным alt', () => {
    render(
      <MemoryRouter>
        <University {...mockUniversity} />
      </MemoryRouter>
    );

    const img = screen.getByAltText(mockUniversity.name);
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', mockUniversity.img);
  });

  test('ссылка ведёт на корректный путь', () => {
    render(
      <MemoryRouter>
        <University {...mockUniversity} />
      </MemoryRouter>
    );

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/university/3');
  });
});
