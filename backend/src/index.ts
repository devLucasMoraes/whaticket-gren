import gracefulShutdown from "http-graceful-shutdown";
import "reflect-metadata";
import app from "./app";
import { appDataSource } from "./database/data-source";
import { socketManager } from "./libs/socketManager";

const startServer = async () => {
  try {
    await appDataSource.initialize();
    console.log("Database connected");

    const server = app.listen(process.env.PORT, () => {
      console.info(`Server started on port: ${process.env.PORT}`);
    });

    socketManager.initializeIO(server);
    gracefulShutdown(server);
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    process.exit(1);
  }
};

startServer();
