import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import UniversityPage from './University';
import { universities } from '../helpers/UniversityList';

// обёртка с MemoryRouter и Routes для теста динамического маршрута
const renderWithRoute = (initialEntry = '/university/0') => {
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <Routes>
        <Route path="/university/:id" element={<UniversityPage />} />
      </Routes>
    </MemoryRouter>
  );
};

const testUniversity = {
    name: 'Комплекс на Покре',
    description:
      'Очень большой корпус из 13 зданий, в котором есть несколько кофеен, столовая, круглосуточная четырехэтажная библиотека,'+
      'медкабинет, спортзал и пространства коворкингов (переговорная, зрительный зал, тихая зона для индивидуальной работы,'+
      'места для обсуждения групповых проектов) и много-много разнообразных аудиторий. Само здание многоэтажное и большое,'+
      'его открыли в 2019. Сейчас — это центр жизни ВШЭ, место проведения большого количества университетских мероприятий.'+
      'Здесь находятся факультеты экономических наук, компьютерных наук, географии, МИЭФ, совместной программы ВШЭ и РЭШ.',
    imgBig: 'test-file-stub',
    link: 'https://yandex.ru/profile/1074710983/',
};


describe('University Page', () => {
  test('рендерит название, описание и изображение', () => {
    const testUniversity = universities[0];
    renderWithRoute('/university/0');

    expect(screen.getByText(testUniversity.name)).toBeInTheDocument();
    const paragraphs = screen.getAllByText(
        (content, node) =>
          node?.tagName.toLowerCase() === 'p' &&
          node.textContent.includes(testUniversity.description)
    );
      
    expect(paragraphs).toHaveLength(1);
           
    expect(screen.getByAltText(testUniversity.name)).toHaveAttribute('src', testUniversity.imgBig);
  });

  test('рендерит кнопку Yandex Maps при наличии ссылки', () => {
    const testUniversity = universities[0];
    renderWithRoute('/university/0');

    if (testUniversity.mapsUrl) {
      const mapsBtn = screen.getByRole('link', { name: /Yandex Maps/i });
      expect(mapsBtn).toHaveAttribute('href', testUniversity.mapsUrl);
    }
  });

  test('не падает, если университет по id не найден', () => {
    renderWithRoute('/university/999');

    expect(screen.queryByText(/Yandex Maps/i)).not.toBeInTheDocument();
  });

  test('содержит ссылку на Яндекс.Карты с корректными атрибутами', () => {
    renderWithRoute();
  
    const link = screen.getByRole('link', { name: /yandex maps/i });
  
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', testUniversity.link);
    expect(link).toHaveAttribute('target', '_blanc');
    expect(link).toHaveAttribute('rel', 'moreferrer');
  });
  
  test('рендерит изображение с корректными src и alt', () => {
    renderWithRoute();
  
    const image = screen.getByAltText(testUniversity.name);
    expect(image).toHaveAttribute('src', testUniversity.imgBig);
  });
  
  test('отображает описание университета', () => {
    renderWithRoute();
  
    const elements = screen.getAllByText((_, node) =>
      node?.tagName === 'P' &&
      node.textContent.includes('Очень большой корпус из 13 зданий')
    );
  
    expect(elements).toHaveLength(1);
  });

  test('ссылка на Яндекс.Карты корректна', () => {
    renderWithRoute();
  
    const link = screen.getByRole('link', { name: /yandex maps/i });
  
    expect(link).toHaveAttribute('href', expect.stringContaining('yandex.ru'));
    expect(link).toHaveAttribute('target', '_blanc');
    expect(link).toHaveAttribute('rel', 'moreferrer');
  });
  
});
