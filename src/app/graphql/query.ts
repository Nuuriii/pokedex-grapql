import { gql } from "@apollo/client";

const GET_POKEMON_LIST = gql`
  query getPokemonList($limit: Int) {
    pokemons(limit: $limit, offset: 0) {
      results {
        name
        url
        artwork
      }
    }
  }
`;

const GET_POKEMON_DETAIL = gql`
  query getPokemonDetail($name: String!) {
    pokemon(name: $name) {
      id
      name
      base_experience
      height
      stats {
        base_stat
        stat {
          name
        }
      }
      types {
        type {
          name
        }
      }
    }
  }
`;

export { GET_POKEMON_LIST, GET_POKEMON_DETAIL };
