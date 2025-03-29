import React from 'react';

import "./style.css";
import YaMapsIcon from "./btnYandexMaps.svg";

const BtnYandexMaps = ({link}) => {
    return (
        <a href={link} target="_blanc" rel="moreferrer" className="btn-outline">
            <img src={YaMapsIcon} alt="Yandex Maps icon" />
            Yandex Maps
        </a>
    );
}
 
export default BtnYandexMaps;