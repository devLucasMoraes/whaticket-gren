import { Router } from "express";
import { QueueController } from "../controllers/QueueController";
import { isAuth } from "../middlewares/isAuth";
import { validateSchema } from "../middlewares/validateSchema";
import {
  queueCreateSchema,
  queueParamsSchema,
  queueUpdateSchema,
} from "../schemas/queue.schemas";
import { QueueServiceImpl } from "../services/impl/QueueServiceImpl";

const queueService = new QueueServiceImpl();
const queueController = new QueueController(queueService);

const queueRoutes = Router();

queueRoutes.get("/queue", isAuth, queueController.list);

queueRoutes.post(
  "/queue",
  isAuth,
  validateSchema({ body: queueCreateSchema }),
  queueController.create
);

queueRoutes.put(
  "/queues/:id",
  isAuth,
  validateSchema({ body: queueUpdateSchema, params: queueParamsSchema }),
  queueController.update
);

queueRoutes.get(
  "/queues/:id",
  isAuth,
  validateSchema({ params: queueParamsSchema }),
  queueController.show
);

queueRoutes.delete(
  "/queues/:id",
  isAuth,
  validateSchema({ params: queueParamsSchema }),
  queueController.delete
);

export default queueRoutes;
