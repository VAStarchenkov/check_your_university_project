import React, { useEffect, useState } from 'react';

const Home = () => {
    const [statistics, setStatistics] = useState({ total: null, processed: null });

    useEffect(() => {
        const fetchStatistics = async () => {
            try {
                const response = await fetch('http://5.44.45.109:7777/request/get-statistics');
    
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
    
                const data = await response.json();
    
                if (Array.isArray(data) && data.length === 2) {
                    setStatistics({ total: data[0], processed: data[1] });
                }
            } catch (error) {
                console.error('Ошибка при загрузке статистики:', error);
            }
        };
    
        fetchStatistics();
    }, []);
    
    

    return (
        <main className="section">
            <div className="container">
                <ul className="content-list">
                    <li className="content-list__item">
                        <h1 className="title-1">
                            Основная статистика проекта
                        </h1>
                        <ul className="stat-list">
                            <li className="stat-list__item">
                                Обработано за месяц <em><strong>{statistics.processed ?? '...'}</strong></em> заявок.
                            </li>

                            <li className="stat-list__item">
                                Подано за месяц <em><strong>{statistics.total ?? '...'}</strong></em> заявок.
                            </li>
                        </ul>
                    </li>

                    <li className="content-list__item">
                        <h1 className="title-1">
                            Краткая информация о самом проекте
                        </h1>
                        <ul className="infproject-list">
                            <li className="infproject-list__item">
                                Данный проект был создан в качестве курсовой работы на 2 курсе ОП "Программная инженерия".
                            </li>

                            <li className="infproject-list__item">
                                Результатом нашей работы является функциональный продукт для университетов, который является сервиcным инструментом для удобной работы с подачей и обработкой заявок, связанных с неисправностями.
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </main>
    );
};

export default Home;
