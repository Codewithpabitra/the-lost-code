
import "dotenv/config";

import app from "./app";
import { connectDatabase } from "./config/databse.js";

const PORT = Number(process.env.PORT) || 5000;

const startServer = async (): Promise<void> => {
  await connectDatabase();

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
};

startServer();