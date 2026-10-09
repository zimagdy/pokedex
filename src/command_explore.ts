import { State } from "./state.js";

export async function commandExplore(state: State) {
  console.log(`Exploring ${state.locationName}...`);

  const pokemon = await state.pokeapi.fetchLocation(state.locationName);
  console.log("Found Pokemon: ");

  // print pokemon
  for (const poke of pokemon.pokemon) {
    console.log(` - ${poke.pokemon.name}`);
  }
}
