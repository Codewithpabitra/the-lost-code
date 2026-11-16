export interface Mission {
  chapterId: string;
  title: string;
  subtitle: string;
  difficulty: "Beginner" | "Easy" | "Intermediate" | "Advanced";
  story: string[];
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

    story: [
      `You open your eyes in a place you cannot recognize. Towering ruins stretch across the horizon, ancient machines lie buried beneath the earth, and strange symbols glow faintly across the broken walls.`,

      `In front of you stands an enormous terminal. Its screen flickers for a moment before displaying a mysterious message: "SYSTEM FAILURE — COMMUNICATION LOST". It appears that this machine once controlled something important, but its ability to communicate has been lost.`,

      `A faint voice suddenly echoes through the chamber. "If you can hear me, the system is not completely lost. Give it a command. Make it speak again."`,

      `You discover that the terminal understands JavaScript. It cannot respond to complicated instructions yet, but it can display messages through a special command called console.log(). This is where your journey begins.`,

      `Your first task is simple: restore the terminal's voice. Once it can display a message, you will have taken the first step toward bringing this forgotten world back to life.`,
    ],

    objective: `Write a JavaScript command that displays "Hello, World!" in the output terminal. Make sure the message matches exactly, including capitalization and punctuation.`,

    concept: "console.log()",

    initialCode: `// Your first line of JavaScript\n`,

    expectedOutput: "Hello, World!",

    hint: `JavaScript uses console.log() to display information. Put your message inside quotation marks and pass it between the parentheses.`,

    xp: 100,
  },

  {
    chapterId: "origin-02",
    title: "Variables & Secrets",
    subtitle: "The message hidden inside the machine",
    difficulty: "Beginner",

    story: [
      `The terminal has finally awakened. Its screen lights up, revealing a map of the surrounding ruins. But before the map can be fully restored, a security door blocks your path.`,

      `An inscription appears above the door: "A message without a memory cannot survive." Behind the door lies an encrypted message left by the civilization that built this place.`,

      `You discover that the machine can remember information using something called a variable. A variable is like a container: you give it a name, store a value inside it, and retrieve that value whenever you need it.`,

      `The ancient system has already identified a secret message, but it needs you to store that message in memory before it can unlock the door.`,

      `Your task is to create a variable named message, store the secret inside it, and ask the terminal to display its contents.`,
    ],

    objective: `Create a variable named message containing "The code lives!" and display the variable using console.log().`,

    concept: "Variables",

    initialCode: `// Store the secret message here\n`,

    expectedOutput: "The code lives!",

    hint: `Use const or let to create a variable. Assign the text "The code lives!" to message, then print message using console.log().`,

    xp: 150,
  },

  {
    chapterId: "origin-03",
    title: "The Data Temple",
    subtitle: "Understanding the language of machines",
    difficulty: "Easy",

    story: [
      `The security door opens. Beyond it, you discover an enormous temple filled with floating symbols, glowing numbers, and fragments of forgotten data.`,

      `At the center of the temple stands a device known as the Memory Archive. It contains information about the civilization that once lived here. However, the archive cannot interpret every symbol in the same way.`,

      `Some values represent numbers. Others represent text. Some represent true or false conditions. JavaScript calls these different kinds of information data types.`,

      `The archive needs you to restore a numerical record before it can continue. You find an inscription showing that the ancient system used a variable called score to remember a player's progress.`,

      `You must create this variable, store the correct numerical value, and display it. Be careful: the number must be stored as a number, not as text.`,
    ],

    objective: `Create a variable named score with the numerical value 100. Print the variable to the terminal.`,

    concept: "Data Types & Numbers",

    initialCode: `// Create your score variable\n`,

    expectedOutput: "100",

    hint: `Store 100 without quotation marks in a variable named score. Then display score using console.log().`,

    xp: 200,
  },

  {
    chapterId: "syntax-01",
    title: "The Logic Gate",
    subtitle: "The first test of intelligence",
    difficulty: "Easy",

    story: [
      `The Memory Archive reveals a hidden passage leading toward the Syntax Wilds. But the entrance is protected by a mechanical gate that has remained closed for centuries.`,

      `A display above the gate reads: "ONLY THOSE WHO UNDERSTAND THE RULES MAY PASS." Beneath the message, a numerical requirement appears: LEVEL 5.`,

      `You discover that the gate is controlled by a conditional system. It evaluates a condition and decides what action should happen. In JavaScript, this is done using an if statement.`,

      `The machine must check whether the current level is greater than or equal to 5. If that condition is true, the gate will recognize the player as authorized and display the word "Unlocked".`,

      `This is your first encounter with program logic. You are no longer simply displaying information. You are teaching the machine how to make a decision.`,
    ],

    objective: `Create a variable named level with the value 5. Use an if statement to display "Unlocked" when level is greater than or equal to 5.`,

    concept: "Conditional Statements",

    initialCode: `// Your mission begins here\n`,

    expectedOutput: "Unlocked",

    hint: `Create the level variable first. Then write if (level >= 5) and place console.log("Unlocked") inside the curly braces.`,

    xp: 250,
  },
];
