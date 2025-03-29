import React from 'react';

import "./style.css";

// для открытия страницы каждого из университетов по
// конкретной ссылке, завязанной на индексе проекта
import {NavLink} from "react-router-dom";

const University = ({name, img, index}) => {
    return (
        <NavLink to={`/university/` + index}>
            <li className="university">
                <img src={img} alt={name} className="university__img"/>
                <h4 className="university__desc">
                    {name}
                </h4>
            </li>
        </NavLink>
    );
}
 
export default University;