//подключаем основные стили
import "./styles/main.css";

//подключим роутер для перехода между страницами
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

//для прокрутки в начало страницы при переходе на нее
import ScrollToTop from "./utils/scrollToTop";

//подключение основных компонентов
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Home from "./pages/Home";
import Contacts from "./pages/Contacts";
import Universities from "./pages/Universities";
import University from "./pages/University";


function App() {
  return (
    <div className="App">
      <Router>
        <ScrollToTop />

        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/universities" element={<Universities />} />
          <Route path="/university/:id" element={<University />} />
          <Route path="/contacts" element={<Contacts />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
