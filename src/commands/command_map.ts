import { State } from "../state.js";

export const commandMap = async (state: State) => {
  // Declare
  const next = state.nextLocationsURL || undefined;

  // Fetch
  const nextResult = await state.pokeapi.fetchLocations(next);

  // Update
  state.nextLocationsURL = nextResult.next;
  state.prevLocationsURL = nextResult.previous;

  // Print
  for (const location of nextResult.results) {
    console.log(location.name);
  }
};

export const commandMapd = async (state: State) => {
  // Declate
  const prev = state.prevLocationsURL || undefined;

  // Fetch
  const prevResult = await state.pokeapi.fetchLocations(prev);

  // Update
  state.nextLocationsURL = prevResult.next;
  state.prevLocationsURL = prevResult.previous;

  // Print
  for (const location of prevResult.results) {
    console.log(location.name);
  }
};
