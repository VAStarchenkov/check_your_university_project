import React from 'react';

//импортируем хук useEffect для работы с темной темой
import {useEffect} from "react";

//импорт кастомного хука для отслеживания состояния
//вместо useState (для сохранения темной темы при открытии сайта в новой вкладке)
import {useLocalStorage} from "./../../utils/useLocalStorage";

//импортруем определение темной темы в системе для синхронизации с сайтом
import detectDarkMode from "../../utils/detectDarkMode";

//импорты иконок для кнопки
import sun from "./sun.svg";
import moon from "./moon.svg";

//импорт стилей кнопки
import "./style.css";

const BtnDarkMode = () => {

    //возьмем значение из localStorage. Если значения нет, то возмем по умолчанию - light
    const [darkMode, setDarkMode] = useLocalStorage("darkMode", detectDarkMode());

    useEffect(() => {
        if (darkMode === "dark") {
            document.body.classList.add("dark")
        } else {
            document.body.classList.remove("dark")
        }
    }, [darkMode]);

    //прослушивает системные настройки пользователя для рендеринга
    //страницы с совместной с изменением пользовательских цветов в настройках темой
    //например при позднем времени изменилась светлая тема на темную -
    //на сайте также произошли изменения (+ влияет на ручное изменение в настройках)
    useEffect(() => {
        window
            .matchMedia("(prefers-color-scheme: dark)")
            .addEventListener("change", (event) => {
                const newColorScheme = event.matches ? "dark" : "light";
                setDarkMode(newColorScheme);
            });
    }, [setDarkMode]);

    const toggleDarkMode = () => {
        setDarkMode((currentValue) => {
            return currentValue === "light" ? "dark" : "light";
        })
    };

    const btnNormal = "dark-mode-btn";
    const btnActive = "dark-mode-btn dark-mode-btn--active";

    return (
        <div role="button" className={darkMode === "dark" ? btnActive : btnNormal} onClick={toggleDarkMode}>
            <img src={sun} alt="Light mode" className="dark-mode-btn__icon" />
            <img src={moon} alt="Dark mode" className="dark-mode-btn__icon" />
        </div>
    );
}
 
export default BtnDarkMode;