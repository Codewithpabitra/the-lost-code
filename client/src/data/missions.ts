export type MissionLanguage = "javascript" | "solidity";

export interface Mission {
  chapterId: string;
  title: string;
  subtitle: string;
  difficulty: "Beginner" | "Easy" | "Intermediate" | "Advanced";

  language: MissionLanguage;
  contentFile: string;

  objective: string;
  concept: string;
  initialCode: string;
  expectedOutput: string;
  hint: string;
  xp: number;
}

export const missions: Mission[] = [
  {
    chapterId: "origin-01",
    title: "The First Line",
    subtitle: "The awakening of a forgotten world",
    difficulty: "Beginner",

    language: "javascript",
    contentFile: "origin-01",

    objective:
      'Write a JavaScript command that displays "Hello, World!" in the output terminal.',

    concept: "console.log()",

    initialCode: "// Your first line of JavaScript\n",

    expectedOutput: "Hello, World!",

    hint: "JavaScript uses console.log() to display information. Put your message inside quotation marks and pass it between the parentheses.",

    xp: 100,
  },

  {
    chapterId: "origin-02",
    title: "Variables & Secrets",
    subtitle: "The message hidden inside the machine",
    difficulty: "Beginner",

    language: "javascript",
    contentFile: "origin-02",

    objective:
      'Create a variable named message containing "The code lives!" and display the variable using console.log().',

    concept: "Variables",

    initialCode: "// Store the secret message here\n",

    expectedOutput: "The code lives!",

    hint: 'Use const or let to create a variable. Assign "The code lives!" to message, then print message using console.log().',

    xp: 150,
  },

  {
    chapterId: "origin-03",
    title: "The Data Temple",
    subtitle: "Understanding the language of machines",
    difficulty: "Easy",

    language: "javascript",
    contentFile: "origin-03",

    objective:
      "Create a variable named score with the numerical value 100. Print the variable to the terminal.",

    concept: "Data Types & Numbers",

    initialCode: "// Create your score variable\n",

    expectedOutput: "100",

    hint: "Store 100 without quotation marks in a variable named score. Then display score using console.log().",

    xp: 200,
  },

  {
    chapterId: "syntax-01",
    title: "The Logic Gate",
    subtitle: "The first test of intelligence",
    difficulty: "Easy",

    language: "javascript",
    contentFile: "syntax-01",

    objective:
      'Create a variable named level with the value 5. Use an if statement to display "Unlocked" when level is greater than or equal to 5.',

    concept: "Conditional Statements",

    initialCode: "// Your mission begins here\n",

    expectedOutput: "Unlocked",

    hint: 'Create the level variable first. Then write if (level >= 5) and place console.log("Unlocked") inside the curly braces.',

    xp: 250,
  },

  {
    chapterId: "syntax-02",
    title: "The Repetition Rune",
    subtitle: "Activate the five energy crystals",
    difficulty: "Easy",
    language: "javascript",
    contentFile: "syntax-02",
    objective:
      'Use a for loop to print "Crystal 1 activated" through "Crystal 5 activated", each on a separate line.',
    concept: "Loops",
    initialCode: "// Activate all five crystals using a loop\n",
    expectedOutput:
      "Crystal 1 activated\nCrystal 2 activated\nCrystal 3 activated\nCrystal 4 activated\nCrystal 5 activated",
    hint: "Use a for loop starting at 1 and ending at 5. Use console.log() with a template literal to display the crystal number.",
    xp: 300,
  },

  {
    chapterId: "syntax-03",
    title: "The Function Forge",
    subtitle: "Build your first reusable command",
    difficulty: "Easy",
    language: "javascript",
    contentFile: "syntax-03",
    objective:
      "Create a function named calculateEnergy that accepts two parameters, returns their sum, and prints the result of calling it with 40 and 60.",
    concept: "Functions & Return Values",
    initialCode: "// Create your calculateEnergy function\n",
    expectedOutput: "100",
    hint: "Create calculateEnergy(a, b), return a + b, then call console.log(calculateEnergy(40, 60)).",
    xp: 350,
  },

  {
    chapterId: "async-01",
    title: "The Callback Signal",
    subtitle: "Send and receive the signal",
    difficulty: "Intermediate",
    language: "javascript",
    contentFile: "async-01",
    objective:
      'Create sendSignal(callback), print "Signal sent", and execute the callback. Pass a callback that prints "Signal received".',
    concept: "Callbacks",
    initialCode: "// Create your callback function\n",
    expectedOutput: "Signal sent\nSignal received",
    hint: "Accept a function as a parameter. Print the first message, then call the callback. Pass an arrow function when calling sendSignal().",
    xp: 400,
  },

  {
    chapterId: "async-02",
    title: "The Promise Bridge",
    subtitle: "Resolve the bridge activation",
    difficulty: "Intermediate",
    language: "javascript",
    contentFile: "async-02",
    objective:
      'Create a Promise that resolves with "Bridge unlocked" and use .then() to print the resolved message.',
    concept: "Promises",
    initialCode: "// Create and resolve your Promise\n",
    expectedOutput: "Bridge unlocked",
    hint: 'Use new Promise() with resolve, call resolve("Bridge unlocked"), and attach a .then() handler that prints the result.',
    xp: 450,
  },

  {
    chapterId: "async-03",
    title: "The Async Portal",
    subtitle: "Unlock the portal with async/await",
    difficulty: "Intermediate",
    language: "javascript",
    contentFile: "async-03",
    objective:
      'Create an async function named activatePortal that awaits a Promise resolving with "Portal activated" and prints the result.',
    concept: "Async/Await",
    initialCode: "// Activate the portal using async/await\n",
    expectedOutput: "Portal activated",
    hint: 'Create an async function. Inside it, await Promise.resolve("Portal activated"), then print the returned value.',
    xp: 500,
  },

  {
    chapterId: "core-01",
    title: "The Array Vault",
    subtitle: "Collect and organize the energy crystals",
    difficulty: "Intermediate",
    language: "javascript",
    contentFile: "core-01",
    objective:
      "Create an array named crystals containing Ruby, Sapphire, and Emerald. Add Diamond using push(), then print its length and the complete array.",
    concept: "Arrays & Array Methods",
    initialCode: "// Create and modify your crystals array\n",
    expectedOutput: '4\n["Ruby","Sapphire","Emerald","Diamond"]',
    hint: 'Create the array, use crystals.push("Diamond"), then print crystals.length and JSON.stringify(crystals).',
    xp: 550,
  },

  {
    chapterId: "core-02",
    title: "The Object Archive",
    subtitle: "Build the identity of your hero",
    difficulty: "Intermediate",
    language: "javascript",
    contentFile: "core-02",
    objective:
      'Create a hero object with name "Knight", level 10, and health 100. Update level to 11, add weapon "Excalibur", then print name, level, and weapon on separate lines.',
    concept: "Objects & Properties",
    initialCode: "// Create your hero object\n",
    expectedOutput: "Knight\n11\nExcalibur",
    hint: "Create the hero object, update hero.level, add hero.weapon, and print each requested property using console.log().",
    xp: 600,
  },

  {
    chapterId: "core-03",
    title: "The Algorithm Trial",
    subtitle: "Prove your problem-solving skills",
    difficulty: "Advanced",
    language: "javascript",
    contentFile: "core-03",
    objective:
      "Implement a linearSearch function that accepts an array and target, returns the target index if found, or -1 otherwise. Test it with [12, 25, 37, 48, 59] and target 37.",
    concept: "Algorithms & Linear Search",
    initialCode: "// Implement linearSearch(arr, target)\n",
    expectedOutput: "2",
    hint: "Loop through the array using an index. If arr[i] equals target, return i. If the loop finishes without finding it, return -1. Print the function call result.",
    xp: 650,
  },
];

/**
 * Vite imports Markdown files as raw strings.
 * This keeps lesson content separate from mission metadata.
 */
const missionContent = import.meta.glob<string>("../content/missions/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
});

export function getMissionContent(contentFile: string): string {
  const filePath = `../content/missions/${contentFile}.md`;

  return (
    missionContent[filePath] ??
    "# Mission content unavailable\n\nThis lesson has not been added yet."
  );
}
