import { useLocation, useParams } from "react-router-dom";
import NavBar from "../components/NavBar";

function FilmPage() {
  const { film_name } = useParams();
  return (
    <div className="h-screen">
      <NavBar />
      <div>{film_name}</div>
    </div>
  );
}

export default FilmPage;
