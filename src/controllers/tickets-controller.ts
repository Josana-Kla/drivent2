import { AuthenticatedRequest } from "@/middlewares";
import ticketsService from "@/services/tickets-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function postCreateNewTicket(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const ticketTypeId = req.body.ticketTypeId as number;

  try {
    const newTicket = await ticketsService.createNewTicket(ticketTypeId, userId);

    return res.status(httpStatus.CREATED).send(newTicket);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    } 
    console.log("Erro no servidor");
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function getAllTicketTypes(req: AuthenticatedRequest, res: Response) {
  try {
    const allTicketTypes = await ticketsService.getAllTicketTypes();

    return res.status(httpStatus.OK).send(allTicketTypes);
  } catch (error) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}

export async function getUserTickets(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    const userTickets = await ticketsService.getUserTickets(userId);

    return res.status(httpStatus.OK).send(userTickets);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
