import { Header } from "@components";
import { useLocation } from "react-router-dom";

const SelectedMovie = () => {
  const location = useLocation();
  const id = location.pathname.substring(8, location.pathname.length);

  return (
    <main>
      <Header paths={["dashboard", "movies"]} />
    </main>
  );
};

export default SelectedMovie;
