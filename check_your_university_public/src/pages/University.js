import React from 'react';

// импорт кнопки яндекс-карт
import BtnYandexMaps from "../components/btnYandexMaps/BtnYandexMaps";

// для того, чтобы страница для каждого из университетов открывалась динамически
import {useParams} from "react-router-dom"

// импортируем список университетов
import {universities} from "./../helpers/UniversityList";

const University = () => {
    const {id} = useParams();
    const university = universities[id];

    if (!university) {
        return (
          <main className="section">
            <div className="container">
              <h1 className="title-2">Университет не найден</h1>
            </div>
          </main>
        );
      }
      
    return (
        <main className="section">
            <div className="container">
                <div className="university-details">
                    <h1 className="title-2">
                        {university.name}
                    </h1>
                    <img src={university.imgBig} alt={university.name} className="university-details__cover" />

                    <div className="university-details__desc">
                        <p>
                            {university.description}
                        </p>
                    </div>

                    {/* если есть ссылка в картах яндекса */}
                    {university.mapsUrl && <BtnYandexMaps link={university.mapsUrl} />}
                </div>
            </div>
        </main>
    );
}
 
export default University;