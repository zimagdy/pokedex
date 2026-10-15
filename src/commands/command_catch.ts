import { State } from "../state.js";

export const catchPokemon = async (state: State) => {
  console.log(`Throwing a Pokeball at ${state.pokemonName}...`);

  // Fetch the data
  const data = await state.pokeapi.catchPokemon(state.pokemonName);

  // Update the pokedex
  state.pokedex = {
    [state.pokemonName]: {
      base_experience: data.base_experience,
      height: data.height,
      weight: data.weight,
      caught: false,
    },
  };

  const pokemon = state.pokedex[state.pokemonName];
  // Calculate catch chance
  const catchDifficulty =
    pokemon.base_experience / 100 + pokemon.weight / 200 + pokemon.height / 20;

  const catchChance = 1 / (1 + catchDifficulty);

  const randomRoll = Math.random();

  if (randomRoll < catchChance) {
    console.log(`${state.pokemonName} was caught!`);
    pokemon.caught = true;
  } else {
    console.log(`${state.pokemonName} escaped!`);
  }
};
