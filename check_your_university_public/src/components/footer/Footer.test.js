import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('Footer', () => {
  beforeEach(() => {
    render(<Footer />);
  });

  test('рендерит подвал', () => {
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
  });

  test('отображает текст "Connection with Vadim"', () => {
    expect(screen.getByText(/Connection with Vadim/i)).toBeInTheDocument();
  });

  test('отображает текст "Connection witn David"', () => {
    expect(screen.getByText(/Connection witn David/i)).toBeInTheDocument();
  });

  test('содержит 4 социальных ссылки', () => {
    const links = screen.getAllByRole('link', { name: /link/i });
    expect(links).toHaveLength(4);
  });

  test('все социальные ссылки имеют правильные href, target и rel', () => {
    const expectedLinks = [
      'https://t.me/vastarchenkov',
      'https://github.com/VAStarchenkov',
      'https://t.me/daslanian',
      'https://github.com/Davonchik',
    ];

    expectedLinks.forEach((href) => {
      const link = document.querySelector(`a[href="${href}"]`);
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('target', '_blanc');
      expect(link).toHaveAttribute('rel', 'moreferrer');
    });
  });  

  test('отображает копирайт', () => {
    expect(screen.getByText(/© 2025 Check_your_university_project/i)).toBeInTheDocument();
  });
});
