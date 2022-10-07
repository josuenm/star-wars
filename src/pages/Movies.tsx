import { useQuery } from "@apollo/client";
import { AnimatedPage, Header, MovieCard, SafeArea } from "@components";
import { LIST_ALL_MOVIES } from "@services/graphql/movies";
import { SetStateAction, useEffect, useRef, useState } from "react";

type MovieProps = {
  id: string;
  title: string;
  director: string;
  releaseDate: string;
  producers: string[];
};

interface FilterModalProps {
  setModalIsOpen: React.Dispatch<SetStateAction<boolean>>;
}

const FilterModal = ({ setModalIsOpen }: FilterModalProps) => {
  const ReleaseRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <div
        className="fixed w-full h-screen bg-black/90 z-10"
        onClick={() => setModalIsOpen(false)}
      />
      <div className="max-w-[300px] w-full fixed bottom-2/4 right-2/4 translate-x-2/4 translate-y-2/4 p-5 rounded bg-black z-10 border border-stone-700 text-white flex flex-col gap-5">
        <h2 className="text-2xl font-bold ">Filters</h2>

        <div>
          <label htmlFor="release" className="text-lg">
            Year of release:
          </label>
          <input
            ref={ReleaseRef}
            type="text"
            name="release"
            id="release"
            className="w-full bg-transparent border border-stone-700 rounded outline-none text-sm text-white px-5 py-2 focus:border-sky-400"
            placeholder="Ex: 1980"
          />
        </div>

        <button className="w-full bg-white text-black px-2 py-1 font-medium rounded">
          Filter
        </button>
      </div>
    </>
  );
};

const Movies = () => {
  const SearchRef = useRef<HTMLInputElement>(null);
  const { data } = useQuery(LIST_ALL_MOVIES);
  const [filteredData, setFilteredData] = useState<MovieProps[]>([]);
  const [filterIsOpen, setFilterIsOpen] = useState(false);

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

  const filter = () => {};

  useEffect(() => {
    document.title = "Movies - Star Wars";
  }, []);

  return (
    <AnimatedPage>
      <Header backTo="/dashboard" paths={["dashboard", "movies"]} />

      {filterIsOpen && <FilterModal setModalIsOpen={setFilterIsOpen} />}

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
