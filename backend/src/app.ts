import cors from "cors";
import express from "express";
import "express-async-errors";
import helmet from "helmet";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";
import routes from "./routes";

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(routes);
app.use(globalErrorHandler);

export default app;
