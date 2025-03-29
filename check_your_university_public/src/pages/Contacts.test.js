import { render, screen } from '@testing-library/react';
import Contacts from '../pages/Contacts';
import React from 'react';

describe('Contacts Page', () => {
  beforeEach(() => {
    render(<Contacts />);
  });

  test('рендерит заголовок для связи с ботом', () => {
    expect(screen.getByText('Связь с ботом для отправки заявок')).toBeInTheDocument();
  });

  test('содержит кнопку телеграм-бота с корректной ссылкой', () => {
    const link = screen.getByRole('link', { name: /check_your_university_bot/i });
    expect(link).toHaveAttribute('href', 'https://t.me/check_your_university_bot');
  });

  test('рендерит заголовок о создателях проекта', () => {
    expect(screen.getByText('О создателях проекта')).toBeInTheDocument();
  });

  test('рендерит информацию о Вадиме и его email', () => {
    expect(screen.getByText('Вадим')).toBeInTheDocument();
    expect(screen.getByText('vastarchenkov@edu.hse.ru')).toHaveAttribute('href', 'mailto:vastarchenkov@edu.hse.ru');
  });

  test('рендерит информацию о Давиде и его email', () => {
    expect(screen.getByText('Давид')).toBeInTheDocument();
    expect(screen.getByText('dgaslanian@edu.hse.ru')).toHaveAttribute('href', 'mailto:dgaslanian@edu.hse.ru');
  });
});
