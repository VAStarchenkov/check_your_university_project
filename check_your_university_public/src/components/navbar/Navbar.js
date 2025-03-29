import React from 'react';

//подключаем стили
import BtnDarkMode from "../btnDarkMode/BtnDarkMode";
import "./style.css";

//чтобы прописать ссылки на страницы подключим NavLink
import {NavLink} from "react-router-dom";

const Navbar = () => {
    
    const activeLink = "nav-list__link nav-list__link--active";
    const normalLink = "nav-list__link";

    return (
        <nav className="nav">
            <div className="container">
                <div className="nav-row">
                    <NavLink to="/" className="logo">
                        <strong>Check_your_university</strong> project
                    </NavLink>

                    <BtnDarkMode />

                    <ul className="nav-list">
                        <li className="nav-list__item">
                            <NavLink to="/" className={({isActive}) => isActive ? activeLink : normalLink}>
                                About project
                            </NavLink>
                        </li>

                        <li className="nav-list__item">
                            <NavLink to="/universities" className={({isActive}) => isActive ? activeLink : normalLink}>
                                Universities
                            </NavLink>
                        </li>

                        <li className="nav-list__item">
                            <NavLink to="/contacts" className={({isActive}) => isActive ? activeLink : normalLink}>
                                Contacts
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
 
export default Navbar;