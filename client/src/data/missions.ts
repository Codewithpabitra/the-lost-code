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
