
export type ChapterStatus = "completed" | "current" | "locked";

export interface Chapter {
  id: string;
  number: string;
  title: string;
  status: ChapterStatus;
  xp: number;
  position: {
    x: number;
    y: number;
  };
}

export interface WorldRegion {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  theme: string;
  accent: string;
  icon: string;
  status: "unlocked" | "locked";
  progress: number;
  chapters: Chapter[];
}

export const worldRegions: WorldRegion[] = [
  {
    id: "origin",
    name: "THE ORIGIN",
    subtitle: "Where it all begins",
    description:
      "An ancient land where the first lines of code were written. Your journey starts here. Learn the fundamentals and discover the forgotten language.",
    theme: "from-blue-950 via-blue-900 to-slate-950",
    accent: "#38bdf8",
    icon: "⌘",
    status: "unlocked",
    progress: 100,
    chapters: [
      {
        id: "origin-01",
        number: "01",
        title: "The First Line",
        status: "completed",
        xp: 100,
        position: { x: 18, y: 68 },
      },
      {
        id: "origin-02",
        number: "02",
        title: "Variables & Secrets",
        status: "completed",
        xp: 150,
        position: { x: 48, y: 39 },
      },
      {
        id: "origin-03",
        number: "03",
        title: "The Data Temple",
        status: "completed",
        xp: 200,
        position: { x: 78, y: 64 },
      },
    ],
  },
  {
    id: "syntax",
    name: "SYNTAX WILDS",
    subtitle: "Master the language",
    description:
      "A wild territory filled with strange symbols and hidden logic. Master conditions, loops, and functions to survive this region.",
    theme: "from-emerald-950 via-teal-950 to-slate-950",
    accent: "#34d399",
    icon: "⌘",
    status: "unlocked",
    progress: 35,
    chapters: [
      {
        id: "syntax-01",
        number: "04",
        title: "The Logic Gate",
        status: "current",
        xp: 250,
        position: { x: 18, y: 66 },
      },
      {
        id: "syntax-02",
        number: "05",
        title: "The Repetition Rune",
        status: "locked",
        xp: 300,
        position: { x: 49, y: 38 },
      },
      {
        id: "syntax-03",
        number: "06",
        title: "The Function Forge",
        status: "locked",
        xp: 350,
        position: { x: 80, y: 64 },
      },
    ],
  },
  {
    id: "async",
    name: "ASYNC ABYSS",
    subtitle: "Beyond the ordinary",
    description:
      "Deep beneath the world lies a mysterious ocean of asynchronous events. Learn promises, async/await, and how JavaScript handles time.",
    theme: "from-indigo-950 via-violet-950 to-slate-950",
    accent: "#a78bfa",
    icon: "◈",
    status: "locked",
    progress: 0,
    chapters: [
      {
        id: "async-01",
        number: "07",
        title: "The Callback Signal",
        status: "locked",
        xp: 400,
        position: { x: 18, y: 66 },
      },
      {
        id: "async-02",
        number: "08",
        title: "The Promise Bridge",
        status: "locked",
        xp: 450,
        position: { x: 49, y: 38 },
      },
      {
        id: "async-03",
        number: "09",
        title: "The Async Portal",
        status: "locked",
        xp: 500,
        position: { x: 80, y: 64 },
      },
    ],
  },
  {
    id: "core",
    name: "THE CORE",
    subtitle: "Restore the lost code",
    description:
      "The heart of the broken system. Only the strongest adventurers can reach this place. Everything you have learned will be tested here.",
    theme: "from-rose-950 via-red-950 to-slate-950",
    accent: "#fb7185",
    icon: "✦",
    status: "locked",
    progress: 0,
    chapters: [
      {
        id: "core-01",
        number: "10",
        title: "The Array Vault",
        status: "locked",
        xp: 550,
        position: { x: 18, y: 66 },
      },
      {
        id: "core-02",
        number: "11",
        title: "The Object Archive",
        status: "locked",
        xp: 600,
        position: { x: 49, y: 38 },
      },
      {
        id: "core-03",
        number: "12",
        title: "The Algorithm Trial",
        status: "locked",
        xp: 650,
        position: { x: 80, y: 64 },
      },
    ],
  },
];