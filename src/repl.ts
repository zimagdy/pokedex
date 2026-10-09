import { State } from "./state.js";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function cleanInput(input: string): string[] {
  let result = input.split(" ");

  let result2: string[] = result.filter((word) => word.length > 0);

  return result2;
}

export function startREPL(state: State) {
  const rl = state.rl;
  const commands = state.commands;

  // Welcome
  console.log(`Welcome to the Pokedex!
  Usage: \n 
  help: ${commands["help"].description}
  exit: ${commands["exit"].description}
  explore: ${commands["explore"].description}`);

  // Start the prompt
  rl.prompt();
  rl.on("line", async (word: any) => {
    // Initalize next and prev
    const next = state.nextLocationsURL || undefined;
    const prev = state.prevLocationsURL || undefined;
    let pokemonName = "";

    let input = word.trim();

    if (input === "") {
      await sleep(250);
      rl.prompt();
      return;
    }

    const findExplore = cleanInput(input);

    if (findExplore.length > 1) {
      input = findExplore[0];

      if (input !== "explore") {
        pokemonName = findExplore[1];
      } else {
        state.locationName = findExplore[1];
      }
    }

    switch (input) {
      case "exit":
        commands["exit"].callback(state);
        return;

      case "help":
        commands["help"].callback(state);
        break;

      case "map":
        const nextResult = await state.pokeapi.fetchLocations(next);
        state.nextLocationsURL = nextResult.next;
        state.prevLocationsURL = nextResult.previous;
        // print names
        for (const location of nextResult.results) {
          console.log(location.name);
        }
        break;

      case "mapd":
        const prevResult = await state.pokeapi.fetchLocations(prev);
        state.nextLocationsURL = prevResult.next;
        state.prevLocationsURL = prevResult.previous;
        // print names
        for (const location of prevResult.results) {
          console.log(location.name);
        }
        break;

      case "explore":
        await commands["explore"].callback(state);
        break;

      case "catch":
        console.log(`Throwing a Pokeball at ${pokemonName}...`);

        // Fetch the data
        const data = await state.pokeapi.catchPokemon(pokemonName);

        // Update the pokedex
        state.pokedex = {
          [pokemonName]: {
            base_experience: data.base_experience,
            height: data.height,
            weight: data.weight,
            caught: false,
          },
        };

        const pokemon = state.pokedex[pokemonName];
        // Calculate catch chance
        const catchDifficulty =
          pokemon.base_experience / 100 +
          pokemon.weight / 200 +
          pokemon.height / 20;

        const catchChance = 1 / (1 + catchDifficulty);

        const randomRoll = Math.random();

        if (randomRoll < catchChance) {
          console.log(`${pokemonName} was caught!`);
          pokemon.caught = true;
        } else {
          console.log(`${pokemonName} escaped!`);
        }
        break;

      default:
        await sleep(150);
        console.log("Unknown command");
    }

    rl.prompt();
  });
}
