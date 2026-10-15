import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandExplore } from "./command_explore.js";
import { commandMap, commandMapd } from "./command_map.js";
import { State } from "../state.js";
import { catchPokemon } from "./command_catch.js";

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State) => void;
};

export type Pokemon = {
  base_experience: number;
  height: number;
  weight: number;
  caught: boolean;
};

export function getCommands(): Record<string, CLICommand> {
  return {
    exit: {
      name: "exit",
      description: "Exit the Pokedex",
      callback: commandExit,
    },
    help: {
      name: "help",
      description: "Displays a help message",
      callback: commandHelp,
    },
    explore: {
      name: "explore",
      description: "Explore location area",
      callback: commandExplore,
    },
    map: {
      name: "map",
      description: "Return the 20 next locations",
      callback: commandMap,
    },
    mapd: {
      name: "mapd",
      description: "Return the 20 previous locations",
      callback: commandMapd,
    },
    catch: {
      name: "catch",
      description: "Try to catch the pokemon",
      callback: catchPokemon,
    },
    clear: {
      name: "clear",
      description: "Clear the terminal",
      callback: () => {
        console.clear();
      },
    },
  };
}
