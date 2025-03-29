import React from 'react';
import { render, screen } from '@testing-library/react';
import BtnYandexMaps from './BtnYandexMaps';

describe('BtnYandexMaps', () => {
  const testLink = 'https://yandex.ru/maps/example';

  test('рендерит ссылку с правильным href', () => {
    render(<BtnYandexMaps link={testLink} />);
    const linkElement = screen.getByRole('link');
    expect(linkElement).toHaveAttribute('href', testLink);
  });

  test('отображает текст "Yandex Maps"', () => {
    render(<BtnYandexMaps link={testLink} />);
    expect(screen.getByText(/Yandex Maps/i)).toBeInTheDocument();
  });

  test('содержит иконку', () => {
    render(<BtnYandexMaps link={testLink} />);
    expect(screen.getByAltText(/yandex maps icon/i)).toBeInTheDocument();
  });
});