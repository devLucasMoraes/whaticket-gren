import { Router } from "express";
import { WhatsappController } from "../controllers/WhatsappController";
import { isAuth } from "../middlewares/isAuth";
import { validateSchema } from "../middlewares/validateSchema";
import {
  whatsappCreateSchema,
  whatsappParamsSchema,
  whatsappUpdateSchema,
} from "../schemas/whatsapp.schemas";
import { WhatsappServiceImpl } from "../services/impl/WhatsappServiceImpl";

const whatsappService = new WhatsappServiceImpl();
const whatsappController = new WhatsappController(whatsappService);

const whatsappRoutes = Router();

whatsappRoutes.get("/whatsapp", isAuth, whatsappController.list);

whatsappRoutes.post(
  "/whatsapp",
  isAuth,
  validateSchema({ body: whatsappCreateSchema }),
  whatsappController.create
);

whatsappRoutes.put(
  "/whatsapp/:id",
  isAuth,
  validateSchema({ body: whatsappUpdateSchema, params: whatsappParamsSchema }),
  whatsappController.update
);

whatsappRoutes.get(
  "/whatsapp/:id",
  isAuth,
  validateSchema({ params: whatsappParamsSchema }),
  whatsappController.show
);

whatsappRoutes.delete(
  "/whatsapp/:id",
  isAuth,
  validateSchema({ params: whatsappParamsSchema }),
  whatsappController.delete
);

export default whatsappRoutes;
