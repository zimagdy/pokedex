import { State } from "./state.js";

export function sleep(n: number) {
  return new Promise((resolve) => setTimeout(resolve, n));
}

export function cleanInput(input: string): string[] {
  return input.trim().match(/\S+/g) ?? [];
}

export function startREPL(state: State) {
  const rl = state.rl;
  const commands = state.commands;

  // Welcome
  console.log(`\nWelcome to the Pokedex!
  Usage: \n 
  help: ${commands["help"].description}
  exit: ${commands["exit"].description}
  explore: ${commands["explore"].description}
  map: ${commands["map"].description}
  mapd: ${commands["mapd"].description}
  catch: ${commands["catch"].description}
  clear: ${commands["clear"].description}\n`);

  // Start the prompt
  rl.prompt();
  rl.on("line", async (input: any) => {
    if (input === "") {
      await sleep(250);
      console.log("\n");
      rl.prompt();
      return;
    }

    const words = cleanInput(input);
    const commandName = words[0];

    const args = words.slice(1);

    switch (commandName) {
      case "explore":
        state.locationName = args[0];
        break;

      case "catch":
        state.pokemonName = args[0];
        break;
    }

    // I build this to avoid error when we close the readline
    if (commandName === "exit") {
      commands[commandName].callback(state);
      return;
    }

    //Check if the input is exist in commands or not
    if (Object.hasOwn(commands, commandName)) {
      await commands[commandName].callback(state);
    } else {
      console.log(`
      Unknown command: ${commandName}
      `);
    }

    rl.prompt();
  });
}
