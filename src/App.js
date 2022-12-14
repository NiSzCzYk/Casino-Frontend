import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navabr from "./components/Navbar/Navbar";
import MainPage from "./components/pages/MainPage/MainPage";
import GamesPage from "./components/pages/GamesPage/GamesPage";
import RegisterPage from "./components/pages/RegisterPage/RegisterPage";
import LoginPage from "./components/pages/LoginPage/LoginPage";
import AccountSettingPage from "./components/pages/AccountSettingPage/AccountSettingPage";
import FinancialPage from "./components/pages/FinancialPage/FinancialPage";
import OneArmedBanditPage from "./components/pages/OneArmedBanditPage/OneArmedBanditPage";
import "bootstrap/dist/css/bootstrap.min.css";

import Roulette from "./components/pages/RoulettePage/Roulette";

function App() {
  return (
    <Router>
      <div className="App">
        <Navabr />
        <Routes>
          <Route path="/" exect={true} element={<MainPage />} />
          <Route path="/roulette" element={<Roulette />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/account" element={<AccountSettingPage />} />
          <Route path="/financial" element={<FinancialPage />} />
          <Route path="/one-armed-bandit" element={<OneArmedBanditPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
