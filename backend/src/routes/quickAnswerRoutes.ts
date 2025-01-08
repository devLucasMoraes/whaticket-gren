import { Router } from "express";
import { QuickAnswerController } from "../controllers/QuickAnswerController";
import { isAuth } from "../middlewares/isAuth";
import { validateSchema } from "../middlewares/validateSchema";
import {
  quickAnswerCreateSchema,
  quickAnswerParamsSchema,
  quickAnswerUpdateSchema,
} from "../schemas/quickAnswer.schemas";
import { QuickAnswerServiceImpl } from "../services/impl/QuickAnswerServiceImpl";

const quickAnswerService = new QuickAnswerServiceImpl();
const quickAnswerController = new QuickAnswerController(quickAnswerService);

const quickAnswerRoutes = Router();

quickAnswerRoutes.get("/quickAnswers", isAuth, quickAnswerController.list);

quickAnswerRoutes.post(
  "/quickAnswers",
  isAuth,
  validateSchema({ body: quickAnswerCreateSchema }),
  quickAnswerController.create
);

quickAnswerRoutes.put(
  "/quickAnswers/:quickAnswerId",
  isAuth,
  validateSchema({
    body: quickAnswerUpdateSchema,
    params: quickAnswerParamsSchema,
  }),
  quickAnswerController.update
);

quickAnswerRoutes.get(
  "/quickAnswers/:quickAnswerId",
  isAuth,
  validateSchema({ params: quickAnswerParamsSchema }),
  quickAnswerController.show
);

quickAnswerRoutes.delete(
  "/quickAnswers/:quickAnswerId",
  isAuth,
  validateSchema({ params: quickAnswerParamsSchema }),
  quickAnswerController.delete
);

export default quickAnswerRoutes;
