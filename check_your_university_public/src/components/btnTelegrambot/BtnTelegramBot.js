import React from 'react';

/* импорт стилей */
import "./style.css";

/* импорт иконки для кнопки */
import botIcon from "./btnTelegramBot.svg";

const BtnTelegramBot = ({link}) => {
    return (
        <a href={link} target="_blanc" rel="moreferrer" className="btn-tbot">
            <img src={botIcon} alt="Telegram bot icon" />
            @Check_your_university_bot
        </a>
    );
}
 
export default BtnTelegramBot;

