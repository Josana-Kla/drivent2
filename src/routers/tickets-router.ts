import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { postCreateNewTicket, getUserTickets, getAllTicketTypes } from "@/controllers";

const ticketsRouter = Router();

ticketsRouter
  .all("/*", authenticateToken)
  .post("/", postCreateNewTicket)
  .get("/", getUserTickets)
  .get("/types", getAllTicketTypes);

export { ticketsRouter };
