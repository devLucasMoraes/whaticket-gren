import { Router } from "express";
import authRoutes from "./authRoutes";
import queueRoutes from "./queueRoutes";
import quickAnswerRoutes from "./quickAnswerRoutes";
import userRoutes from "./userRoutes";
import whatsappRoutes from "./whatsappRoutes";

const routes = Router();

routes.use(authRoutes);
routes.use(userRoutes);
routes.use(queueRoutes);
routes.use(whatsappRoutes);
routes.use(quickAnswerRoutes);

export default routes;
