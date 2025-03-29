import React from 'react';
import {universities} from "../helpers/UniversityList";
import University from "../components/university/University";

const Universities = () => {
    return (
        <main className="section">
            <div className="container">
                <h2 className="title-2">
                    Университеты и их корпусы, которые внедрили наш проект в свою работу
                </h2>

                <ul className="universities">
                    {universities.map((university, index) => {
                        return <University
                            key={index}
                            name={university.name}
                            img={university.img}
                            index={index}
                        />
                    })}
                </ul>
            </div>
        </main>
    );
}
 
export default Universities;