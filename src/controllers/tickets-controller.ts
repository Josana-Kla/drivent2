import { AuthenticatedRequest } from "@/middlewares";
import ticketsService from "@/services/tickets-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function postCreateNewTicket(req: AuthenticatedRequest, res: Response) {
  const ticketTypeId = 1;

  try {
    await ticketsService.createNewTicket(ticketTypeId);

    return res.sendStatus(httpStatus.OK);
  } catch (error) {
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
    const enrollmentWithAddress = "null"; /* await enrollmentsService.getOneWithAddressByUserId(userId); */

    return res.status(httpStatus.OK).send(enrollmentWithAddress);
  } catch (error) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}
