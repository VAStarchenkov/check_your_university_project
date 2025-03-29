import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RequestsPage from './RequestsPage';
import api from '../../api';

const mockRequests = [
  {
    id: 1,
    user_id: 2,
    building_name: 'pokra',
    category: 'доступность',
    room: '101A',
    text: 'Закрыта дверь',
    photo_url: 'http://example.com/photo1.jpg',
    status: 'pending',
  },
  {
    id: 2,
    user_id: 3,
    building_name: 'shabolovka',
    category: 'доступность',
    room: '456',
    text: 'поломан сканер карты',
    photo_url: '',
    status: 'done',
  },
];

beforeEach(() => {
  jest.clearAllMocks();
});

test('рендерится заголовок "Таблица с заявками"', async () => {
  api.get.mockResolvedValueOnce({ data: mockRequests });

  render(<RequestsPage />);
  const heading = await screen.findByText(/Таблица с заявками/i);
  expect(heading).toBeInTheDocument();
});

test('таблица заявок отображается корректно', async () => {
  api.get.mockResolvedValueOnce({ data: mockRequests });

  render(<RequestsPage />);
  const row1 = await screen.findByText('Закрыта дверь');
  const row2 = await screen.findByText('поломан сканер карты');
  expect(row1).toBeInTheDocument();
  expect(row2).toBeInTheDocument();
});

test('фильтрация заявок по корпусу', async () => {
  api.get.mockResolvedValueOnce({ data: mockRequests });
  render(<RequestsPage />);

  const input = screen.getByPlaceholderText(/введите корпус/i);
  const filterButton = screen.getByRole('button', { name: /фильтровать/i });

  userEvent.clear(input);
  await userEvent.type(input, 'pokra');
  await userEvent.click(filterButton);

  expect(api.get).toHaveBeenCalledWith('/request/filter-by-building', {
    params: { building_name: 'pokra' },
  });
});

test('обработка ошибки при загрузке заявок', async () => {
  api.get.mockRejectedValueOnce(new Error('Ошибка'));

  render(<RequestsPage />);
  const error = await screen.findByText(/ошибка при загрузке заявок/i);
  expect(error).toBeInTheDocument();
});

test('обновление статуса заявки вызывает API', async () => {
  api.get.mockResolvedValueOnce({ data: mockRequests });
  api.post.mockResolvedValueOnce({});

  render(<RequestsPage />);
  const buttons = await screen.findAllByRole('button', { name: /завершить/i });
  await userEvent.click(buttons[0]);

  await waitFor(() => {
    expect(api.post).toHaveBeenCalledWith('/admin_actions/update/', {
      request_id: 1,
      status: 'done',
    });
  });
});

test('кнопка "Сбросить" очищает фильтрацию', async () => {
  api.get.mockResolvedValueOnce({ data: mockRequests });
  render(<RequestsPage />);

  const input = screen.getByPlaceholderText(/введите корпус/i);
  const resetButton = screen.getByRole('button', { name: /сбросить/i });

  await userEvent.type(input, 'pokra');
  await userEvent.click(screen.getByRole('button', { name: /фильтровать/i }));

  expect(api.get).toHaveBeenCalledWith('/request/filter-by-building', {
    params: { building_name: 'pokra' },
  });

  await userEvent.click(resetButton);

  expect(input).toHaveValue('');
  expect(api.get).toHaveBeenCalledWith('/admin_actions/');
});

test('отображение фотографий в таблице', async () => {
  api.get.mockResolvedValueOnce({ data: mockRequests });

  render(<RequestsPage />);
  const image = await screen.findByAltText('Request photo');
  expect(image).toHaveAttribute('src', 'http://example.com/photo1.jpg');

  const link = await screen.findByText('Ссылка');
  expect(link).toHaveAttribute('href', 'http://example.com/photo1.jpg');
});

test('отображение статуса заявки', async () => {
  api.get.mockResolvedValueOnce({ data: mockRequests });

  render(<RequestsPage />);
  const status1 = await screen.findByText('pending');
  const status2 = await screen.findByText('done');

  expect(status1).toBeInTheDocument();
  expect(status2).toBeInTheDocument();
});

test('отображение "—" для заявок без фото', async () => {
  api.get.mockResolvedValueOnce({ data: mockRequests });

  render(<RequestsPage />);
  const noPhoto = await screen.findByText('—');
  expect(noPhoto).toBeInTheDocument();
});

test('статус обновляется после клика на кнопку "Завершить"', async () => {
  api.get.mockResolvedValueOnce({ data: mockRequests });
  api.post.mockResolvedValueOnce({});

  render(<RequestsPage />);
  const buttons = await screen.findAllByRole('button', { name: /завершить/i });
  await userEvent.click(buttons[0]);

  await waitFor(() => {
    expect(api.post).toHaveBeenCalledWith('/admin_actions/update/', {
      request_id: 1,
      status: 'done',
    });
  });
});

test('каждая заявка имеет кнопку "Завершить"', async () => {
  api.get.mockResolvedValueOnce({ data: mockRequests });

  render(<RequestsPage />);
  const buttons = await screen.findAllByRole('button', { name: /завершить/i });
  expect(buttons.length).toBe(mockRequests.length);
});
  
test('добавление корпуса вызывает API', async () => {
  api.get.mockResolvedValueOnce({ data: mockRequests });
  api.post.mockResolvedValueOnce({});

  render(<RequestsPage />);
  const input = screen.getByPlaceholderText(/название корпуса/i);
  const addButton = screen.getByRole('button', { name: /добавить/i });

  await userEvent.type(input, 'test-building');
  await userEvent.click(addButton);

  await waitFor(() => {
    expect(api.post).toHaveBeenCalledWith('/admin_actions/create-building', null, {
      params: { name: 'test-building' },
      headers: { 'X-Auth-Token': localStorage.getItem('token') },
    });
  });
});

test('удаление корпуса вызывает API', async () => {
  api.get.mockResolvedValueOnce({ data: mockRequests });
  api.post.mockResolvedValueOnce({});

  render(<RequestsPage />);
  const input = screen.getByPlaceholderText(/название корпуса/i);
  const deleteButton = screen.getByRole('button', { name: /удалить/i });

  await userEvent.type(input, 'test-building');
  await userEvent.click(deleteButton);

  await waitFor(() => {
    expect(api.post).toHaveBeenCalledWith('/admin_actions/delete-building', null, {
      params: { name: 'test-building' },
      headers: { 'X-Auth-Token': localStorage.getItem('token') },
    });
  });
});

test('сообщение появляется после добавления корпуса', async () => {
  api.get.mockResolvedValueOnce({ data: mockRequests });
  api.post.mockResolvedValueOnce({});

  render(<RequestsPage />);
  const input = screen.getByPlaceholderText(/название корпуса/i);
  const addButton = screen.getByRole('button', { name: /добавить/i });

  await userEvent.type(input, 'pokra');
  await userEvent.click(addButton);

  const message = await screen.findByText(/корпус "pokra" добавлен/i);
  expect(message).toBeInTheDocument();
});

test('добавление корпуса не вызывается при пустом вводе', async () => {
  render(<RequestsPage />);
  const addButton = screen.getByRole('button', { name: /добавить/i });
  await userEvent.click(addButton);

  expect(api.post).not.toHaveBeenCalled();
});

