import cors from "cors";
import express from "express";
import "express-async-errors";
import helmet from "helmet";
import "reflect-metadata";
import { AppDataSource } from "./database/data-source";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";
import routes from "./routes";

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => console.log(error));

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(routes);
app.use(globalErrorHandler);

export default app;
