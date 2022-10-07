import { useQuery } from "@apollo/client";
import { AnimatedPage, Header, MovieCard, SafeArea } from "@components";
import { LIST_ALL } from "@services/graphql/movies";
import { useRef, useState } from "react";

type MovieProps = {
  id: string;
  title: string;
  director: string;
  releaseDate: string;
  producers: string[];
};

const Movies = () => {
  const SearchRef = useRef<HTMLInputElement>(null);

  const { data } = useQuery(LIST_ALL);

  const [filteredData, setFilteredData] = useState<MovieProps[]>([]);

  const search = () => {
    const searchValue = SearchRef.current?.value.toLowerCase() || "";

    if (searchValue === "") {
      setFilteredData([]);
      return;
    }

    const filteredMovies = data.allFilms.films.filter((movie: MovieProps) =>
      movie.title.toLowerCase().includes(searchValue)
    );

    setFilteredData(filteredMovies);
  };

  return (
    <AnimatedPage>
      <Header paths={["dashboard", "movies"]} />
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
            <button className="w-32 border text-white px-2 py-1 font-medium rounded">
              Filter
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-8 py-10">
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
