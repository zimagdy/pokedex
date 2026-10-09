import { createInterface, type Interface } from "node:readline";
import { CLICommand, Pokemon } from "./command.js";
import { stdin, stdout } from "node:process";
import { getCommands } from "./command.js";
import { PokeAPI } from "./pokeapi.js";

export type State = {
  rl: Interface;
  commands: Record<string, CLICommand>;
  pokeapi: PokeAPI;
  nextLocationsURL: string | null;
  prevLocationsURL: string | null;
  locationName: string;
  pokedex: Record<string, Pokemon>;
};

export function initState(): State {
  const rl = createInterface({
    input: stdin,
    output: stdout,
    prompt: "Pokedex > ",
  });

  const pokeapi = new PokeAPI();

  const commands = getCommands();

  return {
    rl,
    commands,
    pokeapi,
    nextLocationsURL: null,
    prevLocationsURL: null,
    locationName: "",
    pokedex: {
      "": {
        base_experience: 0,
        height: 0,
        weight: 0,
        caught: false,
      },
    },
  };
}
