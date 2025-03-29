import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BtnDarkMode from './BtnDarkMode';

beforeEach(() => {
  localStorage.clear();
  document.body.className = '';
});

describe('BtnDarkMode', () => {
  test('рендерит кнопку с иконками', () => {
    render(<BtnDarkMode />);
    expect(screen.getAllByRole('img')).toHaveLength(2);
  });

  test('по умолчанию тема светлая (если нет сохранений)', () => {
    render(<BtnDarkMode />);
    expect(document.body.classList.contains('dark')).toBe(false);
  });

  test('переключает тему при клике', () => {
    render(<BtnDarkMode />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(
      document.body.classList.contains('dark') ||
      document.body.classList.contains('light')
    ).toBe(true);
  });

  test('сохраняет тему в localStorage', () => {
    render(<BtnDarkMode />);
    const button = screen.getByRole('button');

    fireEvent.click(button);
    const savedTheme = JSON.parse(localStorage.getItem('darkMode'));
    expect(['dark', 'light']).toContain(savedTheme);
  });
});
