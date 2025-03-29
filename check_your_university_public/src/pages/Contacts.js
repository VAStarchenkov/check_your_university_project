import React from 'react';
import BtnTelegramBot from "../components/btnTelegrambot/BtnTelegramBot";

const Contacts = () => {
    return (
        <main className="section">
            <div className="container">
                <div className="connect-bot">
                    <h1 className="title-2">
                        Связь с ботом для отправки заявок
                    </h1>

                    {<BtnTelegramBot link="https://t.me/check_your_university_bot"/>}
                </div>
                
                
                <h1 className="title-2">
                    О создателях проекта
                </h1>

                <ul className="content-list">
                    <li className="content-list__item">
                        <h3 className="title-3">
                            Вадим
                        </h3>
                        
                        <ul className="social-list">
                            <li className="social-list__item">
                                Fronted-разработчик. Студент 2 курса ПИ ОП "Программная инженерия"
                            </li>

                            <li className="social-list__item">
                                Почта для связи: <a href="mailto:vastarchenkov@edu.hse.ru">
                                    vastarchenkov@edu.hse.ru
                                </a>
                            </li>
                        </ul>
                    </li>

                    <li className="content-list__item">
                        <h3 className="title-3">
                            Давид
                        </h3>

                        <ul className="social-list">
                            <li className="social-list__item">
                                Backend-разработчик. Студент 2 курса ПИ ОП "Программная инженерия"
                            </li>

                            <li className="social-list__item">
                                Почта для связи: <a href="mailto:dgaslanian@edu.hse.ru">
                                    dgaslanian@edu.hse.ru
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </main>
    );
}
 
export default Contacts;