import { notFoundError } from "@/errors";
import ticketRepository from "@/repositories/tickets-repository";

async function createNewTicket(ticketTypeId: any) {
  if (!ticketTypeId) throw notFoundError();

  const newTicket = await ticketRepository.createNewTicket(ticketTypeId);

  return newTicket;
}

async function getAllTicketTypes() {
  const result = await ticketRepository.getAllTicketTypes();

  if (!result) {
    throw notFoundError();
  }

  return result;
}

const ticketsService = {
  createNewTicket,
  getAllTicketTypes
};

export default ticketsService;
