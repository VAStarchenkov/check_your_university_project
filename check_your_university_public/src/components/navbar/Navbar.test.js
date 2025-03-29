import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Navbar from './Navbar';

// Обёртка с настоящими роутами, чтобы эмулировать переход между страницами
const TestAppWithRoutes = () => (
  <MemoryRouter initialEntries={['/']}>
    <Navbar />
    <Routes>
      <Route path="/" element={<div>Home Page</div>} />
      <Route path="/universities" element={<div>Universities Page</div>} />
      <Route path="/contacts" element={<div>Contacts Page</div>} />
    </Routes>
  </MemoryRouter>
);

describe('Navbar', () => {
  test('рендерит логотип и основные ссылки', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    expect(screen.getByText(/Check_your_university/i)).toBeInTheDocument();
    expect(screen.getByText(/About project/i)).toBeInTheDocument();
    expect(screen.getByText(/Universities/i)).toBeInTheDocument();
    expect(screen.getByText(/Contacts/i)).toBeInTheDocument();
  });

  test('рендерит кнопку тёмной темы (две иконки)', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    const icons = screen.getAllByRole('img', { hidden: true });
    expect(icons.length).toBeGreaterThanOrEqual(2);
  });

  test('NavLink получает активный класс при маршруте /contacts', () => {
    render(
      <MemoryRouter initialEntries={['/contacts']}>
        <Navbar />
      </MemoryRouter>
    );

    const contactsLink = screen.getByText(/Contacts/i);
    expect(contactsLink).toHaveClass('nav-list__link--active');
  });

  test('клик по ссылке "Contacts" ведёт на нужную страницу и делает ссылку активной', async () => {
    const user = userEvent.setup();
    render(<TestAppWithRoutes />);

    expect(screen.getByText(/Home Page/i)).toBeInTheDocument();

    const contactsLink = screen.getByText(/Contacts/i);

    await user.click(contactsLink);
    expect(screen.getByText(/Contacts Page/i)).toBeInTheDocument();
    expect(contactsLink).toHaveClass('nav-list__link--active');
  });
});
