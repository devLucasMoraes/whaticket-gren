import { Router } from "express";
import authRoutes from "./authRoutes";
import queueRoutes from "./queueRoutes";
import userRoutes from "./userRoutes";
import whatsappRoutes from "./whatsappRoutes";

const routes = Router();

routes.use(authRoutes);
routes.use(userRoutes);
routes.use(queueRoutes);
routes.use(whatsappRoutes);

export default routes;
