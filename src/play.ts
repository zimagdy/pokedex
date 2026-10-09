async function getData() {
  try {
    const response = await fetch("https://example.com");

    if (!response.ok) {
      throw new Error(`Fetch failed: ${response.status}`);
    }
    console.log(response);
    // console.log(data.results[0].name);
  } catch (e) {
    console.error("Error: ", e);
  }
}

getData();

/* 
async function getData() {
  const url = "https://pokeapi.co/api/v2/location-area?limit=5&offset=0";
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    console.log(result);
  } catch (e) {
    console.error("Error: ", e);
  }
} */

// getData();
// import { createInterface } from "node:readline";
// const rl = createInterface({
//   input: process.stdin,
//   output: process.stdout,
//   prompt: "HELLO> ",
// });
// // Display initial prompt
// rl.prompt();

// // Handle each line of input
// rl.on("line", (line: any) => {
//   const input = line.trim();

//   switch (input) {
//     case "hello":
//       console.log("Hello there!");
//       break;
//     case "time":
//       console.log(`Current time: ${new Date().toLocaleTimeString()}`);
//       break;
//     case "exit":
//       rl.close();
//       return;
//     default:
//       console.log(`You entered: ${input}`);
//   }

//   // Show the prompt again
//   rl.prompt();
// });

// // Handle application exit
// rl.on("close", () => {
//   console.log("Goodbye!");
//   process.exit(0);
// });
