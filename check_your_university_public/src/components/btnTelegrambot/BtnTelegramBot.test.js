import React from 'react';
import { render, screen } from '@testing-library/react';
import BtnTelegramBot from './BtnTelegramBot';

describe('BtnTelegramBot', () => {
  const testLink = 'https://t.me/test_bot';

  test('рендерит ссылку с правильным href', () => {
    render(<BtnTelegramBot link={testLink} />);
    const linkElement = screen.getByRole('link');
    expect(linkElement).toHaveAttribute('href', testLink);
  });

  test('отображает имя телеграм-бота', () => {
    render(<BtnTelegramBot link={testLink} />);
    expect(screen.getByText(/@Check_your_university_bot/i)).toBeInTheDocument();
  });

  test('содержит иконку (img)', () => {
    render(<BtnTelegramBot link={testLink} />);
    expect(screen.getByAltText(/telegram bot icon/i)).toBeInTheDocument();
  });
});
