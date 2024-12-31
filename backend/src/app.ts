import cors from "cors";
import express from "express";
import "express-async-errors";
import helmet from "helmet";
import "reflect-metadata";
import { AppDataSource } from "./database/data-source";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";
import routes from "./routes";

const app = express();

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected");
    app.use(helmet());
    app.use(cors());
    app.use(express.json());
    app.use(routes);
    app.use(globalErrorHandler);
    app.listen(process.env.PORT, () => {
      console.info(`Server started on port: ${process.env.PORT}`);
    });
  })
  .catch((error) => console.log(error));

export default app;
