import { useQuery } from "@apollo/client";
import { LIST_ALL } from "@services/graphql/movies";
import { createContext, useContext, useState } from "react";

interface ProviderProps {
  children: React.ReactNode | React.ReactNode[];
}

type MoviesProps = {
  id: string;
  title: string;
  director: string;
  releaseDate: string;
  producers: string[];
};

interface ContextProps {
  listAll: () => Promise<void>;
  searchMovies: (value: string) => void;
  findOne: (id: string) => Promise<void>;
  movies: MoviesProps[];
}

const Context = createContext({} as ContextProps);

export const MoviesProvider = ({ children }: ProviderProps) => {
  const [originalMovieList, setOriginalMovieList] = useState([]);
  const [movies, setMovies] = useState<MoviesProps[]>([]);

  const listAll = async () => {
    const { data } = useQuery(LIST_ALL);

    if (data) {
      setOriginalMovieList(data.allFilms.films);
      setMovies(data.allFilms.films);
    }
  };

  const searchMovies = (value: string) => {
    if (value === "") {
      setMovies(originalMovieList);
      return;
    }

    const filteredMovies = movies.filter((movie) => {
      const title = movie.title.toLowerCase();

      if (title.includes(value)) {
        return movie;
      }
    });

    setMovies(filteredMovies);
  };

  const findOne = async (id: string) => {};

  return (
    <Context.Provider value={{ listAll, searchMovies, findOne, movies }}>
      {children}
    </Context.Provider>
  );
};

export const useMovies = () => useContext(Context);
