import { Cache } from "./pokecache.js";

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  #pokeCache = new Cache(100000);

  constructor() {}

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const url = pageURL ? pageURL : PokeAPI.baseURL + "/location-area";
    try {
      // check here
      const val = this.#pokeCache.get(url)?.val;
      if (val !== undefined) {
        return val;
      }

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Respone failed: ${response.status}`);
      }

      const data = await response.json();

      const store = {
        count: data.count,
        next: data.next,
        previous: data.previous,
        results: data.results,
      };

      this.#pokeCache.add(url, store);

      return store;
    } catch (e) {
      console.error("Fetch Failed", e);
      throw e;
    }
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const url = PokeAPI.baseURL + "/location-area/" + locationName;

    try {
      const response = await fetch(url);
      const val = this.#pokeCache.get(url)?.val;

      if (val !== undefined) return val;

      if (!response.ok) {
        throw new Error(`Respone failed: ${response.status}`);
      }

      const data = await response.json();

      const store = {
        pokemon: data.pokemon_encounters,
      };

      this.#pokeCache.add(url, store);

      return store;
    } catch (e) {
      console.error("Fetch Failed", e);
      throw e;
    }
  }

  async catchPokemon(pokemonName: string): Promise<ForCatch> {
    const url = PokeAPI.baseURL + "/pokemon/" + pokemonName;

    try {
      const val = this.#pokeCache.get(url)?.val;

      if (val !== undefined) {
        return val;
      }

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Response Failed: ${response.status}`);
      }

      const data = await response.json();

      const store = {
        height: data.height,
        weight: data.weight,
        base_experience: data.base_experience,
      };

      this.#pokeCache.add(url, store);

      return store;
    } catch (e) {
      console.error("Fetch Failed ", e);
      throw e;
    }
  }

  close() {
    this.#pokeCache.stopReapLoop();
  }
}

interface locationResult {
  name: string;
  url: string;
}

interface pokemon {
  pokemon: {
    name: string;
    url: string;
  };
  version_details: any;
}

export type ShallowLocations = {
  count: number;
  next: string | null;
  previous: string | null;
  results: locationResult[];
};

export type Location = {
  pokemon: pokemon[];
};

export type ForCatch = {
  height: number;
  weight: number;
  base_experience: number;
};
