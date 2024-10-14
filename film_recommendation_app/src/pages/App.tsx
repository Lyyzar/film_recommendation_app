import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import FilmPage from "./FilmPage";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/film/:film_name" element={<FilmPage />} />
        <Route path="/search/:keyword" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
