import { State } from "../state.js";

export function commandExit(state: State) {
  console.log("Closing the Pokedex... Goodbye!");

  // To stop setInterval
  state.pokeapi.close();
  state.rl.close();
}
