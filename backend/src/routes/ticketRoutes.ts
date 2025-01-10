import { Router } from "express";
import { TicketController } from "../controllers/TicketController";
import { isAuth } from "../middlewares/isAuth";
import { TicketServiceImpl } from "../services/impl/TicketServiceImpl";
import { UserServiceImpl } from "../services/impl/UserServiceImpl";
import { WhatsappServiceImpl } from "../services/impl/WhatsappServiceImpl";

const userService = new UserServiceImpl();
const whatsappService = new WhatsappServiceImpl(userService);
const ticketService = new TicketServiceImpl(whatsappService);
const ticketController = new TicketController(ticketService);

const ticketRoutes = Router();

ticketRoutes.get("/tickets", isAuth, ticketController.list);

ticketRoutes.post("/tickets", isAuth, ticketController.create);

ticketRoutes.put("/tickets/:ticketId", isAuth, ticketController.update);

ticketRoutes.get("/tickets/:ticketId", isAuth, ticketController.show);

ticketRoutes.delete("/tickets/:ticketId", isAuth, ticketController.delete);

export default ticketRoutes;
