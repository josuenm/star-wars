import { gql } from "@apollo/client";

export const LIST_ALL = gql`
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
