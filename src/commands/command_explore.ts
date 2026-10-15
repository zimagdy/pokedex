import { State } from "../state.js";
import { sleep } from "../repl.js";

export async function commandExplore(state: State) {
  // Check
  if (state.locationName === "") {
    console.error(
      "\n Expected at least 1 argument to explore\nTry again...\n ",
    );
    await sleep(500);
    return;
  }

  console.log(`Exploring ${state.locationName}...`);

  const pokemon = await state.pokeapi.fetchLocation(state.locationName);
  console.log("Found Pokemon: ");

  // print pokemon
  for (const poke of pokemon.pokemon) {
    console.log(` - ${poke.pokemon.name}`);
  }
}
