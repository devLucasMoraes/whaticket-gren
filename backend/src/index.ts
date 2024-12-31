import gracefulShutdown from "http-graceful-shutdown";
import app from "./app";

const server = app;

gracefulShutdown(server);
