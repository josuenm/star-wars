import { Header } from "@components";
import { useMovies } from "@contexts/MoviesContext";
import { useLocation } from "react-router-dom";

const SelectedMovie = () => {
  const location = useLocation();
  const id = location.pathname.substring(8, location.pathname.length);

  const { findOne } = useMovies();

  findOne(id);

  return (
    <main>
      <Header paths={["dashboard", "movies"]} />
    </main>
  );
};

export default SelectedMovie;
