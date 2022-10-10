import { Link } from "react-router-dom";

type MoviesProps = {
  id: string;
  title: string;
  director: string;
  releaseDate: string;
  producers: string[];
};

interface MovieCardProps {
  movie: MoviesProps;
}

export const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <Link to={"/movies/" + movie.id}>
      <div className="text-white w-full md:w-[380px] h-[200px] border border-stone-700 rounded p-2 flex flex-col justify-between gap-3 active:border-sky-400 md:hover:border-sky-400">
        <h2 className="font-bold text-2xl">{movie.title}</h2>
        <div>
          <p className="text-lg font-normal">Producers:</p>
          <ul>
            {movie.producers.map((producer) => (
              <li key={producer} className="text-sm font-light list-disc ml-5">
                {producer}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <span className="text-lg font-normal">Release:</span>
          <span className="text-sm font-light ml-2">{movie.releaseDate}</span>
        </div>
      </div>
    </Link>
  );
};
