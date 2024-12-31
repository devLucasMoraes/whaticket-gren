import { Router } from "express";
import { SessionController } from "../controllers/SessionController";
import { UserController } from "../controllers/UserController";
import { isAuth } from "../middlewares/isAuth";
import { validateSchema } from "../middlewares/validateSchema";
import { loginSchema } from "../schemas/auth.schemas";
import { userCreateSchema } from "../schemas/user.schemas";
import { AuthServiceImpl } from "../services/impl/AuthServiceImpl";
import { UserServiceImpl } from "../services/impl/UserServiceImpl";

const userService = new UserServiceImpl();
const userController = new UserController(userService);

const authService = new AuthServiceImpl(userService);
const sessionController = new SessionController(authService);

const authRoutes = Router();

authRoutes.post(
  "/signup",
  validateSchema({ body: userCreateSchema }),
  userController.create
);

authRoutes.post(
  "/login",
  validateSchema({ body: loginSchema }),
  sessionController.login
);

authRoutes.post("/refresh_token", sessionController.refresh);

authRoutes.delete("/logout", isAuth, sessionController.logout);

export default authRoutes;
