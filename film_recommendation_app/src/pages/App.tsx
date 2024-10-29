import { useState } from "react";
import NavBar from "../components/NavBar";
import Home from "./Home";
import FilmPage from "./FilmPage";
import Profile from "./Profile";
import { Movie } from "../interfaces";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/film/:film_name" element={<FilmPage />} />
        <Route path="/search/:keyword" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
