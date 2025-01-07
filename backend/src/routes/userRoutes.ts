import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { isAuth } from "../middlewares/isAuth";
import { validateSchema } from "../middlewares/validateSchema";
import {
  userCreateSchema,
  userParamsSchema,
  userUpdateSchema,
} from "../schemas/user.schemas";
import { UserServiceImpl } from "../services/impl/UserServiceImpl";

const userService = new UserServiceImpl();
const userController = new UserController(userService);

const userRoutes = Router();

userRoutes.get("/users", isAuth, userController.list);

userRoutes.post(
  "/users",
  isAuth,
  validateSchema({ body: userCreateSchema }),
  userController.create
);

userRoutes.put(
  "/users/:id",
  isAuth,
  validateSchema({ body: userUpdateSchema, params: userParamsSchema }),
  userController.update
);

userRoutes.get(
  "/users/:id",
  isAuth,
  validateSchema({ params: userParamsSchema }),
  userController.show
);

userRoutes.delete(
  "/users/:id",
  isAuth,
  validateSchema({ params: userParamsSchema }),
  userController.delete
);

export default userRoutes;
