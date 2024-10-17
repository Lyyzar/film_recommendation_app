import { useState } from "react";
import NavBar from "../components/NavBar";
import Home from "./Home";
import FilmPage from "./FilmPage";
import Profile from "./Profile";
import { Movie } from "../interfaces";

function Main() {
  const [displayComponent, setDisplayComponent] = useState<string>("Home");
  const [movie, setMovie] = useState<Movie>({
    id: -1,
    title: "...",
    genre: "...",
    overview: "...",
    releaseDate: "...",
    rating: -1,
    posterUrl: "...",
  });

  return (
    <div className="min-h-screen">
      <NavBar setDisplayComponent={setDisplayComponent} />
      <div className="bg-gray-400 pt-10">
        {displayComponent == "Home" ? (
          <Home setMovie={setMovie} setDisplayComponent={setDisplayComponent} />
        ) : null}
        {displayComponent == "FilmPage" ? (
          <FilmPage movie={movie} setDisplayComponent={setDisplayComponent} />
        ) : null}
        {displayComponent == "Profile" ? (
          <Profile
            setDisplayComponent={setDisplayComponent}
            setMovie={setMovie}
          />
        ) : null}
      </div>
    </div>
  );
}
export default Main;
