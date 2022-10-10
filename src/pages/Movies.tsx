import { useQuery } from "@apollo/client";
import {
  AnimatedPage,
  FilterMovies,
  Header,
  MovieCard,
  SafeArea,
} from "@components";
import { LIST_ALL_MOVIES } from "@services/graphql/movies";
import { useEffect, useRef, useState } from "react";

type MovieProps = {
  id: string;
  title: string;
  director: string;
  releaseDate: string;
  producers: string[];
};

type FilterProps = {
  yearRelease: {
    from: number;
    to: number;
  };
};

const Movies = () => {
  const SearchRef = useRef<HTMLInputElement>(null);
  const { data } = useQuery(LIST_ALL_MOVIES);
  const [filteredData, setFilteredData] = useState<MovieProps[]>([]);
  const [filterIsOpen, setFilterIsOpen] = useState(false);
  const [filterInputs, setFilterInputs] = useState({
    yearFrom: "",
    yearTo: "",
  });

  const search = () => {
    const searchValue = SearchRef.current?.value.toLowerCase() || "";

    if (searchValue === "") {
      setFilteredData([]);
      return;
    }

    const filterKeys = ["title", "director"];

    const filteredMovies = data.allFilms.films.filter(
      (movie: { [key: string]: string }) =>
        filterKeys.some((key: string) =>
          movie[key].toLowerCase().includes(searchValue)
        )
    );

    setFilteredData(filteredMovies);
  };

  const filter = ({ yearRelease }: FilterProps) => {
    const filteredMovies = data.allFilms.films.filter((movie: MovieProps) => {
      const year = Number(movie.releaseDate.substring(0, 4));

      if (year >= yearRelease.from && year <= yearRelease.to) {
        return movie;
      }
    });

    setFilteredData(filteredMovies);
  };

  useEffect(() => {
    document.title = "Movies - Star Wars";
  }, []);

  return (
    <AnimatedPage>
      <Header backTo="/dashboard" paths={["dashboard", "movies"]} />

      {filterIsOpen && (
        <FilterMovies
          setModalIsOpen={setFilterIsOpen}
          filter={filter}
          filterInputs={filterInputs}
          setFilterInputs={setFilterInputs}
        />
      )}

      <SafeArea>
        <div className="flex items-center gap-3 flex-col pt-24">
          <input
            type="text"
            className="w-full bg-transparent border border-stone-700 rounded outline-none text-sm text-white px-5 py-2 focus:border-sky-400"
            placeholder="Search..."
            ref={SearchRef}
            onKeyDown={(e) => e.key === "Enter" && search()}
          />
          <div className="flex gap-5">
            <button
              className="w-32 bg-white px-2 py-1 font-medium rounded"
              onClick={search}
            >
              Search
            </button>
            <button
              className="w-32 border text-white px-2 py-1 font-medium rounded"
              onClick={() => setFilterIsOpen(true)}
            >
              Filters
            </button>
          </div>
        </div>

        <div className="flex flex-col justify-between md:flex-wrap md:flex-row gap-8 py-10">
          {filteredData.length > 0
            ? filteredData.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))
            : data &&
              data.allFilms.films.map((movie: MovieProps) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
        </div>
      </SafeArea>
    </AnimatedPage>
  );
};

export default Movies;
