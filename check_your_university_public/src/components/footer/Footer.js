import React from 'react';

//добавление стилей подвала
import "./style.css";

//добавление иконок социальных сетей
import telegram from "./../../img/icons/telegram.svg";
import gitHub from "./../../img/icons/gitHub.svg";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer__wrapper">
                    <ul className="social">



                        <li className="social__item">
                            <div className="link-user">
                                <p>
                                    Connection with Vadim
                                </p>
                            </div>
                            <ul className="links">
                                <li className="link__item">
                                    <a href="https://t.me/vastarchenkov" target="_blanc" rel="moreferrer">
                                        <img src={telegram} alt="Link"/>
                                    </a>
                                </li>

                                <li className="link__item">
                                    <a href="https://github.com/VAStarchenkov" target="_blanc" rel="moreferrer">
                                        <img src={gitHub} alt="Link"/>
                                    </a>
                                </li>
                            </ul>
                        </li>



                        <li className="social__item">
                            <div className="link-user">
                                <p>
                                    Connection witn David
                                </p>
                            </div>
                            <ul className="links">
                                <li className="link__item">
                                    <a href="https://t.me/daslanian" target="_blanc" rel="moreferrer">
                                        <img src={telegram} alt="Link"/>
                                    </a>
                                </li>

                                <li className="link__item">
                                    <a href="https://github.com/Davonchik" target="_blanc" rel="moreferrer">
                                        <img src={gitHub} alt="Link"/>
                                    </a>
                                </li>
                            </ul>
                        </li>


                    </ul>
                    
                    <div className="copyright">
                        <p>
                            © 2025 Check_your_university_project
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
 
export default Footer;