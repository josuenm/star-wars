import { gql } from "@apollo/client";

export const LIST_ALL_MOVIES = gql`
  query {
    allFilms {
      films {
        id
        title
        director
        releaseDate
        producers
      }
    }
  }
`;

export const GET_ONE_MOVIE = gql`
  query Film($filmId: ID) {
    film(id: $filmId) {
      title
      director
      releaseDate
      producers
      planetConnection {
        planets {
          id
          name
          population
          terrains
          climates
          gravity
        }
      }
    }
  }
`;
