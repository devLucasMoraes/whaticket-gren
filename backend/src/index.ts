import gracefulShutdown from "http-graceful-shutdown";
import app from "./app";
import { initIO } from "./libs/socket";

const server = app.listen(process.env.PORT, () => {
  console.info(`Server started on port: ${process.env.PORT}`);
});

initIO(server);
gracefulShutdown(server);
