import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { postPayment, getPaymentUserTicket } from "@/controllers";

const paymentsRouter = Router();

paymentsRouter
  .all("/*", authenticateToken)
  .post("/process", postPayment)
  .get("/", getPaymentUserTicket);

export { paymentsRouter };
