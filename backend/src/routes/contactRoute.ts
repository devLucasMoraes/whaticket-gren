import { Router } from "express";
import { ContactController } from "../controllers/ContactController";
import { isAuth } from "../middlewares/isAuth";
import { ContactServiceImpl } from "../services/impl/ContactServiceImpl";

const contactService = new ContactServiceImpl();
const contactController = new ContactController(contactService);

const contactRoutes = Router();

contactRoutes.get("/contacts", isAuth, contactController.list);

contactRoutes.post("/contacts", isAuth, contactController.create);

contactRoutes.get("/contacts/:contactId", isAuth, contactController.show);

contactRoutes.put("/contacts/:contactId", isAuth, contactController.update);

contactRoutes.delete("/contacts/:contactId", isAuth, contactController.delete);

export default contactRoutes;
