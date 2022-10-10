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

type ErrorProps = {
  [key: string]: undefined | string;
};

type FilterProps = {
  yearRelease: {
    from: number;
    to: number;
  };
};

interface FilterModalProps {
  setModalIsOpen: React.Dispatch<SetStateAction<boolean>>;
  filter: (values: FilterProps) => void;
}

const FilterModal = ({ setModalIsOpen, filter }: FilterModalProps) => {
  const yearFromRef = useRef<HTMLInputElement>(null);
  const yearToRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<ErrorProps>({
    yearTo: undefined,
    yearFrom: undefined,
  });

  const currentYear = new Date().getFullYear();

  const removeError = (e: React.ChangeEvent<HTMLInputElement>) => {
    errors[e.target.name] &&
      setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
  };

  const submit = () => {
    const yearFrom = Number(yearFromRef.current?.value);
    const yearTo = Number(yearToRef.current?.value);

    if (yearFrom === 0 && yearTo === 0) {
      setModalIsOpen(false);
      return;
    }

    if (`${yearFrom}`.length > 4) {
      setErrors((prev) => ({
        ...prev,
        yearFrom: "Invalid field",
      }));
      return;
    }

    if (`${yearTo}`.length > 4) {
      setErrors((prev) => ({
        ...prev,
        yearTo: "Invalid field",
      }));
      return;
    }

    if (yearTo < yearFrom) {
      setErrors((prev) => ({
        ...prev,
        yearFrom: 'This field cannot be longer than the "to" field',
      }));
      return;
    }

    if (yearFrom > yearTo) {
      setErrors((prev) => ({
        ...prev,
        yearFrom: 'This field cannot be longer than the "to" field',
      }));
      return;
    }

    filter({
      yearRelease: {
        from: yearFrom,
        to: yearTo,
      },
    });
    setModalIsOpen(false);
  };

  return (
    <>
      <div
        className="fixed w-full h-screen bg-black/90 z-10"
        onClick={() => setModalIsOpen(false)}
      />
      <div className="max-w-[300px] w-full fixed bottom-2/4 right-2/4 translate-x-2/4 translate-y-2/4 p-5 rounded bg-black z-10 border border-stone-700 text-white flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <h3 className="font-medium text-xl">Year of release:</h3>

          <div className="flex gap-5">
            <div>
              <label htmlFor="releaseFrom" className="text-md font-light">
                From:
              </label>
              <input
                ref={yearFromRef}
                type="number"
                name="yearFrom"
                id="releaseFrom"
                className="w-full bg-transparent border border-stone-700 rounded outline-none text-sm text-white px-5 py-2 focus:border-sky-400 appearance-none"
                placeholder="min: 1980"
                min={1980}
                style={
                  errors.yearTo ? { border: "1px solid rgb(239 68 68)" } : {}
                }
              />
              {errors?.yearFrom && (
                <p className="text-red-500 text-sm font-light">
                  {errors.yearFrom}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="releaseFrom" className="text-md">
                To:
              </label>
              <input
                ref={yearToRef}
                type="number"
                name="yearTo"
                id="releaseTo"
                className="w-full bg-transparent border border-stone-700 rounded outline-none text-sm text-white px-5 py-2 focus:border-sky-400 input-number-appearance-none"
                placeholder={`max: ${currentYear}`}
                max={currentYear}
                onFocus={removeError}
                style={
                  errors.yearTo ? { border: "1px solid rgb(239 68 68)" } : {}
                }
              />
              {errors?.yearTo && (
                <p className="text-red-500 text-sm font-light">
                  {errors.yearTo}
                </p>
              )}
            </div>
          </div>
        </div>

        <button
          className="w-full bg-white text-black px-2 py-1 font-medium rounded"
          onClick={submit}
        >
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

    const filterKeys = ["title", "director"];

    const filteredMovies = data.allFilms.films.filter((movie: MovieProps) =>
      movie.title.toLowerCase().includes(searchValue)
    );

    setFilteredData(filteredMovies);
  };

  const filter = ({ yearRelease }: FilterProps) => {};

  useEffect(() => {
    document.title = "Movies - Star Wars";
  }, []);

  return (
    <AnimatedPage>
      <Header backTo="/dashboard" paths={["dashboard", "movies"]} />

      {filterIsOpen && (
        <FilterModal setModalIsOpen={setFilterIsOpen} filter={filter} />
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
