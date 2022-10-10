import { useQuery } from "@apollo/client";
import { AnimatedPage, Header, SafeArea } from "@components";
import { GET_ONE_MOVIE } from "@services/graphql/movies";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface PlanetProps {
  id: string;
  name: string;
  population: number;
  terrains: string[];
  climates: string[];
  gravity: string;
}

const PlanetCard = ({ planet }: { planet: PlanetProps }) => {
  return (
    <div className="text-white w-full md:w-[380px] md:h-[330px] border border-stone-700 rounded p-2 flex flex-col justify-between gap-3 active:border-sky-400 md:hover:border-sky-400">
      <h2 className="text-2xl font-bold mb-2">{planet.name}</h2>

      {planet.gravity && (
        <div>
          <h2 className="text-lg font-medium">Gravity:</h2>
          <p>{planet.gravity}</p>
        </div>
      )}

      {planet.population && (
        <div>
          <span>Population:</span>
          <span className="ml-2">{planet.population}</span>
        </div>
      )}

      {planet.terrains && (
        <div>
          <h2 className="text-lg font-medium">Terrain:</h2>
          <ul className="list-disc ml-5">
            {planet.terrains.length > 2 ? (
              <>
                {planet.terrains.slice(0, 2).map((terrain: string) => (
                  <li key={terrain} className="font-light">
                    {terrain}
                  </li>
                ))}
                <li className="font-light">And others</li>
              </>
            ) : (
              planet.terrains.map((terrain: string) => (
                <li key={terrain} className="font-light">
                  {terrain}
                </li>
              ))
            )}
          </ul>
        </div>
      )}

      {planet.climates && (
        <div>
          <h2 className="text-lg font-medium">Climates:</h2>
          <ul className="list-disc ml-5">
            {planet.climates.length > 2 ? (
              <>
                {planet.climates.slice(0, 2).map((climate: string) => (
                  <li key={climate} className="font-light">
                    {climate}
                  </li>
                ))}
                <li>And others</li>
              </>
            ) : (
              planet.climates.map((climate: string) => (
                <li key={climate} className="font-light">
                  {climate}
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

const SelectedMovie = () => {
  const location = useLocation();
  const id = location.pathname.substring(8, location.pathname.length);

  const { data } = useQuery(GET_ONE_MOVIE, { variables: { filmId: id } });

  useEffect(() => {
    data && (document.title = data.film.title + " - Star Wars");
  }, [data]);

  return (
    <AnimatedPage>
      <Header backTo="/movies" paths={["dashboard", "movies", "movie"]} />

      <SafeArea className="text-white pt-24 pb-12 flex flex-col gap-12">
        <div className="flex flex-col gap-2">
          <h1 className="text-5xl font-bold">{data && data.film.title}</h1>
          <div>
            {data && (
              <div>
                <span className="text-lg font-medium">Release:</span>
                <span className="font-light ml-1">
                  {data && data.film.releaseDate}
                </span>
              </div>
            )}
            {data && (
              <div>
                <span className="text-lg font-medium">Director:</span>
                <span className="font-light ml-1">{data.film.director}</span>
              </div>
            )}
          </div>
        </div>

        {data && (
          <div>
            <h2 className="text-3xl font-medium">Producers:</h2>
            <ul className="list-disc ml-5">
              {data.film.producers.map((producer: string) => (
                <li key={producer}>{producer}</li>
              ))}
            </ul>
          </div>
        )}

        {data && (
          <div>
            <h2 className="text-3xl font-medium">Planets:</h2>

            <div className="mt-8 flex flex-col gap-5 md:flex-row md:justify-between flex-wrap">
              {data.film.planetConnection.planets.map((planet: PlanetProps) => (
                <PlanetCard key={planet.id} planet={planet} />
              ))}
            </div>
          </div>
        )}
      </SafeArea>
    </AnimatedPage>
  );
};

export default SelectedMovie;
