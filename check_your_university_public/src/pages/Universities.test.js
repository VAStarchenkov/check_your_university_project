import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Universities from './Universities';
import { universities } from '../helpers/UniversityList';

describe('Universities Page', () => {
  test('рендерит заголовок страницы', () => {
    render(
      <MemoryRouter>
        <Universities />
      </MemoryRouter>
    );

    expect(
      screen.getByText(/университеты и их корпусы/i)
    ).toBeInTheDocument();
  });

  test('рендерит все карточки университетов', () => {
    render(
      <MemoryRouter>
        <Universities />
      </MemoryRouter>
    );

    const universityNames = universities.map((u) => u.name);

    universityNames.forEach((name) => {
      expect(screen.getByText(name)).toBeInTheDocument();
    });
  });

  test('рендерит правильное количество карточек', () => {
    render(
      <MemoryRouter>
        <Universities />
      </MemoryRouter>
    );

    const universityCards = screen.getAllByRole('link');
    expect(universityCards.length).toBe(universities.length);
  });
});
