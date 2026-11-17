
<div align="center">

  <img src="assets/logo.svg" alt="The Lost Code logo" width="180" />

  # THE LOST CODE WORLD

  ### A story-driven RPG where you learn to code by completing missions.

  **Explore. Learn. Solve. Level up.**

  <p>
    <img src="https://img.shields.io/badge/Status-In%20Development-f59e0b?style=for-the-badge" alt="In Development" />
    <img src="https://img.shields.io/badge/License-Proprietary-dc2626?style=for-the-badge" alt="Proprietary License" />
  </p>

  <p>
    <img src="https://img.shields.io/github/last-commit/Codewithpabitra/the-lost-code?style=flat-square" alt="Last commit" />
    <img src="https://img.shields.io/github/issues/Codewithpabitra/the-lost-code?style=flat-square" alt="Issues" />
    <img src="https://img.shields.io/github/stars/Codewithpabitra/the-lost-code?style=flat-square" alt="Stars" />
    <img src="https://img.shields.io/github/languages/top/Codewithpabitra/the-lost-code?style=flat-square" alt="Primary language" />
  </p>

</div>

---

## About

**The Lost Code** turns the journey of learning programming into an adventure.

Instead of moving through ordinary lessons, players enter a game world, follow a story, complete coding missions, and earn XP as they develop their programming skills.

Each mission introduces a programming concept and challenges players to apply what they have learned.

The goal is simple:

**Make learning to code feel less like reading a textbook and more like progressing through a game.**

## Features

- **Story-driven learning** — Learn programming through an immersive game world.
- **Interactive coding missions** — Write and submit code to complete challenges.
- **Code evaluation** — Solutions are evaluated by the backend.
- **Progression system** — Unlock missions by completing previous challenges.
- **XP and achievements** — Earn experience points and track milestones.
- **Player authentication** — Save player progress through an account.
- **Light and dark themes** — Choose your preferred interface.
- **Responsive interface** — Designed for different screen sizes.

## Mission Progression

The current JavaScript learning path contains 12 missions.

| Chapter | Mission | XP |
|---|---|---:|
| Origin | The First Line | 100 |
| Origin | Variables & Secrets | 150 |
| Origin | The Data Temple | 200 |
| Syntax | The Logic Gate | 250 |
| Syntax | The Repetition Rune | 300 |
| Syntax | The Function Forge | 350 |
| Async | The Callback Signal | 400 |
| Async | The Promise Bridge | 450 |
| Async | The Async Portal | 500 |
| Core | The Array Vault | 550 |
| Core | The Object Archive | 600 |
| Core | The Algorithm Trial | 650 |

**Total available XP: 4,500**

> The project is actively being developed. Features, mission content, and supported languages may change.

## Tech Stack

| Area | Technologies |
|---|---|
| Frontend | React, Vite, TypeScript |
| Styling | Tailwind CSS |
| Animations | Motion |
| Icons | Lucide React |
| Code Editor | Monaco Editor |
| Backend | Node.js, Express, TypeScript |
| Database | MongoDB, Mongoose |
| Code Evaluation | Judge0 |
| Routing | React Router |

## Project Structure

```text
the-lost-code/
│
├── client/                 # React + Vite frontend
│   ├── public/
│   └── src/
│
├── server/                 # Express + TypeScript API
│   └── src/
│
├── execution-engine/       # Execution-related resources
│
├── assets/                 # Repository assets
│
├── .github/                # GitHub templates and workflows
│
├── README.md
├── LICENSE
├── SECURITY.md
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
└── SUPPORT.md
```

## Getting Started

### Prerequisites

Make sure you have installed:

- Node.js
- npm
- Git
- MongoDB database (local or MongoDB Atlas)

### 1. Clone the repository

```bash
git clone https://github.com/Codewithpabitra/the-lost-code.git

cd the-lost-code
```

### 2. Set up the backend

```bash
cd server

npm install
```

Create a `.env` file inside the `server` directory:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_long_random_secret
CLIENT_URL=http://localhost:5173
```

Start the backend:

```bash
npm run dev
```

The backend runs on port `5000` by default.

### 3. Set up the frontend

Open another terminal:

```bash
cd client

npm install
```

Create a `.env` file inside the `client` directory:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

Vite will display the local development URL in your terminal, normally:

```text
http://localhost:5173
```

## Environment Variables

| Variable | Location | Description |
|---|---|---|
| `PORT` | Server | Backend server port |
| `MONGODB_URI` | Server | MongoDB connection string |
| `JWT_SECRET` | Server | Authentication token secret |
| `CLIENT_URL` | Server | Frontend origin |
| `VITE_API_URL` | Client | Backend API base URL |

**Important:** Never commit `.env` files, database credentials, API keys, or authentication tokens.

## Project Principles

- **Server-authoritative progression:** Mission completion and XP rewards are validated by the backend.
- **Separation of concerns:** Learning content, UI, evaluation, and progression logic have separate responsibilities.
- **Progressive learning:** Missions build on previously introduced concepts.
- **Maintainability:** The frontend and backend are developed as separate applications.

## Roadmap

Planned improvements include:

- More worlds, chapters, and coding missions.
- Expanded programming language support.
- More achievements and progression features.
- Improved learning experiences and feedback.
- Further gameplay and interface improvements.

The roadmap may change as development continues.

## Screenshots

Screenshots will be added here as the game interface and learning worlds are finalized.

<!-- Example:
![World Map](assets/screenshots/world-map.png)
![Mission Interface](assets/screenshots/mission-interface.png)
-->

## Security

If you discover a security vulnerability, please follow the responsible disclosure instructions in [SECURITY.md](SECURITY.md).

Please do not publish sensitive vulnerability details in public issues.

## Support

For project-related questions and guidance, see [SUPPORT.md](SUPPORT.md).

## License and Usage

**The Lost Code is proprietary software. All rights are reserved by the copyright holder.**

No permission is granted to copy, modify, redistribute, sublicense, or commercially use this project's source code without prior written permission.

See [LICENSE](LICENSE) for the complete terms.

---

<div align="center">

  **THE LOST CODE**

  *Your next line of code is your next step forward.*

  Built with curiosity and code.

</div>